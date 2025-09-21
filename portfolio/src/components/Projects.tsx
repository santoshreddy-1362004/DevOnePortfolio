import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Eye, Code, Globe } from 'lucide-react';
import LazyImage from './LazyImage';
import project1Image from '../assets/project1.png';
import project2Image from '../assets/project2.png';
import project3Image from '../assets/project3.png';
import project4Image from '../assets/project4.png';
import project5Image from '../assets/project5.png';

const ProjectsContainer = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #0f0f23 100%);
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
`;

const FilterTabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterTab = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active 
    ? 'linear-gradient(45deg, #00ffff, #ff00ff)' 
    : 'transparent'};
  border: 2px solid ${props => props.active ? 'transparent' : '#00ffff'};
  color: ${props => props.active ? 'white' : '#00ffff'};
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(45deg, #00ffff, #ff00ff)' 
      : 'rgba(0, 255, 255, 0.1)'};
    transform: translateY(-2px);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(20, 20, 35, 0.8);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  /* Performance optimizations */
  will-change: transform, box-shadow;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  &:hover {
    transform: translateY(-10px) translateZ(0);
    box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
    border-color: rgba(0, 255, 255, 0.5);
  }

  /* Reduced animation on low-performance devices */
  .low-performance & {
    transition: none;
    
    &:hover {
      animation: none;
    }
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(45deg, #0a0a0f, #1a1a2e);
  border-radius: 15px 15px 0 0;
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  
  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const OverlayButton = styled(motion.button)`
  background: rgba(0, 255, 255, 0.2);
  border: 1px solid #00ffff;
  color: #00ffff;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 2rem;
`;

const ProjectCategory = styled.span`
  color: #ff00ff;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.5rem 0 1rem 0;
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(0, 255, 255, 0.1);
  color: #00ffff;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 255, 255, 0.3);
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00ffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Web App', 'AI/ML', 'Tools'];

  const projects = [
    {
      id: 1,
      title: 'Compound Interest Calculator',
      category: 'Web App',
      description: 'A comprehensive compound interest calculator built with React. Features interactive charts, multiple calculation modes, and beautiful UI for financial planning and investment analysis.',
      image: project1Image,
      technologies: ['React', 'JavaScript', 'Chart.js', 'CSS3', 'Vercel'],
      liveUrl: 'https://compound-intrest-omega.vercel.app/',
      githubUrl: 'https://github.com/santoshreddy-1362004/DevOnePortfolio',
      icon: <Globe size={16} />
    },
    {
      id: 2,
      title: 'Smart Delivery Route Optimizer',
      category: 'Web App',
      description: 'Intelligent delivery route optimization system using advanced algorithms. Reduces delivery time and costs with real-time tracking and dynamic route planning.',
      image: project2Image,
      technologies: ['React', 'Node.js', 'Maps API', 'Algorithm', 'Optimization'],
      liveUrl: 'https://smart-delivery-route-optimizer.vercel.app/',
      githubUrl: 'https://github.com/santoshreddy-1362004/DevOnePortfolio',
      icon: <Globe size={16} />
    },
    {
      id: 3,
      title: 'Weather App',
      category: 'Web App',
      description: 'Modern weather application with real-time weather data, 7-day forecast, interactive maps, and beautiful animations. Features location-based weather updates.',
      image: project3Image,
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Weather API', 'Geolocation'],
      liveUrl: 'https://santoshreddy-1362004.github.io/weatherapp/',
      githubUrl: 'https://github.com/santoshreddy-1362004/DevOnePortfolio',
      icon: <Globe size={16} />
    },
    {
      id: 4,
      title: 'Blog Management System',
      category: 'Web App',
      description: 'Full-featured blog platform with user authentication, rich text editor, comment system, and admin dashboard. Built with modern web technologies.',
      image: project4Image,
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Rich Editor'],
      liveUrl: 'https://github.com/santoshreddy-1362004/BlogProject',
      githubUrl: 'https://github.com/santoshreddy-1362004/BlogProject',
      icon: <Code size={16} />
    },
    {
      id: 5,
      title: 'AI Chatbot Assistant',
      category: 'AI/ML',
      description: 'Intelligent chatbot with natural language processing capabilities. Features context-aware responses, multi-language support, and seamless user experience.',
      image: project5Image,
      technologies: ['JavaScript', 'NLP', 'AI/ML', 'HTML5', 'CSS3', 'API Integration'],
      liveUrl: 'https://santoshreddy-1362004.github.io/chatbot/',
      githubUrl: 'https://github.com/santoshreddy-1362004/DevOnePortfolio',
      icon: <Globe size={16} />
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <ProjectsContainer id="projects">
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            My Projects
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A showcase of my latest work and creative projects
          </SectionSubtitle>
        </SectionHeader>

        <FilterTabs
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <FilterTab
              key={category}
              active={activeFilter === category}
              onClick={() => setActiveFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              {category}
            </FilterTab>
          ))}
        </FilterTabs>

        <ProjectsGrid>
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <ProjectImageContainer>
                  <LazyImage 
                    src={project.image} 
                    alt={project.title}
                    placeholder="Loading project image..."
                  />
                  <ProjectOverlay
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OverlayButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={20} />
                    </OverlayButton>
                    <OverlayButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                    </OverlayButton>
                  </ProjectOverlay>
                </ProjectImageContainer>

                <ProjectContent>
                  <ProjectCategory>{project.category}</ProjectCategory>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  
                  <TechStack>
                    {project.technologies.map((tech, techIndex) => (
                      <TechTag key={techIndex}>{tech}</TechTag>
                    ))}
                  </TechStack>

                  <ProjectLinks>
                    <ProjectLink
                      href={project.liveUrl}
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {project.icon}
                      Live Demo
                    </ProjectLink>
                    <ProjectLink
                      href={project.githubUrl}
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      Code
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </Container>
    </ProjectsContainer>
  );
};

export default Projects;