
import React, { useState, useEffect, useMemo } from 'react';
import { CARS, REVIEWS, CITIES, LANGUAGES, TRANSLATIONS } from './constants';
import { Car, Category } from './types';

// --- Sub-components ---

const ThemeToggle = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
    aria-label="Toggle dark mode"
  >
    {isDark ? <i className="fas fa-sun text-yellow-400"></i> : <i className="fas fa-moon text-gray-600"></i>}
  </button>
);

const WhatsAppFloatingButton = ({ t }: { t: any }) => (
  <a
    href="https://wa.me/971500000000"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-[100] group flex items-center"
    aria-label="Contact on WhatsApp"
  >
    <div className="absolute right-full mr-4 px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white rounded-xl shadow-2xl text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap border border-gray-100 dark:border-zinc-700">
      {t.support}
    </div>
    <div className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-subtle">
      <i className="fab fa-whatsapp text-3xl"></i>
    </div>
  </a>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: 'globe-americas',
      title: 'Global Hubs',
      desc: 'Based in Dubai & Spain, serving major luxury markets across 50+ global destinations.'
    },
    {
      icon: 'gem',
      title: 'Pristine Fleet',
      desc: 'Only the latest models. Every car undergoes a 100-point luxury inspection before delivery.'
    },
    {
      icon: 'concierge-bell',
      title: 'VIP Concierge',
      desc: '24/7 dedicated support and door-to-door delivery at your hotel, villa, or airport.'
    },
    {
      icon: 'shield-check',
      title: 'Shielded & Direct',
      desc: 'Transparent pricing with no hidden fees. Quick booking integrated with WhatsApp.'
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-black border-y border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-xs uppercase tracking-[0.5em] mb-4">The EZ Advantage</h2>
          <h3 className="text-4xl md:text-5xl font-black dark:text-white mb-6">Why Choose <span className="text-primary">EZ RENTALS</span></h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light">
            We redefine the standard of luxury mobility through our commitment to excellence and worldwide accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group p-10 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <i className={`fas fa-${f.icon} text-2xl`}></i>
              </div>
              <h4 className="text-xl font-bold dark:text-white mb-4">{f.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedSection = ({ cars, onSelect, t }: { cars: Car[], onSelect: (c: Car) => void, t: any }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const featured = useMemo(() => cars.slice(10, 15), [cars]);

  const next = () => setActiveIdx((prev) => (prev + 1) % featured.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + featured.length) % featured.length);

  const handleBooking = (car: Car) => {
    const text = encodeURIComponent(`Hello EZ RENTALS, I would like to book the ${car.brand} ${car.model} (${car.year}). My preferred location is...`);
    window.open(`https://wa.me/971500000000?text=${text}`, '_blank');
  };

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="lg:w-1/3 space-y-8">
            <div>
              <h2 className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4">Curated Excellence</h2>
              <h3 className="text-4xl md:text-5xl font-black dark:text-white leading-tight">Featured <br/><span className="text-primary">Masterpieces</span></h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Explore our hand-picked selection of the month's most prestigious arrivals. Each vehicle represents the pinnacle of automotive engineering and luxury.
            </p>
            <div className="flex gap-4">
              <button onClick={prev} className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button onClick={next} className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Carousel View */}
          <div className="lg:w-2/3 relative w-full h-[400px] md:h-[500px]">
            {featured.map((car, idx) => (
              <div 
                key={car.id}
                className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${
                  idx === activeIdx ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-90 z-10'
                }`}
              >
                <div className="relative group w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                  <img src={car.image} className="w-full h-full object-cover" alt={car.model} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">{car.brand}</p>
                    <h4 className="text-3xl font-black mb-6">{car.model}</h4>
                    <div className="flex gap-6 mb-8">
                       <div className="flex items-center gap-2">
                         <i className="fas fa-bolt text-primary"></i>
                         <span className="text-sm font-bold">{car.specs.acceleration}</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <i className="fas fa-tachometer-alt text-primary"></i>
                         <span className="text-sm font-bold">{car.specs.horsepower} HP</span>
                       </div>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleBooking(car)}
                        className="px-8 py-3 bg-primary text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2"
                      >
                        <i className="fab fa-whatsapp"></i> Book Now
                      </button>
                      <button 
                        onClick={() => onSelect(car)}
                        className="px-8 py-3 bg-white text-black rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-all"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface CarCardProps {
  car: Car;
  onSelect: (c: Car) => void;
  onCompare: (c: Car) => void;
  isComparing: boolean;
  t: any;
}

const CarCard = ({ 
  car, 
  onSelect, 
  onCompare, 
  isComparing,
  t 
}: CarCardProps) => {
  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Hi! I'm interested in booking the ${car.brand} ${car.model}. Is it available?`);
    window.open(`https://wa.me/971500000000?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group flex flex-col h-full relative">
      <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => onSelect(car)}>
        <img 
          src={car.image} 
          alt={car.model} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
        />
        
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-[50ms]">
              <i className="fas fa-tachometer-alt text-primary mb-1"></i>
              <p className="text-[10px] text-gray-300 uppercase font-bold tracking-tighter">HP</p>
              <p className="text-xs font-bold text-white">{car.specs.horsepower}</p>
            </div>
            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-[100ms]">
              <i className="fas fa-wind text-primary mb-1"></i>
              <p className="text-[10px] text-gray-300 uppercase font-bold tracking-tighter">Top Speed</p>
              <p className="text-xs font-bold text-white">{car.specs.topSpeed}</p>
            </div>
            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-[150ms]">
              <i className="fas fa-users text-primary mb-1"></i>
              <p className="text-[10px] text-gray-300 uppercase font-bold tracking-tighter">Seats</p>
              <p className="text-xs font-bold text-white">{car.specs.seats}</p>
            </div>
            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-[200ms]">
              <i className="fas fa-expand text-primary mb-1"></i>
              <p className="text-[10px] text-gray-300 uppercase font-bold tracking-tighter">View</p>
              <p className="text-xs font-bold text-white">Full Details</p>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md ${car.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {car.isAvailable ? t.available : t.booked}
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); onCompare(car); }}
            className={`p-2 rounded-full shadow-md ${isComparing ? 'bg-primary text-white' : 'bg-white/90 text-gray-800'} backdrop-blur-sm transition-colors hover:scale-110 active:scale-95`}
          >
            <i className="fas fa-exchange-alt"></i>
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">{car.brand}</h3>
            <h2 className="text-lg font-bold dark:text-white leading-tight group-hover:text-primary transition-colors">{car.model}</h2>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-gray-900 dark:text-gray-100">${car.pricePerDay}</p>
            <p className="text-[10px] text-gray-500 uppercase">{t.pDay}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-auto pt-4 text-[11px] text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5"><i className="fas fa-bolt text-primary w-4"></i> {car.specs.acceleration}</div>
          <div className="flex items-center gap-1.5"><i className="fas fa-cog text-primary w-4"></i> {car.category}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button 
            onClick={() => onSelect(car)}
            className="py-3 bg-zinc-100 dark:bg-zinc-800 dark:text-white text-black rounded-xl font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 uppercase tracking-widest"
          >
            Details
          </button>
          <button 
            onClick={handleBooking}
            className="py-3 bg-primary text-white rounded-xl font-bold text-xs hover:brightness-110 transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-1"
          >
            <i className="fab fa-whatsapp"></i> Book
          </button>
        </div>
      </div>
    </div>
  );
};

const HeroCarousel = ({ cars }: { cars: Car[] }) => {
  const [current, setCurrent] = useState(0);
  const slides = useMemo(() => cars.slice(0, 5), [cars]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 z-0 bg-zinc-950 overflow-hidden">
      {slides.map((car, index) => (
        <div
          key={car.id}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={car.image}
            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${
              index === current ? 'scale-110' : 'scale-100'
            }`}
            alt={car.model}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-zinc-950 z-20" />
        </div>
      ))}
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === current ? 'w-12 bg-primary' : 'w-6 bg-white/30'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('en');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [compareList, setCompareList] = useState<Car[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const filteredCars = useMemo(() => {
    return CARS.filter(car => {
      const matchesSearch = `${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCategories.length === 0 || activeCategories.includes(car.category);
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategories]);

  const toggleCompare = (car: Car) => {
    setCompareList(prev => {
      if (prev.find(c => c.id === car.id)) return prev.filter(c => c.id !== car.id);
      if (prev.length >= 4) return prev;
      return [...prev, car];
    });
  };

  const handleBookNow = (car: Car) => {
    const text = encodeURIComponent(`Hello EZ RENTALS! I'm looking to book the ${car.brand} ${car.model} (${car.year}). Please let me know the process.`);
    window.open(`https://wa.me/971500000000?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-white">
      <WhatsAppFloatingButton t={t} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[80] transition-all duration-500 ${isScrolled ? 'glass-nav h-16 shadow-lg' : 'bg-transparent h-24'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-10">
            <h1 className="text-2xl font-black tracking-tighter dark:text-white uppercase">EZ <span className="text-primary">RENTALS</span></h1>
            <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              <a href="#fleet" className="hover:text-primary transition-colors">Fleet</a>
              <a href="#locations" className="hover:text-primary transition-colors">Locations</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-[11px] font-bold uppercase tracking-widest border-none cursor-pointer focus:ring-0 text-gray-600 dark:text-gray-300"
            >
              {LANGUAGES.map(l => <option key={l.code} value={l.code} className="bg-white dark:bg-black">{l.label}</option>)}
            </select>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <HeroCarousel cars={CARS} />
        
        <div className="relative z-30 text-center text-white px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-[0.9]">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl font-light opacity-80 max-w-2xl mx-auto leading-relaxed mb-10">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#fleet" className="px-10 py-5 bg-primary text-white rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
              Explore Fleet
            </a>
            <a href="#contact" className="px-10 py-5 border border-white/30 backdrop-blur-md rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              Contact VIP
            </a>
          </div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Featured Fleet Section */}
      <FeaturedSection cars={CARS} onSelect={setSelectedCar} t={t} />

      {/* Fleet Filter & List */}
      <section id="fleet" className="py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="w-full md:max-w-md">
              <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3">Discovery</h2>
              <div className="relative">
                <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-xl bg-white dark:bg-zinc-900 border-none shadow-sm focus:ring-2 focus:ring-primary transition-all dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto">
              {Object.values(Category).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
                  className={`px-6 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                    activeCategories.includes(cat) 
                    ? 'bg-primary text-white border-primary shadow-lg' 
                    : 'bg-white dark:bg-zinc-900 dark:text-white border-gray-100 dark:border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCars.slice(0, 12).map(car => (
              /* Fix: Removed 'key' prop from CarCard application. React uses the 'key' attribute on the outer element of a map, and it shouldn't be defined in the interface or explicitly passed down if not used inside the component. */
              <CarCard 
                key={car.id} 
                car={car} 
                onSelect={setSelectedCar} 
                onCompare={toggleCompare} 
                isComparing={!!compareList.find(c => c.id === car.id)}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tighter uppercase">EZ <span className="text-primary">RENTALS</span></h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Global leaders in luxury mobility. Providing an unmatched fleet of the world's most prestigious vehicles since 2012.
              </p>
              <div className="flex gap-4">
                {['facebook-f', 'instagram', 'twitter', 'linkedin-in'].map(icon => (
                  <a key={icon} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6">Explore Fleet</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                {['Hypercars', 'Luxury Sedans', 'Exotic SUVs', 'Convertibles', 'Chauffeur Service'].map(item => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6">Company</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                {['Our Story', 'Locations', 'Partnerships', 'VIP Membership', 'Terms of Service'].map(item => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6">Newsletter</h3>
              <p className="text-sm text-gray-400 mb-4">Subscribe to receive exclusive offers and new fleet arrivals.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary flex-grow" 
                />
                <button className="bg-primary text-white p-3 rounded-lg hover:brightness-110 transition-all">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">© 2025 EZ RENTALS Global. All rights reserved.</p>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Cookie Settings</a>
              <a href="#" className="hover:text-white">Legal</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Compare Dock */}
      {compareList.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] w-[90vw] max-w-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl rounded-2xl p-4 flex items-center justify-between animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3 overflow-hidden">
              {compareList.map(car => (
                <div key={car.id} className="relative group">
                  <img 
                    src={car.image} 
                    className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-800 object-cover" 
                    alt={car.model} 
                  />
                  <button 
                    onClick={() => toggleCompare(car)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold dark:text-white">{compareList.length} Vehicles Selected</p>
              <p className="text-[10px] text-gray-500 uppercase">Compare performance stats</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setCompareList([])}
              className="px-4 py-2 text-xs font-bold text-gray-500 uppercase hover:text-black dark:hover:text-white"
            >
              Clear
            </button>
            <button 
              onClick={() => setIsCompareOpen(true)}
              className="px-6 py-2 bg-primary text-white rounded-xl text-xs font-bold uppercase shadow-lg hover:brightness-110 transition-all"
            >
              Compare Now
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-[200] bg-white dark:bg-zinc-950 flex flex-col">
          <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
            <h2 className="text-2xl font-black uppercase">Technical <span className="text-primary">Comparison</span></h2>
            <button 
              onClick={() => setIsCompareOpen(false)}
              className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="flex-grow overflow-auto p-6">
            <div className="max-w-7xl mx-auto grid grid-cols-[150px_1fr] md:grid-cols-[200px_1fr] gap-4">
              <div className="pt-20"></div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {compareList.map(car => (
                  <div key={car.id} className="space-y-4">
                    <img src={car.image} className="w-full aspect-video object-cover rounded-xl shadow-lg" alt="" />
                    <div className="text-center">
                      <p className="text-primary font-bold text-[10px] uppercase">{car.brand}</p>
                      <h3 className="font-bold dark:text-white">{car.model}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {[
                { label: 'Horsepower', key: 'horsepower', icon: 'tachometer-alt' },
                { label: '0-100 km/h', key: 'acceleration', icon: 'bolt' },
                { label: 'Top Speed', key: 'topSpeed', icon: 'wind' },
                { label: 'Engine', key: 'engine', icon: 'cog' },
                { label: 'Price/Day', key: 'pricePerDay', icon: 'tag', prefix: '$' }
              ].map(spec => (
                <React.Fragment key={spec.key}>
                  <div className="py-6 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
                    <i className={`fas fa-${spec.icon} text-primary w-5`}></i>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{spec.label}</span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-b border-gray-100 dark:border-white/5">
                    {compareList.map(car => (
                      <div key={car.id} className="py-6 text-center font-bold dark:text-white">
                        {spec.prefix}{ (car.specs as any)[spec.key] || (car as any)[spec.key] }
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="p-8 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 flex justify-center">
            <button 
              onClick={() => setIsCompareOpen(false)}
              className="px-12 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
            >
              Back to Fleet
            </button>
          </div>
        </div>
      )}

      {/* Car Details Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-slide-up">
            <div className="md:w-1/2 h-64 md:h-auto">
              <img src={selectedCar.image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="p-8 md:w-1/2 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-primary font-bold uppercase tracking-widest text-xs">{selectedCar.brand}</h4>
                  <h3 className="text-3xl font-black dark:text-white">{selectedCar.model}</h3>
                </div>
                <button onClick={() => setSelectedCar(null)} className="text-gray-400 hover:text-black dark:hover:text-white">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Acceleration</p>
                  <p className="font-bold dark:text-white">{selectedCar.specs.acceleration}</p>
                </div>
                <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Price/Day</p>
                  <p className="font-bold dark:text-white">${selectedCar.pricePerDay}</p>
                </div>
              </div>
              <button 
                className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-xl"
                onClick={() => handleBookNow(selectedCar)}
              >
                <i className="fab fa-whatsapp text-lg"></i> Book Now
              </button>
              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Includes full insurance, door-to-door delivery, and 24/7 VIP concierge support. No hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
