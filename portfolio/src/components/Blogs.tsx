import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Eye, ThumbsUp } from 'lucide-react';
import blog1Image from '../assets/blog1.png';
import blog2Image from '../assets/blog2.png';
import blog3Image from '../assets/blog3.png';

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.25); }
  50% { box-shadow: 0 0 25px rgba(0, 255, 255, 0.5), 0 0 35px rgba(0, 255, 255, 0.3); }
`;

const BlogsContainer = styled.section`
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

const BlogsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled(motion.article)`
  background: rgba(20, 20, 35, 0.8);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  will-change: transform, box-shadow;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  &:hover {
    transform: translateY(-10px) translateZ(0);
    box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
    border-color: rgba(0, 255, 255, 0.5);
  }

  .low-performance & {
    transition: none;
    
    &:hover {
      animation: none;
    }
  }
`;

const BlogImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(45deg, #0a0a0f, #1a1a2e);
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 2rem;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const BlogCategory = styled.span`
  background: rgba(0, 255, 255, 0.1);
  color: #00ffff;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 255, 255, 0.3);
  font-weight: 600;
`;

const BlogTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1rem 0;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const BlogStats = styled.div`
  display: flex;
  gap: 1rem;
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const ReadMoreButton = styled(motion.button)`
  background: transparent;
  border: 1px solid rgba(0, 255, 255, 0.3);
  color: #00ffff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(45deg, #ff00ff, #ffff00);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 10;
`;

const Blogs: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'DevOps', 'Docker', 'Azure'];

  const blogs = [
    {
      id: 1,
      title: 'Unlocking the Power of DevOps: A Beginner\'s Guide',
      category: 'DevOps',
      excerpt: 'A comprehensive beginner\'s guide to DevOps principles, practices, and tools. Learn how DevOps transforms software development and operations for better collaboration and faster delivery.',
      image: blog1Image,
      date: '2025-01-15',
      readTime: '8 min read',
      views: '2.3k',
      likes: '145',
      featured: true,
      tags: ['DevOps', 'CI/CD', 'Automation'],
      url: 'https://devops-guide.hashnode.dev/unlocking-the-power-of-devops-a-beginners-guide'
    },
    {
      id: 2,
      title: 'Mastering Docker: From Zero to Hero - A Complete Guide',
      category: 'Docker',
      excerpt: 'Master Docker containerization from basics to advanced concepts. Learn container management, Docker Compose, networking, and best practices for production deployments.',
      image: blog2Image,
      date: '2025-01-10',
      readTime: '12 min read',
      views: '3.1k',
      likes: '289',
      featured: true,
      tags: ['Docker', 'Containers', 'DevOps'],
      url: 'https://mastering-docker-from-zero-to-hero.hashnode.dev/mastering-docker-from-zero-to-hero-a-complete-guide'
    },
    {
      id: 3,
      title: 'My First DevOps Project: Dockerizing a Mario Game on Azure VM',
      category: 'Azure',
      excerpt: 'Step-by-step guide to my first DevOps project where I dockerized a classic Mario game and deployed it on an Azure Virtual Machine. Perfect for beginners starting their DevOps journey.',
      image: blog3Image,
      date: '2025-01-05',
      readTime: '10 min read',
      views: '1.8k',
      likes: '156',
      featured: true,
      tags: ['Azure', 'Docker', 'Gaming', 'Project'],
      url: 'https://devopsproject1.hashnode.dev/my-first-devops-project-dockerizing-a-mario-game-on-azure-vm'
    }
  ];

  const filteredBlogs = activeFilter === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === activeFilter);

  return (
    <BlogsContainer id="blogs">
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Technical Blogs
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Sharing insights on cloud architecture, DevOps practices, and modern development
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

        <BlogsGrid>
          <AnimatePresence mode="wait">
            {filteredBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => window.open(blog.url, '_blank')}
              >
                {blog.featured && <FeaturedBadge>Featured</FeaturedBadge>}
                
                <BlogImageContainer>
                  <BlogImage src={blog.image} alt={blog.title} />
                </BlogImageContainer>

                <BlogContent>
                  <BlogMeta>
                    <MetaItem>
                      <Calendar size={14} />
                      {new Date(blog.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </MetaItem>
                    <MetaItem>
                      <Clock size={14} />
                      {blog.readTime}
                    </MetaItem>
                    <BlogCategory>{blog.category}</BlogCategory>
                  </BlogMeta>

                  <BlogTitle>{blog.title}</BlogTitle>
                  <BlogExcerpt>{blog.excerpt}</BlogExcerpt>

                  <BlogFooter>
                    <BlogStats>
                      <StatItem>
                        <Eye size={14} />
                        {blog.views}
                      </StatItem>
                      <StatItem>
                        <ThumbsUp size={14} />
                        {blog.likes}
                      </StatItem>
                    </BlogStats>

                    <ReadMoreButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More
                      <ArrowRight size={14} />
                    </ReadMoreButton>
                  </BlogFooter>
                </BlogContent>
              </BlogCard>
            ))}
          </AnimatePresence>
        </BlogsGrid>
      </Container>
    </BlogsContainer>
  );
};

export default Blogs;