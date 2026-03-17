import { useEffect, useState } from 'react';

export function EasterEggs() {
  const [stains, setStains] = useState<{x: number, y: number, r: number}[]>([]);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
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
      
      {showSecret && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-ink text-paper px-6 py-3 rounded-md font-arch z-50 animate-bounce">
          Blueprint Mode Unlocked!
        </div>
      )}
    </div>
  );
}
