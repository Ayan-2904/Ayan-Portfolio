import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillsList = ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Node.js', 'Nest.js', 'Express.js', 'React.js', 'Tailwind CSS', 'MongoDB', 'MySQL', 'PostgreSQL', 'UI/UX Design', 'Figma', 'AWS', 'Docker', 'Git'];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-row flex-wrap gap-3 mt-6 justify-center md:justify-start w-full"
    >
      {skillsList.map((skill) => (
        <motion.div
          key={skill}
          variants={itemVariants}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 text-sm dark:text-portfolio-text text-portfolio-secondary transition-colors duration-300 ease-in-out border rounded-full cursor-pointer dark:border-white/20 border-portfolio-border dark:bg-portfolio-surface/10 bg-portfolio-surface hover:bg-portfolio-surface dark:hover:bg-portfolio-surface/20 hover:border-portfolio-gold dark:hover:border-portfolio-gold shadow-sm"
        >
          {skill}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Skills;
