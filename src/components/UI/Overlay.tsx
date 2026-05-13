import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Language, translations } from '../../i18n';

gsap.registerPlugin(ScrollTrigger);

interface OverlayProps {
  onScroll?: (progress: number) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Overlay = ({ onScroll, language, setLanguage }: OverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        onScroll?.(self.progress);
      },
    });

    return () => trigger.kill();
  }, [onScroll]);

  return (
    <div ref={containerRef} className="relative z-10 w-full">
      {/* Header Integration from Theme */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-8 pointer-events-auto">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border-2 border-gold rounded-full flex items-center justify-center font-bold text-lg font-display">T</div>
          <span className="tracking-[0.3em] font-medium text-sm font-sans">OLSZTYN</span>
        </div>
        <div className="bg-glass/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex gap-4 text-[10px] font-semibold uppercase tracking-widest cursor-pointer hover:border-gold transition-colors">
          <span 
            className={language === 'PL' ? 'text-gold' : 'opacity-40'} 
            onClick={() => setLanguage('PL')}
          >
            PL
          </span>
          <span 
            className={language === 'EN' ? 'text-gold' : 'opacity-40'} 
            onClick={() => setLanguage('EN')}
          >
            EN
          </span>
        </div>
      </header>

      {/* Section 0: Hero */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center pointer-events-none relative py-12">
        {/* Geometric Accents from Theme */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 rotate-12 -z-10 blur-sm"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full border border-gold/20 p-1 -z-10"></div>
        
        <h1 className="font-display text-[16rem] uppercase tracking-tighter text-outline opacity-10 absolute select-none hidden md:block">TORI</h1>
        <h1 className="font-display text-7xl uppercase tracking-tighter text-outline opacity-10 absolute select-none md:hidden">TORI</h1>
        <div className="mt-12 glass-morphism px-6 py-3 text-[10px] font-mono tracking-[0.2em] uppercase rounded-full flex items-center gap-3 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
          {t.heroSub}
        </div>
      </section>

      {/* Section 1: Precision */}
      <section className="min-h-[50vh] flex items-center justify-between px-20 relative overflow-hidden py-12">
        {/* Decorative Grid Clutter */}
        <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-gold/10 pointer-events-none p-4 opacity-30">
          <div className="text-[8px] font-mono uppercase tracking-widest text-gold text-right">001 // PRECISION_AXIS</div>
        </div>

        <div className="max-w-md relative z-20">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold block mb-2 px-1 border-l-2 border-gold">{t.precisionTitle}</span>
          <h2 className="font-display text-6xl uppercase leading-[0.9] italic font-light drop-shadow-[0_0_15px_rgba(255,215,0,0.2)] whitespace-pre-line">{t.precisionFlow}</h2>
          <div className="mt-6 flex gap-4 items-start whitespace-nowrap">
            <div className="h-px w-10 bg-gold mt-2.5"></div>
            <p className="text-gray-400 font-sans text-sm max-w-xs leading-relaxed whitespace-normal">
              {t.precisionDesc}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <p className="text-xs text-titanium/40 font-sans italic leading-relaxed">
              {t.precisionQuote}
            </p>
            <div className="flex gap-4 text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">
              <span className="border border-white/20 px-3 py-1">{t.density}</span>
              <span className="border border-white/20 px-3 py-1">{t.void}</span>
              <span className="border border-white/20 px-3 py-1 text-gold">{t.craft}</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="glass-morphism p-10 aspect-square flex flex-col items-center justify-center text-3xl font-display text-gold opacity-40 border-gold/10 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono tracking-widest absolute top-4 left-4">INDX</span>
            01
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-gold/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Momentum */}
      <section className="min-h-[60vh] flex flex-col justify-center overflow-hidden relative py-12">
        {/* Secondary Marquee / Decorative Overlay */}
        <div className="absolute top-1/4 left-0 w-full flex animate-marquee opacity-10 pointer-events-none" style={{ animationDuration: '30s' }}>
          <div className="flex space-x-20 px-10">
            <span className="font-display text-[8vw] text-outline uppercase tracking-tight italic">AUTHENTICITY. SPEED. PRECISION.</span>
            <span className="font-display text-[8vw] text-outline uppercase tracking-tight italic">AUTHENTICITY. SPEED. PRECISION.</span>
          </div>
        </div>

        <div className="flex animate-marquee py-6 relative z-10 w-full">
          <div className="flex space-x-20 px-10">
            <span className="font-display text-[12vw] text-outline uppercase tracking-tight">{t.momentumHealthy}</span>
            <span className="font-display text-[12vw] text-gold/20 uppercase tracking-tight">{t.momentumHealthy}</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center px-10 relative z-20 mt-4">
          <p className="font-display text-xl uppercase tracking-[0.2em] mb-3 text-gold">{t.pokeTitle}</p>
          <p className="text-gray-400 font-sans text-xs leading-relaxed max-w-lg mx-auto">
            {t.pokeDesc}
          </p>
        </div>

        {/* Data readout in transition */}
        <div className="flex justify-between px-20 mt-8 w-full opacity-30 font-mono text-[9px] tracking-widest uppercase">
          <div>LAT_REF: 53.7784 / LON_REF: 20.4801</div>
          <div className="flex gap-10">
             <span>SEC_REACTIVE_LOAD: STABLE</span>
             <span>FLUX_DENSITY: 84%</span>
          </div>
        </div>
      </section>

      {/* Section 4: Feedback Pulse (Testimonials) */}
      <section className="min-h-[40vh] py-12 px-20 relative flex flex-col justify-center border-t border-white/5">
        <div className="mb-8">
          <span className="text-[9px] text-gold uppercase tracking-[0.4em] font-bold block mb-2 border-l-2 border-gold pl-4">Feedback Pulse</span>
          <h2 className="font-display text-4xl uppercase">{t.verdict}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Konrad Żurawski",
              rating: 5,
              text_PL: "Absolutnie najwyższa jakość, która łatwo rywalizuje z typowymi restauracjami sushi. Ryba pierwsza klasa, ryż idealnie doprawiony.",
              text_EN: "Absolute top-notch quality that rivals typical sushi restaurants. Fresh fish, perfect rice, and professional service.",
              meta_PL: "Na miejscu / Doskonałość",
              meta_EN: "Dine-in / Excellence"
            },
            {
              name: "Tom Dimmer",
              rating: 5,
              text_PL: "Świetne świeże jedzenie robione na Twoich oczach. Personel zawsze wesoły i uprzejmy. Mógłbym jeść te rolki o każdej porze dnia.",
              text_EN: "Great fresh food made in front of you. Staff always happy and polite. I could eat these rolls any time of day.",
              meta_PL: "Na wynos / Świeżość",
              meta_EN: "Takeaway / Freshness"
            },
            {
              name: "Megan Rocka",
              rating: 4,
              text_PL: "Wygodne, choć niekonwencjonalne miejsce sushi w strefie gastronomicznej. Zamówiony roll z krewetką w tempurze był pyszny.",
              text_EN: "A convenient little sushi place in the food court. The shrimp tempura roll was yummy and well-prepared.",
              meta_PL: "Szybki kęs / Wartość",
              meta_EN: "Quick-Bite / Value"
            }
          ].map((review, i) => (
            <div key={i} className="glass-morphism p-6 flex flex-col justify-between border-white/5 hover:border-gold/20 transition-all group">
              <div>
                <div className="flex gap-1 mb-3 text-gold">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-xs">★</span>
                  ))}
                </div>
                <p className="text-gray-300 font-sans text-[10px] leading-relaxed mb-4 italic">
                   "{language === 'PL' ? review.text_PL : review.text_EN}"
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 flex justify-between items-end">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-wider">{review.name}</p>
                  <p className="text-[8px] font-mono text-gold/40 uppercase mt-1 tracking-widest">
                    {language === 'PL' ? review.meta_PL : review.meta_EN}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full border border-gold/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-[8px] font-mono opacity-20 uppercase tracking-[0.5em] text-center">
          {t.feedback}
        </div>
      </section>

      {/* Section 3: Sanctuary (Footer Area) */}
      <section className="min-h-[40vh] flex items-end justify-between p-20 py-12 border-t border-white/5">
        <div className="flex gap-16 items-end">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold">{t.sanctuary}</span>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-white/5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider">GALERIA WARMIŃSKA</p>
                <p className="text-[10px] opacity-40 uppercase tracking-widest leading-relaxed">{t.locationDetail}</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-2">
              <button className="px-8 py-4 bg-gold text-obsidian font-display font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all cursor-pointer">
                {t.directions}
              </button>
              <button className="px-8 py-4 border border-white/20 text-titanium font-display font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all cursor-pointer">
                {t.reserve}
              </button>
            </div>
            <p className="text-[8px] font-mono opacity-20 uppercase tracking-[0.6em] mt-2">
              NEO_GASTRO // LIMIT_NONE // STATE_ZEN
            </p>
          </div>

          <div className="hidden lg:flex w-[280px] h-[120px] bg-glass/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 flex-col justify-between hover:border-gold/30 transition-colors cursor-help">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{t.workerPortal}</span>
              <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              </div>
            </div>
            <p className="text-[10px] opacity-60 leading-relaxed font-sans mt-1">
              {t.workerDesc}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-8 text-right">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-[0.3em] block mb-2 opacity-40">{t.ready}</span>
            <button 
               className="px-10 py-4 bg-gold text-obsidian font-display font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all cursor-pointer outline-none"
               onClick={() => {
                 document.body.classList.add('crt-off');
                 setTimeout(() => window.location.reload(), 650);
               }}
            >
              {t.visitUs}
            </button>
          </div>
          <div className="flex gap-6 text-[10px] font-bold tracking-[0.3em] opacity-30 uppercase font-sans">
            <span className="hover:opacity-100 transition-opacity cursor-pointer">INSTAGRAM</span>
            <span className="hover:opacity-100 transition-opacity cursor-pointer">FACEBOOK</span>
            <span className="hover:opacity-100 transition-opacity cursor-pointer">MENU</span>
          </div>
        </div>
      </section>
    </div>
  );
};
