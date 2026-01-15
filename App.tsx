
import React, { useState, useEffect, useMemo, useRef } from 'react';
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

const CarCard = ({ 
  car, 
  onSelect, 
  onCompare, 
  isComparing,
  t 
}: { 
  car: Car; 
  onSelect: (c: Car) => void; 
  onCompare: (c: Car) => void;
  isComparing: boolean;
  t: any;
  key?: React.Key;
}) => (
  <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-800 transition-all hover:scale-[1.02] group flex flex-col h-full">
    <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onSelect(car)}>
      <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md ${car.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {car.isAvailable ? t.available : t.booked}
        </span>
        <button 
          onClick={(e) => { e.stopPropagation(); onCompare(car); }}
          className={`p-2 rounded-full shadow-md ${isComparing ? 'bg-primary text-white' : 'bg-white/90 text-gray-800'} backdrop-blur-sm transition-colors`}
        >
          <i className="fas fa-exchange-alt"></i>
        </button>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">{car.brand}</h3>
          <h2 className="text-lg font-bold dark:text-white leading-tight">{car.model}</h2>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-gray-900 dark:text-gray-100">${car.pricePerDay}</p>
          <p className="text-[10px] text-gray-500 uppercase">{t.pDay}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-auto pt-4 text-[11px] text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-1.5"><i className="fas fa-bolt text-primary"></i> {car.specs.acceleration}</div>
        <div className="flex items-center gap-1.5"><i className="fas fa-users text-primary"></i> {car.specs.seats} Seats</div>
        <div className="flex items-center gap-1.5"><i className="fas fa-cog text-primary"></i> {car.category}</div>
        <div className="flex items-center gap-1.5"><i className="fas fa-calendar text-primary"></i> {car.year}</div>
      </div>
      <button 
        onClick={() => onSelect(car)}
        className="w-full mt-4 py-3 bg-black dark:bg-white dark:text-black text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
      >
        View Details
      </button>
    </div>
  </div>
);

