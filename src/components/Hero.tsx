import React from 'react';
import { ArrowRight, Code, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
            <span className="text-white">Light</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
              Code
            </span>
            <span className="text-white"> Labs</span>
          </h1>

          {/* Tagline */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed">
            Where <span className="text-cyan-400 font-medium">design</span> meets{' '}
            <span className="text-cyan-400 font-medium">technology</span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Crafting cutting-edge digital experiences through innovative design and advanced technology solutions
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button className="group bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
              View Our Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group border border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-400/10 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
              <Code size={20} />
              Start Project
            </button>
          </div>

          {/* Feature Icons */}
          <div className="flex items-center justify-center gap-12 pt-16">
            <div className="group flex flex-col items-center gap-3">
              <div className="p-4 rounded-full border border-cyan-400/30 group-hover:border-cyan-400 transition-colors duration-300">
                <Code size={32} className="text-cyan-400" />
              </div>
              <span className="text-gray-400 text-sm font-medium">Development</span>
            </div>
            
            <div className="group flex flex-col items-center gap-3">
              <div className="p-4 rounded-full border border-cyan-400/30 group-hover:border-cyan-400 transition-colors duration-300">
                <Zap size={32} className="text-cyan-400" />
              </div>
              <span className="text-gray-400 text-sm font-medium">Innovation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;