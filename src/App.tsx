import { useState, useRef } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import Carousel from './components/Carousel';
import ServiceCard from './components/ServiceCard';
import ContactForm from './components/ContactForm';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const servicesRef = useRef<HTMLElement>(null);
  const lightingRentalsRef = useRef<HTMLElement>(null);
  const soundRentalsRef = useRef<HTMLElement>(null);
  const soundSystemPickerRef = useRef<HTMLElement>(null);
  const soundPackagesRef = useRef<HTMLElement>(null);
  const soundUseCasesRef = useRef<HTMLElement>(null);
  const ledDesignRef = useRef<HTMLElement>(null);
  const experientialRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const services = [
    {
      title: 'Event Lighting Rentals',
      description: 'Professional lighting equipment for events of all sizes',
      ref: lightingRentalsRef,
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      title: 'Event Sound Rentals',
      description: 'Pro PA systems, mics, mixers, DJ gear — setup and operator included',
      ref: soundRentalsRef,
      gradient: 'from-purple-600 to-blue-500'
    },
    {
      title: 'Custom LED Lighting Design',
      description: 'Innovative LED installations that transform spaces',
      ref: ledDesignRef,
      gradient: 'from-orange-500 to-pink-500'
    },
    {
      title: 'Experiential Design for Events',
      description: 'Immersive experiences that captivate and engage',
      ref: experientialRef,
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  const lightingRentalsPortfolio = [
    { url: 'https://i.imgur.com/nYgbJ3j.gif?auto=compress&cs=tinysrgb&w=1200', caption: 'Live Event Production', type: 'image' },
    { url: 'https://i.imgur.com/VFkCnKM.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Custom Stage Design', type: 'image' },
    { url: 'https://i.imgur.com/cAZhXp5.jpeg', caption: 'Concert Stage Packages', type: 'image' },
    { url: 'https://i.imgur.com/LmSOeyZ.gif?auto=compress&cs=tinysrgb&w=1200', caption: 'Experiential Lighting Design', type: 'image' }
  ];

  const soundRentalsPortfolio = [
    { url: 'https://i.imgur.com/AbUUj8k.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Sculpted Void Sound System Rental', type: 'image' },
    { url: 'https://i.imgur.com/igKiLJO.png?auto=compress&cs=tinysrgb&w=1200', caption: 'DJ Equipment & Audio Setup', type: 'image' },
    { url: 'https://static1.squarespace.com/static/6470e041f3511e5436207665/6470e053f3511e5436207be1/6484bed25290055c8981bf08/1709328401620/Kalid.png?auto=compress&cs=tinysrgb&w=1200', caption: 'Live Sound Audio Engineering', type: 'image' }
  ];

  // Sound rental inventory
  const soundEquipment = [
    {
      name: 'Void Air Motion v2',
      quantity: 4,
      blurb: 'Visually stunning, fiberglass sculpted, high-output loudspeaker. Ideal as mains speakers for 500–1000 person events.'
    },
    {
      name: 'Void Arcline 218 Subwoofer',
      quantity: 6,
      blurb: 'Dual 18" subwoofer delivering deep, room-filling low end for DJ sets and live shows.'
    },
    {
      name: 'QSC K12.2',
      quantity: 2,
      blurb: '12" powered loudspeaker ideal as monitors or mains for small scale events.'
    },
    {
      name: 'Cerwin-Vega CVA-118',
      quantity: 1,
      blurb: '18" Active Subwoofer ideal for small scale events or DJ monitor.'
    }
  ];

  // "Which system do I need?" — audience-size → system → price
  const systemGuide = [
    {
      audience: 'Under 100 guests',
      system: 'QSC K12.2 pair + Cerwin-Vega CVA-118 sub',
      bestFor: 'Intimate weddings, small parties, spoken word',
      price: 'from $1,000',
      href: '#packages'
    },
    {
      audience: '100 – 500 guests',
      system: '2× Void Arcline 218 subs + 2× Void Air Motion mains',
      bestFor: 'Mid-size weddings, corporate events, DJ sets',
      price: 'from $3,000',
      href: '#packages'
    },
    {
      audience: '500+ guests',
      system: '6× Void Arcline 218 subs + 4× Void Air Motion mains',
      bestFor: 'Festivals, large corporate, live music',
      price: 'Contact for pricing',
      href: '#contact'
    }
  ];

  // 3-tier sound rental packages
  const soundPackages = [
    {
      tier: 'Small',
      audience: 'Under 100 guests',
      price: '$1,000',
      priceNote: 'starting, with delivery & setup',
      system: 'QSC K12.2, 1× Cerwin-Vega CVA-118',
      includes: [
        'Delivery within 25 miles',
        'Setup and teardown',
        'Basic cabling package',
        'Sound check with operator on-site'
      ],
      highlight: false
    },
    {
      tier: 'Medium',
      audience: '100 – 500 guests',
      price: '$3,000',
      priceNote: 'starting, with delivery & setup',
      system: '2× Void Arcline 218, 2× Void Air Motion Large',
      includes: [
        'Delivery within 50 miles',
        'Setup and teardown',
        'Full cabling and signal package',
        'Sound check with operator on-site',
        'Backup system on standby'
      ],
      highlight: true
    },
    {
      tier: 'Large',
      audience: '500+ guests',
      price: 'Contact for pricing',
      priceNote: 'custom quote based on venue and run-of-show',
      system: '6× Void Arcline 218, 4× Void Air Motion',
      includes: [
        'Delivery and logistics planning',
        'Full setup, sound check, and operation',
        'Dedicated system tech throughout the event',
        'Complete backup PA system on-site',
        'Coordination with venue and other vendors'
      ],
      highlight: false
    }
  ];

  // Use cases — each links to the right system package
  const soundUseCases = [
    {
      title: 'Weddings',
      icon: '💍',
      description: 'Crystal-clear audio for ceremonies, receptions, and dance floors. Discreet setup, on-time execution, and a tech who knows the timeline.',
      recommended: 'Small or Medium package'
    },
    {
      title: 'Private Events',
      icon: '🎉',
      description: 'Great sound for birthdays, anniversaries, backyard parties, and celebrations of any size. Clean, punchy music playback plus wireless mic options for speeches, toasts, karaoke, or announcements.',
      recommended: 'Small or Medium package'
    },
    {
      title: 'Corporate Events',
      icon: '🏢',
      description: 'Reliable speech reinforcement for conferences, product launches, and town halls. Backup mics and redundant signal paths.',
      recommended: 'Small or Medium package'
    },
    {
      title: 'Festivals',
      icon: '🎪',
      description: 'Full mains-and-subs coverage with on-site system tech for the duration. Coordinate with your stage manager and other vendors.',
      recommended: 'Large package'
    },
    {
      title: 'DJ Sets',
      icon: '🎧',
      description: 'High-output mains and sub array tuned for dance music. Plug-and-play interface for your controller or mixer.',
      recommended: 'Medium or Large package'
    },
    {
      title: 'Live Music',
      icon: '🎸',
      description: 'Transparent PA for bands and ensembles. Proper monitor mixing so musicians hear themselves and the audience hears a great show.',
      recommended: 'Medium or Large package'
    }
  ];

  const ledDesignPortfolio = [
    { url: 'https://i.imgur.com/rGr4UbW.gif?auto=compress&cs=tinysrgb&w=1200', caption: 'LED Sculpture Design', type: 'image' },
    { url: 'https://i.imgur.com/SyH2oRj.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Experiential Design', type: 'image' },
    { url: 'https://i.imgur.com/NHSDkVx.gif?auto=compress&cs=tinysrgb&w=1200', caption: 'Interactive Installations', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54929072665_6859056d4b_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Architectural Lighting Design', type: 'image' }
  ];

  const experientialPortfolio = [
    { url: 'https://i.imgur.com/3us5x6X.gif?auto=compress&cs=tinysrgb&w=1200', caption: 'Multi-Sensory Experiences', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54928880071_81bf5cdf56_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: '360° LED Installations', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54929183070_b24b11d7a6_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Immersive Space Design', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54928011042_bdcacd477d_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Brand Activation', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54972794923_52fbc8834a_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Gong Fu Tea Ceremony', type: 'image' }
  ];

  const scrollToSoundQuote = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Lightcode Labs
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection(soundRentalsRef)} className="hover:text-cyan-400 transition-colors">
                Sound Rentals
              </button>
              <button onClick={() => scrollToSection(lightingRentalsRef)} className="hover:text-cyan-400 transition-colors">
                Lighting Rentals
              </button>
              <button onClick={() => scrollToSection(ledDesignRef)} className="hover:text-cyan-400 transition-colors">
                Custom LED Design
              </button>
              <button onClick={() => scrollToSection(experientialRef)} className="hover:text-cyan-400 transition-colors">
                Experiential Design
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
              <button onClick={() => scrollToSection(soundRentalsRef)} className="block w-full text-left py-2 hover:text-cyan-400 transition-colors">
                Sound Rentals
              </button>
              <button onClick={() => scrollToSection(lightingRentalsRef)} className="block w-full text-left py-2 hover:text-cyan-400 transition-colors">
                Lighting Rentals
              </button>
              <button onClick={() => scrollToSection(ledDesignRef)} className="block w-full text-left py-2 hover:text-cyan-400 transition-colors">
                Custom LED Design
              </button>
              <button onClick={() => scrollToSection(experientialRef)} className="block w-full text-left py-2 hover:text-cyan-400 transition-colors">
                Experiential Design
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
            alt="Event lighting and sound production"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Sound and Lighting
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Like You've Never Seen or Heard Before
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Sound and lighting rental for weddings, corporate events, festivals, DJ sets, and live music. Pro gear, on-site tech, packages from $1,000.
          </p>
          <button
            onClick={() => scrollToSection(servicesRef)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Explore Our Services
          </button>
        </div>
      </header>

      <section ref={servicesRef} className="py-20 px-4 bg-gray-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                gradient={service.gradient}
                onClick={() => scrollToSection(service.ref)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* === SOUND RENTAL SECTION === */}
      <section ref={soundRentalsRef} className="py-20 px-4 bg-gray-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Event Sound Rentals</h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Crystal-clear audio for every occasion. Our professional sound systems include speakers, microphones, mixers, and DJ equipment with delivery, setup, and an on-site operator.
          </p>

          <h3 className="text-2xl font-semibold text-center mb-8 text-cyan-400">
            Available Sound Equipment
          </h3>

          <div className="my-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection(soundSystemPickerRef)}
              className="bg-gray-800 hover:bg-gray-700 text-cyan-400 font-semibold px-6 py-3 rounded-lg border border-gray-700 hover:border-cyan-400 transition-colors"
            >
              Help Me Pick a System
            </button>
            <button
              onClick={() => scrollToSection(soundPackagesRef)}
              className="bg-gray-800 hover:bg-gray-700 text-cyan-400 font-semibold px-6 py-3 rounded-lg border border-gray-700 hover:border-cyan-400 transition-colors"
            >
              Sound Rental Packages
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {soundEquipment.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-colors"
              >
                <div className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">
                  {item.quantity}× available
                </div>
                <h4 className="text-xl font-bold mb-2 text-white">
                  {item.name}
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {item.blurb}
                </p>
              </div>
            ))}
          </div>

          <Carousel images={soundRentalsPortfolio} />

          <div className="mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* === WHICH SYSTEM DO I NEED? === */}
      <section ref={soundSystemPickerRef} className="py-20 px-4 bg-gray-800 scroll-mt-16" id="system-picker">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Which system do I need?</h2>
          <p className="text-lg text-gray-300 text-center mb-10 max-w-3xl mx-auto">
            Match your audience size to the right PA rig. All prices include delivery, setup, and on-site operator.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wider">Audience</th>
                  <th className="px-4 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wider">System</th>
                  <th className="px-4 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wider hidden md:table-cell">Best For</th>
                  <th className="px-4 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wider text-right">Starting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {systemGuide.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-900/50 transition-colors">
                    <td className="px-4 py-4 font-semibold whitespace-nowrap">{row.audience}</td>
                    <td className="px-4 py-4 text-gray-300">{row.system}</td>
                    <td className="px-4 py-4 text-gray-400 hidden md:table-cell">{row.bestFor}</td>
                    <td className="px-4 py-4 text-right">
                      <a href={row.href} className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                        {row.price}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => scrollToSection(soundPackagesRef)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all"
            >
              See full package details
            </button>

            <div className="mt-12 text-center">
              <button
                onClick={scrollToSoundQuote}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* === SOUND PACKAGES === */}
      <section ref={soundPackagesRef} className="py-20 px-4 bg-gray-900 scroll-mt-16" id="packages">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Sound Rental Packages</h2>
          <p className="text-lg text-gray-300 text-center mb-10 max-w-3xl mx-auto">
            Three tiers to fit any event size. Every package includes delivery, setup, and a dedicated sound operator.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {soundPackages.map((pkg, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border ${
                  pkg.highlight
                    ? 'bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/60 ring-1 ring-cyan-500/40'
                    : 'bg-gray-800 border-gray-700'
                }`}
              >
                {pkg.highlight && (
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-1">{pkg.tier}</h3>
                <div className="text-sm text-gray-400 mb-4">{pkg.audience}</div>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-cyan-400">{pkg.price}</div>
                  <div className="text-xs text-gray-500 mt-1">{pkg.priceNote}</div>
                </div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm font-semibold text-gray-300 mb-1">System</div>
                  <div className="text-sm text-gray-400">{pkg.system}</div>
                </div>
                <div className="text-sm font-semibold text-gray-300 mb-2">Includes</div>
                <ul className="space-y-2 text-sm text-gray-400">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* === USE CASES === */}
      <section ref={soundUseCasesRef} className="py-20 px-4 bg-gray-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Use Cases</h2>
          <p className="text-lg text-gray-300 text-center mb-10 max-w-3xl mx-auto">
            Different events need different systems. Here's how we match the rig to the room.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soundUseCases.map((uc, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/40 transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">{uc.title}</h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">{uc.description}</p>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Recommended: {uc.recommended}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      <section ref={lightingRentalsRef} className="py-20 px-4 bg-gray-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Event Lighting Rentals</h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Transform your venue with professional-grade lighting equipment. From spotlights and par cans to moving heads and stage lighting rigs, we provide everything needed for stunning visual impact.
          </p>
          <Carousel images={lightingRentalsPortfolio} />

          <div className="mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      <section ref={ledDesignRef} className="py-20 px-4 bg-gray-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Custom LED Lighting Design</h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Our custom LED designs turn venues into works of art. From pixel-mapped installations to dynamic color systems, we create lighting that responds to music, motion, and mood.
          </p>
          <Carousel images={ledDesignPortfolio} />

          <div className="mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      <section ref={experientialRef} className="py-20 px-4 bg-gray-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Experiential Design for Events</h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Create unforgettable moments with immersive environments that engage all senses. Our experiential designs blend technology, art, and storytelling to deliver truly unique event experiences.
          </p>
          <Carousel images={experientialPortfolio} />

          <div className="mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      <section ref={contactRef} className="py-20 px-4 bg-gray-800 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12">
            Ready to bring your vision to life? Get in touch for a quote.
          </p>

          <ContactForm />
        </div>
      </section>

      <footer className="bg-gray-950 py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Lightcode Labs. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky "Get a Quote" CTA — always visible on mobile, floats on desktop */}
      <button
        onClick={scrollToSoundQuote}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-5 py-3 rounded-full shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-200 flex items-center gap-2"
        aria-label="Get a Quote"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Get a Quote</span>
      </button>
    </div>
  );
}

export default App;