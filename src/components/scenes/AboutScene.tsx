import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const AboutScene = () => {
  const panelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (panelRef.current) {
      panelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      <group ref={panelRef}>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          {/* Main panel background */}
          <mesh position={[0, 0, -0.1]}>
            <planeGeometry args={[6, 4]} />
            <meshStandardMaterial 
              color="#1e1b4b" 
              transparent 
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Title */}
          <Text
            fontSize={1}
            position={[0, 1.5, 0]}
            color="#a855f7"
            anchorX="center"
            anchorY="middle"
          >
            About Me
          </Text>
          
          {/* About content using HTML for better text rendering */}
          <Html
            position={[0, 0, 0]}
            center
            distanceFactor={4}
            transform
            sprite
          >
            <div className="floating-card p-6 max-w-md text-center">
              <p className="text-lg mb-4 text-foreground">
  Passionate full-stack developer with over a year of experience 
  building immersive and impactful web experiences.
</p>
<p className="text-muted-foreground mb-4">
  MERN dev with a builder’s mindset, blending generative AI, creativity, and impact. 
  I turn ideas into products and push the limits of what the web can do.
</p>


              <div className="flex justify-center space-x-4">
                <span className="px-3 py-1 bg-primary/20 rounded-full text-sm">
                  Creative
                </span>
                <span className="px-3 py-1 bg-secondary/20 rounded-full text-sm">
                  Innovative
                </span>
                <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">
                  Dedicated
                </span>
              </div>
            </div>
          </Html>
        </Float>
        
        {/* Decorative elements */}
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
          <mesh position={[-4, 1, -1]}>
            <sphereGeometry args={[0.2]} />
            <meshStandardMaterial color="#06b6d4" />
          </mesh>
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={[4, -1, -1]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        </Float>
      </group>
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};