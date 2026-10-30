import { useEffect, useRef } from 'react';
import { Cpu, ScanLine, Activity } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './market-opportunity.css';

gsap.registerPlugin(ScrollTrigger);
const markets = [
  { value: 157, decimals: 0, prefix: '$', name: 'Global edge AI', year: '2030', icon: Cpu, title: 'Intelligence at the edge.', copy: 'AI infrastructure brings inference closer to industrial operations.', growth: '19%', source: 'STL Partners · 2025', url: 'https://stlpartners.com/press/edge-ai-revenue-to-reach-usd157bn-2030/' },
  { value: 121.5, decimals: 1, prefix: '$', name: 'Predictive maintenance', year: '2034', icon: Activity, title: 'Read the early signals.', copy: 'Condition data helps operators understand equipment health and plan maintenance.', growth: '26.8%', source: 'BIS Research · 2024', url: 'https://blog.bisresearch.com/exposure-management-market-worth-23.60-billion-by-2034-at-a-cagr-of-26.16-bis-research?hs_amp=true' },
  { value: 15.2, decimals: 1, prefix: '$', name: 'Physical AI', year: '2032', icon: ScanLine, title: 'From sensing to action.', copy: 'Physical AI connects sensing, reasoning and action in the real world.', growth: '47.2%', source: 'MarketsandMarkets · 2026', url: 'https://www.marketsandmarkets.com/Market-Reports/physical-ai-market-240269196.html' },
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
          timeline.to(counter, { value: markets[index].value, duration: 1.5, ease: 'power2.out', onUpdate: () => { node.textContent = counter.value.toFixed(markets[index].decimals); }, onComplete: () => { node.textContent = markets[index].value.toFixed(markets[index].decimals); } }, .35+index*.12);
        });
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return <section ref={root} className="market-opportunity" id="opportunity" aria-labelledby="market-opportunity-title">
    <div className="market-opportunity-inner">
      <h2 id="market-opportunity-title" aria-label="Three markets. One shift.">{[['Three', 'markets.'], ['One', 'shift.']].map((line,index) => <span className="market-title-line" aria-hidden="true" key={index}>{line.map(word => <span className="market-word-mask" key={word}><span className="market-word">{word}</span></span>)}</span>)}</h2>
      <div className="market-stats">{markets.map(m => <div className="market-stat" key={m.name}><strong><span className="sr-only">{`${m.prefix}${m.value.toFixed(m.decimals)} billion`}</span><span aria-hidden="true">{m.prefix}<span className="market-value">{m.value.toFixed(m.decimals)}</span><span className="market-unit">B</span></span></strong><p>{m.name}</p><span className="market-stat-year">Global forecast · {m.year}</span></div>)}</div>
      <div className="market-rule"/>
      <div className="market-details">{markets.map(m => <article className="market-detail" key={m.name}><div className="market-detail-content"><m.icon size={30} strokeWidth={1.25} aria-hidden="true"/><h3>{m.title}</h3><p>{m.copy}</p><div className="market-forecast"><span><b>{m.growth}</b> annual growth</span></div><small>Source: <a href={m.url} target="_blank" rel="noreferrer">{m.source}</a></small></div></article>)}</div>
      <p className="market-source-note">Global market forecasts, rounded from the cited research. Market definitions overlap and are not additive.</p>
    </div>
  </section>;
}
