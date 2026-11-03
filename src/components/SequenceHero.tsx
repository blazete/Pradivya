import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import { AsciiReveal, AsciiSkeleton } from 'ascii-reveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import type Lenis from 'lenis';
import { SequencePlayer } from '../lib/sequence-player';
import './sequence-hero.css';
import { withBase } from '../lib/base';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
// `rest` is the frame a scroll step settles on for each chapter; each fault callout adds two resting points: its middle
// frame, and the chapter headline again once the card has gone.
const chapters = [
  { start: 0, end: 27, rest: 0, label: 'PHYSICAL AI · PRADIVYA', lines: ['Intelligence for', 'a world in motion.'], copy: 'See the fault. Understand the signal. Keep the world moving.' },
  { start: 28, end: 109, rest: 45, label: '', lines: ['Every surface.', 'Every signal.'], copy: 'Inspection that looks beyond the obvious.' },
  { start: 110, end: 195, rest: 128, label: '', lines: ['Small faults.', 'Bigger consequences.'], copy: 'Vision, sound and vibration. One connected picture.' },
  { start: 196, end: 267, rest: 215, label: '', lines: ['Precision.', 'Without pause.'], copy: 'A closer look at the machines that move us.' },
  { start: 268, end: 299, rest: 299, label: 'ONE MULTISENSORY PLATFORM', lines: ['Many machines.', 'One intelligence.'], copy: 'Physical AI, built for the real world.' },
];
type Metadata = { frames: number; callouts: Record<string, { severity: string; title: string; detail: string; start: number; end: number }>; anchors: Record<string, [number, number, number][]> };
// Ease-out cubic: answers the gesture at once and coasts into the resting frame (velocity eases to zero), instead of
// the symmetric sine that braked late and felt abrupt (owner 2026-11-04).
const ease = (t: number) => 1 - (1 - t) ** 3;

