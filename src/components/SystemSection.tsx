import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './system-section.css';

gsap.registerPlugin(MotionPathPlugin);
export default function SystemSection(){
  const root=useRef<HTMLElement>(null);
  useEffect(()=>{
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      let observer:IntersectionObserver;
      const loops:gsap.core.Animation[]=[];
      const ctx=gsap.context(()=>{
        gsap.from('.system-new-copy>*',{opacity:0,y:22,stagger:.1,duration:.8,ease:'power2.out',scrollTrigger:{trigger:root.current,start:'top 76%',once:true}});
        const paths=root.current!.querySelectorAll<SVGPathElement>('.system-route');
        root.current!.querySelectorAll<SVGCircleElement>('.system-packet').forEach((packet,index)=>{
          const loop=gsap.timeline({repeat:-1,delay:index*.38,paused:true});
          loop.set(packet,{opacity:0}).to(packet,{opacity:1,duration:.25}).to(packet,{duration:2.1,motionPath:{path:paths[index],align:paths[index],alignOrigin:[.5,.5]},ease:'sine.inOut'},0).to(packet,{opacity:0,duration:.25},1.85).to({},{duration:.9});
          loops.push(loop);
        });
        loops.push(gsap.to('.system-core-halo',{opacity:.15,scale:1.13,svgOrigin:'390 258',duration:1.8,repeat:-1,yoyo:true,ease:'sine.inOut',paused:true}));
        loops.push(gsap.to('.system-core-scan',{y:46,duration:2,repeat:-1,yoyo:true,ease:'sine.inOut',paused:true}));
        loops.push(gsap.to('.system-core-inner',{rotation:360,svgOrigin:'390 258',duration:22,repeat:-1,ease:'none',paused:true}));
        observer=new IntersectionObserver(([entry])=>loops.forEach(loop=>entry.isIntersecting?loop.play():loop.pause()),{threshold:.15});observer.observe(root.current!);
      },root);
      return()=>{observer?.disconnect();ctx.revert();};
    });
    return()=>media.revert();
  },[]);
  return <section className="system-new" id="platform" ref={root} aria-labelledby="system-title">
    <div className="system-new-copy"><span className="system-new-eyebrow">ONE SYSTEM · THREE PRODUCTS</span><h2 id="system-title">Sense.<br/>Combine.<br/><em>Decide.</em></h2><p>Inspection intelligence designed to work together, from sensing to edge deployment.</p><a href="#products">Explore the system <ArrowRight size={16}/></a></div>
    <div className="system-new-visual"><div className="system-diagram-top"><span>THE MULTISENSORY LOOP</span><span>01 — 03</span></div>
      <svg viewBox="0 0 720 520" role="img" aria-label="Illustrative architecture: vision, sound and vibration signals combine into inspection intelligence, supporting the platform and chip.">
        <defs><pattern id="system-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#d6d5d9"/></pattern><linearGradient id="system-halo"><stop stopColor="#00a697" stopOpacity=".12"/><stop offset="1" stopColor="#00a697" stopOpacity="0"/></linearGradient></defs>
        <rect width="720" height="520" fill="url(#system-dot-grid)"/>
        <g className="system-routes" fill="none"><path className="system-route" d="M170 130 C275 130 255 258 330 258"/><path className="system-route" d="M170 258 H330"/><path className="system-route" d="M170 386 C275 386 255 258 330 258"/><path className="system-route" d="M450 258 C515 258 500 183 555 183"/><path className="system-route" d="M450 258 C515 258 500 333 555 333"/></g>
        <circle className="system-core-halo" cx="390" cy="258" r="115" fill="url(#system-halo)"/>
        <circle className="system-core-inner" cx="390" cy="258" r="92" fill="none" stroke="#a3cfc8" strokeDasharray="3 11"/>
        {[130,258,386].map((y,index)=><g key={y}><rect x="26" y={y-31} width="144" height="62" rx="9" fill="#fff" stroke="#dedce0"/><text x="44" y={y-3} className="system-svg-meta">0{index+1} / SENSE</text><text x="44" y={y+17} className="system-svg-label">{['Vision','Sound','Vibration'][index]}</text></g>)}
        <rect x="330" y="198" width="120" height="120" rx="19" fill="#fff" stroke="#bdcfc9"/>
        <rect x="339" y="207" width="102" height="102" rx="12" fill="#f5faf8"/>
        <g stroke="#b0c1bd" strokeWidth="2">{[351,377,403,429].map(x=><g key={x}><path d={`M${x} 188v10 M${x} 318v10`}/></g>)}{[220,246,272,298].map(y=><path key={y} d={`M320 ${y}h10 M450 ${y}h10`}/>)}</g>
        <text x="390" y="241" textAnchor="middle" className="system-svg-meta">COMBINE</text><text x="390" y="267" textAnchor="middle" className="system-svg-core">Physical AI</text><path className="system-core-scan" d="M350 223H430" stroke="#00a697" strokeWidth="1.5" opacity=".7"/>
        {[183,333].map((y,index)=><g key={y}><rect x="555" y={y-35} width="139" height="70" rx="9" fill="#fff" stroke="#dedce0"/><text x="571" y={y-5} className="system-svg-meta">0{index+1} / DECIDE</text><text x="571" y={y+17} className="system-svg-label">{['Platform','Chip'][index]}</text></g>)}
        {[0,1,2,3,4].map(index=><circle key={index} className="system-packet" r="4" fill="#00a697" opacity="0"/>)}
        <path d="M390 350v72" stroke="#ccd5d2" strokeDasharray="3 5"/><rect x="295" y="422" width="190" height="46" rx="23" fill="#fff" stroke="#dedce0"/><text x="390" y="450" textAnchor="middle" className="system-svg-label">Imagination · open source</text>
      </svg><div className="system-diagram-bottom"><span>ILLUSTRATIVE SYSTEM VIEW</span><span>Sense → Combine → Decide</span></div>
    </div>
  </section>;
}
