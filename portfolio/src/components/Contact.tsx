import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
  50% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const ContactContainer = styled.section`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoCard = styled(motion.div)`
  background: rgba(20, 20, 35, 0.8);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 255, 255, 0.2);
    border-color: rgba(0, 255, 255, 0.5);
  }
`;

const InfoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  animation: ${float} 3s ease-in-out infinite;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const ContactForm = styled(motion.form)`
  background: rgba(20, 20, 35, 0.8);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(0, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(0, 255, 255, 0.5);
    animation: ${glow} 2s ease-in-out infinite;
  }
`;

const FormTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 2rem;
`;

const FormLabel = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
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
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SocialSection = styled(motion.div)`
  text-align: center;
  margin-top: 4rem;
`;

const SocialTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
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

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email Me',
      content: 'santosh1362004@gmail.com\nQuick response guaranteed'
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Me',
      content: '+91 98765 43210\nMon-Fri 9AM-6PM IST'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      content: 'Hyderabad, India\nAvailable for remote work'
    }
  ];

  const socialLinks = [
    { icon: <Github size={24} />, url: 'https://github.com/santoshreddy-1362004/DevOnePortfolio', label: 'GitHub' },
    { icon: <Linkedin size={24} />, url: 'https://www.linkedin.com/in/santosh-reddy-95a342283', label: 'LinkedIn' },
    { icon: <Twitter size={24} />, url: 'https://x.com/SantoshSan2587', label: 'Twitter' },
    { icon: <Instagram size={24} />, url: 'https://instagram.com/santoshreddy', label: 'Instagram' }
  ];

  return (
    <ContactContainer id="contact">
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let's Connect
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to start your next project? Let's create something amazing together!
          </SectionSubtitle>
        </SectionHeader>

        <ContactContent>
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <InfoCard
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <InfoIcon>{info.icon}</InfoIcon>
                <InfoContent>
                  <InfoTitle>{info.title}</InfoTitle>
                  <InfoText>{info.content}</InfoText>
                </InfoContent>
              </InfoCard>
            ))}
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
          >
            <FormTitle>Send Message</FormTitle>
            
            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </FormGroup>

            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="santosh1362004@gmail.com"
                required
              />
            </FormGroup>

            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormInput
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
                required
              />
            </FormGroup>

            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <FormLabel htmlFor="message">Message</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project or ideas..."
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send size={20} />
                  </motion.div>
                  Sending...
                </>
              ) : isSubmitted ? (
                'Message Sent! ✓'
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </SubmitButton>
          </ContactForm>
        </ContactContent>

        <SocialSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <SocialTitle>Connect on Social Media</SocialTitle>
          <SocialLinks>
            {socialLinks.map((social, index) => (
              <SocialLink
                key={social.label}
                href={social.url}
                target="_blank"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </SocialLink>
            ))}
          </SocialLinks>
        </SocialSection>
      </Container>
    </ContactContainer>
  );
};

export default Contact;