import { useEffect } from 'react';
import Lenis from 'lenis';
import { BoilingFilter } from './components/BoilingFilter';
import { Cursor } from './components/Cursor';
import { FloatingNav } from './components/FloatingNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { CreativeStack } from './components/CreativeStack';
import { Contact } from './components/Contact';
import { EasterEggs } from './components/EasterEggs';
import { LightSwitch } from './components/LightSwitch';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen selection:bg-accent/20 selection:text-ink">
      <BoilingFilter />
      <Cursor />
      <EasterEggs />
      <LightSwitch />
      <FloatingNav />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <CreativeStack />
        <Contact />
      </main>
    </div>
  );
}
