import { motion } from 'framer-motion';

interface NavigationProps {
  sections: Array<{ id: string; label: string; component: any }>;
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export const Navigation = ({ sections, currentSection, onSectionChange }: NavigationProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50"
    >
      <div className="flex flex-col space-y-6">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => onSectionChange(index)}
            className={`
              relative w-4 h-4 rounded-full transition-all duration-300
              ${currentSection === index 
                ? 'bg-primary scale-125 cosmic-glow' 
                : 'bg-border hover:bg-muted'
              }
            `}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute left-8 top-1/2 transform -translate-y-1/2 
                         bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg
                         border border-border text-sm font-medium
                         opacity-0 pointer-events-none transition-opacity duration-200"
              whileHover={{ opacity: 1 }}
            >
              {section.label}
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};