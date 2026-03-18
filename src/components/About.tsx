import { motion } from 'motion/react';
import { RoughBox } from './RoughBox';

export function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto relative">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative"
        >
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-arch font-bold text-ink mb-4">
              How I Work
            </h2>
            <div className="w-32 h-1 bg-ink/20 relative">
              <div className="absolute inset-0 bg-ink boiling" />
            </div>
          </div>

          <div className="space-y-6 font-sans text-lg text-ink-light leading-relaxed">
            <p>
              Why a sketchbook? Because polished UIs hide the messy process of engineering. I wanted a portfolio that feels like my desk—covered in coffee stains and raw ideas.
            </p>
            <p>
              Whether I'm training an AI model or scaling a network for thousands of users, it starts exactly like this: <strong className="text-ink font-bold">a rough sketch.</strong>
            </p>
            <p>
              The best systems are built with a craftsman's mindset. It's not just about making it work; it's about making it resilient and human.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          <RoughBox
            type="rectangle"
            fill="transparent"
            stroke="#1A1A1A"
            strokeWidth={1.5}
            roughness={2.5}
            className="w-full aspect-square md:aspect-[4/3] p-8 relative flex items-center justify-center"
          >
            {/* Abstract Diagram */}
            <svg viewBox="0 0 200 200" className="w-full h-full boiling-slow opacity-80">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
              <rect x="70" y="70" width="60" height="60" fill="none" stroke="#1A1A1A" strokeWidth="2" transform="rotate(45 100 100)" />
              
              <path d="M 100 20 L 100 40 M 100 160 L 100 180 M 20 100 L 40 100 M 160 100 L 180 100" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
              
              <circle cx="100" cy="100" r="5" fill="#1A1A1A" />
              
              <text x="110" y="95" className="font-hand text-xs" fill="#1A1A1A">Core Logic</text>
              <text x="140" y="40" className="font-hand text-xs" fill="#3B82F6">User Input</text>
              <text x="20" y="180" className="font-hand text-xs" fill="#4A4A4A">Output</text>
              
              <path d="M 130 50 Q 150 70 140 90" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2 2" />
              
              <text x="10" y="190" className="font-hand text-[8px] opacity-30" fill="#1A1A1A">↑↑↓↓←→←→BA</text>
            </svg>
          </RoughBox>

          {/* Draggable Sticky Note */}
          <motion.div 
            drag
            dragConstraints={{ left: -300, right: 50, top: -50, bottom: 300 }}
            whileDrag={{ scale: 1.05, rotate: 5 }}
            className="absolute -top-10 -right-10 z-20 cursor-grab active:cursor-grabbing hidden md:block"
            initial={{ rotate: 5 }}
          >
            <div className="sticky-note w-48 p-4 font-hand text-ink text-lg leading-tight transform rotate-3 shadow-lg">
              <div className="w-full flex justify-center mb-2">
                <div className="w-8 h-3 bg-red-400/50 rounded-sm transform -rotate-2" />
              </div>
              "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
              <br/><br/>
              <span className="text-sm opacity-70">- Antoine de Saint-Exupéry</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
