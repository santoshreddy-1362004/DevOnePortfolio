import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Server } from 'lucide-react';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const SkillsContainer = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SkillCategory = styled(motion.div)`
  background: rgba(20, 20, 35, 0.8);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
    border-color: rgba(0, 255, 255, 0.5);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const CategoryTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkillItem = styled(motion.div)`
  position: relative;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  flex: 1;
`;

const SkillLevel = styled.span`
  color: #00ffff;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)<{ level: number }>`
  height: 100%;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  border-radius: 4px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const TechCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const TechBadge = styled(motion.div)`
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 25px;
  padding: 0.8rem 1.5rem;
  color: #00ffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.2);
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(20, 20, 35, 0.8);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
  }
`;

const StatNumber = styled(motion.div)`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 600;
`;

const Skills: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    awards: 0
  });

  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Code size={24} />,
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Vue.js', level: 85 },
        { name: 'HTML/CSS', level: 98 },
        { name: 'Tailwind CSS', level: 92 },
      ]
    },
    {
      title: 'Backend',
      icon: <Server size={24} />,
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 88 },
        { name: 'Java', level: 82 },
        { name: 'GraphQL', level: 85 },
        { name: 'REST APIs', level: 95 },
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: <Globe size={24} />,
      skills: [
        { name: 'AWS', level: 92 },
        { name: 'Docker', level: 90 },
        { name: 'Kubernetes', level: 85 },
        { name: 'CI/CD', level: 88 },
        { name: 'Terraform', level: 82 },
      ]
    },
    {
      title: 'Database',
      icon: <Database size={24} />,
      skills: [
        { name: 'MongoDB', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'Redis', level: 80 },
        { name: 'DynamoDB', level: 88 },
        { name: 'MySQL', level: 82 },
      ]
    }
  ];

  const technologies = [
    'React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL',
    'Docker', 'AWS', 'Kubernetes', 'GraphQL', 'Redux', 'Next.js', 'Vue.js',
    'Express', 'FastAPI', 'Tailwind', 'Framer Motion', 'Three.js', 'Terraform',
    'Jenkins', 'Git', 'Linux', 'Microservices', 'Serverless', 'Lambda'
  ];

  const stats = [
    { number: 50, label: 'Projects Completed', key: 'projects' },
    { number: 3, label: 'Years Experience', key: 'experience' },
    { number: 25, label: 'Happy Clients', key: 'clients' },
    { number: 8, label: 'Awards Won', key: 'awards' }
  ];

  useEffect(() => {
    const animateStats = () => {
      stats.forEach((stat) => {
        let current = 0;
        const increment = stat.number / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.number) {
            current = stat.number;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({
            ...prev,
            [stat.key]: Math.floor(current)
          }));
        }, 30);
      });
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SkillsContainer id="skills">
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Crafting digital solutions with cutting-edge technologies
          </SectionSubtitle>
        </SectionHeader>

        <SkillsGrid>
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <CategoryHeader>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryHeader>

              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * skillIndex }}
                    viewport={{ once: true }}
                  >
                    <SkillHeader>
                      <SkillName>{skill.name}</SkillName>
                      <SkillLevel>{skill.level}%</SkillLevel>
                    </SkillHeader>
                    <ProgressBar>
                      <ProgressFill
                        level={skill.level}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 * skillIndex }}
                        viewport={{ once: true }}
                      />
                    </ProgressBar>
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>

        <TechCloud>
          {technologies.map((tech, index) => (
            <TechBadge
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.95 }}
            >
              {tech}
            </TechBadge>
          ))}
        </TechCloud>

        <Stats>
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <StatNumber
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
              >
                {animatedStats[stat.key as keyof typeof animatedStats]}+
              </StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </Stats>
      </Container>
    </SkillsContainer>
  );
};

export default Skills;