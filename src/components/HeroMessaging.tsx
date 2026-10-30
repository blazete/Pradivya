import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
gsap.registerPlugin(ScrambleTextPlugin);
const presence = 'Our U.S. presence is supported by our participation in the UChicago India Deep Tech Accelerator at the Polsky Center for Entrepreneurship and Innovation, University of Chicago.';
export function HeroPresence(){const root=useRef<HTMLDivElement>(null);useEffect(()=>{const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{gsap.from('.sf-context-word',{opacity:0,y:8,stagger:.025,duration:.45,ease:'power2.out',delay:.5});},root);return()=>ctx.revert();});return()=>media.revert();},[]);return <div ref={root} className="sf-presence-block"><p className="sf-presence-context"><span className="sr-only">{presence}</span><span aria-hidden="true">{presence.split(' ').map((word,i)=><span className="sf-context-word" key={i}>{word} </span>)}</span></p><a className="sf-presence-card" href="#hub"><span className="sf-presence-kicker"><i/> OUR U.S. PRESENCE</span><strong>San Francisco <ArrowUpRight size={18}/></strong><span>c/o Third Coast Foundry</span><span className="sf-presence-address">625 2nd St · California</span></a></div>}
const title = 'Physical AI.';
const shiftText = 'The next platform shift.';
const entryText = 'Pradivya is at its point of entry.';
export default function HeroMessaging(){
  const root=useRef<HTMLDivElement>(null);
  const replay=useRef<(() => void) | null>(null);
  const spotlight=useRef<{enter:()=>void;move:(fraction:number)=>void;leave:()=>void} | null>(null);
  useEffect(()=>{
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
        const first=root.current!.querySelector('.hero-title-scramble');
        const shift=root.current!.querySelector('.hero-shift-text');
        const entry=root.current!.querySelector('.hero-entry-text');
        const sense=root.current!.querySelector('.hero-sense-line');
        const light=root.current!.querySelector('.hero-sense-light');
        const scramble = { chars:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', speed:.35, revealDelay:.08, tweenLength:false };
        const intro=gsap.timeline()
          .from('.hero-title-first',{opacity:0,y:12,duration:.6,ease:'power3.out'},0)
          .to(first,{scrambleText:{...scramble,text:title},duration:.8},.1)
          .to(shift,{scrambleText:{...scramble,text:shiftText},duration:1.05},.5)
          .fromTo(entry,{opacity:0,y:6},{opacity:1,y:0,duration:.55,ease:'power2.out'},1.4);
        const interaction=gsap.timeline({paused:true})
          .to(first,{scrambleText:{...scramble,text:title,revealDelay:.05},duration:.65})
          .fromTo('.hero-title-first',{color:'#315d48'},{color:'#20342f',duration:.5},0);
        replay.current=()=>{ if(!intro.isActive() && !interaction.isActive()) interaction.restart(); };
        spotlight.current={
          enter:()=>{gsap.to(light,{opacity:1,duration:.2,overwrite:true});gsap.fromTo(sense,{'--sense-x':'0%'},{'--sense-x':'100%',duration:1.1,ease:'sine.inOut',overwrite:true});},
          move:(fraction)=>{ gsap.to(light,{opacity:1,duration:.2,overwrite:true}); gsap.to(sense,{'--sense-x':`${fraction*100}%`,duration:.3,ease:'power2.out',overwrite:true}); },
          leave:()=>{gsap.killTweensOf(sense);gsap.to(light,{opacity:0,duration:.3,overwrite:true});},
        };
      },root);
      return()=>{replay.current=null;spotlight.current=null;gsap.killTweensOf(root.current?.querySelectorAll('.hero-sense-line, .hero-sense-light') ?? []);ctx.revert();};
    });
    return()=>media.revert();
  },[]);
  return <div ref={root} className="hero-copy">
    <h1 aria-label="Physical AI is the next platform shift. Pradivya is at its point of entry.">
      <button type="button" className="hero-title-first" aria-label="Replay headline animation" onPointerEnter={()=>{replay.current?.();spotlight.current?.enter();}} onPointerMove={event=>{const box=event.currentTarget.getBoundingClientRect();spotlight.current?.move(Math.min(1,Math.max(0,(event.clientX-box.left)/box.width)));}} onPointerLeave={event=>{if(!event.currentTarget.matches(':focus-visible'))spotlight.current?.leave();}} onFocus={()=>{replay.current?.();spotlight.current?.enter();}} onBlur={()=>spotlight.current?.leave()} onClick={()=>{replay.current?.();spotlight.current?.enter();}}>
        <span className="hero-text-reserve" aria-hidden="true">{title}</span><span className="hero-title-scramble hero-scramble-layer" aria-hidden="true">{title}</span>
      </button>
      <span className="hero-shift-line" aria-hidden="true"><span className="hero-text-reserve">{shiftText}</span><span className="hero-shift-text hero-scramble-layer">{shiftText}</span></span>
    </h1>
    <p className="hero-entry-line" aria-hidden="true"><span className="hero-entry-text">{entryText}</span></p>
    <p className="hero-sensing-copy"><span className="hero-sense-line"><span>See, hear and feel every defect.</span><span className="hero-sense-light" aria-hidden="true">See, hear and feel every defect.</span></span><br/>Multisensory AI for industrial inspection.</p>
    <div className="rerun-actions"><a className="pill bright-pill" href="/contact#request">Book a demo</a><a className="pill rerun-secondary" href="#platform">Explore the platform</a></div>
  </div>;
}
