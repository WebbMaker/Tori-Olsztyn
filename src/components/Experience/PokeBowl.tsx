import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshRefractionMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

export const PokeBowl = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Section 2: Momentum (Poke Bowl)
  // Active between progress 0.4 and 0.7
  const opacity = Math.max(0, Math.min(1, (scrollProgress - 0.4) * 10)) * (1 - Math.max(0, (scrollProgress - 0.7) * 10));

  return (
    <group position={[0, 0, 0]} scale={opacity}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#222" roughness={0.1} metalness={0.2} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Denser floating "ingredients" */}
      {Array.from({ length: 80 }).map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i * 1.5) * (1.2 + Math.random() * 0.4),
          0.1 + Math.random() * 0.9,
          Math.cos(i * 1.5) * (1.2 + Math.random() * 0.4)
        ]}>
          <boxGeometry args={[
            0.05 + Math.random() * 0.1, 
            0.05 + Math.random() * 0.1, 
            0.05 + Math.random() * 0.1
          ]} />
          <meshStandardMaterial 
            color={i % 3 === 0 ? "#FFD700" : (i % 3 === 1 ? "#ff5555" : "#ffffff")} 
            emissive={i % 4 === 0 ? "#FFD700" : "#000"}
            emissiveIntensity={0.6}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};
