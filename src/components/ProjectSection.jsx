// src/components/ProjectSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import {
  FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaJsSquare, FaTools, FaFigma, FaGithub, FaTimes, FaDownload,
  FaFolderOpen, FaCertificate, FaCode
, FaAws } from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiVercel, SiMongodb,
  SiExpress, SiPostgresql
} from 'react-icons/si';
import { PiCodeBold } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavbar } from '../contexts/NavbarContext';
import { supabase } from '../lib/supabase';

// ===================================
// DATA PROYEK (FALLBACK - will be replaced by DB data)
// ===================================
const dummyProjects = [
  {
    title: "AI BioScan",
    description: "Intelligent Health Risk Assessment System integrating ML models for symptom analysis and real-time health risk prediction.",
    tech: ["React.js", "Python", "PostgreSQL"],
    link: "https://aibioscan.vercel.app/",
    github: "https://github.com/Ayan-2904/AIBioscan",
    image: "/project-images/ai_bioscan.jpg",
    category: "Web/Apps",
  },
  {
    title: "YouTube Video Summarizer",
    description: "AI-powered application that generates concise summaries from YouTube videos using LLMs with transcript chunking.",
    tech: ["React.js", "Node.js", "LLMs"],
    link: "https://youtube-transcript-summarizer-m3kq.vercel.app/",
    github: "https://github.com/Ayan-2904/YTTranscript_main",
    image: "/project-images/youtube_summarizer.jpg",
    category: "Web/Apps",
  },
  {
    title: "Text-to-Image Generator",
    description: "Generative AI web application using Stable Diffusion for text-to-image generation, optimized for latency.",
    tech: ["React.js", "Stable Diffusion", "Docker"],
    link: "https://text-to-image-w2ji.vercel.app/login",
    github: "https://github.com/Ayan-2904/text-to-image",
    image: "/project-images/text_to_image.jpg",
    category: "Web/Apps",
  }
];

// ===================================
// CERTIFICATE DATA
// ===================================
const userCertificates = [
  {
    title: "AICTE Google Android Developer",
    issuer: "AICTE / Google",
    date: "2024",
    link: "/certificates/AICTE Google Android Developer.pdf",
    image: "/certificate-images/AICTE Google Android Developer.jpg",
  },
  {
    title: "Google Cloud Career Launchpad Generative AI Leader",
    issuer: "Google",
    date: "2024",
    link: "/certificates/Google Cloud Career Launchpad.pdf",
    image: "/certificate-images/Google Cloud Career Launchpad Generative Ai Leader track.jpg",
  },
  {
    title: "Cloud Architecting",
    issuer: "AWS Academy",
    date: "2024",
    link: "/certificates/AWS Academy Cloud Architecting.pdf",
    image: "/certificate-images/AWS Academy Cloud Architecting.jpg",
  },
  {
    title: "Cloud Foundations",
    issuer: "AWS Academy",
    date: "2024",
    link: "/certificates/AWS Academy Cloud Foundations .pdf",
    image: "/certificate-images/AWS Academy Cloud Foundations.jpg",
  },
  {
    title: "Mathematics-Basics to Advanced for Data Science and Gen AI",
    issuer: "Udemy",
    date: "2024",
    link: "/certificates/Udemy Mathematics-Basics to Advanced for Data Science and Gen AI.pdf",
    image: "/certificate-images/Udemy Mathematics-Basics to Advanced for Data Science and Gen AI.jpg",
  },
  {
    title: "Data Visualisation",
    issuer: "Forage",
    date: "2024",
    link: "/certificates/Forage Data Visualisation.pdf",
    image: "/certificate-images/Forage Data Visualisation.jpg",
  },

  {
    title: "Basic Python",
    issuer: "Infosys",
    date: "2024",
    link: "/certificates/Infosys Basic Python.pdf",
    image: "/certificate-images/Infosys Basic Python.jpg",
  },
  {
    title: "Software Engineering",
    issuer: "Walmart",
    date: "2024",
    link: "/certificates/Walmart Software Engineering.pdf",
    image: "/certificate-images/Walmart Software Engineering.jpg",
  },
  {
    title: "Google Analytics",
    issuer: "Udemy",
    date: "2024",
    link: "/certificates/Udemy Google Analytics.pdf",
    image: "/certificate-images/Udemy Google Analytics.jpg",
  },
  {
    title: "Introduction to Natural Language Processing",
    issuer: "Analytics Vidhya",
    date: "2024",
    link: "/certificates/Analytics Vidhya Introduction to Natural Language Processing.pdf",
    image: "/certificate-images/Analytics Vidhya Introduction to Natural Language Processing.jpg",
  },
  {
    title: "Introduction to Machine Learning",
    issuer: "Data Flair",
    date: "2024",
    link: "/certificates/Data Flair  Introduction to Machine Learning.pdf",
    image: "/certificate-images/Data Flair  Introduction to Machine Learning.jpg",
  },
  {
    title: "Full Stack",
    issuer: "Simplilearn",
    date: "2024",
    link: "/certificates/Simplilearn Full Stack.pdf",
    image: "/certificate-images/Simplilearn Full Stack.jpg",
  },
  {
    title: "Master in Generative AI",
    issuer: "Udemy",
    date: "2024",
    link: "/certificates/Udemy Master in Generative AI.pdf",
    image: "/certificate-images/Udemy Master in Generative AI.jpg",
  },
  {
    title: "Mastering MYSQL",
    issuer: "Udemy",
    date: "2024",
    link: "/certificates/Udemy Mastering MYSQL.pdf",
    image: "/certificate-images/Udemy Mastering MYSQL.jpg",
  },
  {
    title: "Python Django Full Stack Development",
    issuer: "Udemy",
    date: "2025",
    link: "/certificates/Udemy python Django Full Stack Development.pdf",
    image: "/certificate-images/Udemy python Django Full Stack Development.jpg",
  },

];

