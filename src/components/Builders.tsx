import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import './builders.css';

const people = [
  { name: 'Sebastian Grimm', category: 'Advisor', role: 'Head of Innovation Lab / move+ Accelerator · ZF', image: '/team/sebastian-grimm.jpg', position: '50% 26%', bio: 'Connecting startups and industry through innovation, venture development and the move+ Accelerator.', experience: 'ZF Innovation Lab · move+ Accelerator', profile: 'https://www.heilbronnslushd.com/speaker/sebastian-grimm', label: 'Profile' },
  { name: 'R. (Shyam) Shyamsunder', category: 'Advisor', role: 'Former Managing Director, Investments · Temasek', image: '/team/r_shyamsunder.jpg', position: '50% 25%', bio: 'Investment leadership and strategic perspective, with experience as Managing Director, Investments at Temasek.', experience: 'Formerly · Temasek Holdings', profile: 'https://www.linkedin.com/in/r-shyam-shyamsunder-a4b96843/', label: 'LinkedIn' },
  { name: 'Prasoon Sharma', category: 'Founder', role: 'CEO & Founder', image: '/team/prasoonS.jpeg', position: '50% 30%', bio: 'Building industrial AI through strategic partnerships and global market development.', experience: 'Advisory Board Member · Nasdaq Entrepreneurial Center', profile: 'https://www.linkedin.com/in/prasoon-sharma-nyu/', label: 'LinkedIn' },
  { name: 'Ashwani Singh', category: 'Co-Founder', role: 'CTO & Co-Founder', image: '/team/ashwani.jpeg', position: '50% 30%', bio: 'Three-time entrepreneur. Technology and product experience across Intel, Qualcomm and Infosys.', experience: 'Intel · Qualcomm · Infosys', profile: 'https://www.linkedin.com/in/singhashwani/', label: 'LinkedIn' },
];

export default function Builders() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { setInView(entry.isIntersecting); if (entry.isIntersecting) setSelected(0); }, {threshold:.25}); if(root.current) observer.observe(root.current); return () => observer.disconnect(); }, []);
  const [engaged, setEngaged] = useState(false);
  const [reduced, setReduced] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!inView || paused || engaged || reduced) return;
    const timer = window.setInterval(() => setSelected(index => (index + 1) % people.length), 2000);
    return () => clearInterval(timer);
  }, [inView, paused, engaged, reduced, selected]);
  const choose = (index: number) => setSelected((index + people.length) % people.length);
  return <section ref={root} className="builders" id="team" aria-labelledby="builders-title">
    <header className="builders-heading"><span>THE PEOPLE BEHIND PRADIVYA</span><h2 id="builders-title">Built by builders.</h2><p>Founders and advisors with experience across<br className="builders-break"/> technology, industry and investment.</p></header>
    <div className="builders-carousel" onMouseEnter={() => setEngaged(true)} onMouseLeave={() => setEngaged(false)} onFocusCapture={() => setEngaged(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setEngaged(false); }}>
      <div className="builders-tabs" role="tablist" aria-label="Founders and advisors">{people.map((person,index) => <button ref={el => { tabs.current[index] = el; }} id={`builder-tab-${index}`} key={person.name} role="tab" aria-selected={selected === index} aria-controls={`builder-panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => choose(index)} onKeyDown={e => { let next: number | undefined; if (e.key === 'ArrowRight') next = (index+1)%people.length; if (e.key === 'ArrowLeft') next = (index+people.length-1)%people.length; if(e.key==='Home') next=0; if(e.key==='End') next=people.length-1; if(next!==undefined){ e.preventDefault(); choose(next); tabs.current[next]?.focus(); } }}><span>{person.name}</span><small>{person.category}</small></button>)}</div>
      <div className="builders-panels">{people.map((person,index) => <article key={person.name} id={`builder-panel-${index}`} role="tabpanel" aria-labelledby={`builder-tab-${index}`} aria-hidden={selected !== index} className={`builder-panel ${selected === index ? 'is-active' : ''}`}>
        <div className="builder-copy"><div className="builder-bio"><span className="builder-category">{person.category}</span><p>{person.bio}</p></div><div className="builder-details"><h3>{person.name}</h3><p className="builder-role">{person.role}</p><p className="builder-experience">{person.experience}</p><a href={person.profile} tabIndex={selected === index ? 0 : -1} target="_blank" rel="noreferrer">{person.label}<ArrowUpRight size={13}/></a></div></div>
        <div className="builder-portrait"><img src={person.image} alt={person.name} style={{objectPosition:person.position}} loading="lazy" width="800" height="800"/></div>
      </article>)}</div>
      <div className="builders-controls"><span>{String(selected+1).padStart(2,'0')} <span>/ 04</span></span><div><button aria-label="Previous person" onClick={() => choose(selected-1)}><ArrowLeft size={15}/></button><button aria-label={paused ? 'Resume carousel' : 'Pause carousel'} onClick={() => setPaused(!paused)}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button><button aria-label="Next person" onClick={() => choose(selected+1)}><ArrowRight size={15}/></button></div></div>
    </div>
  </section>;
}
