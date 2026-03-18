import { useState } from 'react';
import { motion } from 'motion/react';
import { RoughBox } from './RoughBox';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'NanoGPT',
    description: 'A 15M parameter LLM built from scratch, trained on 200M+ characters. Implements self-attention, transformer blocks, and custom tokenization.',
    tags: ['PyTorch', 'Transformers', 'Python', 'CUDA'],
  },
  {
    title: 'Flow AI',
    description: 'Multi-modal AI note-taking suite with voice-to-flashcard capabilities. Processes audio streams into structured knowledge graphs.',
    tags: ['Next.js', 'OpenAI', 'Whisper', 'Neo4j'],
  },
  {
    title: 'PersonaQuest',
    description: 'MBTI-based personality analytics engine. Uses semantic analysis to classify user text inputs into cognitive functions.',
    tags: ['React', 'FastAPI', 'NLP', 'PostgreSQL'],
  },
];

export function Projects() {
  const [titleClicked, setTitleClicked] = useState(false);

  return (
    <section id="vault" className="py-32 px-6 max-w-6xl mx-auto relative">
      <div className="mb-20">
        <h2 
          className="text-4xl md:text-6xl font-arch font-bold text-ink mb-4 cursor-pointer select-none transition-colors hover:text-accent"
          onClick={() => setTitleClicked(!titleClicked)}
        >
          {titleClicked ? "Secret Stash" : "Projects"}
        </h2>
        <div className="w-32 h-1 bg-ink/20 relative">
          <div className="absolute inset-0 bg-ink boiling" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ rotateY: 5, rotateX: 5, scale: 1.02 }}
            style={{ perspective: 1000 }}
            className="group cursor-pointer h-full"
          >
            <RoughBox
              type="rectangle"
              fill="#FFFFFF"
              stroke="#1A1A1A"
              strokeWidth={1.5}
              roughness={2.5}
              bowing={2}
              fillStyle="hachure"
              className="h-full p-8 flex flex-col bg-white/50 backdrop-blur-sm transition-colors group-hover:bg-white"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-arch font-bold text-ink">
                  {project.title}
                </h3>
                <div className="flex gap-3 text-ink-light opacity-0 group-hover:opacity-100 transition-opacity">
                  <Github className="w-5 h-5 hover:text-accent magnetic" />
                  <ExternalLink className="w-5 h-5 hover:text-accent magnetic" />
                </div>
              </div>
              
              <p className="font-sans text-ink-light mb-8 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <RoughBox
                    key={tag}
                    type="rectangle"
                    fill="transparent"
                    stroke="#4A4A4A"
                    strokeWidth={1}
                    roughness={1}
                    padding={4}
                    className="px-2 py-1"
                  >
                    <span className="font-hand text-sm text-ink-light">{tag}</span>
                  </RoughBox>
                ))}
              </div>
            </RoughBox>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
