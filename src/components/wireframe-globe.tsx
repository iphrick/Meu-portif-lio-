"use client";

import React, { useEffect, useRef } from 'react';

export default function WireframeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    
    // Support high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const radius = Math.min(width, height) * 0.45;
    const cx = width / 2;
    const cy = height / 2;

    const numLatitudes = 16;
    const numLongitudes = 24;
    
    let rotation = 0;
    const rotationSpeed = 0.002;

    // Project 3D coordinate to 2D
    const project = (x: number, y: number, z: number) => {
      // Perspective projection
      const perspective = 800 / (800 + z);
      return {
        x: cx + x * perspective,
        y: cy + y * perspective,
        z: z, // keep z for depth sorting or fading
        p: perspective
      };
    };

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      rotation += rotationSpeed;

      const points: { x: number, y: number, z: number, lat: number, lon: number }[] = [];

      // Generate points
      for (let i = 0; i <= numLatitudes; i++) {
        const phi = (Math.PI * i) / numLatitudes;
        const y = radius * Math.cos(phi);
        const r = radius * Math.sin(phi);

        for (let j = 0; j < numLongitudes; j++) {
          const theta = (2 * Math.PI * j) / numLongitudes + rotation;
          const x = r * Math.cos(theta);
          const z = r * Math.sin(theta);
          
          points.push({ x, y, z, lat: i, lon: j });
        }
      }

      ctx.lineWidth = 0.8;
      
      // Draw horizontal lines (Latitudes)
      for (let i = 1; i < numLatitudes; i++) {
        ctx.beginPath();
        let firstPt = null;
        for (let j = 0; j < numLongitudes; j++) {
          const p3d = points.find(p => p.lat === i && p.lon === j);
          if (p3d) {
            const p2d = project(p3d.x, p3d.y, p3d.z);
            // Alpha based on Z to fade out the back of the globe, but keep front very bright
            const alpha = Math.max(0.1, Math.min(1, (p2d.z + radius) / (radius * 1.5)));
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.85})`; // Brighter lines
            ctx.lineWidth = 1.2; // Thicker lines
            
            if (j === 0) {
              ctx.moveTo(p2d.x, p2d.y);
              firstPt = p2d;
            } else {
              ctx.lineTo(p2d.x, p2d.y);
            }
          }
        }
        if (firstPt) ctx.lineTo(firstPt.x, firstPt.y); // close the loop
        ctx.stroke();
      }

      // Draw vertical lines (Longitudes)
      for (let j = 0; j < numLongitudes; j++) {
        ctx.beginPath();
        for (let i = 0; i <= numLatitudes; i++) {
          const p3d = points.find(p => p.lat === i && p.lon === j);
          if (p3d) {
            const p2d = project(p3d.x, p3d.y, p3d.z);
            const alpha = Math.max(0.05, Math.min(1, (p2d.z + radius) / (radius * 1.5)));
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
            
            if (i === 0) ctx.moveTo(p2d.x, p2d.y);
            else ctx.lineTo(p2d.x, p2d.y);
          }
        }
        ctx.stroke();
      }
      
      // Draw dots at intersections
      points.forEach(p3d => {
        const p2d = project(p3d.x, p3d.y, p3d.z);
        if (p2d.z > -radius * 0.5) { // Only draw dots on the front hemisphere
           const alpha = Math.max(0.2, Math.min(1, (p2d.z + radius) / (radius * 1.5)));
           ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`; // Full white for dots
           ctx.beginPath();
           ctx.arc(p2d.x, p2d.y, 2.0 * p2d.p, 0, Math.PI * 2); // Larger dots
           ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full" 
      style={{ pointerEvents: 'none' }}
    />
  );
}