export default function SequenceHero({ lenis }: { lenis: MutableRefObject<Lenis | undefined> }) {
  const root = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(true);
  const openingReveal = useRef<HTMLHeadingElement>(null);
  const openingPlayed = useRef(false);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let animation: gsap.core.Tween | undefined;
    const heading = openingReveal.current;
    const lines = heading?.querySelectorAll<HTMLElement>('.opening-line');
    // The opening headline waits only for its font, not for the frame sequence.
    void document.fonts.load('400 64px Geist').then(() => {
      if (disposed || openingPlayed.current || !heading || !lines) return;
      openingPlayed.current = true;
      heading.classList.add('is-decoding');
      animation = gsap.to(lines, { duration: 1.25, stagger: .12, scrambleText: { text: '{original}', chars: '01<>/[]{}', revealDelay: .15, speed: .5 }, onComplete: () => heading.classList.add('decode-complete') });
    });
    return () => {
      disposed = true;
      animation?.kill();
      lines?.forEach((line, index) => { line.textContent = chapters[0].lines[index]; });
    };
  }, []);
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
      const stage = section.querySelector<HTMLElement>('.sequence-stage')!;
      const headlineNodes = [...section.querySelectorAll<HTMLElement>('.sequence-chapter')];
      const fault = section.querySelector<HTMLElement>('.sequence-fault')!;
      const marker = section.querySelector<HTMLElement>('.sequence-marker')!;
      const leader = section.querySelector<SVGLineElement>('.sequence-leader line')!;
      const progress = section.querySelector<HTMLElement>('.sequence-progress')!;
      const scrim = section.querySelector<HTMLElement>('.sequence-scrim')!;
      section.classList.toggle('is-reduced', reduced.matches);
      section.classList.remove('is-ready', 'has-error', 'is-slow', 'is-stepping');
      section.dataset.frame = '0';
      stage.style.setProperty('--exit-progress', '0');
      headlineNodes.forEach((node, i) => { node.classList.toggle('is-active', i === 0); node.setAttribute('aria-hidden', String(i !== 0)); });
      fault.classList.remove('is-active'); marker.classList.remove('is-active'); stage.classList.remove('is-inspecting');
      leader.parentElement!.classList.remove('is-active');
      const slow = setTimeout(() => section.classList.add('is-slow'), 1200);
      const camera = media.matches ? 'mobile' : 'desktop';
      // Layout is read only on resize and when the fault card's text changes, never per frame.
      let size = { w: 0, h: 0, fw: 0, fh: 0 }, chapter = -1, callout: string | undefined = '', exit = -1;
      const measure = () => { size = { w: stage.clientWidth, h: stage.clientHeight, fw: fault.offsetWidth, fh: fault.offsetHeight }; };
      const update = (frame: number, data: Metadata) => {
        if (!player) return;
        section.dataset.frame = String(frame);
        const t = Math.max(0, Math.min(1, (frame - 276) / 23)), e = t * t * (3 - 2 * t);
        if (e !== exit) { exit = e; stage.style.setProperty('--exit-progress', String(e)); }
        progress.style.transform = `scaleX(${frame / 299})`;
        const index = chapters.findIndex(c => frame >= c.start && frame <= c.end);
        const key = Object.keys(data.callouts).find(k => frame >= data.callouts[k].start && frame <= data.callouts[k].end && data.anchors[k]?.[frame]?.[2]);
        if (key !== callout) {
          stage.classList.toggle('is-inspecting', Boolean(key));
          fault.classList.toggle('is-active', Boolean(key)); marker.classList.toggle('is-active', Boolean(key));
          leader.parentElement!.classList.toggle('is-active', Boolean(key));
          fault.setAttribute('aria-hidden', String(!key));
          if (key) {
            const c = data.callouts[key];
            stage.style.setProperty('--fault-color', c.severity === 'amber' ? '#ffc36b' : '#ff697c');
            fault.querySelector('strong')!.textContent = c.title.replace('Fault · ', '').replace('Thermal · ', '');
            fault.querySelector('.sequence-fault-detail')!.textContent = c.detail;
            measure();
          }
        }
        if (index !== chapter || key !== callout) {
          headlineNodes.forEach((node, i) => { node.classList.toggle('is-active', i === index); node.setAttribute('aria-hidden', String(i !== index || Boolean(key))); });
          scrim.style.setProperty('--scrim-opacity', media.matches || frame < 28 ? '.35' : '.6');
        }
        chapter = index; callout = key;
        if (!key) return;
        const [x, y] = player.toScreen(data.anchors[key][frame][0], data.anchors[key][frame][1]);
        const left = Math.max(16, Math.min(size.w - size.fw - 16, x + (media.matches ? -size.fw / 2 : 70)));
        const top = Math.max(90, Math.min(size.h - size.fh - 30, y - size.fh - 54));
        fault.style.transform = `translate(${left}px,${top}px)`;
        marker.style.transform = `translate(${x}px,${y}px)`;
        leader.setAttribute('x1', String(x)); leader.setAttribute('y1', String(y));
        leader.setAttribute('x2', String(left + size.fw / 2)); leader.setAttribute('y2', String(top + size.fh));
      };
      const offs: (() => void)[] = [];
      const listen = <E extends Event>(target: EventTarget, type: string, fn: (e: E) => void, options?: AddEventListenerOptions) => { target.addEventListener(type, fn as EventListener, options); offs.push(() => target.removeEventListener(type, fn as EventListener, options)); };
      let settleTimer = 0;
      void (async () => {
        try {
          const response = await fetch(withBase(`/web/overlay_${camera}.json`), { signal: controller.signal, mode: 'same-origin' });
          if (!response.ok) throw new Error('Sequence metadata unavailable');
          const data: Metadata = await response.json();
          if (data.frames !== 300 || !data.anchors || !data.callouts) throw new Error('Invalid sequence metadata');
          if (controller.signal.aborted) return;
          // Resting points (owner 2026-11-04): each chapter, each fault card's middle, and the chapter again after its card.
          const faults = Object.values(data.callouts), chapterOf = (c: { start: number }) => chapters.find(ch => c.start >= ch.start && c.start <= ch.end)!;
          const stops = [...new Set([...chapters.map(c => c.rest), ...faults.map(c => Math.round((c.start + c.end) / 2)), ...faults.map(c => Math.round((c.end + chapterOf(c).end) / 2))])].sort((a, b) => a - b);
          // Phones and Save-Data load every second frame (resting frames always); playback holds the previous frame in between.
          const lean = media.matches || Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
          listen(window, 'resize', measure);
          player = new SequencePlayer({ canvas, urlFor: i => withBase(`/web/frames/${camera}/${String(i).padStart(4, '0')}.webp`), frameCount: reduced.matches ? 1 : data.frames, stride: lean ? 2 : 1, keep: stops, concurrency: media.matches ? 3 : 4, maxCacheBytes: (media.matches ? 64 : 128) * 1024 * 1024, onFrame: f => update(f, data), onError: () => section.classList.add('has-error') });
          await player.init();
          if (controller.signal.aborted) return;
          clearTimeout(slow); section.classList.add('is-ready'); setLoading(false); measure(); update(0, data);
          if (reduced.matches) return;
          const p = player;
          // Stepped playback: every gesture inside the pinned hero plays to the next or previous resting frame.
          let stepping = false, runs = 0, rest: number | undefined;
          const stopY = (frame: number) => trigger!.start + (trigger!.end - trigger!.start) * frame / 299;
          const frameNow = () => Math.round(Math.max(0, Math.min(1, (scrollY - trigger!.start) / Math.max(1, trigger!.end - trigger!.start))) * 299);
          const engaged = () => scrollY >= trigger!.start - 2 && scrollY <= trigger!.end + 2;
          const canGo = (dir: number) => dir > 0 ? frameNow() < stops[stops.length - 1] : frameNow() > stops[0];
          const prefetchAround = (frame: number) => { const i = stops.indexOf(frame); if (i < stops.length - 1) p.prefetch(frame, stops[i + 1]); if (i > 0) p.prefetch(frame, stops[i - 1]); };
          const run = (i: number) => {
            const from = frameNow(), to = stops[i], token = ++runs;
            stepping = true; rest = undefined; section.classList.add('is-stepping'); clearTimeout(settleTimer);
            const done = () => { if (token !== runs) return; stepping = false; rest = to; section.classList.remove('is-stepping'); prefetchAround(to); };
            // Frames of the segment are fetched first; on a slow network the step starts anyway and holds the last good frame.
            void Promise.race([p.preload(from, to), new Promise(resolve => setTimeout(resolve, 1500))]).then(() => {
              if (token !== runs || controller.signal.aborted) return;
              const l = lenis.current;
              if (!l) { window.scrollTo({ top: stopY(to), behavior: 'instant' }); done(); return; }
              // __heroStepScale: test-only speed-up (tests/launch.spec.ts); 1 in production.
              const scale = (window as Window & { __heroStepScale?: number }).__heroStepScale ?? 1;
              l.scrollTo(stopY(to), { duration: scale * Math.max(1.2, Math.min(2.4, Math.abs(to - frameNow()) / 25)), easing: ease, lock: true, force: true, onComplete: done });
            });
          };
          const go = (dir: number) => {
            const f = frameNow();
            // Exactly one resting point per gesture: input while a step plays is swallowed, never queued (owner 2026-11-04).
            if (stepping) return;
            let i = -1;
            if (dir > 0) i = stops.findIndex(s => s > f);
            else if (dir < 0) { for (let k = stops.length - 1; k >= 0; k--) if (stops[k] < f) { i = k; break; } }
            else i = stops.reduce((best, s, k) => Math.abs(s - f) < Math.abs(stops[best] - f) ? k : best, 0);
            if (i >= 0) run(i);
          };
          // A scroll that comes to rest between resting points (scrollbar, native touch momentum, restored position) finishes its step.
          // Not while Lenis is still animating (an anchor link passing through): a >200 ms main-thread stall would hijack it.
          const settle = (dir: number) => { if (lenis.current?.isScrolling === 'smooth') { settleTimer = window.setTimeout(settle, 200, dir); return; } if (!stepping && !stops.includes(frameNow())) go(dir); };
          // Frames follow the document scroll 1:1; the easing comes from the step's timed scroll, so nothing smooths twice.
          trigger = ScrollTrigger.create({ trigger: section, start: 'top top', end: 'bottom bottom', onUpdate: self => { p.setProgress(self.progress); if (!stepping) { clearTimeout(settleTimer); settleTimer = window.setTimeout(settle, 200, self.direction); } } });
          let wheel = { t: -1e9, dir: 0, last: 0, owned: false };
          listen<WheelEvent>(window, 'wheel', e => {
            if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
            const abs = Math.abs(e.deltaY) * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1), dir = Math.sign(e.deltaY);
            // One gesture = one step. A stream with <200 ms gaps is one gesture, including trackpad momentum; so is a late,
            // still-decaying tail (<8 px, <1 s gap).
            const gap = e.timeStamp - wheel.t, tail = gap < 1000 && abs < 8 && abs <= wheel.last;
            if (dir !== wheel.dir || gap > 200 && !tail) wheel = { t: 0, dir, last: abs, owned: false };
            wheel.t = e.timeStamp; wheel.last = abs;
            if (!wheel.owned) {
              if (!engaged() || !(stepping || canGo(dir))) return;
              wheel.owned = true; go(dir);
            }
            e.preventDefault(); e.stopPropagation();
          }, { capture: true, passive: false });
          let touch: { x: number; y: number; owned?: boolean; stepped?: boolean } | undefined;
          listen<TouchEvent>(window, 'touchstart', e => { touch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : undefined; }, { capture: true, passive: true });
          listen<TouchEvent>(window, 'touchmove', e => {
            if (!touch || e.touches.length !== 1) return;
            const dx = touch.x - e.touches[0].clientX, dy = touch.y - e.touches[0].clientY, dir = Math.sign(dy);
            // Ownership is decided once per swipe, so a swipe never half-scrolls the page and half-steps the hero.
            if (touch.owned === undefined) { if (Math.abs(dy) < 2 || Math.abs(dx) > Math.abs(dy)) return; touch.owned = engaged() && (stepping || canGo(dir)); }
            if (!touch.owned) return;
            if (e.cancelable) e.preventDefault();
            if (!touch.stepped && Math.abs(dy) > 24) { touch.stepped = true; go(dir); }
          }, { capture: true, passive: false });
          listen<KeyboardEvent>(window, 'keydown', e => {
            if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || (e.target as Element).closest?.('input,textarea,select,button,[contenteditable]')) return;
            const dir = e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' && !e.shiftKey ? 1 : e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === ' ' ? -1 : 0;
            if (!dir || !engaged() || !(stepping || canGo(dir))) return;
            e.preventDefault(); if (!e.repeat) go(dir);
          });
          // Keep a resting frame exact when the trigger geometry changes (resize, late fonts).
          const resnap = () => { if (!stepping && rest !== undefined && engaged() && Math.abs(frameNow() - rest) <= 4) lenis.current?.scrollTo(stopY(rest), { immediate: true, force: true }); };
          ScrollTrigger.addEventListener('refresh', resnap);
          offs.push(() => ScrollTrigger.removeEventListener('refresh', resnap));
          p.setProgress(trigger.progress);
          if (stops.includes(frameNow())) { rest = frameNow(); prefetchAround(rest); } else settle(0);
        } catch (error) {
          if (!controller.signal.aborted) { clearTimeout(slow); setLoading(false); section.classList.add('has-error'); console.error(error); }
        }
      })();
      cleanup = () => { controller.abort(); clearTimeout(slow); clearTimeout(settleTimer); offs.forEach(off => off()); trigger?.kill(); player?.destroy(); };
    };
    const stop = () => cleanup();
    const restore = (event: PageTransitionEvent) => { if (event.persisted) setup(); };
    setup(); media.addEventListener('change', setup); reduced.addEventListener('change', setup);
    window.addEventListener('beforeunload', stop); window.addEventListener('pagehide', stop); window.addEventListener('pageshow', restore);
    return () => { cleanup(); media.removeEventListener('change', setup); reduced.removeEventListener('change', setup); window.removeEventListener('beforeunload', stop); window.removeEventListener('pagehide', stop); window.removeEventListener('pageshow', restore); };
  }, [lenis]);
  return <section ref={root} id="top" className="sequence-hero" aria-label="Pradivya physical AI: road, rail and air">
    <div className="sequence-stage">
      <picture className="sequence-poster"><source media="(max-width:768px)" srcSet={withBase("/web/hero-poster-mobile.webp")}/><img src={withBase("/web/hero-poster-desktop.webp")} alt="Silver sports car on an industrial road in warm sunset light" fetchPriority="high"/></picture>
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
      <div className="sequence-fault" aria-hidden="true"><div className="sequence-fault-surface"><div className="sequence-fault-brand"><img src={withBase("/img/pradivya-logo-small.webp")} alt=""/><span>FAULT IDENTIFIED</span></div><strong/><span className="sequence-fault-detail"/></div></div>
      <div className="sequence-foot"><a href="#thesis">SCROLL TO DISCOVER ↓</a></div>
      <div className="sequence-loader" role="status" aria-label={loading ? 'Preparing inspection animation' : 'Inspection animation ready'}>
        <img className="sequence-loader-logo" src={withBase("/img/pradivya-logo-small.webp")} alt=""/>
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
