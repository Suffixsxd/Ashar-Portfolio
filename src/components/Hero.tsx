import { motion } from 'motion/react';
import { RoughBox } from './RoughBox';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-4xl z-10"
      >
        <div className="mb-8 flex justify-center">
          <RoughBox
            type="ellipse"
            fill="rgba(59, 130, 246, 0.1)"
            stroke="#3B82F6"
            strokeWidth={1}
            roughness={2}
            className="px-6 py-2"
          >
            <span className="font-hand text-xl text-blue-600 tracking-wider">
              Available for Collaboration
            </span>
          </RoughBox>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-arch font-bold leading-tight mb-6 text-ink">
          Ashar Aamer
          <br />
          <span className="text-ink-light text-4xl md:text-6xl lg:text-7xl">
            Architecting AI & Communities.
          </span>
        </h1>

        <p className="font-sans text-lg md:text-xl text-ink-light max-w-2xl mx-auto mb-12">
          I build high-scale infrastructure, train custom LLMs, and craft digital experiences with hand-drawn precision.
        </p>

        <div className="relative mt-8 mb-16">
          <RoughBox
            type="rectangle"
            fill="transparent"
            stroke="#1A1A1A"
            strokeWidth={1}
            roughness={3}
            className="p-6 max-w-xl mx-auto text-left"
          >
            <p className="font-hand text-xl text-ink leading-relaxed">
              "I don't just write code. I architect systems. Every line is a deliberate stroke, bridging the gap between raw AI capability and human-centric design. Welcome to my living sketchbook."
            </p>
            <div className="absolute -bottom-10 -right-12 transform rotate-12 opacity-70">
              <span className="font-hand text-sm text-ink-light">Hold Left Click to Draw! ✏️</span>
              <svg width="40" height="40" viewBox="0 0 100 100" className="boiling ml-8">
                <path d="M 10 90 Q 50 50 90 10 M 70 10 L 90 10 L 90 30" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </RoughBox>
        </div>

        <div className="flex gap-6 justify-center">
          <RoughBox
            type="rectangle"
            fill="#1A1A1A"
            stroke="#1A1A1A"
            strokeWidth={2}
            fillStyle="solid"
            className="px-8 py-4 cursor-pointer magnetic group"
          >
            <span className="font-arch text-paper text-xl group-hover:text-white transition-colors">
              View The Vault
            </span>
          </RoughBox>
          <RoughBox
            type="rectangle"
            fill="transparent"
            stroke="#1A1A1A"
            strokeWidth={2}
            className="px-8 py-4 cursor-pointer magnetic group"
          >
            <span className="font-arch text-ink text-xl group-hover:text-ink-light transition-colors">
              Contact Me
            </span>
          </RoughBox>
        </div>
      </motion.div>

      {/* Background decorative sketched elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="boiling-slow">
          <path d="M 100 100 Q 300 50 500 200 T 900 300" stroke="#1A1A1A" strokeWidth="1" fill="none" strokeDasharray="5,5" />
          <path d="M 800 100 Q 600 400 200 600" stroke="#1A1A1A" strokeWidth="1" fill="none" />
          <circle cx="85%" cy="20%" r="50" stroke="#1A1A1A" strokeWidth="1" fill="none" />
          <rect x="10%" y="70%" width="100" height="100" stroke="#1A1A1A" strokeWidth="1" fill="none" transform="rotate(15 150 750)" />
        </svg>
      </div>
    </section>
  );
}
