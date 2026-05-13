import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Language, translations } from '../../i18n';

export const MembershipCard = ({ scrollProgress, language }: { scrollProgress: number; language: Language }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const t = translations[language];
  
  // Section 4: Worker's Portal
  // Active between progress 0.75 and 1.0
  const active = scrollProgress > 0.75;
  const progress = Math.max(0, (scrollProgress - 0.75) * 4);
  const opacity = active ? Math.min(1, progress * 2) : 0;

  useFrame((state) => {
    if (meshRef.current && active) {
      const { mouse } = state;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.5, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouse.y * 0.5, 0.1);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 2 + progress * 0.5, 0.1);
    }
  });

  return (
    <group visible={active}>
      <mesh ref={meshRef} position={[0, 0, 2]}>
        <boxGeometry args={[3, 1.8, 0.05]} />
        <meshStandardMaterial color="#222" roughness={0.1} metalness={1} transparent opacity={opacity} />
        
        {/* Card Content rendered as 3D Text or plane decals */}
        <Text
          position={[0, 0.3, 0.03]}
          fontSize={0.2}
          color="#FFD700"
          font="https://fonts.gstatic.com/s/syne/v22/8uv-6u9no9326YZO.woff"
          fillOpacity={opacity}
        >
          {t.membershipTitle}
        </Text>
        <Text
          position={[0, -0.2, 0.03]}
          fontSize={0.1}
          color="white"
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_eeA.woff"
          fillOpacity={opacity}
          maxWidth={2.5}
          textAlign="center"
        >
          {t.membershipSubtitle}
        </Text>
      </mesh>
    </group>
  );
};
