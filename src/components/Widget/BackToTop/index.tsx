'use client'

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MotionButton } from '@/lib/motion';
import { ChevronFirst } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 100) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionButton
          initial={{ opacity: 0, y: 50, x: '-50%' }} 
          animate={{ opacity: 1, y: 0, x: '-50%' }} 
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-1/2 z-50 bg-white/50 text-gray-800/50 hover:bg-white hover:text-gray-800 p-2 rounded-full shadow-xl flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronFirst className='size-7 rotate-90' />
        </MotionButton>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;