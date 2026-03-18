import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';

export function LightSwitch() {
  const [isDark, setIsDark] = useState(false);
  const controls = useAnimation();

  const toggleLight = async () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark-mode');
    
    // Pull animation
    await controls.start({ y: 50, transition: { duration: 0.1 } });
    await controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 10 } });
  };

  return (
    <div className="fixed top-0 right-10 z-50 flex flex-col items-center">
      <div className="w-0.5 h-16 bg-ink/50" />
      <motion.button
        animate={controls}
        onClick={toggleLight}
        className="w-4 h-8 bg-ink rounded-full cursor-pointer hover:scale-110 transition-transform flex items-end justify-center pb-1"
        aria-label="Toggle light"
      >
        <div className="w-2 h-2 bg-paper rounded-full opacity-50" />
      </motion.button>
    </div>
  );
}
