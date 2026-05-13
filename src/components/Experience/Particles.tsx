import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleSystem = ({ count = 500, scrollProgress }: { count?: number; scrollProgress: number }) => {
  const points = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities[i] = Math.random() * 0.02 + 0.01;
    }
    
    return { positions, velocities };
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.getElapsedTime();
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Gentle drift
      pos[i * 3 + 1] -= particles.velocities[i] * (1 + scrollProgress * 5);
      
      // Vortex effect based on scroll velocity
      const angle = time * 0.2 + (i / count) * Math.PI * 2;
      const radius = Math.sqrt(pos[i * 3] ** 2 + pos[i * 3 + 2] ** 2);
      
      pos[i * 3] += Math.cos(angle) * 0.002 * scrollProgress;
      pos[i * 3 + 2] += Math.sin(angle) * 0.002 * scrollProgress;

      // Reset particles
      if (pos[i * 3 + 1] < -7) {
        pos[i * 3 + 1] = 7;
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y += 0.001;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FFD700"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
