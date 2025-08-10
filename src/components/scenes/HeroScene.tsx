import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls, Trail, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export const HeroScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const cometRef = useRef<THREE.Mesh>(null);

  // Animate group rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }

    // Animate comet flight
    const t = state.clock.getElapsedTime();
    if (cometRef.current) {
      cometRef.current.position.x = Math.sin(t * 0.6) * 6;
      cometRef.current.position.y = Math.cos(t * 0.4) * 2 + 1;
      cometRef.current.position.z = Math.cos(t * 0.3) * 3 - 2;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />

      {/* Main content group */}
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          {/* Main title */}
          <Text
            fontSize={1}
            position={[0, 1, 0]}
            color="#a855f7"
            anchorX="center"
            anchorY="middle"
          >
            Hrishikesh PORTFOLIO
          </Text>

          {/* Subtitle */}
          <Text
            fontSize={0.5}
            position={[0, 0, 0]}
            color="#06b6d4"
            anchorX="center"
            anchorY="middle"
          >
            Full Stack Developer & AI-ML Enthusiast
          </Text>

          {/* Call to action */}
          <Text
            fontSize={0.3}
            position={[0, -1, 0]}
            color="#fbbf24"
            anchorX="center"
            anchorY="middle"
          >
            Scroll to explore
          </Text>
        </Float>

        {/* Floating geometric elements */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[-3, 0, -2]}>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial color="#a855f7" wireframe />
          </mesh>
        </Float>

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <mesh position={[3, 0, -2]}>
            <icosahedronGeometry args={[0.3]} />
            <meshStandardMaterial color="#06b6d4" />
          </mesh>
        </Float>

        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={[0, 2, -3]}>
            <torusGeometry args={[0.4, 0.1, 16, 32]} />
            <meshStandardMaterial color="#a855f7" />
          </mesh>
        </Float>
      </group>

      {/* Flying comet */}
      <mesh ref={cometRef}>
  <tetrahedronGeometry args={[0.2]} />
  <meshStandardMaterial
    emissive="#4c3b71"
    color="#4c3b71"
    emissiveIntensity={2}
    roughness={0.3}
    metalness={0.6}
  />
</mesh>


      {/* Comet trail */}
      <Trail
        width={0.15}
        length={4}
        color="#4c3b71"
        attenuation={(t) => t * t}
        target={cometRef}
      />

      {/* Sparkles around comet path */}
      <Sparkles
        count={30}
        scale={5}
        size={1}
        speed={0.5}
        color="#fbbf24"
        position={[0, 1, -2]}
      />

      {/* Orbit controls */}
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};