const techStack = {
  frontend: [
    { name: "React.js", icon: <FaReact className="text-[#D4AF37]" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-[#D4AF37]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#D4AF37]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#D4AF37]" /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs className="text-[#D4AF37]" /> },
    { name: "Express.js", icon: <SiExpress className="dark:text-portfolio-text" /> },
    { name: "Python", icon: <FaJsSquare className="text-[#D4AF37]" /> },
    { name: "REST APIs", icon: <FaCode className="text-portfolio-secondary" /> },
  ],
  database: [
    { name: "MongoDB", icon: <SiMongodb className="text-[#D4AF37]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#D4AF37]" /> },
  ],
  tools: [
      { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
      { name: "Git & GitHub", icon: <FaGithub className="dark:text-portfolio-text" /> },
    { name: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
    { name: "Docker", icon: <FaTools className="text-[#D4AF37]" /> },
  ],
};

// ===================================
// HELPER & ANIMATION COMPONENTS
// ===================================
const LineShadowText = ({ children, className, shadowColor = "#D4AF37", ...props }) => {
  return (
    <motion.span
      style={{ "--shadow-color": shadowColor }}
      className={`relative z-0 line-shadow-effect ${className}`}
      data-text={children}
      {...props}
    >
      {children}
    </motion.span>
  );
};

// ===================================
// KOMPONEN KARTU SERTIFIKAT
// ===================================
const CertificateCard = ({ cert, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const shineX = useTransform(x, [-0.5, 0.5], [100, 0]);
  const shineY = useTransform(y, [-0.5, 0.5], [100, 0]);
  const backgroundPosition = useMotionTemplate`${shineX}% ${shineY}%`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative cursor-pointer z-10 hover:z-50"
      onClick={() => onClick(cert)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-portfolio-gold/40 bg-portfolio-surface/40 backdrop-blur-md border border-portfolio-gold/10 hover:border-portfolio-gold/50 transition-all duration-500">
        <div className="absolute inset-0">
          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-portfolio-gold/20 to-transparent opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500"></div>

          {/* Holographic Foil Overlay */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 mix-blend-color-dodge transition-opacity duration-500"
            style={{
              backgroundImage: "linear-gradient(115deg, transparent 20%, rgba(212,175,55,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(212,175,55,0.4) 55%, transparent 80%)",
              backgroundPosition,
              backgroundSize: "200% 200%"
            }}
          ></motion.div>
        </div>
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex-1 flex items-start justify-between">
            <div className="bg-portfolio-surface/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-portfolio-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-shadow duration-300">
              <span className="text-xs font-bold text-portfolio-gold uppercase tracking-wider">{cert.issuer}</span>
            </div>
            <div className="bg-portfolio-surface/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-portfolio-border/50">
              <span className="text-xs font-bold text-portfolio-secondary">{cert.date}</span>
            </div>
          </div>
          <div className="space-y-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-portfolio-gold transition-colors duration-300 line-clamp-2 leading-tight drop-shadow-md">{cert.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-portfolio-secondary group-hover:text-gray-200 transition-colors">
                <FaDownload className="text-sm" />
                <span className="text-sm font-medium">View Certificate</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                <div className="bg-portfolio-gold/20 backdrop-blur-md p-2.5 rounded-full border border-portfolio-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  <FaExternalLinkAlt className="text-portfolio-gold-light text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-portfolio-gold/20 transition-colors duration-500 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL PROYEK
// ===================================
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": " गति ", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "🔑", "Figma": <FaFigma />, "Storybook": "📚",
    "JavaScript": <FaJsSquare />, "HTML5": <FaHtml5 />, "CSS3": <FaCss3Alt />,
    "PostgreSQL": <SiPostgresql />, "Vercel": <SiVercel />, "Git & GitHub": <FaGithub />
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-5xl w-full bg-portfolio-surface/95 backdrop-blur-xl rounded-3xl border border-portfolio-gold/50 shadow-[0_0_40px_rgba(212,175,55,0.2)] overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="dark:bg-black/40 bg-portfolio-surface/80 hover:bg-portfolio-gold/20 backdrop-blur-md p-3 rounded-full dark:border-white/10 border-portfolio-border hover:border-portfolio-gold/30 transition-all duration-300 group">
            <FaTimes className="dark:text-portfolio-text/70 text-portfolio-secondary group-hover:text-portfolio-gold" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto custom-scrollbar">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
            <div className="flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-full bg-portfolio-gold/10 bg-portfolio-gold text-portfolio-gold border-portfolio-gold/20 border-portfolio-gold">
                    {techIcons?.[t]} {t}
                  </span>
                ))}
              </div>

              <h2 className="text-3xl font-bold dark:text-portfolio-text mb-4 leading-tight">{project.title}</h2>
              <p className="dark:text-portfolio-secondary leading-relaxed mb-6 text-lg">{project.description}</p>

              {project.featured && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-portfolio-gold/10 border border-portfolio-gold/20 rounded-lg mb-6">
                  <span className="text-portfolio-gold">⭐ Featured Project</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8">
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 dark:bg-gradient-to-r from-portfolio-gold to-portfolio-gold-dark hover:from-portfolio-gold hover:to-portfolio-gold-dark bg-portfolio-gold hover:bg-portfolio-gold text-portfolio-text font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-portfolio-gold/30 hover:-translate-y-1"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              )}

              {/* Assuming GitHub link might be stored in a different field or same link if generic */}
              {/* For now using project.link as fallback, ideally should have github specific field passed */}
              <a
                href={project.github || project.link} // Adjust if you have a specific github_url field
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-portfolio-bg bg-portfolio-surface dark:hover:bg-portfolio-surface hover:bg-slate-600 text-portfolio-text font-bold rounded-xl dark:border-portfolio-border border-slate-600 transition-all duration-300 hover:-translate-y-1"
              >
                <FaGithub className="text-xl" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN KARTU PROYEK
// ===================================
const ProjectCard = ({ project, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const shineX = useTransform(x, [-0.5, 0.5], [100, 0]);
  const shineY = useTransform(y, [-0.5, 0.5], [100, 0]);
  const backgroundPosition = useMotionTemplate`${shineX}% ${shineY}%`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": " गति ", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "🔑", "Figma": <FaFigma />, "Storybook": "📚"
  };

  return (
    <div className="perspective-1000">
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={() => onClick(project)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: `url('${project.image}') center/cover no-repeat`
        }}
        className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden transition-shadow duration-300 shadow-xl hover:shadow-2xl hover:shadow-portfolio-gold/40 cursor-pointer border border-portfolio-border/50 hover:border-portfolio-gold/50"
      >
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"
          style={{ transform: "translateZ(10px)" }}
        ></div>

        {/* Holographic Foil Overlay */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 mix-blend-color-dodge transition-opacity duration-500"
          style={{
            backgroundImage: "linear-gradient(115deg, transparent 20%, rgba(212,175,55,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(212,175,55,0.4) 55%, transparent 80%)",
            backgroundPosition,
            backgroundSize: "200% 200%",
            transform: "translateZ(20px)"
          }}
        ></motion.div>

        <div
          className="absolute inset-0 bg-gradient-to-br from-portfolio-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
          style={{ transform: "translateZ(15px)" }}
        ></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-100 transition-opacity duration-300">
          <div
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-white group-hover:text-portfolio-gold transition-colors drop-shadow-md">{project.title}</h3>
              <div className="bg-portfolio-gold/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-portfolio-gold/30">
                <FaExternalLinkAlt className="text-portfolio-gold-light" />
              </div>
            </div>
            <p className="text-gray-300 group-hover:text-gray-100 mt-2 text-sm line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-colors drop-shadow-sm">{project.description}</p>
          </div>

          <div
            className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 mt-4"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((t, i) => (
                <span key={i} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-portfolio-surface/60 text-portfolio-gold border border-portfolio-gold/40 backdrop-blur-md shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  {techIcons?.[t] || t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-portfolio-surface/60 text-portfolio-secondary border border-portfolio-border backdrop-blur-md">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-portfolio-gold/30 transition-colors duration-500 pointer-events-none" style={{ transform: "translateZ(60px)" }}></div>
      </motion.div>
    </div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL SERTIFIKAT
// ===================================
const CertificatePreviewModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-4xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto bg-portfolio-surface/95 backdrop-blur-xl rounded-3xl border border-portfolio-gold/50 shadow-[0_0_40px_rgba(212,175,55,0.2)] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="dark:bg-black/40 bg-portfolio-surface/80 hover:bg-portfolio-gold/20 backdrop-blur-md p-2 rounded-full dark:border-white/10 border-portfolio-border hover:border-portfolio-gold/30 transition-all duration-300 group">
            <FaTimes className="dark:text-portfolio-text/70 text-portfolio-secondary group-hover:text-portfolio-gold" />
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-3/5 relative min-h-[300px] md:min-h-[500px] bg-portfolio-bg">
          <img src={certificate.image} alt={certificate.title} className="absolute inset-0 w-full h-full object-contain p-4 bg-slate-950/50" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center bg-portfolio-bg/50 bg-portfolio-surface">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-portfolio-gold/10 border border-portfolio-gold/20 text-portfolio-gold text-xs font-bold tracking-wider mb-4">
              {certificate.issuer}
            </div>
            <h2 className="text-2xl font-bold dark:text-portfolio-text mb-2 leading-tight">{certificate.title}</h2>
            <p className="text-portfolio-secondary font-mono text-sm">{certificate.date}</p>
          </div>

          <div className="space-y-4 mt-auto">
            <a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-portfolio-gold to-portfolio-gold hover:from-portfolio-gold hover:to-portfolio-gold text-portfolio-text font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-portfolio-gold/25 group"
            >
              <FaDownload className="group-hover:animate-bounce" />
              <span>Download / View PDF</span>
            </a>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-portfolio-bg bg-portfolio-surface dark:hover:bg-portfolio-surface hover:bg-slate-300 dark:text-portfolio-secondary font-semibold rounded-xl transition-all duration-300"
            >
              Close Preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN UTAMA SECTION PROJECT
// ===================================
function ProjectSection() {
  const [activeTab, setActiveTab] = useState('Projects');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#certificates') {
        setActiveTab('Certificate');
      } else if (window.location.hash === '#projects') {
        setActiveTab('Projects');
      }
    };
    
    if (window.location.hash === '#certificates') {
        setActiveTab('Certificate');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [projectCategory, setProjectCategory] = useState('Web/Apps');
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const [previewProject, setPreviewProject] = useState(null); // ✨ NEW STATE
  const { hideNavbar, showNavbar } = useNavbar();

  // === Database States ===
  const [projectsFromDB, setProjectsFromDB] = useState([]);
  const [certificatesFromDB, setCertificatesFromDB] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);

  // === CHANGE START: State dan konstanta untuk Show More/Less ===
  const INITIAL_CERTIFICATES_TO_SHOW = 6;
  const [visibleCertificatesCount, setVisibleCertificatesCount] = useState(INITIAL_CERTIFICATES_TO_SHOW);
  // === CHANGE END ===

  // Fetch projects from database
  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log('🔍 Fetching projects from Supabase...');
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('❌ Error fetching projects:', error);
          throw error;
        }

        if (data && data.length > 0) {
          console.log('✅ Projects loaded from database:', data.length, 'projects');
          console.log('📊 Projects data:', data);
          setProjectsFromDB(data);
        } else {
          console.log('⚠️ No projects found in database, using fallback data');
        }
      } catch (err) {
        console.error('❌ Error fetching projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  // Fetch certificates from database
  useEffect(() => {
    async function fetchCertificates() {
      try {
        console.log('🔍 Fetching certificates from Supabase...');
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issue_date', { ascending: false });

        if (error) {
          console.error('❌ Error fetching certificates:', error);
          throw error;
        }

        if (data && data.length > 0) {
          console.log('✅ Certificates loaded from database:', data.length, 'certificates');
          console.log('📜 Certificates data:', data);
          setCertificatesFromDB(data);
        } else {
          console.log('⚠️ No certificates found in database, using fallback data');
        }
      } catch (err) {
        console.error('❌ Error fetching certificates:', err);
      } finally {
        setLoadingCerts(false);
      }
    }
    fetchCertificates();
  }, []);

  useEffect(() => {
    // Hide navbar when any modal is open
    if (previewCertificate || previewProject) {
      hideNavbar();
    } else {
      showNavbar();
    }
  }, [previewCertificate, previewProject, hideNavbar, showNavbar]);

  useEffect(() => {
    return () => {
      showNavbar();
    };
  }, [showNavbar]);

  const tabs = [
    { id: 'Projects', label: 'Projects', icon: <PiCodeBold className="text-[1.7em] mb-1" /> },
    { id: 'Certificate', label: 'Certificates', icon: <LuBadge className="text-[1.5em] mb-1" /> },
    { id: 'Tech Stack', label: 'Tech Stack', icon: <LiaLayerGroupSolid className="text-[1.5em] mb-1" /> },
  ];

  // Use database projects if available, fallback to dummy data
  const activeProjects = projectsFromDB.length > 0 ? projectsFromDB : dummyProjects;

  console.log('🎯 Active projects source:', projectsFromDB.length > 0 ? 'DATABASE' : 'FALLBACK');
  console.log('📦 Total projects:', activeProjects.length);

  // Transform database projects to match UI format
  const transformedProjects = activeProjects.map(p => {
    // If has UUID id, it's from database - transform it
    if (p.id && typeof p.id === 'string' && p.id.includes('-')) {
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        tech: p.tags || [],
        link: p.demo_url || p.github_url || '#', // Use demo_url as primary link
        github: p.github_url, // Add specific github field
        image: p.image_url,
        category: 'Database', // All DB projects in one category
        featured: p.featured || false
      };
    }
    // Static data already in correct format
    return p;
  });

  console.log('🔄 Transformed projects:', transformedProjects.length);

  // Filter projects by category (only applies to static dummy data)
  const filteredProjects = transformedProjects.filter((p) => {
    // If from database (has category 'Database'), show all
    if (p.category === 'Database') return true;
    // For dummy data, filter by selected category
    return p.category === projectCategory;
  });

  console.log('✨ Filtered projects to display:', filteredProjects.length);

  // Use database certificates if available, fallback to static data
  const activeCertificates = certificatesFromDB.length > 0 ? certificatesFromDB : userCertificates;

  // === CHANGE START: Handler untuk tombol Show More/Less ===
  const handleShowMore = () => {
    setVisibleCertificatesCount(activeCertificates.length);
  };

  const handleShowLess = () => {
    setVisibleCertificatesCount(INITIAL_CERTIFICATES_TO_SHOW);
  };
  // === CHANGE END ===

  return (
    <section id="project" className="py-20">

      <style>{`
        @keyframes line-shadow-anim { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
        .line-shadow-effect::after { content: attr(data-text); position: absolute; z-index: -1; left: 0.04em; top: 0.04em; background-image: linear-gradient(45deg, transparent 45%, var(--shadow-color) 45%, var(--shadow-color) 55%, transparent 0); background-size: 0.06em 0.06em; -webkit-background-clip: text; background-clip: text; color: transparent; animation: line-shadow-anim 30s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold font-moderniz">
          <span className="text-portfolio-gold-light text-portfolio-gold"><LineShadowText shadowColor="#D4AF37">PORTFOLIO</LineShadowText></span>
          {' '}
          <span className="dark:text-portfolio-text"><LineShadowText shadowColor="#A1A1AA">SHOWCASE</LineShadowText></span>
        </h2>
      </motion.div>

      <div className="w-full">
        {/* Removed Tab Navigation */}

        <div className="space-y-16 max-w-7xl mx-auto">
          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <FaFolderOpen className="text-3xl text-portfolio-gold" />
              <h3 className="text-3xl font-bold dark:text-portfolio-text">Projects</h3>
            </div>
            <div>
              {/* Only show category buttons for dummy data */}
              {projectsFromDB.length === 0 && (
                <div className="flex justify-center gap-4 mb-8">
                  <button className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border ${projectCategory === 'Web/Apps' ? 'bg-portfolio-gold/80 text-portfolio-text border-portfolio-gold shadow-portfolio-gold/10 shadow-lg' : 'bg-portfolio-bg/60 text-portfolio-gold border-portfolio-border hover:bg-portfolio-gold/40 hover:text-portfolio-text'}`} onClick={() => setProjectCategory('Web/Apps')}>Web/Apps</button>
                  <button className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border ${projectCategory === 'UI/UX Design' ? 'bg-portfolio-gold/80 text-portfolio-text border-portfolio-gold shadow-portfolio-gold/10 shadow-lg' : 'bg-portfolio-bg/60 text-portfolio-gold border-portfolio-border hover:bg-portfolio-gold/40 hover:text-portfolio-text'}`} onClick={() => setProjectCategory('UI/UX Design')}>UI/UX Design</button>
                </div>
              )}

              {loadingProjects ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-gold"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((p, i) => (
                      <ProjectCard
                        key={p.id || i}
                        project={p}
                        onClick={setPreviewProject} // ✨ PASS HANDLER
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center text-portfolio-secondary py-12">
                      No projects available yet.
                      {projectsFromDB.length === 0 && (
                        <div className="mt-4 text-sm text-portfolio-gold">
                          Add some projects to see them here!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Certificates Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <FaCertificate className="text-3xl text-portfolio-gold" />
              <h3 className="text-3xl font-bold dark:text-portfolio-text">Certificates</h3>
            </div>
            <div className="space-y-8">
              {loadingCerts ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-gold-dark"></div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <AnimatePresence>
                      {activeCertificates.slice(0, visibleCertificatesCount).map((cert, i) => {
                        // Transform DB data to match CertificateCard props
                        const certData = cert.id ? {
                          // From database (has UUID id)
                          title: cert.title,
                          issuer: cert.issuer,
                          date: cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
                          link: cert.credential_url || '#',
                          image: cert.image_url || ''
                        } : cert; // From static data

                        return <CertificateCard key={cert.id || i} cert={certData} onClick={setPreviewCertificate} />;
                      })}
                    </AnimatePresence>
                  </div>
                  {activeCertificates.length > INITIAL_CERTIFICATES_TO_SHOW && (
                    <div className="flex justify-center mt-12">
                      {visibleCertificatesCount < activeCertificates.length ? (
                        <motion.button
                          onClick={handleShowMore}
                          className="group dark:bg-gradient-to-r from-portfolio-gold to-portfolio-gold-dark hover:from-portfolio-gold hover:to-portfolio-gold-dark bg-portfolio-gold hover:bg-portfolio-gold px-8 py-3 rounded-full text-portfolio-text font-semibold transition-all duration-300 shadow-lg hover:shadow-portfolio-gold/25"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Show More ({activeCertificates.length - visibleCertificatesCount} more)
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={handleShowLess}
                          className="group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 px-8 py-3 rounded-full text-portfolio-text font-semibold transition-all duration-300 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Show Less
                        </motion.button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <FaCode className="text-3xl text-portfolio-gold" />
              <h3 className="text-3xl font-bold dark:text-portfolio-text">Tech Stack</h3>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
              {Object.entries(techStack).map(([category, techs], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-portfolio-gold-light to-portfolio-gold capitalize mb-6 border-b border-portfolio-border/50 pb-2 drop-shadow-sm">{category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {techs.map((tech, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ delay: (index * 0.1) + (i * 0.05), type: "spring", stiffness: 200 }}
                        whileHover={{ y: -12, scale: 1.05 }}
                        className="group/tech relative overflow-hidden flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-portfolio-surface/60 backdrop-blur-md border border-portfolio-border/50 transition-all duration-300 hover:bg-portfolio-surface/80 hover:border-portfolio-gold/40 shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.4)] cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(212,175,55,0.4)_45%,rgba(255,255,255,0.6)_50%,rgba(212,175,55,0.4)_55%,transparent_80%)] bg-[length:200%_200%] opacity-0 group-hover/tech:opacity-100 group-hover/tech:animate-shimmer-sweep pointer-events-none mix-blend-color-dodge transition-opacity duration-300"></div>
                        <div className="relative z-10 text-4xl text-portfolio-secondary group-hover/tech:text-portfolio-gold transition-colors duration-300 drop-shadow-md">{tech.icon}</div>
                        <p className="relative z-10 text-sm text-gray-300 group-hover/tech:text-portfolio-gold-light transition-colors duration-300 font-medium">{tech.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {previewCertificate && (
          <CertificatePreviewModal
            certificate={previewCertificate}
            onClose={() => setPreviewCertificate(null)}
          />
        )}
        {/* ✨ Project Detail Modal */}
        {previewProject && (
          <ProjectDetailModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectSection;