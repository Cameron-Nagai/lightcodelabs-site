import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: 'The SugarCubes',
      description: 'Interactive digital experience combining music visualization with immersive design elements.',
      image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400',
      tags: ['Interactive', 'Music', 'Visualization'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'The International Church of Cannabis',
      description: 'Spiritual and artistic digital platform celebrating creativity and consciousness.',
      image: '/public/IMG_9594.JPG',
      tags: ['Public Art', 'Audio/Visual', 'Architectural'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Kansas City Tree of Light',
      description: 'Public art installation with interactive lighting and community engagement features.',
      image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400',
      tags: ['Public Art', 'Interactive', 'Lighting'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Kaleidoscope',
      description: 'Dynamic visual experience featuring ever-changing patterns and immersive color displays.',
      image: 'https://images.pexels.com/photos/5380635/pexels-photo-5380635.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400',
      tags: ['Visual Art', 'Patterns', 'Immersive'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/10 to-black"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Portfolio
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our latest projects where cutting-edge technology meets innovative design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-cyan-400/20 bg-black/40 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      className="p-3 bg-cyan-400/20 border border-cyan-400/50 rounded-full hover:bg-cyan-400/30 transition-all duration-300"
                    >
                      <ExternalLink size={20} className="text-cyan-400" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-3 bg-cyan-400/20 border border-cyan-400/50 rounded-full hover:bg-cyan-400/30 transition-all duration-300"
                    >
                      <Github size={20} className="text-cyan-400" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;