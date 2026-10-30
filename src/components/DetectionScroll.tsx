import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './detection-scroll.css';

gsap.registerPlugin(ScrollTrigger);

const regions = [
  { x: 275, y: 300, w: 350, h: 190, label: 'WHEEL ASSEMBLY', id: '01' },
  { x: 185, y: 525, w: 360, h: 110, label: 'RAIL PROFILE', id: '02' },
  { x: 1130, y: 255, w: 285, h: 425, label: 'INSPECTION UNIT', id: '03' },
];

export default function DetectionScroll() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const firstCopy = section.current!.querySelector<HTMLElement>('.detection-copy-first')!;
        const frame = section.current!.querySelector<HTMLElement>('.detection-arrival-frame')!;
        const entryOffset = () => {
          const box = frame.getBoundingClientRect();
          const copy = firstCopy.getBoundingClientRect();
          return { x: box.left + (box.width - copy.width) / 2 - copy.left, y: box.top + (box.height - copy.height) / 2 - copy.top };
        };
        const entry = entryOffset();
        gsap.set(firstCopy, { x: entry.x, y: entry.y, opacity: 0 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom bottom', scrub: 1.15 } });
        timeline
          .fromTo('.detection-atmosphere', { scale: 1.08 }, { scale: 1, duration: 1.6, ease: 'none' }, 0)
          .fromTo('.detection-arrival-frame', { opacity: 0, scale: 0.94 }, { opacity: 0.7, scale: 1, duration: 0.8 }, 0.3)
          .to(firstCopy, { opacity: 1, duration: 0.55 }, 0.6)
          .to(firstCopy, { color: '#152636', duration: 0.75, ease: 'sine.inOut' }, 1.05)
          .to(firstCopy, { x: 0, y: 0, duration: 1.3, ease: 'power2.inOut' }, 1.8)
          .to(firstCopy, { color: '#ffffff', duration: 1.1, ease: 'sine.inOut' }, 2)
          .to('.detection-white-wash', { opacity: 0.96, duration: 0.85, ease: 'sine.inOut' }, 1.05)
          .to('.detection-atmosphere', { opacity: 0, duration: 0.9 }, 1.65)
          .to('.detection-arrival-frame', { opacity: 0, scale: 1.15, duration: 0.75 }, 1.65)
          .fromTo('.detection-world', { opacity: 0, filter: 'blur(16px)' }, { opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'sine.out' }, 1.65)
          .to('.detection-white-wash', { opacity: 0, duration: 1.3, ease: 'sine.inOut' }, 1.9)
          .fromTo('.detection-footer', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 }, 2.5);
        const inspection = gsap.timeline();
        inspection.fromTo('.detection-world', { scale: 1.06 }, { scale: 1, duration: 1 }, 0)
          .fromTo('.detection-sweep', { xPercent: -100 }, { xPercent: 100, duration: 2.2, ease: 'none' }, 0.2)
          .fromTo('.detection-box', { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, stagger: 0.3, duration: 0.75, ease: 'power1.inOut' }, 0.6)
          .fromTo('.detection-label', { opacity: 0 }, { opacity: 1, stagger: 0.3, duration: 0.35 }, 1.25)
          .to('.detection-world', { scale: 1.65, duration: 2, ease: 'power1.inOut' }, 2.5)
          .to('.detection-region', { opacity: 0, duration: 0.6 }, 2.8)
          .to('.detection-copy-first', { opacity: 0, y: -20, duration: 0.5 }, 3)
          .fromTo('.detection-copy-second', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 3.5)
          .fromTo('.detection-signals', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 3.6)
          .fromTo('.signal-ring', { scale: 0.3, opacity: 0 }, { scale: 1.4, opacity: 0.65, stagger: 0.2, duration: 1.5 }, 3.8)
          .to('.stage-sound', { opacity: 1, duration: 0.3 }, 3.8)
          .to('.stage-vibration', { opacity: 1, duration: 0.3 }, 4.5)
          .to('.detection-progress', { scaleX: 1, duration: 6, ease: 'none' }, 0)
          .to({}, { duration: 0.5 });
        timeline.add(inspection, 2.6);
      }, section);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return <section ref={section} className="detection-scroll" id="thesis" aria-label="Illustrative multisensory railway inspection sequence">
    <div className="detection-stage">
      <div className="detection-world" aria-hidden="true">
        <svg className="detection-overlay" viewBox="0 0 1472 832" preserveAspectRatio="xMidYMid slice">
          <image className="detection-photo" href="/img/ards3.webp" width="1472" height="832" />
          {regions.map(r => <g className="detection-region" key={r.id}>
            <rect className="detection-box" x={r.x} y={r.y} width={r.w} height={r.h} pathLength="1" />
            <g className="detection-label"><rect x={r.x} y={r.y-26} width={r.label.length*7+52} height="24" fill="#ffffff" fillOpacity="0.9"/><text x={r.x+8} y={r.y-10}>{r.id} / {r.label}</text></g>
          </g>)}
        </svg>
        <div className="detection-signals"><span className="signal-ring"/><span className="signal-ring"/><span className="signal-ring"/></div>
      </div>
      <div className="detection-scrim"/>
      <div className="detection-atmosphere" aria-hidden="true"><div className="detection-grain"/></div>
      <div className="detection-arrival-frame" aria-hidden="true"/>
      <div className="detection-white-wash" aria-hidden="true"/>
      <div className="detection-sweep" aria-hidden="true"/>
      <div className="detection-copy detection-copy-first"><span className="detection-kicker">MULTISENSORY INSPECTION</span><h2>See what your<br/>cameras miss.</h2><p>A closer look at the components<br/>that keep your operation moving.</p></div>
      <div className="detection-copy detection-copy-second"><span className="detection-kicker">MORE THAN ONE SIGNAL</span><h2>See. Hear.<br/>Feel.</h2><p>Vision, sound and vibration.<br/>A fuller picture of the inspection point.</p></div>
      <div className="detection-footer"><span>ILLUSTRATIVE SEQUENCE · NOT LIVE DETECTION</span><div className="detection-stages"><span className="stage-vision">01 / VISION</span><span className="stage-sound">02 / SOUND</span><span className="stage-vibration">03 / VIBRATION</span></div></div>
      <div className="detection-progress" aria-hidden="true"/>
    </div>
  </section>;
}
