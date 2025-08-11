import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const projects = [
  {
    id: 1,
    title: 'CodeMate',
    description: 'Full stack online collaborative coding plartform with real-time voice integration',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    color: '#a855f7',
    position: [-3, 0, 0] as const,
    url: 'https://code-mate-pi.vercel.app/',
  },
  {
    id: 2,
    title: 'SAAS Application',
    description: 'Saas Aplication with a high focus on customer conversion',
    tech: ['React', 'Javascript', 'TypeScript', 'Nodejs'],
    color: '#06b6d4',
    position: [0, 0, 0] as const,
    url: 'https://ashy-saas-sample.vercel.app/',
  },
  {
    id: 3,
    title: 'BlogSmith',
    description: 'Full stack blogging website made without any framework',
    tech: ['Javascript', 'HTML', 'CSS', 'MongoDB'],
    color: '#fbbf24',
    position: [3, 0, 0] as const,
    url: 'https://blogsmith.onrender.com/',
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const ProjectCard = ({ project, isHovered, onHover }: ProjectCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + project.id) * 0.1;
      if (isHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={project.position}>
        {/* Card background */}
        <mesh 
          ref={meshRef}
          position={[0, 0, -0.1]}
          onPointerEnter={() => onHover(true)}
          onPointerLeave={() => onHover(false)}
        >
          <planeGeometry args={[2.2, 3]} />
          <meshStandardMaterial 
            color={project.color}
            transparent 
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Project content */}
        <Html
          position={[0, 0, 0]}
          center
          distanceFactor={4}
          transform
          sprite
        >
          <div 
            className={`floating-card p-4 max-w-xs transition-all duration-300 ${
              isHovered ? 'scale-105' : ''
            }`}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            <h3 className="text-lg font-bold mb-2 text-foreground">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.tech.map((tech) => (
                <span 
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button 
            onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
            className="cosmic-button px-4 py-2 rounded-lg text-sm">
              View Project
            </button>
          </div>
        </Html>
        
        {/* Floating elements around each card */}
        <mesh position={[1.5, 1.5, -0.5]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color={project.color} />
        </mesh>
      </group>
    </Float>
  );
};

export const ProjectsScene = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      
      <group ref={groupRef}>
        {/* Title */}
        <Text
          fontSize={1}
          position={[0, 2.5, 0]}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
        >
          Featured Projects
        </Text>
        
        {/* Project cards */}
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isHovered={hoveredProject === project.id}
            onHover={(hovered) => setHoveredProject(hovered ? project.id : null)}
          />
        ))}
        
        {/* Background elements */}
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh position={[0, -3, -2]}>
            <torusGeometry args={[4, 0.1, 8, 32]} />
            <meshStandardMaterial 
              color="#06b6d4" 
              transparent 
              opacity={0.2}
            />
          </mesh>
        </Float>
      </group>
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};