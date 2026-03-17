import { motion } from 'motion/react';
import { RoughBox } from './RoughBox';

export function Experience() {
  return (
    <section id="operations" className="py-32 px-6 max-w-6xl mx-auto relative overflow-hidden">
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-arch font-bold text-ink mb-4">
          Operations & Leadership
        </h2>
        <div className="w-48 h-1 bg-ink/20 relative">
          <div className="absolute inset-0 bg-ink boiling-slow" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <RoughBox
            type="rectangle"
            fill="transparent"
            stroke="#1A1A1A"
            strokeWidth={2}
            roughness={3}
            bowing={2}
            className="p-12 relative"
          >
            <div className="absolute -top-6 -left-6 transform -rotate-12">
              <RoughBox
                type="ellipse"
                fill="#F4F4F4"
                stroke="#3B82F6"
                strokeWidth={1.5}
                className="px-4 py-2 bg-paper"
              >
                <span className="font-hand text-accent text-xl font-bold">Minecraft Infrastructure</span>
              </RoughBox>
            </div>

            <h3 className="text-3xl font-arch font-bold text-ink mb-6 mt-4">
              High-Scale Community Management
            </h3>
            
            <ul className="space-y-6 font-sans text-ink-light text-lg">
              <li className="flex items-start gap-4">
                <span className="font-hand text-2xl text-accent mt-1">01.</span>
                <p>Managed a thriving community of <strong className="text-ink font-bold">10,000+ members</strong>, ensuring high engagement and retention.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-hand text-2xl text-accent mt-1">02.</span>
                <p>Led and coordinated a <strong className="text-ink font-bold">35+ person staff team</strong> across multiple time zones.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-hand text-2xl text-accent mt-1">03.</span>
                <p>Handled complex technical moderation, including advanced <strong className="text-ink font-bold">anti-cheat systems</strong> and screensharing (SS) protocols.</p>
              </li>
            </ul>
          </RoughBox>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative"
        >
          {/* Decorative sketched graph/chart */}
          <svg viewBox="0 0 400 300" className="w-full h-auto boiling opacity-80">
            <polyline points="50,250 100,200 150,220 200,100 250,150 300,50 350,80" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="50" y1="250" x2="350" y2="250" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50" y1="50" x2="50" y2="250" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="5,5" />
            
            <circle cx="100" cy="200" r="4" fill="#1A1A1A" />
            <circle cx="200" cy="100" r="4" fill="#1A1A1A" />
            <circle cx="300" cy="50" r="4" fill="#1A1A1A" />
            
            <text x="310" y="40" className="font-hand text-sm" fill="#3B82F6">10k+ Users</text>
            <text x="210" y="90" className="font-hand text-sm" fill="#3B82F6">35+ Staff</text>
            <text x="60" y="270" className="font-hand text-xs" fill="#4A4A4A">Q1</text>
            <text x="150" y="270" className="font-hand text-xs" fill="#4A4A4A">Q2</text>
            <text x="250" y="270" className="font-hand text-xs" fill="#4A4A4A">Q3</text>
            <text x="350" y="270" className="font-hand text-xs" fill="#4A4A4A">Q4</text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
