import { useState, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Menu, X, MessageCircle, Instagram, Facebook } from 'lucide-react';
import Carousel from './components/Carousel';
import type { CarouselItem } from './components/Carousel';
import Portfolio, { PortfolioProject } from './components/Portfolio';
import ServiceCard from './components/ServiceCard';
import ContactForm from './components/ContactForm';
import Hero from './components/Hero';
import SectionHeading from './components/SectionHeading';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const card = (e.target as Element).closest?.('.lc-card') as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${(e.clientX - rect.left).toFixed(0)}px`);
      card.style.setProperty('--my', `${(e.clientY - rect.top).toFixed(0)}px`);
    };
    document.addEventListener('pointermove', onMove);
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.lc-reveal');
    const show = (el: Element) => el.setAttribute('data-in', 'true');
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(show);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const servicesRef = useRef<HTMLElement>(null);
  const lightingRentalsRef = useRef<HTMLElement>(null);
  const soundRentalsRef = useRef<HTMLElement>(null);
  const soundSystemPickerRef = useRef<HTMLElement>(null);
  const soundPackagesRef = useRef<HTMLElement>(null);
  const soundUseCasesRef = useRef<HTMLElement>(null);
  const ledDesignRef = useRef<HTMLElement>(null);
  const experientialRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const services: { title: string; description: string; ref: React.RefObject<HTMLElement>; image: string; contain?: boolean }[] = [
    {
      title: 'Event Lighting Rentals',
      description: 'Professional lighting equipment for events of all sizes',
      ref: lightingRentalsRef,
      image: '/hero/lighting-rentals.jpg'
    },
    {
      title: 'Event Sound Rentals',
      description: 'Pro PA systems, mics, mixers, and DJ gear with setup and an operator included.',
      ref: soundRentalsRef,
      image: '/void-air-motion.png',
      contain: true
    },
    {
      title: 'Custom LED Lighting Design',
      description: 'Innovative LED installations that transform spaces',
      ref: ledDesignRef,
      image: '/hero/led-design.jpg'
    },
    {
      title: 'Experiential Design for Events',
      description: 'Immersive experiences that captivate and engage',
      ref: experientialRef,
      image: '/hero/experiential-design.jpg'
    }
  ];

  const lightingRentalsPortfolio: CarouselItem[] = [
    { url: '/media/live-event-production.mp4', poster: '/media/live-event-production.jpg', caption: 'Live Event Production', type: 'loop' },
    { url: 'https://i.imgur.com/VFkCnKM.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Custom Stage Design', type: 'image' },
    { url: 'https://i.imgur.com/cAZhXp5.jpeg', caption: 'Concert Stage Packages', type: 'image' },
    { url: '/media/experiential-lighting.mp4', poster: '/media/experiential-lighting.jpg', caption: 'Experiential Lighting Design', type: 'loop' }
  ];

  const soundRentalsPortfolio: CarouselItem[] = [
    { url: '/media/sound-setup-01.jpg', caption: 'Void Horn System · Event DJ Setup', type: 'image' },
    { url: '/media/sound-rental-system.jpg', caption: 'Event Sound System Rental', type: 'image' },
    { url: '/media/sound-setup-02.jpg', caption: 'Void Air Motion · Workshop Build', type: 'image' },
    { url: 'https://i.imgur.com/AbUUj8k.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Sculpted Void Sound System Rental', type: 'image' },
    { url: '/media/dj-equipment-setup.jpg', caption: 'DJ Equipment & Audio Setup', type: 'image' },
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

  const ledDesignPortfolio: CarouselItem[] = [
    { url: '/media/led-sculpture.mp4', poster: '/media/led-sculpture.jpg', caption: 'LED Sculpture Design', type: 'loop' },
    { url: 'https://i.imgur.com/SyH2oRj.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Experiential Design', type: 'image' },
    { url: '/media/interactive-installations.mp4', poster: '/media/interactive-installations.jpg', caption: 'Interactive Installations', type: 'loop' },
    { url: 'https://live.staticflickr.com/65535/54929072665_6859056d4b_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Architectural Lighting Design', type: 'image' }
  ];

  const experientialPortfolio: CarouselItem[] = [
    { url: '/media/multi-sensory.mp4', poster: '/media/multi-sensory.jpg', caption: 'Multi-Sensory Experiences', type: 'loop' },
    { url: 'https://live.staticflickr.com/65535/54928880071_81bf5cdf56_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: '360° LED Installations', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54929183070_b24b11d7a6_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Immersive Space Design', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54928011042_bdcacd477d_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Brand Activation', type: 'image' },
    { url: 'https://live.staticflickr.com/65535/54972794923_52fbc8834a_b.jpg?auto=compress&cs=tinysrgb&w=1200', caption: 'Gong Fu Tea Ceremony', type: 'image' }
  ];

  const portfolioProjects: PortfolioProject[] = [
    {
      name: 'The SugarCubes',
      images: [
        'https://i.imgur.com/uh2OR3T.jpeg',
        'https://i.imgur.com/pE3MoSd.jpeg',
        'https://i.imgur.com/SWjNrjW.jpeg',
        'https://i.imgur.com/7yCXEjk.jpeg',
        'https://i.imgur.com/FVDnwPX.jpeg'
      ]
    },
    {
      name: 'Kaleidoscope',
      introVideo: '/media/kaleidoscope.mp4',
      images: [
        'https://i.imgur.com/goG5Rml.jpeg',
        'https://i.imgur.com/0GAEo3T.jpeg',
        'https://i.imgur.com/LFwnsa6.jpeg',
        'https://i.imgur.com/WrizwVB.jpeg',
        'https://i.imgur.com/jzZ7Liy.jpeg'
      ]
    },
    {
      name: 'Church of Cannabis',
      images: [
        'https://i.imgur.com/7q1d75k.jpeg',
        'https://i.imgur.com/RuZXzkB.jpeg'
      ]
    },
    {
      name: 'Cloud Room Electric Forest Festival',
      images: [
        'https://i.imgur.com/qNZt2dj.jpeg',
        'https://i.imgur.com/NQPhrLd.jpeg',
        'https://i.imgur.com/2OYVUng.jpeg'
      ]
    },
    {
      name: 'Galactic Meadow',
      images: [
        'https://i.imgur.com/1s3uaY7.jpeg',
        'https://i.imgur.com/ALgqt8U.jpeg'
      ]
    },
    {
      name: 'The Cuttlefish',
      images: [
        'https://i.imgur.com/nX6zw8j.jpeg',
        'https://i.imgur.com/eWsVOfw.jpeg',
        'https://i.imgur.com/s6J6i7C.jpeg',
        'https://i.imgur.com/bD9HNJn.jpeg',
        'https://i.imgur.com/WvbuumQ.jpeg'
      ]
    },
    {
      name: 'Flash the Turtle',
      images: [
        'https://i.imgur.com/ZSgyLsT.jpeg',
        'https://i.imgur.com/aVhqzwR.jpeg'
      ]
    },
    {
      name: 'Jellyfish Fields',
      images: [
        'https://i.imgur.com/fn2xnij.jpeg',
        'https://i.imgur.com/QFuEyuH.jpeg',
        'https://i.imgur.com/LhCQO0z.jpeg'
      ]
    },
    {
      name: 'Protea Flower',
      images: [
        'https://i.imgur.com/RLOMle9.jpeg',
        'https://i.imgur.com/8VX605s.jpeg',
        'https://i.imgur.com/M7CiUlg.jpeg'
      ]
    },
    {
      name: 'Vine Wall',
      images: [
        'https://i.imgur.com/rE8xQpw.jpeg',
        'https://i.imgur.com/IXHRhH2.jpeg'
      ]
    },
    {
      name: 'Apres Ski Sign',
      images: [
        'https://i.imgur.com/ck6hbdP.jpeg',
        'https://i.imgur.com/c3hIrNS.jpeg'
      ]
    },
    {
      name: 'Gary the Snail',
      images: [
        'https://i.imgur.com/9Cr1b3V.jpeg',
        'https://i.imgur.com/nCgKWvZ.jpeg',
        'https://i.imgur.com/xgVltdh.jpeg'
      ]
    }
  ];

  const scrollToSoundQuote = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${scrolled || mobileMenuOpen ? 'bg-black/[.92] backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Lightcode Labs
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection(soundRentalsRef)} className="lc-navlink">
                Sound Rentals
              </button>
              <button onClick={() => scrollToSection(lightingRentalsRef)} className="lc-navlink">
                Lighting Rentals
              </button>
              <button onClick={() => scrollToSection(ledDesignRef)} className="lc-navlink">
                Custom LED Design
              </button>
              <button onClick={() => scrollToSection(experientialRef)} className="lc-navlink">
                Experiential Design
              </button>
              <button onClick={() => scrollToSection(portfolioRef)} className="lc-navlink">
                Portfolio
              </button>
              <button onClick={() => scrollToSection(contactRef)} className="lc-navlink">
                Contact
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="https://www.instagram.com/lightcodelabs/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lightcode Labs on Instagram"
                className="p-2 text-gray-300 hover:text-teal-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61591775623586"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lightcode Labs on Facebook"
                className="p-2 text-gray-300 hover:text-teal-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/[.96] border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection(soundRentalsRef)} className="block w-full text-left py-2 hover:text-teal-400 transition-colors">
                Sound Rentals
              </button>
              <button onClick={() => scrollToSection(lightingRentalsRef)} className="block w-full text-left py-2 hover:text-teal-400 transition-colors">
                Lighting Rentals
              </button>
              <button onClick={() => scrollToSection(ledDesignRef)} className="block w-full text-left py-2 hover:text-teal-400 transition-colors">
                Custom LED Design
              </button>
              <button onClick={() => scrollToSection(experientialRef)} className="block w-full text-left py-2 hover:text-teal-400 transition-colors">
                Experiential Design
              </button>
              <button onClick={() => scrollToSection(portfolioRef)} className="block w-full text-left py-2 hover:text-teal-400 transition-colors">
                Portfolio
              </button>
              <button onClick={() => scrollToSection(contactRef)} className="block w-full text-left py-2 hover:text-teal-400 transition-colors">
                Contact
              </button>
              <div className="pt-3 mt-2 border-t border-white/10 flex items-center space-x-4">
                <a
                  href="https://www.instagram.com/lightcodelabs/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lightcode Labs on Instagram"
                  className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61591775623586"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lightcode Labs on Facebook"
                  className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <Hero />

      <section ref={servicesRef} className="lc-section py-20 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Our Services" />
          <div className="studio-index grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div key={index} className="lc-reveal" style={{ '--i': Math.min(index, 5) } as CSSProperties}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  contain={service.contain}
                  onClick={() => scrollToSection(service.ref)}
                />
              </div>
            ))}
          </div>

          <div className="lc-reveal mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="lc-btn inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* === SOUND RENTAL SECTION === */}
      <section ref={soundRentalsRef} id="sound-rentals" className="lc-section py-20 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading num="01" label="Hear it" title="Event Sound Rentals">
            <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
              Crystal-clear audio for every occasion. Our professional sound systems include speakers, microphones, mixers, and DJ equipment with delivery, setup, and an on-site operator.
            </p>
          </SectionHeading>

          <div className="lc-reveal mb-12">
            <Carousel images={soundRentalsPortfolio} />
          </div>

          <h3 className="lc-label lc-label--aura text-center mb-8">
            Available Sound Equipment
          </h3>

          <div className="my-8 flex flex-col sm:flex-row items-center justify-center gap-4 lc-reveal">
            <button
              onClick={() => scrollToSection(soundSystemPickerRef)}
              className="lc-btn--ghost px-6 py-3"
            >
              Help Me Pick a System
            </button>
            <button
              onClick={() => scrollToSection(soundPackagesRef)}
              className="lc-btn--ghost px-6 py-3"
            >
              Sound Rental Packages
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {soundEquipment.map((item, index) => (
              <div
                key={index}
                className="lc-card lc-reveal p-6"
                style={{ '--i': Math.min(index, 5) } as CSSProperties}
              >
                <div className="lc-label mb-2">
                  {item.quantity}× available
                </div>
                <h4 className="text-xl font-bold mb-2 text-white">
                  {item.name}
                </h4>
                <p className="text-white/60 leading-relaxed">
                  {item.blurb}
                </p>
              </div>
            ))}
          </div>

          <div className="lc-reveal mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="lc-btn inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* === WHICH SYSTEM DO I NEED? === */}
      <section ref={soundSystemPickerRef} className="lc-section py-20 px-4 scroll-mt-16" id="system-picker">
        <div className="max-w-5xl mx-auto">
          <SectionHeading size="md" title="Which system do I need?">
            <p className="text-lg text-white/70 text-center mb-10 max-w-3xl mx-auto">
              Match your audience size to the right PA rig. All prices include delivery, setup, and on-site operator.
            </p>
          </SectionHeading>

          <div className="lc-reveal overflow-x-auto rounded-2xl border border-white/[.08] bg-white/[.02]">
            <table className="lc-table w-full text-left">
              <thead>
                <tr className="border-b border-white/[.08]">
                  <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-widest">Audience</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-widest">System</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-widest hidden md:table-cell">Best For</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-widest text-right">Starting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[.08]">
                {systemGuide.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 font-semibold whitespace-nowrap">{row.audience}</td>
                    <td className="px-4 py-4 text-white/70">{row.system}</td>
                    <td className="px-4 py-4 text-white/50 hidden md:table-cell">{row.bestFor}</td>
                    <td className="px-4 py-4 text-right">
                      <a href={row.href} className="text-teal-400 font-bold hover:text-teal-300 hover:underline transition-colors">
                        {row.price}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lc-reveal mt-8 text-center">
            <button
              onClick={() => scrollToSection(soundPackagesRef)}
              className="lc-btn px-6 py-3"
            >
              See full package details
            </button>

            <div className="lc-reveal mt-12 text-center">
              <button
                onClick={scrollToSoundQuote}
                className="lc-btn inline-flex items-center gap-2 px-8 py-4 text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* === SOUND PACKAGES === */}
      <section ref={soundPackagesRef} className="lc-section py-20 px-4 scroll-mt-16" id="packages">
        <div className="max-w-7xl mx-auto">
          <SectionHeading size="md" title="Sound Rental Packages">
            <p className="text-lg text-white/70 text-center mb-10 max-w-3xl mx-auto">
              Three tiers to fit any event size. Every package includes delivery, setup, and a dedicated sound operator.
            </p>
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-6">
            {soundPackages.map((pkg, index) => (
              <div
                key={index}
                className={`lc-card lc-reveal p-6 ${pkg.highlight ? 'lc-card--featured' : ''}`}
                style={{ '--i': Math.min(index, 5) } as CSSProperties}
              >
                {pkg.highlight && (
                  <div className="lc-label mb-2">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-1">{pkg.tier}</h3>
                <div className="text-sm text-white/60 mb-4">{pkg.audience}</div>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-teal-400">{pkg.price}</div>
                  <div className="text-xs text-white/40 mt-1">{pkg.priceNote}</div>
                </div>
                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="text-sm font-semibold text-white/70 mb-1">System</div>
                  <div className="text-sm text-white/60">{pkg.system}</div>
                </div>
                <div className="text-sm font-semibold text-white/70 mb-2">Includes</div>
                <ul className="space-y-2 text-sm text-white/60">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-teal-400 mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lc-reveal mt-10 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="lc-btn inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* === USE CASES === */}
      <section ref={soundUseCasesRef} className="lc-section py-20 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading size="md" title="Use Cases">
            <p className="text-lg text-white/70 text-center mb-10 max-w-3xl mx-auto">
              Different events need different systems. Here's how we match the rig to the room.
            </p>
          </SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soundUseCases.map((uc, index) => (
              <div
                key={index}
                className="lc-card lc-reveal p-6"
                style={{ '--i': Math.min(index, 5) } as CSSProperties}
              >
                <h3 className="text-xl font-bold mb-2">{uc.title}</h3>
                <p className="text-sm text-white/60 mb-4 leading-relaxed">{uc.description}</p>
                <div className="lc-label lc-label--aura">
                  Recommended: {uc.recommended}
                </div>
              </div>
            ))}
          </div>

          <div className="lc-reveal mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="lc-btn inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      <section ref={lightingRentalsRef} id="lighting-rentals" className="lc-section py-20 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto studio-spread">
          <SectionHeading num="02" label="Light it" title="Event Lighting Rentals">
            <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
              Transform your venue with professional-grade lighting equipment. From spotlights and par cans to moving heads and stage lighting rigs, we provide everything needed for stunning visual impact.
            </p>
          </SectionHeading>
          <div className="lc-reveal studio-media">
            <Carousel images={lightingRentalsPortfolio} />
          </div>

          <div className="lc-reveal studio-action mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="lc-btn inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      <section ref={ledDesignRef} id="led-design" className="lc-section py-20 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto studio-spread">
          <SectionHeading num="03" label="Build it" title="Custom LED Lighting Design">
            <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
              Our custom LED designs turn venues into works of art. From pixel-mapped installations to dynamic color systems, we create lighting that responds to music, motion, and mood.
            </p>
          </SectionHeading>
          <div className="lc-reveal studio-media">
            <Carousel images={ledDesignPortfolio} />
          </div>

          <div className="lc-reveal studio-action mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="lc-btn inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      <section ref={experientialRef} id="experiential-design" className="lc-section py-20 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto studio-spread">
          <SectionHeading num="04" label="Feel it" title="Experiential Design for Events">
            <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
              Create unforgettable moments with immersive environments that engage all senses. Our experiential designs blend technology, art, and storytelling to deliver truly unique event experiences.
            </p>
          </SectionHeading>
          <div className="lc-reveal studio-media">
            <Carousel images={experientialPortfolio} />
          </div>

          <div className="lc-reveal studio-action mt-12 text-center">
            <button
              onClick={scrollToSoundQuote}
              className="lc-btn inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      <section ref={portfolioRef} id="portfolio" className="lc-section py-20 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading num="05" label="See it" title="Our Portfolio">
            <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
              A look at the custom LED sculptures and immersive installations we've built for festivals, venues, and brands. Pick a project to explore the build.
            </p>
          </SectionHeading>
          <Portfolio projects={portfolioProjects} onContactClick={scrollToSoundQuote} />
        </div>
      </section>

      <section ref={contactRef} id="contact" className="lc-section py-20 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto studio-contact">
          <SectionHeading num="06" label="Book it" title="Let's Create Something Amazing">
            <p className="text-xl text-white/70 text-center mb-12">
              Ready to bring your vision to life? Get in touch for a quote.
            </p>
          </SectionHeading>

          <div className="lc-reveal">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="bg-black py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-white/40">
          <p>&copy; 2025 Lightcode Labs. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky "Get a Quote" CTA — always visible on mobile, floats on desktop */}
      <button
        onClick={scrollToSoundQuote}
        className="lc-btn lc-btn--float fixed bottom-6 right-6 z-40 px-5 py-3 flex items-center gap-2"
        aria-label="Get a Quote"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Get a Quote</span>
      </button>
    </div>
  );
}

export default App;