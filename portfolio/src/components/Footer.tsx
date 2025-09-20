import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  padding: 2rem 0;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterText = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  font-weight: 600;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Copyright = styled(motion.p)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Santosh Reddy
        </FooterText>
        
        <Copyright
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          © 2025 All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;