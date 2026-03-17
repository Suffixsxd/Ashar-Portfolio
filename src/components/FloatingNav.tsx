import { motion } from 'motion/react';
import { RoughBox } from './RoughBox';

export function FloatingNav() {
  const navItems = [
    { name: 'Vault', href: '#vault' },
    { name: 'Operations', href: '#operations' },
    { name: 'Stack', href: '#stack' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <RoughBox
        type="rectangle"
        fill="#F4F4F4"
        stroke="#1A1A1A"
        strokeWidth={1.5}
        roughness={2}
        fillStyle="solid"
        className="px-6 py-3 shadow-sm backdrop-blur-sm bg-paper/80"
      >
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-arch text-ink hover:text-accent transition-colors magnetic text-sm md:text-base"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </RoughBox>
    </motion.div>
  );
}
