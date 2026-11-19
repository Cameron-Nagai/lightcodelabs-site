import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent, FocusEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

const LINKS = [
  { deg: 174, href: '#sound-rentals', caption: 'Void Air Motion Speakers · In our rental fleet', eyebrow: 'Hear it', title: 'Sound Rentals', description: 'PA systems with delivery, setup and an on-site operator.' },
  { deg: 138, href: '#lighting-rentals', caption: 'Sugarcubes · In our rental fleet', eyebrow: 'Light it', title: 'Lighting Rentals', description: 'Moving heads, par cans and full stage rigs.' },
  { deg: -30, href: '#led-design', caption: 'Church of Cannabis Denver', eyebrow: 'Build it', title: 'Custom LED Design', description: 'Pixel-mapped installations that respond to music.' },
  { deg: 6, href: '#experiential-design', caption: 'Electric Forest Festival', eyebrow: 'Feel it', title: 'Experiential Design', description: 'Immersive environments that engage every sense.' },
  { deg: 42, href: '#portfolio', caption: 'Cuttlefish Art Car', eyebrow: 'See it', title: 'Portfolio', description: "LED sculptures and installations we've built." },
  { deg: 90, href: '#contact', caption: '', eyebrow: 'Book it', title: 'Contact', description: 'Tell us about your event and get a quote.' },
];

const PHOTOS: Record<number, { src: string; position: string }> = {
  1: { src: '/hero/lighting-rentals.jpg', position: '50% 50%' },
  2: { src: '/hero/led-design.jpg', position: '64% 50%' },
  3: { src: '/hero/experiential-design.jpg', position: '50% 50%' },
  4: { src: '/hero/portfolio.jpg', position: '50% 38%' },
};

const TICKS = Array.from({ length: 60 }, (_, i) => {
  const a = (i * 6 * Math.PI) / 180;
  const p = (r: number) => `${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`;
  return `M${p(46.9)}L${p(47.9)}`;
}).join('');

function Hero() {
  const [active, setActive] = useState<number | null>(null);
  const [auto, setAuto] = useState<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const shown = active ?? auto;
  const caption = (shown !== null && LINKS[shown].caption) || LINKS[0].caption;

  useEffect(() => {
    const touch = window.matchMedia('(hover: none), (max-width: 1023.98px)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | undefined;
    const sync = () => {
      window.clearInterval(timer);
      setAuto(null);
      if (!touch.matches || still.matches) return;
      setAuto(0);
      timer = window.setInterval(() => setAuto((n) => ((n ?? 0) + 1) % 5), 3200);
    };
    sync();
    touch.addEventListener('change', sync);
    still.addEventListener('change', sync);
    return () => {
      window.clearInterval(timer);
      touch.removeEventListener('change', sync);
      still.removeEventListener('change', sync);
    };
  }, []);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const root = rootRef.current;
    if (e.pointerType !== 'mouse' || !root) return;
    const rect = root.getBoundingClientRect();
    root.style.setProperty('--px', (((e.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
    root.style.setProperty('--py', (((e.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
  };

  const onPointerLeave = () => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty('--px', '0');
    root.style.setProperty('--py', '0');
  };

  const onLinkFocus = (e: FocusEvent<HTMLAnchorElement>, i: number) => {
    if (e.currentTarget.matches(':focus-visible')) setActive(i);
  };

  return (
    <header
      ref={rootRef}
      className="hero"
      data-active={active !== null}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero__stage">
          <h1 className="hero__headline">
            <span className="hero__headline-main">Sound and <br />Lighting</span>
            <span className="hero__headline-sub">Like You've Never Seen or Heard Before</span>
          </h1>
          <div className="hero__ring">
            <span className="hero-ring__outer" />
            <svg className="hero-ring__ticks" viewBox="0 0 100 100" aria-hidden="true">
              <path d={TICKS} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="hero-ring__inner" />
            <span className="hero-orbit">
              <span className="hero-orbit__band" />
              <span className="hero-orbit__head" />
            </span>
            {LINKS.map((link, i) => (
              <span key={link.href} className="hero-arc" data-on={active === i} style={{ '--deg': link.deg } as CSSProperties}>
                <span className="hero-arc__band" />
              </span>
            ))}
            {[0, 1, 2].map((n) => (
              <span key={n} className="hero-pulse" style={{ '--i': n } as CSSProperties} />
            ))}
            <div className="hero-disc" data-photo={shown !== null && shown in PHOTOS}>
              {Object.entries(PHOTOS).map(([i, photo]) => (
                <img
                  key={photo.src}
                  className="hero-photo"
                  data-on={shown === Number(i)}
                  src={photo.src}
                  alt=""
                  style={{ objectPosition: photo.position }}
                  draggable={false}
                />
              ))}
              <div className="hero-speaker-drift">
                <div className="hero-speaker-float">
                  <img
                    className="hero-speaker"
                    src="/void-air-motion.png"
                    alt="Red Void Air Motion loudspeaker"
                    width={1024}
                    height={1024}
                    draggable={false}
                  />
                </div>
              </div>
            </div>
            <p className="hero__caption"><span key={caption}>{caption}</span></p>
          </div>
          <nav className="hero__nav" aria-label="Sections">
            <ul>
              {LINKS.map((link, i) => {
                const cos = Math.cos((link.deg * Math.PI) / 180);
                const sin = Math.sin((link.deg * Math.PI) / 180);
                const side = link.deg === 90 ? 'bottom' : cos < 0 ? 'left' : 'right';
                return (
                  <li key={link.href} style={{ '--i': i } as CSSProperties}>
                    <a
                      className="hero-link"
                      href={link.href}
                      data-side={side}
                      data-on={shown === i}
                      style={{ '--acos': Math.abs(cos).toFixed(4), '--sin': sin.toFixed(4) } as CSSProperties}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                      onPointerLeave={() => setActive(null)}
                      onFocus={(e) => onLinkFocus(e, i)}
                      onBlur={() => setActive(null)}
                    >
                      <span className="hero-link__eyebrow">
                        <span className="hero-link__num">{String(i + 1).padStart(2, '0')}</span> / {link.eyebrow}
                      </span>
                      <span className="hero-link__row">
                        <span className="hero-link__title">
                          {link.title}
                          <ArrowUpRight className="hero-link__arrow" aria-hidden="true" />
                        </span>
                        <span className="hero-link__rail" aria-hidden="true">
                          <span className="hero-link__line" />
                          <span className="hero-link__dot" />
                        </span>
                      </span>
                      <span className="hero-link__desc">{link.description}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <div className="hero__fade" aria-hidden="true" />
    </header>
  );
}

export default Hero;
