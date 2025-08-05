import React from 'react';
import { Cpu, Users, Lightbulb, Target } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Cpu size={32} />,
      title: 'Advanced Technology',
      description: 'Leveraging cutting-edge tools and frameworks to build next-generation digital solutions.'
    },
    {
      icon: <Users size={32} />,
      title: 'Expert Team',
      description: 'A collective of designers, developers, and strategists passionate about innovation.'
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Creative Solutions',
      description: 'Transforming complex challenges into elegant, user-centered design experiences.'
    },
    {
      icon: <Target size={32} />,
      title: 'Results Driven',
      description: 'Focused on delivering measurable outcomes that drive business growth and success.'
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">About </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              LightCode Labs
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We are a forward-thinking design agency specializing in creating immersive digital experiences 
            that push the boundaries of technology and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-cyan-400/20 bg-black/40 backdrop-blur-sm hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;