import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

export const CameraDrift = () => {
  const { camera } = useThree();
  const t = useRef(0);

  useFrame(() => {
    t.current += 0.005;
    camera.position.x = Math.sin(t.current) * 0.2;
    camera.position.y = Math.cos(t.current) * 0.1;
    camera.lookAt(0, 0, 0);
  });

  return null;
};
