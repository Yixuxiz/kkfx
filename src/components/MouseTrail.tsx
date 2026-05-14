'use client';

import { useEffect, useState } from 'react';

export default function MouseTrail() {
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  let trailId = 0;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrails((prev) => [...prev.slice(-15), newTrail]);

      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute rounded-full bg-text-primary/10"
          style={{
            left: trail.x,
            top: trail.y,
            width: `${8 + index * 0.5}px`,
            height: `${8 + index * 0.5}px`,
            transform: 'translate(-50%, -50%)',
            opacity: (index + 1) / trails.length,
            transition: 'opacity 0.5s ease-out, width 0.3s ease-out, height 0.3s ease-out',
          }}
        />
      ))}
    </div>
  );
}
