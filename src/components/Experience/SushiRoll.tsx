import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const SushiRoll = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Increased bits of a sushi roll for density
  const parts = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ),
      rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
      scale: 0.5 + Math.random() * 0.8
    }));
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const targetPos = new THREE.Vector3(0, (i - 12) * 0.15, 0);
        const explodeFactor = scrollProgress < 0.2 ? (0.2 - scrollProgress) * 25 : 0;
        const assembleFactor = scrollProgress >= 0.2 ? Math.min(1, (scrollProgress - 0.2) * 6) : 0;
        
        const offset = parts[i].position.clone().multiplyScalar(explodeFactor);
        const lerpPos = new THREE.Vector3().lerpVectors(parts[i].position, targetPos, assembleFactor);
        
        child.position.copy(lerpPos.add(offset));
        child.rotation.x += 0.01;
        child.scale.setScalar(parts[i].scale);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {parts.map((p, i) => (
        <mesh key={i}>
          <cylinderGeometry args={[1, 1, 0.15, 32]} />
          <MeshDistortMaterial 
            color={i % 3 === 0 ? "#050505" : (i % 3 === 1 ? "#FFD700" : "#ffffff")} 
            speed={2} 
            distort={0.15}
            roughness={0.05}
            metalness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
};
