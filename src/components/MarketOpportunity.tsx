import { useEffect, useRef } from 'react';
import { Eye, ScanLine, Activity } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './market-opportunity.css';

gsap.registerPlugin(ScrollTrigger);
const markets = [
  { value: 15.8, prefix: '$', name: 'Machine vision', year: '2025', icon: Eye, title: 'See the visible.', copy: 'Image-based inspection brings visual detail into industrial quality control.', forecast: '$23.6B', growth: '8.3%', source: 'MarketsandMarkets' },
  { value: 15, prefix: '$', name: 'Non-destructive testing', year: '2025', icon: ScanLine, title: 'Look beneath the surface.', copy: 'Inspect materials and components without damaging the part being examined.', forecast: '$22.3B', growth: '8.3%', source: 'MarketsandMarkets' },
  { value: 4.6, prefix: '~$', name: 'Predictive maintenance', year: '2023', icon: Activity, title: 'Read the early signals.', copy: 'Use condition data to understand equipment health and anticipate maintenance needs.', forecast: '~$30.8B', growth: '31.2%', source: 'Fairfield Market Research' },
];

export default function MarketOpportunity() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 78%', once: true } });
        timeline.from('.market-word', { yPercent: 110, rotation: 2, filter: 'blur(5px)', duration: .85, stagger: .09, ease: 'power3.out' }, 0)
          .from('.market-stat strong, .market-stat p, .market-stat-year', { opacity: 0, y: 24, duration: .75, stagger: .08, ease: 'power2.out' }, .3)
          .from('.market-rule', { scaleX: 0, transformOrigin: 'left', duration: 1.1, ease: 'power2.inOut' }, .4)
          .from('.market-detail-content > *', { opacity: 0, y: 18, duration: .6, stagger: .055, ease: 'power2.out' }, .65);
        root.current!.querySelectorAll<HTMLElement>('.market-value').forEach((node,index) => {
          const counter = { value: 0 };
          timeline.to(counter, { value: markets[index].value, duration: 1.5, ease: 'power2.out', onUpdate: () => { node.textContent = counter.value.toFixed(1); }, onComplete: () => { node.textContent = markets[index].value.toFixed(1); } }, .35+index*.12);
        });
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return <section ref={root} className="market-opportunity" id="opportunity" aria-labelledby="market-opportunity-title">
    <div className="market-opportunity-inner">
      <h2 id="market-opportunity-title" aria-label="Three markets. One shift.">{[['Three', 'markets.'], ['One', 'shift.']].map((line,index) => <span className="market-title-line" aria-hidden="true" key={index}>{line.map(word => <span className="market-word-mask" key={word}><span className="market-word">{word}</span></span>)}</span>)}</h2>
      <div className="market-stats">{markets.map(m => <div className="market-stat" key={m.name}><strong><span className="sr-only">{`${m.prefix}${m.value.toFixed(1)} billion`}</span><span aria-hidden="true">{m.prefix}<span className="market-value">{m.value.toFixed(1)}</span><span className="market-unit">B</span></span></strong><p>{m.name}</p><span className="market-stat-year">Market estimate · {m.year}</span></div>)}</div>
      <div className="market-rule"/>
      <div className="market-details">{markets.map(m => <article className="market-detail" key={m.name}><div className="market-detail-content"><m.icon size={30} strokeWidth={1.25} aria-hidden="true"/><h3>{m.title}</h3><p>{m.copy}</p><div className="market-forecast"><span><b>{m.forecast}</b> 2030 forecast</span><span><b>{m.growth}</b> annual growth</span></div><small>Source: {m.source}</small></div></article>)}</div>
      <p className="market-source-note">Figures reproduced from the supplied Pradivya framework; source reports and forecast assumptions require verification before publication. These markets overlap and must not be added together.</p>
    </div>
  </section>;
}
