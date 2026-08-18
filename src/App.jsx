import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Squares from './components/Squares';
import { NavbarProvider } from './contexts/NavbarContext';
import { useTheme } from './contexts/ThemeContext';

// Pages
import Home from './pages/Home';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <NavbarProvider>
        <div className="relative min-h-screen bg-portfolio-bg bg-portfolio-surface transition-colors duration-500 overflow-hidden">
          {/* Global Background Animation */}
          <div className="fixed inset-0 z-0">
            <Squares
              speed={0.2}
              squareSize={35}
              direction="diagonal"
              borderColor={theme === 'dark' ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.05)"}
              hoverFillColor={theme === 'dark' ? "rgba(212, 175, 55, 0.18)" : "rgba(8, 145, 178, 0.1)"}
              gradientColorStart={theme === 'dark' ? "#080808" : "#080808"}
              gradientColorEnd={theme === 'dark' ? "#121212" : "#121212"}
            />
          </div>

          <Header />

          {/* Page Routing with Transitions */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
            </Routes>
          </AnimatePresence>

        </div>
      </NavbarProvider>
  );
}

export default App;