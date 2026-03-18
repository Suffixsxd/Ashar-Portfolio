import { useEffect, useState } from 'react';
import rough from 'roughjs';

export function EasterEggs() {
  const [stains, setStains] = useState<{x: number, y: number, r: number}[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [doodles, setDoodles] = useState<{id: number, x: number, y: number, type: string}[]>([]);

  useEffect(() => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    let typed = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami Code
      if (e.key === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
          document.documentElement.classList.toggle('blueprint-mode');
          setShowSecret(true);
          setTimeout(() => setShowSecret(false), 3000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }

      // Doodle Spawner and other text-based easter eggs
      if (e.key.length === 1) {
        typed += e.key.toLowerCase();
        if (typed.length > 20) typed = typed.slice(-20);
        
        if (typed.includes('doodle')) {
          spawnDoodle();
          typed = '';
        }
        
        if (typed.includes('barrel roll')) {
          document.body.classList.add('barrel-roll-active');
          setTimeout(() => document.body.classList.remove('barrel-roll-active'), 2000);
          typed = '';
        }

        if (typed.includes('spin')) {
          document.body.style.transition = 'transform 2s ease-in-out';
          document.body.style.transform = 'rotate(1080deg) scale(0.1)';
          setTimeout(() => {
            document.body.style.transform = 'rotate(0deg) scale(1)';
          }, 2000);
          typed = '';
        }

        if (typed.includes('matrix')) {
          document.documentElement.classList.toggle('matrix-mode');
          setShowSecret(true);
          setTimeout(() => setShowSecret(false), 3000);
          typed = '';
        }
      }
    };

    const spawnDoodle = () => {
      const types = ['star', 'spiral', 'zigzag', 'heart'];
      const type = types[Math.floor(Math.random() * types.length)];
      // Spawn near center or random
      const x = Math.random() * (window.innerWidth - 100) + 50;
      const y = Math.random() * (window.innerHeight - 100) + 50;
      
      setDoodles(prev => [...prev, { id: Date.now(), x, y, type }]);
    };

    const handleDoubleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't stain if clicking on interactive elements
      if (target.closest('a') || target.closest('button')) return;
      
      setStains(prev => [...prev, { x: e.pageX, y: e.pageY, r: Math.random() * 360 }]);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dblclick', handleDoubleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dblclick', handleDoubleClick);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30 overflow-hidden">
      {stains.map((stain, i) => (
        <div
          key={i}
          className="absolute w-32 h-32 rounded-full mix-blend-multiply coffee-stain"
          style={{
            left: stain.x - 64,
            top: stain.y - 64,
            '--rotation': `${stain.r}deg` as any,
            boxShadow: 'inset 0 0 20px rgba(139, 69, 19, 0.4), 0 0 10px rgba(139, 69, 19, 0.2)',
            border: '3px solid rgba(139, 69, 19, 0.3)',
            filter: 'url(#boil-1)',
            backgroundColor: 'rgba(139, 69, 19, 0.1)'
          }}
        />
      ))}
      
      {doodles.map(doodle => (
        <DoodleSVG key={doodle.id} {...doodle} />
      ))}

      {showSecret && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-ink text-paper px-6 py-3 rounded-md font-arch z-50 animate-bounce">
          {document.documentElement.classList.contains('matrix-mode') ? 'Welcome to the Matrix.' : 'Blueprint Mode Unlocked!'}
        </div>
      )}
    </div>
  );
}

function DoodleSVG({ x, y, type }: { x: number, y: number, type: string }) {
  // A simple way to draw rough shapes without full roughjs setup per component
  // We'll just use pre-defined SVG paths with the boiling filter
  
  let path = '';
  if (type === 'star') {
    path = "M 50 10 L 60 40 L 90 40 L 65 60 L 75 90 L 50 70 L 25 90 L 35 60 L 10 40 L 40 40 Z";
  } else if (type === 'spiral') {
    path = "M 50 50 Q 50 30 70 30 T 90 50 T 70 80 T 30 80 T 10 50 T 30 10 T 80 10";
  } else if (type === 'zigzag') {
    path = "M 10 50 L 30 20 L 50 80 L 70 20 L 90 50";
  } else if (type === 'heart') {
    path = "M 50 30 A 20 20 0 0 1 90 30 A 20 20 0 0 1 50 80 A 20 20 0 0 1 10 30 A 20 20 0 0 1 50 30 Z";
  }

  return (
    <div 
      className="absolute w-24 h-24 boiling-slow text-accent opacity-80"
      style={{ left: x - 48, top: y - 48 }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d={path} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
