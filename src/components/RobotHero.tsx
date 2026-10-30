import { useEffect, useRef, useState } from 'react';

export default function RobotHero() {
  const host = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(() => window.innerWidth > 760 && !matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const element = host.current;
    if (!element || !interactive) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import('./rerunScene').then(({ mountRerunScene }) => {
      if (cancelled) return;
      dispose = mountRerunScene(element);
      element.closest('.hero')?.classList.add('has-3d');
    }).catch(error => { console.warn('Robot scene unavailable', error); setInteractive(false); });
    return () => { cancelled = true; dispose?.(); element.closest('.hero')?.classList.remove('has-3d'); };
  }, [interactive]);
  return <>
    <div className={`robot-canvas ${interactive ? 'is-interactive' : 'is-preview'}`} ref={host} aria-label={interactive ? 'Interactive industrial robot. Move the pointer to guide the arm; drag to orbit the scene.' : 'Industrial robot with multisensory signal ribbons'} role="img">
      {!interactive && <picture><source media="(max-width:760px)" srcSet="/img/robot-preview-mobile.webp"/><img src="/img/robot-preview-desktop.webp" alt="" width="1414" height="816" fetchPriority="high"/></picture>}
    </div>
    <button className="robot-mode-toggle" onClick={() => setInteractive(value => !value)} aria-pressed={interactive}>{interactive ? 'Pause 3D · show still' : 'Enable 3D robot'}</button>
  </>;
}
