import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import Background3D from './Background3D';
import profileImage from '../assets/profile.png';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const textGlow = keyframes`
  0%, 100% { text-shadow: 0 0 15px rgba(0, 255, 255, 0.4); }
  50% { text-shadow: 0 0 25px rgba(0, 255, 255, 0.6), 0 0 35px rgba(0, 255, 255, 0.4); }
`;

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
  overflow: hidden;
  padding-top: 120px; /* Increased padding to move profile pic down */
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 10;
  max-width: 1200px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 3rem;
    align-items: center;
  }
`;

const ProfileImageContainer = styled(motion.div)`
  position: relative;
  z-index: 15;
`;

const ProfileImage = styled(motion.img)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid transparent;
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
  background-clip: padding-box;
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.3),
    0 0 60px rgba(255, 0, 255, 0.2),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  
  @media (min-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const ProfileGlow = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
  opacity: 0.3;
  filter: blur(20px);
  animation: ${pulse} 3s ease-in-out infinite;
  z-index: -1;
`;

const TextContent = styled.div`
  flex: 1;
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Greeting = styled(motion.h2)`
  font-size: 1.5rem;
  color: #00ffff;
  margin-bottom: 1rem;
  font-weight: 300;
  letter-spacing: 2px;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin: 1rem 0;
  background: linear-gradient(45deg, #ffffff, #00ffff, #ff00ff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${textGlow} 4s ease-in-out infinite;
  /* Performance optimizations */
  will-change: text-shadow;
  transform: translateZ(0);
`;

const TypewriterContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;

const TypewriterText = styled(motion.h3)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #ff00ff;
  font-weight: 600;
  min-height: 3rem;
  display: flex;
  align-items: center;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 3px;
  height: 1.2em;
  background-color: #00ffff;
  margin-left: 5px;
  animation: ${pulse} 1s infinite;
`;

const Description = styled(motion.p)`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 2rem auto;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 3rem 0;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  border: none;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #00ffff;
  color: #00ffff;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 50%;
  color: #00ffff;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.2);
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
  }
`;



const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    'Full Stack Developer',
    'Cloud Solutions Architect',
    'DevOps Engineer',
    'Problem Solver',
    'Tech Innovator'
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(current.substring(0, currentText.length + 1));
        
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 1000); // Faster pause between words
        }
      } else {
        setCurrentText(current.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100); // Much faster typing speed

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer id="home">
      <Background3D />
      
      <HeroContent>
        <ProfileSection>
          <ProfileImageContainer
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <ProfileGlow />
            <ProfileImage
              src={profileImage}
              alt="Santosh Reddy"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </ProfileImageContainer>

          <TextContent>
            <Greeting
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hello, I'm
            </Greeting>

            <MainTitle
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Santosh Reddy
            </MainTitle>

            <TypewriterContainer>
              <TypewriterText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {currentText}
                <Cursor />
              </TypewriterText>
            </TypewriterContainer>
          </TextContent>
        </ProfileSection>

        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Passionate cloud-native developer specializing in scalable solutions with AWS, Docker, and Kubernetes. 
          I transform complex infrastructure challenges into elegant, automated solutions while sharing insights through technical blogs.
        </Description>

        <ButtonGroup
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <PrimaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
          >
            View My Work
          </PrimaryButton>

          <SecondaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
            <Download size={20} />
          </SecondaryButton>
        </ButtonGroup>

        <SocialLinks
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <SocialLink
            href="https://github.com/santoshreddy-1362004/DevOnePortfolio"
            target="_blank"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github size={24} />
          </SocialLink>

          <SocialLink
            href="https://www.linkedin.com/in/santosh-reddy-95a342283"
            target="_blank"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin size={24} />
          </SocialLink>

          <SocialLink
            href="mailto:santosh1362004@gmail.com"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mail size={24} />
          </SocialLink>
        </SocialLinks>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;