import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaSun, FaMoon, FaCode } from 'react-icons/fa';
import { useNavbar } from '../contexts/NavbarContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { StaggeredMenu } from './StaggeredMenu';

const CLIP_PATH =
  'polygon(0 0, 100% 0, 100% 85%, 68% 85%, 64% 100%, 36% 100%, 32% 85%, 0 85%)';

const Header = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // REPLACED BY CONTEXT
  const [isScrolled, setIsScrolled] = useState(false);

  const { isNavbarVisible, hideNavbar, showNavbar, isMenuOpen, setIsMenuOpen } = useNavbar();
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to hash on location change if on home
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);


  // Improved Navigation Handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Update URL hash without reload
          window.history.pushState(null, '', href);
        }
      } else {
        navigate('/' + href);
      }
    } else {
      navigate(href);
    }
  };

  const NavLink = ({ href, children, isGallery }) => {
    // Check active state
    const isActive = isGallery
      ? location.pathname === '/gallery'
      : location.pathname === '/' && location.hash === href;

    return (
      <li>
        <a
          href={href}
          onClick={(e) => handleNavClick(e, href)}
          className={`relative block text-portfolio-text text-portfolio-secondary font-[Rubik] font-bold text-base tracking-wider py-2 transition-transform duration-300 hover:scale-110 group ${isActive ? 'text-portfolio-gold-light' : ''}`}
        >
          {children}
          <span className={`absolute bottom-1 left-0 block h-[2px] w-0 bg-portfolio-gold-dark transition-all duration-500 group-hover:w-full ${isActive ? 'w-full' : ''}`}></span>
        </a>
      </li>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isNavbarVisible && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50 pointer-events-none"
          >
            {/* Drop Shadow Gradient Animated */}
            {theme === 'dark' ? (
              <div
                className="pointer-events-none absolute left-0 right-0 z-10 transition-opacity duration-500"
                style={{
                  top: '0',
                  height: '85px',
                  WebkitClipPath: isMenuOpen ? 'none' : CLIP_PATH,
                  clipPath: isMenuOpen ? 'none' : CLIP_PATH,
                  background: 'linear-gradient(90deg, transparent, #A8841F, #D4AF37, #A8841F, transparent)',
                  backgroundSize: '300% 100%',
                  animation: 'gradientShadowMove 6s linear infinite',
                  opacity: isScrolled ? 0 : 1,
                  filter: 'drop-shadow(0 16px 24px rgba(212,175,55,0.15))',
                }}
              ></div>
            ) : (
              <div
                className="pointer-events-none absolute left-0 right-0 z-10 transition-opacity duration-500"
                style={{
                  top: '0',
                  height: '85px',
                  WebkitClipPath: isMenuOpen ? 'none' : CLIP_PATH,
                  clipPath: isMenuOpen ? 'none' : CLIP_PATH,
                  background: 'linear-gradient(90deg, transparent, #A8841F, #D4AF37, #A8841F, transparent)',
                  backgroundSize: '300% 100%',
                  animation: 'gradientShadowMove 6s linear infinite',
                  opacity: isScrolled ? 0 : 1,
                  filter: 'drop-shadow(0 8px 16px rgba(212,175,55,0.15))',
                }}
              ></div>
            )}

            {/* Navbar */}
            <header
              style={{
                WebkitClipPath: isMenuOpen ? 'none' : CLIP_PATH,
                clipPath: isMenuOpen ? 'none' : CLIP_PATH,
              }}
              className={`pt-3 ${isMenuOpen ? 'pb-0' : 'pb-5'} relative z-20 pointer-events-auto transition-all duration-300
                ${isScrolled || isMenuOpen ? "bg-portfolio-bg/90 bg-portfolio-surface/85 backdrop-blur-md border-b dark:border-white/10 border-portfolio-border shadow-sm" : "bg-portfolio-bg bg-portfolio-surface"}`}
            >
              {/* =========== REFACTORED NAVIGATION =========== */}
              <nav className="container mx-auto flex items-center justify-between flex-wrap pb-0 px-1">

                {/* --- MOBILE HEADER --- */}
                <div className="w-full flex items-center justify-between md:hidden">
                  {/* Mobile: Brand Logo & Text (Left) */}
                  <a href="/" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-portfolio-surface border border-portfolio-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                      <FaCode className="text-portfolio-gold text-xl md:text-2xl" />
                    </div>
                    <div>
                      <h1 className="font-moderniz text-sm text-portfolio-gold text-portfolio-text whitespace-nowrap">Ayan Mujawar</h1>
                      <p className="font-moderniz text-[9px] text-portfolio-gold text-portfolio-secondary" style={{ textShadow: 'none' }}>
                        Let's see the awesome Experience
                      </p>
                    </div>
                  </a>
                  {/* Mobile: Hamburger Button (Right) */}
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-portfolio-gold text-portfolio-text text-3xl pointer-events-auto">
                    &#9776;
                  </button>
                </div>

                {/* --- DESKTOP HEADER --- */}
                <div className="hidden w-full md:grid grid-cols-3 items-center px-8 relative min-h-[48px]">
                  {/* Desktop: Left Navigation (Start) */}
                  <ul className="justify-self-start flex items-center list-none gap-8 lg:gap-10">
                    <NavLink href="#home">Home</NavLink>
                    <NavLink href="#projects">Project</NavLink>
                  </ul>

                  {/* Desktop: Center Logo & Text (Center) */}
                  <a
                    href="/"
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="justify-self-center flex items-center gap-3"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-portfolio-surface border border-portfolio-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow duration-300">
                      <FaCode className="text-portfolio-gold text-2xl" />
                    </div>
                    <div className="block">
                      <h1 className="font-moderniz text-base text-portfolio-gold text-portfolio-text">Ayan Mujawar</h1>
                      <p className="font-moderniz text-[10px] text-portfolio-gold text-portfolio-secondary" style={{ textShadow: 'none' }}>
                        Let's see the awesome Experience
                      </p>
                    </div>
                  </a>

                  {/* Desktop: Right Navigation & Admin Button (End) */}
                  <div className="justify-self-end flex items-center gap-4">
                    {/* Theme Toggle */}
                    {/* Theme Toggle Removed - Moved to FloatingToggle */}


                    <ul className="flex items-center list-none gap-8 lg:gap-10">
                      <NavLink href="#about">About</NavLink>
                      <NavLink href="#contact">Contact</NavLink>
                    </ul>

                  </div>
                </div>

              </nav>
            </header>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- STAGGERED MENU (MOVED OUTSIDE HEADER FOR PROPER FIXED POSITIONING) --- */}
      <StaggeredMenu
        isOpen={isMenuOpen}
        onMenuClose={() => setIsMenuOpen(false)}
        items={[
          { label: 'Home', link: '#home', onClick: (e) => handleNavClick(e, '#home') },
          { label: 'Project', link: '#projects', onClick: (e) => handleNavClick(e, '#projects') },
          { label: 'About', link: '#about', onClick: (e) => handleNavClick(e, '#about') },
          { label: 'Contact', link: '#contact', onClick: (e) => handleNavClick(e, '#contact') },
        ]}
        socialItems={[]}
        displaySocials={true}
        displayItemNumbering={true}
        colors={['#A8841F', '#D4AF37', '#E5C65A']} // Gold palette
        accentColor="#D4AF37"
      />

      <style>
        {`
          @keyframes gradientShadowMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }

          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
    </>
  );
};

export default Header;
