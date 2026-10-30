import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(CustomEase, useGSAP);
CustomEase.create('heroRise', '.2,.7,.2,1');
CustomEase.create('heroPress', '.3,1.6,.5,1');

const presence = 'Backed by the Polsky Center, University of Chicago · San Francisco';
const decodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#/<>01';
const decodeTweens = new WeakMap<HTMLElement, gsap.core.Tween>();

// Scrambles only the label span, and kills only its own previous decode tween
// (never killTweensOf on the button, or the fade-in tween gets killed too).
function decode(link: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const label = link.dataset.text ?? '';
  const el = link.querySelector<HTMLElement>('.pill-label');
  if (!el) return;
  decodeTweens.get(link)?.kill();
  const state = { p: 0 };
  decodeTweens.set(link, gsap.to(state, {
    p: 1, duration: .48, ease: 'none',
    onUpdate() {
      const revealed = Math.floor(state.p * label.length);
      el.textContent = [...label].map((c, i) =>
        c === ' ' || i < revealed ? c : decodeChars[Math.floor(Math.random() * decodeChars.length)]
      ).join('');
    },
    onComplete() { el.textContent = label; },
  }));
}

export function HeroPresence() {
  return (
    <div className="sf-presence-block">
      <a className="sf-presence-context" href="#hub">
        {presence} <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </div>
  );
}

export default function HeroMessaging() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root);
      const actions = q('.rerun-actions .pill') as HTMLElement[];
      const robot = document.querySelector<HTMLElement>('.robot-canvas');

      const tl = gsap.timeline();
      tl.from(q('.hero-eyebrow'), { autoAlpha: 0, y: 8, duration: .6, ease: 'power2.out' }, 0)
        .from(q('.hero-line-inner'), { yPercent: 110, duration: .9, ease: 'heroRise', stagger: .12 }, 0)
        .from(q('.sense-see'), { filter: 'blur(6px)', opacity: .3, duration: .48, ease: 'power2.out' }, .75)
        .to(q('.sense-hear-letter'), { y: -6, duration: .22, stagger: .045, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 1)
        .to(q('.sense-feel'), { scale: .9, duration: .2, ease: 'power2.in' }, 1.3)
        .to(q('.sense-feel'), { scale: 1, duration: .3, ease: 'heroPress' }, 1.5)
        .from(q('.hero-support'), { autoAlpha: 0, y: 8, duration: .6, ease: 'power2.out' }, 1.45)
        .from(actions, { autoAlpha: 0, y: 8, duration: .4, stagger: .08, ease: 'power2.out' }, 1.65)
        .call(() => actions.forEach(decode), [], 1.65);

      // Starts with the bottom-left (robot) corner visible, wipes out to top-right
      if (robot) {
        tl.fromTo(robot,
          { clipPath: 'inset(55% 65% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power2.inOut' }, 1.8);
      }
    });
  }, { scope: root });

  return (
    <div ref={root} className="hero-copy">
      <p className="eyebrow hero-eyebrow">Physical AI for industrial inspection.</p>
      <h1>
        <span className="hero-line-mask"><span className="hero-line-inner">
          <span className="sense-see">See</span>,{' '}
          <span className="sense-hear">
            <span className="sr-only">hear</span>
            {[...'hear'].map((l, i) => (
              <span className="sense-hear-letter" aria-hidden="true" key={i}>{l}</span>
            ))}
          </span>{' '}and
        </span></span>
        <span className="hero-line-mask"><span className="hero-line-inner">
          <span className="sense-feel">feel</span> every defect.
        </span></span>
      </h1>
      <p className="hero-support">Multisensory AI that catches what cameras alone miss.</p>
      <div className="rerun-actions">
        <a className="pill bright-pill" href="/contact#request" aria-label="Book a demo"
           data-text="BOOK A DEMO" onMouseEnter={e => decode(e.currentTarget)} onFocus={e => decode(e.currentTarget)}>
          <span className="pill-label" aria-hidden="true">BOOK A DEMO</span>
        </a>
        <a className="pill rerun-secondary" href="#platform" aria-label="Explore the platform"
           data-text="EXPLORE THE PLATFORM" onMouseEnter={e => decode(e.currentTarget)} onFocus={e => decode(e.currentTarget)}>
          <span className="pill-label" aria-hidden="true">EXPLORE THE PLATFORM</span>
        </a>
      </div>
    </div>
  );
}
