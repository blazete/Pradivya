import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);
const presence = 'Our U.S. presence is supported by our participation in the UChicago India Deep Tech Accelerator at the Polsky Center for Entrepreneurship and Innovation, University of Chicago.';
export function HeroPresence(){const root=useRef<HTMLDivElement>(null);useEffect(()=>{const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{gsap.from('.sf-context-word',{opacity:0,y:8,stagger:.025,duration:.45,ease:'power2.out',delay:.5});},root);return()=>ctx.revert();});return()=>media.revert();},[]);return <div ref={root} className="sf-presence-block"><p className="sf-presence-context"><span className="sr-only">{presence}</span><span aria-hidden="true">{presence.split(' ').map((word,i)=><span className="sf-context-word" key={i}>{word} </span>)}</span></p><a className="sf-presence-card" href="#hub"><span className="sf-presence-kicker"><i/> OUR U.S. PRESENCE</span><strong>San Francisco <ArrowUpRight size={18}/></strong><span>c/o Third Coast Foundry</span><span className="sf-presence-address">625 2nd St · California</span></a></div>}
const title = 'Physical AI.';
const shiftText = 'The next platform shift.';
const entryText = 'Pradivya is at its point of entry.';
export default function HeroMessaging(){
  const root=useRef<HTMLDivElement>(null);
  const replay=useRef<(() => void) | null>(null);
  useEffect(()=>{
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
        const first=root.current!.querySelector('.hero-title-scramble');
        const shift=root.current!.querySelector('.hero-shift-text');
        const entry=root.current!.querySelector('.hero-entry-text');
        const scramble = { chars:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', speed:.35, revealDelay:.15, tweenLength:false };
        const intro=gsap.timeline()
          .from('.hero-title-first',{opacity:0,y:12,duration:.6,ease:'power3.out'},0)
          .to(first,{scrambleText:{...scramble,text:title},duration:1.05},.1)
          .to(shift,{scrambleText:{...scramble,text:shiftText},duration:1.25},.5)
          .fromTo(entry,{opacity:0,y:6},{opacity:1,y:0,duration:.55,ease:'power2.out'},1.4);
        const interaction=gsap.timeline({paused:true})
          .to(first,{scrambleText:{...scramble,text:title,revealDelay:.05},duration:.65})
          .fromTo('.hero-title-first',{color:'#315d48'},{color:'#20342f',duration:.5},0);
        replay.current=()=>{ if(!intro.isActive() && !interaction.isActive()) interaction.restart(); };
      },root);
      return()=>{replay.current=null;ctx.revert();};
    });
    return()=>media.revert();
  },[]);
  return <div ref={root} className="hero-copy">
    <h1 aria-label="Physical AI is the next platform shift. Pradivya is at its point of entry.">
      <button type="button" className="hero-title-first" aria-label="Replay headline animation" onPointerEnter={()=>replay.current?.()} onFocus={()=>replay.current?.()} onClick={()=>replay.current?.()}>
        <span className="hero-text-reserve" aria-hidden="true">{title}</span><span className="hero-title-scramble hero-scramble-layer" aria-hidden="true">{title}</span>
      </button>
      <span className="hero-shift-line" aria-hidden="true"><span className="hero-text-reserve">{shiftText}</span><span className="hero-shift-text hero-scramble-layer">{shiftText}</span></span>
    </h1>
    <p className="hero-entry-line" aria-hidden="true"><span className="hero-entry-text">{entryText}</span></p>
    <p className="hero-sensing-copy">See, hear and feel every defect.<br/>Multisensory AI for industrial inspection.</p>
    <div className="rerun-actions"><a className="pill bright-pill" href="/contact#request">Book a demo</a><a className="pill rerun-secondary" href="#platform">Explore the platform</a></div>
  </div>;
}
