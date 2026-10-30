import { useEffect, useRef, useState } from 'react';

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useInView = ({
  threshold = 0,
  rootMargin = '0px',
  once = false,
}: InViewOptions = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const enteredView = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set inView state based on entry and the once option
        const inView = entry.isIntersecting;
        if (inView) {
          setIsInView(true);
          enteredView.current = true;
          
          // If once is true, unobserve after element enters view
          if (once) {
            observer.unobserve(element);
          }
        } else {
          // Only set to false if once is false
          if (!once) {
            setIsInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
};

export default useInView;