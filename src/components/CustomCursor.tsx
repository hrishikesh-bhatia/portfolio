import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 16}px`;
        cursorRef.current.style.top = `${e.clientY - 16}px`;
      }
    };

    document.addEventListener('mousemove', moveCursor);
    return () => document.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        width: '32px',
        height: '32px',
        border: '2px solid #22d3ee',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transition: 'left 0.05s ease-out, top 0.05s ease-out',
      }}
    />
  );
};
