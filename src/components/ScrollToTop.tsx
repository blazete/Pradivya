import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group bg-gradient-to-br from-pradivya-primary to-pradivya-accent hover:from-pradivya-primary/90 hover:to-pradivya-accent/90 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-white/20"
          aria-label="Scroll to top"
        >
          <div className="relative">
            <ChevronUp 
              size={24} 
              className="transition-transform duration-300 group-hover:-translate-y-1" 
            />
            
            {/* Animated ring effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pradivya-accent to-pradivya-primary opacity-0 group-hover:opacity-20 scale-150 group-hover:scale-100 transition-all duration-500"></div>
            
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full bg-pradivya-accent/30 animate-ping opacity-75"></div>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
