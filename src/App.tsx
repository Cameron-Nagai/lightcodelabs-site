import { useState, useRef } from 'react';
import { Zap, Music, Sparkles, Mail, Phone, MapPin, Menu, X, Lightbulb } from 'lucide-react';
import Carousel from './components/Carousel';
import ServiceCard from './components/ServiceCard';
import ContactForm from './components/ContactForm';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const servicesRef = useRef<HTMLElement>(null);
  const lightingRentalsRef = useRef<HTMLElement>(null);
  const soundRentalsRef = useRef<HTMLElement>(null);
  const ledDesignRef = useRef<HTMLElement>(null);
  const experientialRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const services = [
    {
      icon: Lightbulb,
      title: 'Event Lighting Rentals',
      description: 'Professional lighting equipment for events of all sizes',
      ref: lightingRentalsRef,
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      icon: Music,
      title: 'Event Sound Rentals',
      description: 'Professional audio equipment and technical support',
      ref: soundRentalsRef,
      gradient: 'from-purple-600 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Custom LED Lighting Design',
      description: 'Innovative LED installations that transform spaces',
      ref: ledDesignRef,
      gradient: 'from-orange-500 to-pink-500'
    },
    {
      icon: Sparkles,
      title: 'Experiential Design for Events',
      description: 'Immersive experiences that captivate and engage',
      ref: experientialRef,
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  const lightingRentalsPortfolio = [
    { 
      // Using animated WebP/GIF for smooth, reliable playback
      url: 'https://i.imgur.com/3cHHvX4.gif',
      caption: 'Full Room Event Lighting', 
      type: 'image' 
    },
    { url: 'https://i.imgur.com/VFkCnKM.jpeg', caption: 'Custom Stage Design', type: 'image' },
    { url: 'https://i.imgur.com/cAZhXp5.jpeg', caption: 'Stage Lighting Packages', type: 'image' },
    { url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Live Event Production', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54928984748_9c5d2c28c2_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Stage & Truss Configuration', type: 'image' },
    { url: 'https://images.pexels.com/photos/2102568/pexels-photo-2102568.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Venue Lighting Design', type: 'image' }
  ];

  const soundRentalsPortfolio = [
    { url: 'https://i.imgur.com/AbUUj8k.jpeg', caption: 'Boutique Void Sound System', type: 'image' },
    { url: 'https://i.imgur.com/igKiLJO.png', caption: 'DJ Equipment & Audio Setup', type: 'image' },
    { url: 'https://static1.squarespace.com/static/6470e041f3511e5436207665/6470e053f3511e5436207be1/6484bed25290055c8981bf08/1709328401620/Kalid.png?format=1500w', caption: 'Live Sound Audio Engineering', type: 'image' }
  ];

  const ledDesignPortfolio = [
    { url: 'https://live.staticflickr.com/65535/54929014629_7126a07488_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'LED Sculpture Design', type: 'image' },
    { url: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Custom LED Stage Installations', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54929072725_81134c87c1_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Immersive Interactive LED Installations', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54929072665_6859056d4b_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Architectural Lighting Design', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54927900877_eb7a0f0029_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Dynamic Color Changing Systems', type: 'image' }
  ];

  const experientialPortfolio = [
    { url: 'https://i.imgur.com/JSQC9Gz.gif', caption: 'Interactive Installations', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54928011042_bdcacd477d_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Immersive Brand Activation', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54928880071_81bf5cdf56_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: '360° Led Installations', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54929183070_b24b11d7a6_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Multi-Sensory Experiences', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54929183055_de23d07e69_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Corporate Event Design', type: 'image' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Lightcode Labs
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection(lightingRentalsRef)} className="hover:text-cyan-400 transition-colors">
                Lighting Rentals
              </button>
              <button onClick={() => scrollToSection(soundRentalsRef)} className="hover:text-cyan-400 transition-colors">
                Sound Rentals
              </button>
              <button onClick={() => scrollToSection(ledDesignRef)} className="hover:text-cyan-400 transition-colors">
                LED Design
              </button>
              <button onClick={() => scrollToSection(experientialRef)} className="hover:text-cyan-400 transition-colors">
                Experiential
              </button>
              <button onClick={() => scrollToSection(contactRef)} className="hover:text-cyan-400 transition-colors">
                Contact
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection(lightingRentalsRef)} className="block w-full text-left py-2 hover:text-cyan-400 transition-colors">
                Lighting Rentals
              </button>
              <button onClick={() => scrollToSection(soundRentalsRef)} className="block w-full text-left py-2 hover:text-cyan-400 transition-colors">
                Sound Rentals
              </button>
              <button onClick={() => scrollToSection(ledDesignRef)} className="block w-full text-left py-2 hover:text-cyan-400 transition-colors">
                LED Design
              </button>
              <button onClick={() => scrollToSection(experientialRef)} className="block w-full text-left py-2 hover:text-cyan-400 transition-colors">
                Experiential
              </button>
              <button onClick={() => scrollToSection(contactRef)} className="block w-full text-left py-2 hover:text-cyan-400 transition-colors">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.imgur.com/jT0NDcf.jpeg"
            alt="Event lighting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Illuminate Your
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Next Event
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Transform ordinary spaces into extraordinary experiences with cutting-edge lighting, sound, and experiential design
          </p>
          <button
            onClick={() => scrollToSection(lightingRentalsRef)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Explore Our Services
          </button>
        </div>
      </header>

      <section ref={servicesRef} className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                gradient={service.gradient}
                onClick={() => scrollToSection(service.ref)}
              />
            ))}
          </div>
        </div>
      </section>

      <section ref={lightingRentalsRef} className="py-20 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="w-12 h-12 text-cyan-400 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold">Event Lighting Rentals</h2>
          </div>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Transform your venue with professional-grade lighting equipment. From spotlights and par cans to moving heads and stage lighting rigs, we provide everything needed for stunning visual impact.
          </p>
          <Carousel images={lightingRentalsPortfolio} />
        </div>
      </section>

      <section ref={soundRentalsRef} className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Music className="w-12 h-12 text-blue-400 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold">Event Sound Rentals</h2>
          </div>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Crystal-clear audio for every occasion. Our professional sound systems include speakers, microphones, mixers, and DJ equipment, with complete technical support and expert setup services.
          </p>
          <Carousel images={soundRentalsPortfolio} />
        </div>
      </section>

      <section ref={ledDesignRef} className="py-20 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-12 h-12 text-orange-400 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold">Custom LED Lighting Design</h2>
          </div>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Our custom LED designs turn venues into works of art. From pixel-mapped installations to dynamic color systems, we create lighting that responds to music, motion, and mood.
          </p>
          <Carousel images={ledDesignPortfolio} />
        </div>
      </section>

      <section ref={experientialRef} className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-emerald-400 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold">Experiential Design for Events</h2>
          </div>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Create unforgettable moments with immersive environments that engage all senses. Our experiential designs blend technology, art, and storytelling to deliver truly unique event experiences.
          </p>
          <Carousel images={experientialPortfolio} />
        </div>
      </section>

      <section ref={contactRef} className="py-20 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12">
            Ready to bring your vision to life? Get in touch for a quote.
          </p>

          <div className="grid md:grid-cols-1 gap-6 mb-12">
            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg">
              <Mail className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300 text-center">hello@lightcodelabs.studio</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="bg-gray-950 py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Lightcode Labs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
