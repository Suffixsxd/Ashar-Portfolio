import { motion } from 'motion/react';
import { RoughBox } from './RoughBox';
import { Mail, MessageSquare, Youtube } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 max-w-4xl mx-auto relative text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-arch font-bold text-ink mb-8">
          Let's Build Something.
        </h2>
        
        <p className="font-sans text-xl text-ink-light mb-16">
          Whether it's training a custom model, scaling infrastructure, or crafting a high-end digital experience, I'm ready to collaborate.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <a href="mailto:suffixs.midfixs@gmail.com" className="group magnetic">
            <RoughBox
              type="rectangle"
              fill="#F4F4F4"
              stroke="#1A1A1A"
              strokeWidth={2}
              roughness={2}
              className="p-6 flex flex-col items-center gap-4 w-64 transition-transform group-hover:-translate-y-2"
            >
              <Mail className="w-8 h-8 text-ink group-hover:text-accent transition-colors" />
              <div className="text-center">
                <h4 className="font-arch font-bold text-ink text-lg">Email</h4>
                <p className="font-sans text-sm text-ink-light">suffixs.midfixs@gmail.com</p>
              </div>
            </RoughBox>
          </a>

          <a href="#" className="group magnetic">
            <RoughBox
              type="rectangle"
              fill="#F4F4F4"
              stroke="#1A1A1A"
              strokeWidth={2}
              roughness={2}
              className="p-6 flex flex-col items-center gap-4 w-64 transition-transform group-hover:-translate-y-2"
            >
              <MessageSquare className="w-8 h-8 text-ink group-hover:text-accent transition-colors" />
              <div className="text-center">
                <h4 className="font-arch font-bold text-ink text-lg">Discord</h4>
                <p className="font-sans text-sm text-ink-light">suffixs</p>
              </div>
            </RoughBox>
          </a>

          <a href="#" className="group magnetic">
            <RoughBox
              type="rectangle"
              fill="#F4F4F4"
              stroke="#1A1A1A"
              strokeWidth={2}
              roughness={2}
              className="p-6 flex flex-col items-center gap-4 w-64 transition-transform group-hover:-translate-y-2"
            >
              <Youtube className="w-8 h-8 text-ink group-hover:text-accent transition-colors" />
              <div className="text-center">
                <h4 className="font-arch font-bold text-ink text-lg">YouTube</h4>
                <p className="font-sans text-sm text-ink-light">@suffixs7</p>
              </div>
            </RoughBox>
          </a>
        </div>
      </motion.div>
      
      <div className="mt-32 text-center">
        <p className="font-hand text-ink-light text-lg">
          Designed & Built with Hand-Drawn Precision.
        </p>
      </div>
    </section>
  );
}
