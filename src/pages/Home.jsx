import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaDownload, FaBriefcase, FaCode, FaCertificate, FaGlobe, FaArrowRight, FaCube } from 'react-icons/fa';
import Spline from '@splinetool/react-spline';
import GradientText from '../components/GradientText';
import TextGenerateEffect from "../components/text-generate-effect";
import Skills from '../components/Skills';
import Lanyard from '../components/Lanyard/Lanyard';
import { VelocityScroll } from '../components/VelocityScroll';
import { ButtonMovingBorder } from '../components/MovingBorderButton';
import ProjectSection from '../components/ProjectSection';
import Contact from '../components/Contact';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
    const { theme } = useTheme();

    // Force page to start at the top and clear URL hashes after preloader finishes
    useEffect(() => {
        window.scrollTo(0, 0);
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, []);

    const [is3dEnabled, setIs3dEnabled] = useState(() => {
        if (typeof window !== 'undefined') {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isSmallScreen = window.innerWidth < 1024;
            return !isMobile && !isSmallScreen;
        }
        return true;
    });



    const stats = [
        { icon: <FaCode />, value: "3+", title: "TOTAL PROJECTS", description: "Innovative web solutions crafted" , targetId: "projects" },
        { icon: <FaCertificate />, value: "3+", title: "CERTIFICATES", description: "Professional skills validated" , targetId: "certificates" },
        { icon: <FaGlobe />, value: "6", title: "MONTHS EXPERIENCE", description: "Continuous learning journey" , targetId: "contact" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 px-8 max-w-7xl mx-auto"
        >


            <section id="home" className="flex flex-col md:flex-row items-center gap-10 pt-24 sm:pt-32 pb-16 lg:pt-0 lg:pb-20">
                <div className="flex-1 dark:text-portfolio-text space-y-6 pt-16 md:pt-40 order-last md:order-none text-center md:text-left flex flex-col items-center md:items-start">
                    <motion.h1
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                        className="text-4xl md:text-4xl font-moderniz font-bold leading-tight select-none main-heading"
                        style={{
                            color: theme === 'dark' ? "#D4AF37" : "#080808"
                        }}
                    >
                        WELCOME TO MY
                        <span style={{ display: 'block', marginTop: '0.4em' }}>PORTFOLIO</span>
                    </motion.h1>
                    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}>
                        <GradientText colors={["#D4AF37", "#E5C65A", "#F5F5F5", "#D4AF37", "#A8841F"]} animationSpeed={3} className="custom-class font-cascadia font-bold" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}>
                        <TextGenerateEffect words={'I craft responsive and visually engaging websites using React, Tailwind CSS, and modern web technologies.'} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}>
                        <Skills />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }} className="flex flex-row gap-4 mt-8">
                        <a href="https://github.com/Ayan-2904" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-portfolio-border bg-portfolio-surface/[0.8] bg-portfolio-surface text-portfolio-secondary text-portfolio-text transition-all duration-300 hover:border-portfolio-gold hover:bg-portfolio-surface hover:bg-portfolio-bg hover:shadow-md dark:hover:shadow-[0_0_24px_2px_rgba(212,175,55,0.15)]">
                            <FaGithub className="h-6 w-6 text-portfolio-secondary transition-all duration-300 group-hover:text-portfolio-gold-dark dark:group-hover:text-portfolio-gold" />
                          </a>
                        <a href="https://www.linkedin.com/in/ayan-mujawar-558411256/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-portfolio-border bg-portfolio-surface/[0.8] bg-portfolio-surface text-portfolio-secondary text-portfolio-text transition-all duration-300 hover:border-portfolio-gold hover:bg-portfolio-surface hover:bg-portfolio-bg hover:shadow-md dark:hover:shadow-[0_0_24px_2px_rgba(212,175,55,0.15)]">
                            <FaLinkedin className="h-6 w-6 text-portfolio-secondary transition-all duration-300 group-hover:text-portfolio-gold-dark dark:group-hover:text-portfolio-gold" />
                          </a>
                    </motion.div>
                </div>

                {/* 3. Render Lanyard secara kondisional */}
                <div className="hidden lg:flex flex-1 justify-center h-[600px] w-full order-first lg:order-none">
                    {is3dEnabled && (
                        <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} fov={18} transparent={true} />
                    )}
                </div>
            </section>

            <section
                id="about"
                className="py-12 md:py-18 gap-0 w-full mx-0 pt-20"
                style={{ width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}
            >
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center">
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-20">
                        <VelocityScroll defaultVelocity={3} numRows={1} className="max-w-full">
                            <span className="font-moderniz font-bold" style={{ fontSize: "2.5rem", lineHeight: "1.1", color: theme === 'dark' ? "#D4AF37" : "#A8841F", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", filter: theme === 'dark' ? 'none' : 'none', opacity: theme === 'dark' ? 1 : 0.3 }}>
                                ABOUT <span style={{ color: theme === 'dark' ? "#F5F5F5" : "#A8841F" }}>ME</span>
                            </span>
                        </VelocityScroll>
                        <div className={`pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r ${theme === 'dark' ? 'from-portfolio-bg' : 'from-slate-50'}`}></div>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l ${theme === 'dark' ? 'from-portfolio-bg' : 'from-slate-50'}`}></div>
                        <VelocityScroll defaultVelocity={-3} numRows={1} className="max-w-full">
                            <span className="font-moderniz font-bold" style={{ fontSize: "2.5rem", lineHeight: "1.1", color: theme === 'dark' ? "#D4AF37" : "#A8841F", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", filter: theme === 'dark' ? 'none' : 'none', opacity: theme === 'dark' ? 1 : 0.3 }}>
                                ABOUT <span style={{ color: theme === 'dark' ? "#F5F5F5" : "#A8841F" }}>ME</span>
                            </span>
                        </VelocityScroll>
                    </div>
                    <p className="text-lg text-portfolio-gold-light/70 text-portfolio-secondary mt-2 font-cascadia px-1 mb-20">
                        ✧ Passionate about coding and creative technology ✧
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center">
                    {is3dEnabled && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                            className="md:w-1/3 flex justify-center"
                        >
                            <div className="w-full h-[420px] md:h-[530px] flex items-center justify-center">
                                <Spline scene="https://prod.spline.design/FcZ66SFMX1YbF-0I/scene.splinecode" />
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className={`dark:text-portfolio-text text-center md:text-left px-4 md:px-8 transition-all duration-700 ${is3dEnabled ? 'md:w-1/2' : 'md:w-2/3'}`}
                    >
                        <p className="text-2xl dark:text-portfolio-secondary font-moderniz my">Hello, I'm</p>
                        <h3 className="text-4xl font-bold dark:text-portfolio-text my-2 font-moderniz">Ayan Mujawar</h3>
                        <p className="dark:text-portfolio-text/80 text-portfolio-secondary leading-relaxed mt-4 font-cascadia text-justify">
                            I am a passionate Full Stack Developer and UI/UX Designer and a recent B.Tech graduate in Data Science from KIT's College of Engineering. With past internship experience at New Binary Solutions, I specialize in crafting beautiful user interfaces, building scalable web applications, and integrating AI to solve real-world problems.
                        </p>
                        <div className="my-6 bg-portfolio-surface/50 bg-portfolio-surface border-l-4 border-portfolio-gold-dark p-4 rounded-r-lg italic text-portfolio-text/70 text-portfolio-secondary font-cascadia dark:shadow-none shadow-md">
                            "Whoever strives shall succeed."
                        </div>
                        <div className="flex flex-row sm:flex-row gap-4 mt-8 justify-center md:justify-start items-center">
                            <ButtonMovingBorder as="a" href="/cv.pdf" download duration={3000} borderRadius="0.75rem" className="bg-portfolio-surface/[0.8] bg-portfolio-surface border border-portfolio-border text-portfolio-text font-semibold flex items-center justify-center gap-2 transition-all duration-300 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-[0_0_24px_8px_rgba(212,175,55,0.15)]">
                                <FaDownload /> Download CV
                            </ButtonMovingBorder>
                            <ButtonMovingBorder as="a" href="#projects" duration={3000} borderRadius="0.75rem" className="bg-portfolio-surface/[0.8] bg-portfolio-surface border border-portfolio-border text-portfolio-text font-semibold flex items-center justify-center gap-2 transition-all duration-300 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-[0_0_24px_8px_rgba(212,175,55,0.15)]">
                                <FaBriefcase /> View Projects
                            </ButtonMovingBorder>
                        </div>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mt-10 px-4 md:px-0">
                    {stats.map((stat, index) => (
                        <a href={`#${stat.targetId}`} onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(stat.targetId);
                            if (el) {
                                el.scrollIntoView({ behavior: 'smooth' });
                                window.history.pushState(null, '', '#' + stat.targetId);
                                window.dispatchEvent(new Event('hashchange'));
                            }
                        }} key={index} className="group relative p-6 rounded-2xl bg-portfolio-surface/90 bg-portfolio-surface border border-portfolio-border/50 border-portfolio-border dark:shadow-none shadow-lg transition-all duration-300 hover:border-portfolio-gold/50 hover:shadow-xl dark:hover:shadow-[0_0_24px_0px_rgba(212,175,55,0.15)] cursor-pointer block">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <div className="p-3 mb-4 rounded-full bg-portfolio-bg/80 bg-portfolio-surface border border-portfolio-border/60 border-portfolio-border w-max dark:group-hover:bg-portfolio-gold-dark/20 group-hover:bg-portfolio-gold-light/20 group-hover:border-portfolio-gold transition-all duration-300">
                                        <div className="text-2xl text-portfolio-secondary group-hover:text-portfolio-gold-dark dark:group-hover:text-portfolio-gold transition-colors duration-300">{stat.icon}</div>
                                    </div>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-portfolio-secondary group-hover:text-portfolio-gold-dark dark:group-hover:text-portfolio-text transition-colors duration-300">{stat.title}</h3>
                                    <p className="text-xs text-portfolio-secondary mt-1">{stat.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-5xl font-bold text-portfolio-text transition-all duration-300 group-hover:text-portfolio-gold-dark dark:group-hover:text-portfolio-gold">{stat.value}</p>
                                    <FaArrowRight className="text-portfolio-secondary mt-auto group-hover:text-portfolio-gold transition-all duration-300 -rotate-45" />
                                </div>
                            </div>
                        </a>
                    ))}
                </motion.div>
            </section>

            <section id="projects" className="md:py-18 relative">
                <div id="certificates" className="absolute -top-20"></div>
                <ProjectSection />
            </section>

            <section id="contact" className="py-20 pb-16">
                <Contact />
            </section>

            <footer className="py-12 pb-16 text-center text-portfolio-secondary">
                <div className="text-sm">&copy; {new Date().getFullYear()} Ayan Mujawar. All rights reserved.</div>
                <div className="text-xs mt-2">Built with <span className="text-portfolio-gold">&hearts;</span> using React, Tailwind CSS, and Framer Motion.</div>
            </footer>
        </motion.div>
    );
};

export default Home;
