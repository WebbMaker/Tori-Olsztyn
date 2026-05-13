import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment, PerspectiveCamera, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { BackgroundFluid } from './components/Experience/Fluid';
import { SushiRoll } from './components/Experience/SushiRoll';
import { PokeBowl } from './components/Experience/PokeBowl';
import { MembershipCard } from './components/Experience/MembershipCard';
import { ParticleSystem } from './components/Experience/Particles';
import { Overlay } from './components/UI/Overlay';
import Lenis from 'lenis';
import { Language } from './i18n';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [language, setLanguage] = useState<Language>('PL');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-obsidian w-full min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none geometric-bg opacity-40"></div>
      
      <div className="fixed inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#FFD700" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          <Suspense fallback={null}>
            <BackgroundFluid />
            <ParticleSystem scrollProgress={scrollProgress} count={800} />
            
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <SushiRoll scrollProgress={scrollProgress} />
              <PokeBowl scrollProgress={scrollProgress} />
              <MembershipCard scrollProgress={scrollProgress} language={language} />
            </Float>

            <Environment preset="night" />
            
            <EffectComposer>
              <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.4} />
              <Noise opacity={0.05} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      <Overlay onScroll={setScrollProgress} language={language} setLanguage={setLanguage} />
      
      {/* Decorative Technical Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 hidden md:block">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gold/30"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gold/10"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gold/10"></div>
        
        {/* Data points */}
        <div className="absolute top-10 left-10 font-mono text-[8px] text-gold uppercase tracking-[0.4em]">
          {language === 'PL' ? 'Materiał: Obsydian_V3 // Przepływ: Stabilny' : 'Material: Obsidian_V3 // Flux: Re-Stabilized'}
        </div>
        <div className="absolute bottom-10 left-10 font-mono text-[8px] text-white/40 uppercase tracking-[0.4em]">
          SYS_ODYSSEY // RADIAL_COORD: {Math.round(scrollProgress * 360)}° // MODE: {language}
        </div>
      </div>
    </main>
  );
}

