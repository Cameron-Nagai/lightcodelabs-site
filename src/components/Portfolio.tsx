import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Carousel from './Carousel';

export interface PortfolioProject {
  name: string;
  images: string[];
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <button
            key={project.name}
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-950 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={`View ${project.name} photos`}
          >
            <img src={project.images[0]} alt={project.name} referrerPolicy="no-referrer" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/40" />
            <span className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm md:text-base font-semibold text-white">
              {project.name}
            </span>
            <span className="absolute bottom-4 right-4 bg-gray-900/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-200">
              {project.images.length} {project.images.length === 1 ? 'photo' : 'photos'}
            </span>
          </button>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-300 mb-4">Want something like this at your event?</p>
        <button
          onClick={onContactClick}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
        >
          Start Your Project
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${open.name} photos`}
        >
          <button
            onClick={() => setOpenIndex(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full transition-all hover:scale-110"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">{open.name}</h3>
            <Carousel
              key={open.name}
              images={open.images.map((url, i) => ({ url, caption: `${open.name} · ${i + 1} / ${open.images.length}`, type: 'image' }))}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
