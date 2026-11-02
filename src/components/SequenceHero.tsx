import { useEffect, useRef, useState } from 'react';
import { AsciiReveal, AsciiSkeleton } from 'ascii-reveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SequencePlayer } from '../lib/sequence-player';
import './sequence-hero.css';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
const chapters = [
  { start: 0, end: 27, label: 'PHYSICAL AI · PRADIVYA', lines: ['Intelligence for', 'a world in motion.'], copy: 'See the fault. Understand the signal. Keep the world moving.' },
  { start: 28, end: 109, label: '', lines: ['Every surface.', 'Every signal.'], copy: 'Inspection that looks beyond the obvious.' },
  { start: 110, end: 195, label: '', lines: ['Small faults.', 'Bigger consequences.'], copy: 'Vision, sound and vibration. One connected picture.' },
  { start: 196, end: 267, label: '', lines: ['Precision.', 'Without pause.'], copy: 'A closer look at the machines that move us.' },
  { start: 268, end: 299, label: 'ONE MULTISENSORY PLATFORM', lines: ['Many machines.', 'One intelligence.'], copy: 'Physical AI, built for the real world.' },
];
type Metadata = { frames: number; callouts: Record<string, { severity: string; title: string; detail: string; start: number; end: number }>; anchors: Record<string, [number, number, number][]> };

