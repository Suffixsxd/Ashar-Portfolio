import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { RoughBox } from './RoughBox';
import React, { useRef } from 'react';

const StackCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-100, 100], [15, -15]);
  const rotateY = useTransform(smoothX, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Limit the maximum tilt
    const maxDist = 100;
    const distY = Math.max(-maxDist, Math.min(maxDist, e.clientY - centerY));
    const distX = Math.max(-maxDist, Math.min(maxDist, e.clientX - centerX));
    
    x.set(distX);
    y.set(distY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative w-full max-w-sm mx-auto cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ transform: 'translateZ(30px)' }} className="absolute inset-0 z-10 pointer-events-none" />
      <RoughBox
        type="rectangle"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth={2}
        roughness={2}
        bowing={1}
        className="p-8 bg-white/80 backdrop-blur-md shadow-xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div style={{ transform: 'translateZ(50px)' }} className="mb-6 flex justify-center">
          {icon}
        </div>
        <h3 style={{ transform: 'translateZ(40px)' }} className="text-2xl font-arch font-bold text-ink text-center mb-4">
          {title}
        </h3>
        <p style={{ transform: 'translateZ(20px)' }} className="font-sans text-ink-light text-center">
          {description}
        </p>
      </RoughBox>
      
      {/* Shadow layer for 3D effect */}
      <div style={{ transform: 'translateZ(-20px)' }} className="absolute inset-0 bg-black/5 blur-md rounded-xl" />
    </motion.div>
  );
};

export function CreativeStack() {
  return (
    <section id="stack" className="py-32 px-6 max-w-6xl mx-auto relative">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-arch font-bold text-ink mb-4">
          Creative Stack
        </h2>
        <div className="w-48 h-1 bg-ink/20 mx-auto relative">
          <div className="absolute inset-0 bg-ink boiling" />
        </div>
        <p className="font-hand text-2xl text-ink-light mt-6 max-w-2xl mx-auto">
          The Perfectionist Trait: Detail-Oriented Quality Assurance.
        </p>
        <p className="font-sans text-lg text-ink-light mt-4 max-w-3xl mx-auto">
          I believe that true engineering isn't just about making things work; it's about making them unbreakable. Whether I'm optimizing a 15M parameter model or managing a 10,000+ player infrastructure, I apply a rigorous, detail-oriented approach to ensure flawless execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 [perspective:1000px]">
        <StackCard
          title="After Effects"
          description="High-end motion graphics, visual effects, and dynamic video editing. Crafting seamless transitions and engaging visual narratives."
          icon={
            <svg viewBox="0 0 100 100" className="w-24 h-24 boiling-slow">
              <rect x="10" y="10" width="80" height="80" rx="10" fill="none" stroke="#3B82F6" strokeWidth="4" />
              <path d="M 30 70 L 50 30 L 70 70 M 40 55 L 60 55" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <StackCard
          title="Blockbench"
          description="Low-poly 3D modeling, texturing, and animation. Designing custom assets and entities for immersive Minecraft experiences."
          icon={
            <svg viewBox="0 0 100 100" className="w-24 h-24 boiling">
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round" />
              <line x1="50" y1="10" x2="50" y2="50" stroke="#1A1A1A" strokeWidth="4" />
              <line x1="10" y1="30" x2="50" y2="50" stroke="#1A1A1A" strokeWidth="4" />
              <line x1="90" y1="30" x2="50" y2="50" stroke="#1A1A1A" strokeWidth="4" />
              <line x1="50" y1="50" x2="50" y2="90" stroke="#1A1A1A" strokeWidth="4" />
            </svg>
          }
        />
      </div>
    </section>
  );
}
