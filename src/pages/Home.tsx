import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SequenceHero from '../components/SequenceHero';
import ScrollAsciiReveal from '../components/ScrollAsciiReveal';
import Builders from '../components/Builders';
import MarketOpportunity from '../components/MarketOpportunity';
import AnimatedFooter from '../components/AnimatedFooter';
import SystemSection from '../components/SystemSection';
import HubSection from '../components/HubSection';
import AssociationMarquee from '../components/AssociationMarquee';
import IndustryExplorer from '../components/IndustryExplorer';
import '../physical-ai.css';
import { withBase } from '../lib/base';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { n: '01', title: 'Multisensory Inspection Platform', copy: 'Catches the defects cameras miss.', tag: 'INSPECT', image: withBase('/img/ards3.webp') },
  { n: '02', title: 'Imagination', copy: 'Free building blocks for smarter inspection.', tag: 'BUILD IN THE OPEN', image: withBase('/img/toolkit1.webp') },
  { n: '03', title: 'Multisensory Chip', copy: 'Every sense. One chip. AI on the device.', tag: 'EDGE INTELLIGENCE', image: withBase('/img/plateformarc.webp') },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  const navIndicator = useRef<HTMLSpanElement>(null);
  const lenisRef = useRef<Lenis>();
  useEffect(() => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = lenisRef.current = new Lenis({ lerp: reducedMotion ? 1 : 0.09, smoothWheel: !reducedMotion, anchors: !reducedMotion });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // Trigger positions are measured before the four non-preloaded font faces swap in.
    let fontsPending = true;
    void document.fonts.ready.then(() => { if (fontsPending) ScrollTrigger.refresh(); });
    const isReload = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)?.type === 'reload';
    const resetScroll = () => { lenis.scrollTo(0, { immediate: true, force: true }); window.scrollTo({top: 0, left: 0, behavior: 'instant'}); };
    if (isReload) { resetScroll(); window.addEventListener('pageshow', resetScroll); }

    const cleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => gsap.fromTo(el, { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 86%' } }));

      const links = gsap.utils.toArray<HTMLAnchorElement>('.ph-nav nav a');
      let currentLink: HTMLAnchorElement | undefined;
      const moveIndicator = (link?: HTMLAnchorElement) => {
        const marker = navIndicator.current;
        if (!marker || !link) return;
        gsap.to(marker, { x: link.offsetLeft, width: link.offsetWidth, autoAlpha: 1, duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.45, ease: 'power3.out', overwrite: true });
      };
      const setActiveLink = (link: HTMLAnchorElement) => {
        currentLink = link;
        links.forEach((item) => item.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'location');
        moveIndicator(link);
      };
      const clearActiveLink = (link: HTMLAnchorElement) => {
        if (currentLink !== link) return;
        currentLink = undefined;
        link.removeAttribute('aria-current');
        gsap.to(navIndicator.current, { autoAlpha: 0, duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.2, overwrite: true });
      };
      links.forEach((link) => {
        const target = document.querySelector<HTMLElement>(link.hash);
        const enter = () => moveIndicator(link);
        const leave = () => moveIndicator(currentLink);
        link.addEventListener('mouseenter', enter);
        link.addEventListener('focus', enter);
        link.addEventListener('mouseleave', leave);
        link.addEventListener('blur', leave);
        cleanups.push(() => {
          link.removeEventListener('mouseenter', enter);
          link.removeEventListener('focus', enter);
          link.removeEventListener('mouseleave', leave);
          link.removeEventListener('blur', leave);
        });
        if (target) ScrollTrigger.create({ trigger: target, start: 'top 35%', end: 'bottom 35%', onEnter: () => setActiveLink(link), onEnterBack: () => setActiveLink(link), onLeave: () => clearActiveLink(link), onLeaveBack: () => clearActiveLink(link) });
      });
    }, root);
    const resetFrame = isReload ? requestAnimationFrame(resetScroll) : 0;
    return () => { cancelAnimationFrame(resetFrame); window.removeEventListener('pageshow', resetScroll); cleanups.forEach((cleanup) => cleanup()); ctx.revert(); gsap.ticker.remove(tick); gsap.ticker.lagSmoothing(500, 33); fontsPending = false; lenis.destroy(); lenisRef.current = undefined; };
  }, []);

  return <div ref={root} className="physical-page">
    <header className={`ph-nav ${menuOpen ? 'menu-open' : ''}`}><a href="#top" aria-label="Pradivya home"><img src={withBase("/img/pradivya-logo-small.webp")} alt="Pradivya" width="88" height="55" /></a><nav id="landing-navigation" aria-label="Main navigation" onClick={() => setMenuOpen(false)}><span ref={navIndicator} className="ph-nav-indicator" aria-hidden="true"/><a href="#platform">Platform</a><a href="#open-source">Open source</a><a href="#industries">Industries</a><a href="#hub">The Hub</a></nav><a className="pill dark-pill" href={withBase("/contact#request")}>Book a demo <ArrowUpRight size={15}/></a><button ref={menuButton} className="mobile-menu" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="landing-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></header>

    <SequenceHero lenis={lenisRef} />
    <AssociationMarquee />

    <SystemSection />

    <section className="products" id="products"><ScrollAsciiReveal className="section-heading"><span className="eyebrow">THE PRODUCT STACK</span><h2>Three products.<br/><em>One system.</em></h2><p>From inspection workflows to open building blocks and edge intelligence.</p></ScrollAsciiReveal><div className="product-list">{products.map((p) => <article className="product-card" key={p.n} data-reveal><div className="product-copy"><span className="eyebrow">{p.n} / {p.tag}</span><h3>{p.title}</h3><p>{p.copy}</p><a href="#contact" className="text-link">Explore <ArrowUpRight size={15}/></a></div><div className="product-visual"><img className="product-image" loading="lazy" decoding="async" src={p.image} alt=""/><span className="image-label">PRADIVYA · PHYSICAL AI</span></div></article>)}</div></section>

    <section className="open-source" id="open-source"><ScrollAsciiReveal className="open-copy"><span className="eyebrow light">OPEN SOURCE · IMAGINATION</span><h2>Built in<br/>the <em>open.</em></h2><p>Start with open building blocks. Adapt multisensory inspection to the problems you know best.</p><a className="pill bright-pill" href="#contact">Explore Imagination <ArrowUpRight size={15}/></a></ScrollAsciiReveal><div className="open-art" data-reveal><img src={withBase("/img/toolkit2.webp")} alt="Illustrative inspection toolkit graphic" loading="lazy" decoding="async"/><div className="code-stamp">OPEN<br/>BY DESIGN</div></div></section>

    <IndustryExplorer />

    <MarketOpportunity />

    <Builders />

    <HubSection />

    <AnimatedFooter />
  </div>;
}
