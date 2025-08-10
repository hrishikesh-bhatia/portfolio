import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { HeroScene } from './scenes/HeroScene';
import { AboutScene } from './scenes/AboutScene';
import { SkillsScene } from './scenes/SkillsScene';
import { ProjectsScene } from './scenes/ProjectsScene';
import { ContactScene } from './scenes/ContactScene';
import { Navigation } from './Navigation';
import { LoadingScreen } from './LoadingScreen';
import { Stars } from '@react-three/drei';
import { CustomCursor } from './CustomCursor';
const sections = [
  { id: 'hero', label: 'Home', component: HeroScene },
  { id: 'about', label: 'About', component: AboutScene },
  { id: 'skills', label: 'Skills', component: SkillsScene },
  { id: 'projects', label: 'Projects', component: ProjectsScene },
  { id: 'contact', label: 'Contact', component: ContactScene },
];

export const Portfolio3D = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-screen overflow-y-scroll scroll-smooth">
      <CustomCursor />
      {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}

      {/* <Navigation sections={sections} currentSection={0} onSectionChange={function (index: number): void {
        throw new Error('Function not implemented.');
      } } /> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        {sections.map(({ id, component: SceneComponent }) => (
          <section
            key={id}
            id={id}
            className="h-screen w-full relative"
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              className="absolute top-0 left-0 w-full h-full"
              gl={{ antialias: true, alpha: true }}
            >
              {/* <Stars radius={300} depth={60} count={1000} factor={7} /> */}
              <Stars
  radius={300}
  depth={80}
  count={1500}
  factor={6}
  saturation={0.5}
  fade
/>

              <Suspense fallback={null}>
                <SceneComponent />
              </Suspense>
            </Canvas>
          </section>
        ))}
      </motion.div>
    </div>
  );
};
