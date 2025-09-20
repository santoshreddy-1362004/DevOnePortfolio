import { useEffect } from 'react';

// Smooth scroll utility with performance optimizations
export const useSmoothScroll = () => {
  useEffect(() => {
    // Check if browser supports smooth scrolling
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    
    if (!supportsNativeSmoothScroll) {
      // Polyfill for smooth scrolling with optimized performance
      const smoothScrollTo = (targetY: number, duration: number = 600) => { // Faster duration
        const startY = window.pageYOffset;
        const difference = targetY - startY;
        const startTime = performance.now();

        const step = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
          
          window.scrollTo(0, startY + difference * ease);
          
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        
        requestAnimationFrame(step);
      };

      // Override default anchor clicking behavior
      const handleAnchorClick = (e: Event) => {
        const target = e.target as HTMLAnchorElement;
        const href = target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
            smoothScrollTo(offsetTop - 80); // Account for fixed header
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);
      
      return () => {
        document.removeEventListener('click', handleAnchorClick);
      };
    }
  }, []);
};

// Performance monitor hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Optimize based on FPS
        if (fps < 30) {
          // Reduce animation quality for better performance
          document.body.classList.add('low-performance');
        } else {
          document.body.classList.remove('low-performance');
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }, []);
};

// Intersection Observer for lazy loading
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);
};

// Debounce utility for performance
export const useDebounce = (callback: Function, delay: number) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const debouncedCallback = (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(...args), delay);
    };

    // Return the debounced function for use
    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
};