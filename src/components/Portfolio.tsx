import { useState } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {projects.map((project, index) => (
          <button
            key={project.name}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
              index === activeIndex
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            {project.name}
          </button>
        ))}
      </div>

      <Carousel
        key={active.name}
        images={active.images.map((url, i) => ({
          url,
          caption: `${active.name} · ${i + 1} / ${active.images.length}`,
          type: 'image'
        }))}
      />

      <div className="text-center mt-12">
        <p className="text-gray-300 mb-4">Want something like this at your event?</p>
        <button
          onClick={onContactClick}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
        >
          Start Your Project
        </button>
      </div>
    </div>
  );
}

export default Portfolio;
