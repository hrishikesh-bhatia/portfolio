import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Html, OrbitControls, Plane } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  // Frontend (Cool tones)
  { name: 'React', color: '#61dafb', position: [2, 1.5, 0] as const },        // Cyan
  { name: 'TypeScript', color: '#4f9eea', position: [-2, 1.5, 0] as const },  // Soft Blue
  { name: 'JavaScript', color: '#facc15', position: [0, 2.2, 1] as const },   // Warm Yellow

  // Backend (Earthy tones)
  { name: 'Node.js', color: '#3aa655', position: [1.5, -1.5, 0.5] as const }, // Forest Green
  { name: 'MongoDB', color: '#4dbd74', position: [-1.5, -1.5, 0.5] as const },// Teal Green
  { name: 'PostgreSQL', color: '#475569', position: [0, -2.2, -1] as const }, // Slate Indigo

  // Infra / DevOps (Industrial tones)
  { name: 'Docker', color: '#1e40af', position: [-2.2, 0, -1] as const },     // Deep Blue
  { name: 'C++', color: '#64748b', position: [2.2, 0, -1] as const },         // Slate Gray

  // AI / Emerging Tech (Intelligent tones)
  { name: 'Python', color: '#7c3aed', position: [-1.2, 0.8, -2] as const },   // Violet
  { name: 'LangChain', color: '#6d28d9', position: [1.2, 0.8, -2] as const }, // Deep Purple
];


export const SkillsScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />

      {/* Background gradient plane */}
      <Plane
        args={[10, 10]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
      >
        <meshBasicMaterial
          color="#0f172a"
          transparent
          opacity={0.8}
        />
      </Plane>

      <group ref={groupRef}>
        {/* Title */}
        <Text
          fontSize={1}
          position={[0, 3, 0]}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
        >
          Skills & Technologies
        </Text>

        {/* Orbiting skills */}
        <group ref={orbitRef}>
          {skills.map((skill, index) => (
            <Float
              key={skill.name}
              speed={1 + (index % 3) * 0.2}
              rotationIntensity={0.3}
              floatIntensity={0.4}
            >
              <group position={skill.position}>
                {/* Skill sphere */}
                <mesh>
                  <sphereGeometry args={[0.3]} />
                  <meshStandardMaterial
                    color={skill.color}
                    emissive={skill.color}
                    emissiveIntensity={0.3}
                  />
                </mesh>

                {/* Skill label */}
                <Html
                  position={[0, -0.8, 0]}
                  center
                  distanceFactor={6}
                  transform
                  sprite
                >
                  <div className="bg-card/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-border">
                    <span className="text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                  </div>
                </Html>
              </group>
            </Float>
          ))}
        </group>

        {/* Central core */}
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <mesh>
            <icosahedronGeometry args={[0.5]} />
            <meshStandardMaterial
              color="#a855f7"
              wireframe
              transparent
              opacity={0.8}
              emissive="#a855f7"
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>

        {/* Connecting rings */}
        <group>
          {[1, 1.5, 2].map((radius, index) => (
            <mesh key={index} rotation={[Math.PI / 4, 0, index * Math.PI / 3]}>
              <torusGeometry args={[radius, 0.02, 8, 32]} />
              <meshStandardMaterial
                color="#06b6d4"
                transparent
                opacity={0.3}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Controls */}
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};
