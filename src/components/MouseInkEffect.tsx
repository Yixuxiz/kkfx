'use client';

import { useEffect, useState, useRef } from 'react';

interface InkDrop {
  x: number;
  y: number;
  id: number;
  size: number;
  opacity: number;
}

export default function MouseInkEffect() {
  const [drops, setDrops] = useState<InkDrop[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  let dropId = 0;
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const newDrop: InkDrop = {
        x: e.clientX,
        y: e.clientY,
        id: dropId++,
        size: Math.random() * 20 + 10,
        opacity: 0.15 + Math.random() * 0.1,
      };

      setDrops((prev) => [...prev.slice(-8), newDrop]);

      setTimeout(() => {
        setDrops((prev) => prev.filter((d) => d.id !== newDrop.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 平滑跟随的光晕效果
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame++;
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* 水墨扩散效果 */}
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute rounded-full bg-text-primary"
          style={{
            left: drop.x,
            top: drop.y,
            width: drop.size,
            height: drop.size,
            transform: 'translate(-50%, -50%)',
            opacity: drop.opacity,
            filter: 'blur(8px)',
            transition: 'opacity 0.8s ease-out, transform 0.6s ease-out',
            animation: 'inkSpread 0.8s ease-out forwards',
          }}
        />
      ))}

      {/* 鼠标跟随光晕 */}
      <div
        className="absolute rounded-full bg-text-primary/5"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: '60px',
          height: '60px',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(20px)',
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
        }}
      />
    </div>
  );
}
