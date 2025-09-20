import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const LazyImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, #0a0a0f, #1a1a2e);
`;

const Image = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${props => props.loaded ? 1 : 0};
  transform: ${props => props.loaded ? 'scale(1)' : 'scale(1.1)'};
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #0a0a0f, #1a1a2e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className,
  placeholder = "Loading..." 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <LazyImageContainer ref={containerRef} className={className}>
      {inView && (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          loaded={loaded}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      )}
      {!loaded && <Placeholder>{placeholder}</Placeholder>}
    </LazyImageContainer>
  );
};

export default LazyImage;