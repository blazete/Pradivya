import { useEffect, useRef, type ReactNode } from 'react';
import { AsciiReveal, type AsciiRevealHandle } from 'ascii-reveal';

export default function ScrollAsciiReveal({ children, className }: { children: ReactNode; className: string }) {
  const reveal = useRef<AsciiRevealHandle>(null);
  useEffect(() => {
    const element = reveal.current?.element;
    if (!element || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      void document.fonts.ready.then(() => { if (!disposed) void reveal.current?.reveal(); });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .15 });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); };
  }, []);
  return <AsciiReveal ref={reveal} className={className} preset="decode" duration="cinematic" speed={1.3} origin="center" lazy={false} revealOnMount={false}>{children}</AsciiReveal>;
}
