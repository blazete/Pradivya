import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { mountAsciiFooter } from './asciiFooterField';
import { ASCIIWake } from './ASCIIWake/ASCIIWake';
import './animated-footer.css';

export default function AnimatedFooter() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!root.current || !canvas.current) return;
    let dispose: (() => void) | undefined;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const setup = () => { dispose?.(); dispose = mountAsciiFooter(root.current!,canvas.current!); };
    setup(); preference.addEventListener('change',setup);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.ascii-footer-brand, .ascii-footer-invitation, .ascii-footer-column', { opacity:0, y:18, duration:.9, stagger:.1, ease:'power2.out', scrollTrigger:{trigger:root.current,start:'top 80%',once:true} });
      },root);
      return () => ctx.revert();
    });
    return () => { dispose?.(); preference.removeEventListener('change',setup); media.revert(); };
  },[]);
  return <footer ref={root} className="ascii-footer" id="contact" aria-label="Pradivya contact and navigation">
    <canvas ref={canvas} className="ascii-footer-canvas" aria-hidden="true"/>
    <div className="ascii-footer-content">
      <div className="ascii-footer-brand"><ASCIIWake/><small>PHYSICAL AI</small></div>
      <div className="ascii-footer-invitation"><p>See what your cameras miss.<br/><a href="/contact">Let’s take a closer look.<span aria-hidden="true"> ↗</span></a></p><a className="ascii-footer-demo" href="/contact">Book a demo <span aria-hidden="true">↗</span></a></div>
      <nav className="ascii-footer-navigation" aria-label="Footer">
        <div className="ascii-footer-column"><span>Explore</span><a href="#products">Products</a><a href="#open-source">Open source</a><a href="#industries">Industries</a><a href="#opportunity">Opportunity</a></div>
        <div className="ascii-footer-column"><span>Company</span><a href="#team">Our people</a><a href="#hub">The Hub</a><a href="/about">About</a><a href="/contact">Contact</a></div>
        <div className="ascii-footer-column"><span>Legal</span><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/legal">Legal notice</a></div>
      </nav>
      <div className="ascii-footer-bottom"><span>© {new Date().getFullYear()} Pradivya</span><a href="#top">Back to top ↑</a></div>
    </div>
  </footer>;
}