const Modal = ({ car, onClose, t }: { car: Car; onClose: () => void; t: any }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
    <div className="bg-white dark:bg-zinc-950 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <img src={car.image} className="w-full h-full object-cover" alt={car.model} />
        <button onClick={onClose} className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40">
           <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="p-8 space-y-6 w-full md:w-1/2 max-h-[80vh] overflow-y-auto hide-scrollbar">
        <div>
          <span className="text-primary font-bold tracking-widest uppercase text-xs">{car.brand}</span>
          <h2 className="text-4xl font-black dark:text-white leading-tight">{car.model}</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${car.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-xs font-bold uppercase tracking-wider">{car.isAvailable ? t.available : t.booked}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: '0-100 km/h', value: car.specs.acceleration },
            { label: 'Horsepower', value: `${car.specs.horsepower} hp` },
            { label: 'Efficiency', value: car.specs.fuelEfficiency },
            { label: 'Price/Day', value: `$${car.pricePerDay}` }
          ].map((spec, i) => (
            <div key={i} className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{spec.label}</p>
              <p className="font-bold text-lg dark:text-white">{spec.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-4">
          <a 
            href={`https://wa.me/971500000000?text=I%20am%20interested%20in%20the%20${car.brand}%20${car.model}`}
            target="_blank"
            className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-all text-lg shadow-lg"
          >
            <i className="fab fa-whatsapp text-2xl"></i> {t.rentNow}
          </a>
          <button 
            onClick={() => window.open('mailto:vip@luxedrive.com')}
            className="w-full py-4 border-2 border-gray-200 dark:border-zinc-800 dark:text-white rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all"
          >
             {t.support}
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center font-medium">
          Premium delivery to your doorstep in Dubai, Madrid, or worldwide.
        </p>
      </div>
    </div>
  </div>
);

const HeroCarousel = ({ cars }: { cars: Car[] }) => {
  const [current, setCurrent] = useState(0);
  const slides = useMemo(() => cars.slice(0, 5), [cars]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 z-0 bg-zinc-950 overflow-hidden">
      {slides.map((car, index) => (
        <div
          key={car.id}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={car.image}
            className={`w-full h-full object-cover grayscale-[0.2] transition-transform duration-[8000ms] ease-out ${
              index === current ? 'scale-110' : 'scale-100'
            }`}
            alt={car.model}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-zinc-950 z-20" />
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === current ? 'w-12 bg-primary' : 'w-6 bg-white/20'
            }`}
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
  const [search, setSearch] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

  // Range-based filter states
  const bounds = useMemo(() => {
    const prices = CARS.map(c => c.pricePerDay);
    const years = CARS.map(c => c.year);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      minYear: Math.min(...years),
      maxYear: Math.max(...years)
    };
  }, []);

  const [priceRange, setPriceRange] = useState({ min: bounds.minPrice, max: bounds.maxPrice });
  const [yearRange, setYearRange] = useState({ min: bounds.minYear, max: bounds.maxYear });

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const allBrands = useMemo(() => Array.from(new Set(CARS.map(c => c.brand))).sort(), []);
  const allCategories = useMemo(() => Object.values(Category), []);

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
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
      const matchesPrice = car.pricePerDay >= priceRange.min && car.pricePerDay <= priceRange.max;
      const matchesYear = car.year >= yearRange.min && car.year <= yearRange.max;
      return matchesSearch && matchesCat && matchesBrand && matchesPrice && matchesYear;
    });
  }, [search, activeCategories, selectedBrands, priceRange, yearRange]);

  const toggleCompare = (car: Car) => {
    setCompareList(prev => {
      if (prev.find(c => c.id === car.id)) return prev.filter(c => c.id !== car.id);
      if (prev.length >= 3) return prev;
      return [...prev, car];
    });
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (cat: string) => {
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSearch('');
    setActiveCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: bounds.minPrice, max: bounds.maxPrice });
    setYearRange({ min: bounds.minYear, max: bounds.maxYear });
    setVisibleCount(16);
  };

  const activeFilterCount = useMemo(() => {
    let count = activeCategories.length + selectedBrands.length;
    if (priceRange.min !== bounds.minPrice || priceRange.max !== bounds.maxPrice) count++;
    if (yearRange.min !== bounds.minYear || yearRange.max !== bounds.maxYear) count++;
    return count;
  }, [activeCategories, selectedBrands, priceRange, yearRange, bounds]);

  const hasAnyFilter = activeFilterCount > 0 || search.length > 0;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[80] transition-all duration-500 ${isScrolled ? 'glass-nav h-16 shadow-lg' : 'bg-transparent h-24'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-2xl font-black tracking-tighter dark:text-white uppercase">LUXE<span className="text-primary">DRIVE</span></h1>
            <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-300">
              <a href="#fleet" className="hover:text-primary transition-colors">{t.fleet}</a>
              <a href="#locations" className="hover:text-primary transition-colors">{t.locations}</a>
              <a href="#about" className="hover:text-primary transition-colors">{t.aboutUs}</a>
              <a href="#contact" className="hover:text-primary transition-colors">{t.contact}</a>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-[11px] font-black uppercase tracking-widest border-none cursor-pointer focus:ring-0 text-gray-600 dark:text-gray-300"
              >
                {LANGUAGES.map(l => <option key={l.code} value={l.code} className="bg-white dark:bg-black text-black dark:text-white">{l.label}</option>)}
              </select>
            </div>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroCarousel cars={CARS} />
        
        <div className="relative z-30 text-center text-white px-6 max-w-5xl">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="px-5 py-2 border border-white/20 rounded-full text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-xl bg-white/5">DUBAI</span>
            <span className="px-5 py-2 border border-white/20 rounded-full text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-xl bg-white/5">SPAIN</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85] text-balance">
            {t.heroTitle.split(' ').map((word: string, i: number) => (
              <span key={i} className={i === 1 ? 'text-primary' : ''}>{word} </span>
            ))}
          </h1>
          <p className="text-lg md:text-2xl font-light opacity-80 max-w-2xl mx-auto leading-relaxed tracking-wide mb-12">
            {t.heroSub}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="#fleet" className="group relative px-12 py-6 bg-primary text-white rounded-full font-black text-sm uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20">
              <span className="relative z-10">Explore Fleet</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a href="#contact" className="px-12 py-6 border border-white/20 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-md">
              Inquire Now
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-30 opacity-40">
          <i className="fas fa-mouse text-2xl text-white"></i>
        </div>
      </header>

      {/* Search & Fleet */}
      <section id="fleet" className="py-24 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-8 mb-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="flex-grow max-w-2xl w-full">
                <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Discovery</h2>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-4xl font-black dark:text-white">Unmatched Selection.</h3>
                  <div className="flex gap-2">
                    {hasAnyFilter && (
                      <button 
                        onClick={resetFilters}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400"
                        title="Reset all filters and search"
                      >
                        <i className="fas fa-undo-alt"></i>
                        Reset
                      </button>
                    )}
                    <button 
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all border ${
                        showAdvancedFilters || activeFilterCount > 0
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                        : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 dark:text-gray-300'
                      }`}
                    >
                      <i className="fas fa-sliders-h"></i>
                      Filters
                      {activeFilterCount > 0 && (
                        <span className="bg-white text-primary rounded-full px-2 py-0.5 text-[10px] ml-1">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                <div className="relative group">
                  <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-16 pr-6 py-6 rounded-2xl bg-white dark:bg-zinc-900 border-none shadow-xl focus:ring-2 focus:ring-primary transition-all dark:text-white"
                  />
                </div>
              </div>
              <div className="w-full md:w-auto">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Multi-Select Categories</p>
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {allCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-8 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                        activeCategories.includes(cat) 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                        : 'bg-white dark:bg-zinc-900 dark:text-white border-gray-100 dark:border-zinc-800'
                      }`}
                    >
                      {cat}
                      {activeCategories.includes(cat) && <i className="fas fa-check ml-2 text-[10px]"></i>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
              <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-2xl animate-in slide-in-from-top duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price per Day ($)</p>
                      <button 
                        onClick={() => setPriceRange({ min: bounds.minPrice, max: bounds.maxPrice })}
                        className="text-[10px] font-bold text-primary hover:underline"
                      >
                        Reset Range
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-grow">
                        <label className="text-[10px] font-bold text-gray-400 block mb-1">MIN</label>
                        <input 
                          type="number" 
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                          className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl p-3 font-bold dark:text-white focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div className="pt-5 text-gray-300">—</div>
                      <div className="flex-grow">
                        <label className="text-[10px] font-bold text-gray-400 block mb-1">MAX</label>
                        <input 
                          type="number" 
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                          className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl p-3 font-bold dark:text-white focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Model Year</p>
                      <button 
                        onClick={() => setYearRange({ min: bounds.minYear, max: bounds.maxYear })}
                        className="text-[10px] font-bold text-primary hover:underline"
                      >
                        Reset Years
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-grow">
                        <label className="text-[10px] font-bold text-gray-400 block mb-1">FROM</label>
                        <input 
                          type="number" 
                          value={yearRange.min}
                          onChange={(e) => setYearRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                          className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl p-3 font-bold dark:text-white focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div className="pt-5 text-gray-300">—</div>
                      <div className="flex-grow">
                        <label className="text-[10px] font-bold text-gray-400 block mb-1">TO</label>
                        <input 
                          type="number" 
                          value={yearRange.max}
                          onChange={(e) => setYearRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                          className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl p-3 font-bold dark:text-white focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Brand Filter Row */}
            <div className="w-full">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Filter by Manufacturer</p>
              <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                {allBrands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                      selectedBrands.includes(brand) 
                      ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' 
                      : 'bg-transparent border-gray-200 dark:border-zinc-800 dark:text-gray-400 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCars.slice(0, visibleCount).map(car => (
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

          {filteredCars.length === 0 && (
            <div className="py-20 text-center">
              <i className="fas fa-car-side text-6xl text-gray-200 dark:text-zinc-800 mb-6"></i>
              <p className="text-xl text-gray-500 font-medium">No luxury vehicles match your current filters.</p>
              <button 
                onClick={resetFilters}
                className="mt-6 text-primary font-bold underline"
              >
                Reset all filters
              </button>
            </div>
          )}
          
          {filteredCars.length > visibleCount && (
            <div className="mt-16 text-center">
               <button 
                 onClick={() => setVisibleCount(prev => prev + 16)}
                 className="px-12 py-5 bg-black dark:bg-white dark:text-black text-white rounded-full font-black text-lg hover:scale-105 transition-transform shadow-2xl"
               >
                 Show More Vehicles ({filteredCars.length - visibleCount} remaining)
               </button>
            </div>
          )}
        </div>
      </section>

      {/* Comparison Drawer UI (Button) */}
      {compareList.length > 0 && (
        <button 
          onClick={() => setShowCompareModal(true)}
          className="fixed bottom-32 right-8 z-[90] flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-full font-bold shadow-2xl animate-bounce hover:scale-110 transition-transform"
        >
          <i className="fas fa-columns"></i>
          {t.compare} ({compareList.length})
        </button>
      )}

      {/* About Us */}
      <section id="about" className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-16">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-2xl" alt="LuxeDrive Awards" />
            <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-3xl text-white shadow-2xl max-w-[240px]">
              <i className="fas fa-trophy text-4xl mb-4"></i>
              <p className="font-bold text-lg leading-tight">Global Luxury Rental Award 2023</p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">{t.aboutUs}</h2>
            <h3 className="text-5xl font-black dark:text-white leading-tight">Crafting the World's Finest Driving Experiences.</h3>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              Founded in the heart of Dubai and expanded across Spain, LuxeDrive Global has redefined premium vehicle accessibility for over a decade. We don't just rent cars; we provide keys to a lifestyle of absolute refinement and global mobility.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-3xl font-black dark:text-white mb-2">500+</h4>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Premium Vehicles</p>
              </div>
              <div>
                <h4 className="text-3xl font-black dark:text-white mb-2">50+</h4>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Global Cities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Locations */}
      <section id="locations" className="py-24 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">{t.locations}</h2>
            <h3 className="text-4xl font-black dark:text-white">Seamless Delivery Anywhere.</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CITIES.slice(0, 20).map((city, i) => (
              <a 
                key={i} 
                href="#contact"
                className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-primary dark:hover:border-primary hover:shadow-lg transition-all text-center group"
              >
                <p className="font-bold dark:text-white group-hover:text-primary transition-colors">{city}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ready for Delivery</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews & Photos */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Wall of Fame</h2>
            <h3 className="text-4xl font-black dark:text-white">Trusted by VIPs Worldwide.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {REVIEWS.map(review => (
              <div key={review.id} className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-4 mb-6">
                  <img src={review.avatar} className="w-12 h-12 rounded-full ring-2 ring-primary/20" alt="" />
                  <div>
                    <p className="font-bold dark:text-white">{review.user}</p>
                    <div className="flex gap-1 text-[10px] text-yellow-500">
                      {[...Array(review.rating)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">{t.contact}</h2>
            <h3 className="text-5xl font-black mb-8 leading-tight">Reserve Your Luxury Journey Now.</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Dubai Head Office</p>
                  <p className="text-lg font-bold">Business Bay, Opus by Zaha Hadid</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10">
                  <i className="fas fa-phone text-xl"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">24/7 Hotline</p>
                  <p className="text-lg font-bold">+971 50 000 0000</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10">
                  <i className="fas fa-envelope text-xl"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">VIP Email</p>
                  <p className="text-lg font-bold">vip@luxedrive.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" />
              </div>
              <textarea placeholder="Message / Specific Requirements" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-1 focus:ring-primary focus:outline-none" />
              <button className="w-full py-5 bg-primary text-white rounded-xl font-black text-lg hover:opacity-90 transition-opacity">Send Inquiry</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tighter uppercase">LUXE<span className="text-primary">DRIVE</span></h2>
              <p className="text-sm text-gray-500 leading-relaxed">The pinnacle of luxury car rental. Headquartered in Dubai and Marbella, serving the most discerning clients across the globe.</p>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-gray-400">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#fleet" className="hover:text-primary transition-colors">Our Fleet</a></li>
                <li><a href="#locations" className="hover:text-primary transition-colors">Global Offices</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">About the Group</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Career Opportunities</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-gray-400">Policy</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Insurance Details</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-gray-400">Newsletter</h4>
              <p className="text-sm text-gray-500 mb-6">Join our VIP list for exclusive fleet updates.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none" />
                <button className="p-2 bg-primary rounded-lg px-4"><i className="fas fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            <p>&copy; 2024 LuxeDrive Global. All Rights Reserved.</p>
            <div className="flex gap-6">
              <i className="fab fa-instagram hover:text-white transition-colors cursor-pointer"></i>
              <i className="fab fa-linkedin hover:text-white transition-colors cursor-pointer"></i>
              <i className="fab fa-facebook hover:text-white transition-colors cursor-pointer"></i>
              <i className="fab fa-twitter hover:text-white transition-colors cursor-pointer"></i>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        <button 
          onClick={() => window.open('https://wa.me/971500000000')}
          className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform text-2xl"
        >
          <i className="fab fa-whatsapp"></i>
        </button>
        <button 
          onClick={() => window.open('mailto:vip@luxedrive.com')}
          className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform text-2xl"
        >
          <i className="fas fa-headset"></i>
        </button>
      </div>

      {/* Comparison Modal Overlay */}
      {showCompareModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto py-10">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">{t.compareCars}</h2>
                <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs">Side-by-side technical evaluation</p>
              </div>
              <button onClick={() => setShowCompareModal(false)} className="text-white text-3xl hover:text-primary transition-all p-4 bg-white/5 rounded-full">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className={`grid grid-cols-1 gap-8 ${
              compareList.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' : 
              compareList.length === 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 
              'md:grid-cols-3'
            }`}>
              {compareList.map(car => (
                <div key={car.id} className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8 relative overflow-hidden group shadow-2xl">
                  <div className="relative h-64 overflow-hidden rounded-2xl">
                    <img src={car.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                  <div>
                    <h4 className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-2">{car.brand}</h4>
                    <h3 className="text-3xl font-black text-white leading-tight">{car.model}</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Engine</span>
                      <span className="text-white font-black text-xs">{car.specs.engine}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Power</span>
                      <span className="text-white font-black text-xs">{car.specs.horsepower} HP</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Range/Eff.</span>
                      <span className="text-white font-black text-xs">{car.specs.fuelEfficiency}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Acceleration</span>
                      <span className="text-white font-black text-xs">{car.specs.acceleration}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Capacity</span>
                      <span className="text-white font-black text-xs">{car.specs.seats} SEATS</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Daily Rate</span>
                      <span className="text-primary font-black text-3xl">${car.pricePerDay}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleCompare(car)}
                    className="w-full py-5 bg-red-500/10 text-red-500 rounded-2xl font-black hover:bg-red-500 hover:text-white transition-all text-xs uppercase tracking-[0.2em]"
                  >
                    Remove Selection
                  </button>
                </div>
              ))}
              
              {compareList.length < 3 && (
                <div onClick={() => setShowCompareModal(false)} className="cursor-pointer border-2 border-dashed border-white/10 rounded-3xl flex items-center justify-center p-12 text-center text-gray-500 hover:border-white/20 hover:bg-white/5 transition-all min-h-[500px]">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                      <i className="fas fa-plus text-2xl opacity-20"></i>
                    </div>
                    <p className="font-bold text-xs uppercase tracking-[0.2em]">Add Technical Data</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedCar && <Modal car={selectedCar} onClose={() => setSelectedCar(null)} t={t} />}
    </div>
  );
}