export default function SequenceHero() {
  const root = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(true);
  const openingReveal = useRef<HTMLHeadingElement>(null);
  const openingPlayed = useRef(false);
  useEffect(() => {
    if (loading || openingPlayed.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let animation: gsap.core.Tween | undefined;
    const heading = openingReveal.current;
    const chapter = heading?.closest('.sequence-chapter');
    const lines = heading?.querySelectorAll<HTMLElement>('.opening-line');
    const play = () => {
      if (disposed || openingPlayed.current || !heading || !lines || getComputedStyle(heading).visibility !== 'visible') return;
      openingPlayed.current = true;
      heading.classList.add('is-decoding');
      animation = gsap.to(lines, { duration: 1.25, stagger: .12, scrambleText: { text: '{original}', chars: '01<>/[]{}', revealDelay: .15, speed: .5 }, onComplete: () => heading.classList.add('decode-complete') });
      chapter?.removeEventListener('transitionend', play);
    };
    void document.fonts.ready.then(() => {
      if (disposed) return;
      chapter?.addEventListener('transitionend', play);
      play();
    });
    return () => {
      disposed = true;
      chapter?.removeEventListener('transitionend', play);
      animation?.kill();
      lines?.forEach((line, index) => { line.textContent = chapters[0].lines[index]; });
    };
  }, [loading]);
  useEffect(() => {
    const section = root.current!;
    const canvas = section.querySelector('canvas')!;
    const media = matchMedia('(max-width: 768px)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      setLoading(true);
      const controller = new AbortController();
      let player: SequencePlayer | undefined;
      let trigger: ScrollTrigger | undefined;
      let tween: ReturnType<typeof gsap.quickTo> | undefined;
      const stage = section.querySelector<HTMLElement>('.sequence-stage')!;
      const headlineNodes = [...section.querySelectorAll<HTMLElement>('.sequence-chapter')];
      const fault = section.querySelector<HTMLElement>('.sequence-fault')!;
      const marker = section.querySelector<HTMLElement>('.sequence-marker')!;
      const leader = section.querySelector<SVGLineElement>('.sequence-leader line')!;
      section.classList.toggle('is-reduced', reduced.matches);
      section.classList.remove('is-ready', 'has-error');
      section.dataset.frame = '0';
      section.style.setProperty('--exit-progress', '0');
      headlineNodes.forEach((node, i) => { node.classList.toggle('is-active', i === 0); node.setAttribute('aria-hidden', String(i !== 0)); });
      fault.classList.remove('is-active'); marker.classList.remove('is-active'); stage.classList.remove('is-inspecting');
      leader.parentElement!.classList.remove('is-active');
      const camera = media.matches ? 'mobile' : 'desktop';
      const update = (frame: number, data: Metadata) => {
        if (!player) return;
        section.dataset.frame = String(frame);
        const exit = Math.max(0, Math.min(1, (frame - 276) / 23));
        section.style.setProperty('--exit-progress', String(exit * exit * (3 - 2 * exit)));
        headlineNodes.forEach((node, i) => {
          const active = frame >= chapters[i].start && frame <= chapters[i].end;
          node.classList.toggle('is-active', active); node.setAttribute('aria-hidden', String(!active));
        });
        section.style.setProperty('--scrim-opacity', media.matches || frame < 28 ? '.35' : '.6');
        section.querySelector<HTMLElement>('.sequence-progress')!.style.transform = `scaleX(${frame / 299})`;
        const entry = Object.entries(data.callouts).find(([key, c]) => frame >= c.start && frame <= c.end && data.anchors[key]?.[frame]?.[2]);
        const active = Boolean(entry);
        stage.classList.toggle('is-inspecting', active);
        if (active) headlineNodes.forEach(node => node.setAttribute('aria-hidden', 'true'));
        fault.classList.toggle('is-active', active); marker.classList.toggle('is-active', active);
        leader.parentElement!.classList.toggle('is-active', active);
        fault.setAttribute('aria-hidden', String(!active));
        if (!entry) return;
        const [key, callout] = entry;
        const [nx, ny] = data.anchors[key][frame];
        const [x, y] = player.toScreen(nx, ny);
        const color = callout.severity === 'amber' ? '#ffc36b' : '#ff697c';
        stage.style.setProperty('--fault-color', color);
        fault.querySelector('strong')!.textContent = callout.title.replace('Fault · ', '').replace('Thermal · ', '');
        fault.querySelector('.sequence-fault-detail')!.textContent = callout.detail;
        const left = Math.max(16, Math.min(stage.clientWidth - fault.offsetWidth - 16, x + (media.matches ? -fault.offsetWidth / 2 : 70)));
        const top = Math.max(90, Math.min(stage.clientHeight - fault.offsetHeight - 30, y - fault.offsetHeight - 54));
        fault.style.transform = `translate(${left}px,${top}px)`;
        marker.style.transform = `translate(${x}px,${y}px)`;
        leader.setAttribute('x1', String(x)); leader.setAttribute('y1', String(y));
        leader.setAttribute('x2', String(left + fault.offsetWidth / 2)); leader.setAttribute('y2', String(top + fault.offsetHeight));
      };
      void (async () => {
        try {
          const response = await fetch(`/web/overlay_${camera}.json`, { signal: controller.signal, mode: 'same-origin' });
          if (!response.ok) throw new Error('Sequence metadata unavailable');
          const data: Metadata = await response.json();
          if (data.frames !== 300 || !data.anchors || !data.callouts) throw new Error('Invalid sequence metadata');
          if (controller.signal.aborted) return;
          player = new SequencePlayer({ canvas, urlFor: i => `/web/frames/${camera}/${String(i).padStart(4, '0')}.webp`, frameCount: reduced.matches ? 1 : data.frames, window: media.matches ? 8 : 12, concurrency: media.matches ? 3 : 4, maxCacheBytes: (media.matches ? 64 : 128) * 1024 * 1024, onFrame: f => update(f, data), onError: () => section.classList.add('has-error') });
          await player.init();
          if (controller.signal.aborted) return;
          section.classList.add('is-ready'); setLoading(false); update(0, data);
          if (reduced.matches) return;
          const playhead = { progress: 0 };
          tween = gsap.quickTo(playhead, 'progress', { duration: .22, ease: 'power2.out', onUpdate: () => player?.setProgress(playhead.progress) });
          trigger = ScrollTrigger.create({ trigger: section, start: 'top top', end: 'bottom bottom', onUpdate: self => tween?.(self.progress) });
          player.setProgress(trigger.progress);
          ScrollTrigger.refresh();
        } catch (error) {
          if (!controller.signal.aborted) { setLoading(false); section.classList.add('has-error'); console.error(error); }
        }
      })();
      cleanup = () => { controller.abort(); trigger?.kill(); tween?.tween.kill(); player?.destroy(); };
    };
    const stop = () => cleanup();
    const restore = (event: PageTransitionEvent) => { if (event.persisted) setup(); };
    setup(); media.addEventListener('change', setup); reduced.addEventListener('change', setup);
    window.addEventListener('beforeunload', stop); window.addEventListener('pagehide', stop); window.addEventListener('pageshow', restore);
    return () => { cleanup(); media.removeEventListener('change', setup); reduced.removeEventListener('change', setup); window.removeEventListener('beforeunload', stop); window.removeEventListener('pagehide', stop); window.removeEventListener('pageshow', restore); };
  }, []);
  return <section ref={root} id="top" className="sequence-hero" aria-label="Pradivya physical AI: road, rail and air">
    <div className="sequence-stage">
      <picture className="sequence-poster"><source media="(max-width:768px)" srcSet="/web/hero-poster-mobile.webp"/><img src="/web/hero-poster-desktop.webp" alt="Silver sports car on an industrial road in warm sunset light" fetchPriority="high"/></picture>
      <canvas aria-label="Illustrative inspection sequence: car, train and aircraft" role="img"/>
      <div className="sequence-scrim"/>
      <div className="sequence-transition" aria-hidden="true"/>
      {chapters.map((chapter, i) => { const Heading = i === 0 ? 'h1' : 'h2'; return <div key={chapter.start} className={`sequence-chapter ${i === 0 ? 'is-active' : ''}`} aria-hidden={i !== 0}>
        {chapter.label && <span className="sequence-eyebrow">{chapter.label}</span>}
        {i === 0 ? <h1 ref={openingReveal} className="sequence-opening-reveal" aria-label={chapter.lines.join(' ')}>{chapter.lines.map(line => <span key={line} aria-hidden="true"><span className="opening-line">{line}</span></span>)}</h1> : <Heading aria-label={chapter.lines.join(' ')}>{chapter.lines.map((line, row) => <span key={line} aria-hidden="true"><span>{[...line].map((letter, index) => <span className="sequence-letter" key={index} style={{ animationDelay: `${(row * 22 + index) * .014}s` }}>{letter}</span>)}</span></span>)}</Heading>}
        <p>{chapter.copy}</p>
        {i === 4 && <a href="#platform" className="sequence-cta">Meet Pradivya <span aria-hidden="true">↗</span></a>}
      </div>; })}
      <svg className="sequence-leader" aria-hidden="true"><line pathLength="1"/></svg>
      <div className="sequence-marker" aria-hidden="true"><i/></div>
      <div className="sequence-fault" aria-hidden="true"><div className="sequence-fault-surface"><div className="sequence-fault-brand"><img src="/img/pradivya-logo-small.webp" alt=""/><span>FAULT IDENTIFIED</span></div><strong/><span className="sequence-fault-detail"/></div></div>
      <div className="sequence-foot"><span>ILLUSTRATIVE INSPECTION · <a href="/hero-credits.html">CREDITS</a></span><a href="#thesis">SCROLL TO DISCOVER ↓</a></div>
      <div className="sequence-loader" role="status" aria-label={loading ? 'Preparing inspection animation' : 'Inspection animation ready'}>
        <img className="sequence-loader-logo" src="/img/pradivya-logo-small.webp" alt=""/>
        <span className="sequence-loader-label">INITIALIZING PHYSICAL AI</span>
        <AsciiReveal loading={loading} preset="terminal" lazy={false} revealOnMount={false}>
          {loading ? <AsciiSkeleton variant="scan" rows={4} width={220} height={48}/> : <span className="sequence-loader-ready">READY</span>}
        </AsciiReveal>
      </div>
      <div className="sequence-progress"/>
      <span className="sequence-error" role="status">Sequence unavailable. Explore the platform below.</span>
    </div>
  </section>;
}
