import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowUpRight } from 'lucide-react';
import Carousel from './Carousel';
import type { CarouselItem } from './Carousel';

export interface PortfolioProject {
  name: string;
  introVideo?: string;
  images: string[];
}

function projectSlides(project: PortfolioProject): CarouselItem[] {
  const media: { url: string; type: 'image' | 'video' }[] = project.images.map((url) => ({ url, type: 'image' }));
  if (project.introVideo) media.unshift({ url: project.introVideo, type: 'video' });
  return media.map((item, i) => ({ ...item, caption: `${project.name} · ${i + 1} / ${media.length}` }));
}

interface PortfolioProps {
  projects: PortfolioProject[];
  onContactClick: () => void;
}

function Portfolio({ projects, onContactClick }: PortfolioProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? null : projects[openIndex];

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openIndex]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7 lg:gap-x-8 lg:gap-y-10">
        {projects.map((project, index) => (
          <button
            key={project.name}
            onClick={() => setOpenIndex(index)}
            className="group lc-pcard lc-reveal relative aspect-[4/3] overflow-hidden rounded-2xl bg-black text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            style={{ '--i': index % 3 } as CSSProperties}
            aria-label={project.introVideo ? `View ${project.name} gallery` : `View ${project.name} photos`}
          >
            <img src={project.images[0]} alt={project.name} referrerPolicy="no-referrer" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
            <span className="absolute bottom-4 left-4 bg-black/70 border border-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-base md:text-lg font-semibold text-white inline-flex items-center gap-1.5">
              {project.name}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
            <span className="absolute top-4 right-4 bg-black/70 border border-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-200 font-mono">
              {project.images.length} {project.images.length === 1 ? 'photo' : 'photos'}{project.introVideo ? ' + 1 video' : ''}
            </span>
          </button>
        ))}
      </div>

      <div className="lc-reveal text-center mt-12">
        <p className="text-white/70 mb-4">Want something like this at your event?</p>
        <button
          onClick={onContactClick}
          className="lc-btn px-8 py-4 text-lg"
        >
          Start Your Project
        </button>
      </div>

      {open && createPortal(
        <div
          className="portfolio-dialog fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.introVideo ? `${open.name} gallery` : `${open.name} photos`}
        >
          <button
            onClick={() => setOpenIndex(null)}
            className="portfolio-dialog__close lc-iconbtn absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full transition-all hover:scale-110"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="portfolio-dialog__panel w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">{open.name}</h3>
            <Carousel
              key={open.name}
              images={projectSlides(open)}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Portfolio;
