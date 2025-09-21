import React, { useState, useEffect } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
  50% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6); }
`;

const NavContainer = styled(motion.nav)<{ theme: any }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: ${props => props.theme.surfaceVariant};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${glow} 2s ease-in-out infinite;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)<{ theme: any }>`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
    background: ${props => props.theme.primary}20;
    box-shadow: 0 0 15px ${props => props.theme.primary}30;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, ${props => props.theme.primary}, ${props => props.theme.secondary});
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled(motion.button)<{ theme: any }>`
  background: ${props => props.theme.primary}20;
  border: 1px solid ${props => props.theme.border};
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary}30;
    box-shadow: 0 0 20px ${props => props.theme.primary}40;
    transform: scale(1.1);
  }
`;

const MobileMenuButton = styled(motion.button)<{ theme: any }>`
  display: none;
  background: transparent;
  border: none;
  color: ${props => props.theme.primary};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)<{ theme: any }>`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: ${props => props.theme.surfaceVariant};
  backdrop-filter: blur(15px);
  padding: 2rem;
  border-bottom: 1px solid ${props => props.theme.border};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(motion.a)<{ theme: any }>`
  display: block;
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 500;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
    padding-left: 1rem;
  }
`;

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = useTheme() as any;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <NavContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          background: isScrolled 
            ? `${theme.surfaceVariant}f0` 
            : theme.surfaceVariant,
        }}
      >
        <NavContent>
          <Logo
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => scrollToSection('#home')}
          >
            &lt;DevOne/&gt;
          </Logo>

          <NavLinks>
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </NavLink>
            ))}
            
            <ThemeToggle
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={toggleTheme}
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </ThemeToggle>
          </NavLinks>

          <MobileMenuButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <MobileNavLink
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                {item.name}
              </MobileNavLink>
            ))}
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              paddingTop: '1rem',
              borderTop: `1px solid ${theme.border}`,
              marginTop: '1rem'
            }}>
              <ThemeToggle
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={toggleTheme}
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </ThemeToggle>
            </div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;