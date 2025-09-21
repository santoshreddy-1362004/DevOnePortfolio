import { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Performance hooks
import { useSmoothScroll, usePerformanceMonitor } from './hooks/usePerformance';

// Global Styles
const GlobalStyle = createGlobalStyle<{ theme: any }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    /* Optimize scroll performance */
    overflow-x: hidden;
    /* Force hardware acceleration for smooth scrolling */
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    overflow-x: hidden;
    /* Optimize rendering performance */
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    will-change: scroll-position;
    /* Enable GPU acceleration for scrolling */
    -webkit-overflow-scrolling: touch;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Optimize scrollbar performance */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(10, 10, 15, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #ff00ff, #00ffff);
  }

  /* Performance optimizations for animations */
  * {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  /* Optimize composite layers */
  .will-change-transform {
    will-change: transform;
  }

  .will-change-opacity {
    will-change: opacity;
  }

  /* Smooth scrolling with hardware acceleration */
  @supports (scroll-behavior: smooth) {
    html {
      scroll-behavior: smooth;
    }
  }

  /* Performance optimizations for low-end devices */
  .low-performance * {
    animation-duration: 0.1s !important;
    transition-duration: 0.1s !important;
  }

  .low-performance .custom-cursor {
    display: none !important;
  }

  /* Reduce motion for accessibility and performance */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
  /* Performance optimizations */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: scroll-position;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

// Theme configuration
const darkTheme = {
  background: '#0a0a0f',
  primary: '#00ffff',
  secondary: '#ff00ff',
  accent: '#ffff00',
  surface: '#1a1a2e',
  surfaceVariant: 'rgba(20, 20, 35, 0.8)',
  text: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.8)',
  textMuted: 'rgba(255, 255, 255, 0.6)',
  border: 'rgba(0, 255, 255, 0.2)',
  borderHover: 'rgba(0, 255, 255, 0.5)',
  shadow: 'rgba(0, 255, 255, 0.2)',
  gradient: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
};

const lightTheme = {
  background: '#ffffff',
  primary: '#0066cc',
  secondary: '#9933cc',
  accent: '#ff6600',
  surface: '#f8f9fa',
  surfaceVariant: 'rgba(248, 249, 250, 0.9)',
  text: '#1a1a1a',
  textSecondary: 'rgba(26, 26, 26, 0.8)',
  textMuted: 'rgba(26, 26, 26, 0.6)',
  border: 'rgba(0, 102, 204, 0.2)',
  borderHover: 'rgba(0, 102, 204, 0.5)',
  shadow: 'rgba(0, 102, 204, 0.15)',
  gradient: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)',
};

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Initialize performance optimizations
  useSmoothScroll();
  usePerformanceMonitor();

  // Get current theme
  const currentTheme = isDark ? darkTheme : lightTheme;

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    // Initialize AOS with optimized settings for performance
    AOS.init({
      duration: 800, // Reduced duration for snappier animations
      once: true,
      easing: 'ease-out-quart',
      offset: 50, // Reduced offset for earlier triggers
      delay: 0,
      disable: 'mobile', // Disable on mobile for better performance
    });

    // Optimize scroll performance with throttling
    let ticking = false;
    
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll optimization logic here
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll event listener with passive option
    window.addEventListener('scroll', optimizeScroll, { passive: true });

    // Add custom cursor effect with optimized performance
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 16px;
      height: 16px;
      background: radial-gradient(circle, rgba(0,255,255,0.6) 0%, rgba(255,0,255,0.3) 50%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease;
      will-change: transform;
    `;
    document.body.appendChild(cursor);

    let animationId: number;
    const moveCursor = (e: MouseEvent) => {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
      });
    };

    document.addEventListener('mousemove', moveCursor, { passive: true });

    return () => {
      window.removeEventListener('scroll', optimizeScroll);
      document.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(animationId);
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      AOS.refresh();
    };
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle theme={currentTheme} />
      <AppContainer>
        <Navigation isDark={isDark} toggleTheme={toggleTheme} />
        <Hero />
        <Projects />
        <Skills />
        <Blogs />
        <Contact />
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
