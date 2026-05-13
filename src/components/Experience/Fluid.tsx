import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 mouse = uMouse;
  
  float d = length(uv - mouse);
  float ripple = sin(d * 15.0 - uTime * 2.0) * 0.5 + 0.5;
  
  // High contrast "Blade Runner" liquid
  vec3 obsidian = vec3(0.02, 0.02, 0.03);
  vec3 gold = vec3(1.0, 0.8, 0.2);
  
  float edge = smoothstep(0.4, 0.5, ripple * (1.0 - d));
  vec3 color = mix(obsidian, gold, edge * 0.3);
  
  // Add some glow at the cursor
  color += gold * (1.0 - smoothstep(0.0, 0.3, d)) * 0.2;
  
  gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const BackgroundFluid = () => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const { clock, mouse } = state;
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(
        new THREE.Vector2((mouse.x + 1) / 2, (mouse.y + 1) / 2),
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
