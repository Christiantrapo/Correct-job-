
import { Category, Car, Review } from './types';

const BRANDS = [
  'Rolls-Royce', 'Lamborghini', 'Ferrari', 'Bentley', 'Porsche', 
  'Mercedes-Benz', 'Audi', 'McLaren', 'Aston Martin', 'BMW',
  'Bugatti', 'Koenigsegg', 'Pagani', 'Maserati', 'Range Rover',
  'Lotus', 'Maybach', 'Lucid', 'Tesla', 'Cadillac', 'Rimac',
  'Pininfarina', 'Apollo', 'Hennessey', 'Zenvo', 'GMA', 'De Tomaso',
  'Lexus', 'Jaguar', 'Alfa Romeo', 'Genesis', 'Polestar'
];

const CATEGORIES = Object.values(Category);

// Generate 1000 luxury cars with extreme diversity
export const CARS: Car[] = Array.from({ length: 1000 }, (_, i) => {
  const brand = BRANDS[i % BRANDS.length];
  const category = CATEGORIES[i % CATEGORIES.length];
  
  const models: Record<string, string[]> = {
    'Rolls-Royce': ['Phantom VIII', 'Cullinan Black Badge', 'Ghost EWB', 'Spectre EV', 'Dawn Aero', 'Wraith Luminary', 'Boat Tail Custom'],
    'Lamborghini': ['Urus Performante', 'Revuelto V12', 'Huracán Sterrato', 'Aventador SVJ', 'Sian FKP 37', 'Veneno Roadster', 'Countach LPI 800-4', 'Essenza SCV12', 'Terzo Millennio'],
    'Ferrari': ['SF90 XX Stradale', 'Purosangue V12', '296 GTS', '812 Competizione', 'Roma Spider', 'F8 Tributo', 'Daytona SP3', 'LaFerrari Aperta', 'Monza SP2', '488 Pista'],
    'Bentley': ['Continental GT Mulliner', 'Bentayga EWB Azure', 'Flying Spur Speed', 'Bacalar', 'Batur', 'Mulsanne Grand Limousine'],
    'Porsche': ['911 Turbo S', 'Taycan Turbo GT', 'Cayenne Turbo GT', 'Panamera Turbo S E-Hybrid', '718 GT4 RS', '911 GT3 RS', '918 Spyder', 'Carrera GT', 'Mission X'],
    'Mercedes-Benz': ['G63 AMG Magno', 'S680 Maybach', 'GT 63 S E Performance', 'SL 63 AMG', 'AMG One', 'EQS 580', 'EQG Electric G-Class'],
    'Audi': ['RS Q8', 'R8 V10 GT RWD', 'RS6 Avant Performance', 'e-tron GT RS', 'RS7 Performance', 'Horch A8 L'],
    'McLaren': ['750S Spider', 'Artura Performance', '765LT Spider', 'Senna GTR', 'McLaren GT', 'P1 GTR', 'Speedtail', 'Elva MSO', 'Solus GT'],
    'Aston Martin': ['DBS Volante Ultimate', 'DBX 707', 'Vantage F1 Edition', 'Valhalla', 'Valkyrie AMR Pro', 'One-77', 'Victor', 'DB12 Volante'],
    'BMW': ['M8 Competition', 'XM Label Red', 'i7 M70', 'M5 CS', 'Z4 M40i', 'M4 CSL', '3.0 CSL Hommage'],
    'Bugatti': ['Chiron Super Sport 300+', 'Mistral Roadster', 'Bolide', 'Divo', 'Centodieci', 'Veyron Grand Sport Vitesse', 'La Voiture Noire'],
    'Koenigsegg': ['Jesko Absolut', 'Gemera HVH', 'Regera', 'Agera RS', 'One:1', 'CC850', 'Quant'],
    'Pagani': ['Huayra Roadster BC', 'Utopia', 'Zonda Cinque', 'Huayra Imola', 'Zonda Revolucion'],
    'Maserati': ['MC20 Cielo', 'GranTurismo Folgore', 'Grecale Trofeo', 'MC12 Stradale'],
    'Range Rover': ['SV Autobiography LWB', 'Sport SVR Ultimate', 'Velar HST', 'Evoque Dynamic NW'],
    'Lotus': ['Evija Fittipaldi', 'Emira V6', 'Eletre R'],
    'Maybach': ['GLS 600 Night Series', 'S-Class Haute Voiture', 'Electric SUV Concept'],
    'Lucid': ['Air Sapphire', 'Air Grand Touring Performance'],
    'Tesla': ['Model S Plaid+', 'Model X Plaid', 'Roadster 2.0 Space Edition', 'Cybertruck Cyberbeast'],
    'Cadillac': ['Escalade-V ESV', 'CT5-V Blackwing', 'Celestiq Custom'],
    'Rimac': ['Nevera Time Attack', 'Concept One'],
    'Pininfarina': ['Battista Anniversario', 'B95 Speedster'],
    'Apollo': ['Intensa Emozione', 'Project Evo'],
    'Hennessey': ['Venom F5 Revolution', 'VelociRaptor 6x6', 'Mammoth 1000'],
    'Zenvo': ['Aurora Agil', 'Aurora Tur', 'TSR-GT'],
    'GMA': ['T.50 Niki Lauda', 'T.33 Spider'],
    'De Tomaso': ['P72', 'P900'],
    'Lexus': ['LFA Nürburgring', 'LC 500 Inspiration', 'LX 600 Ultra Luxury'],
    'Jaguar': ['F-Type ZP Edition', 'F-Pace SVR Edition 1988'],
    'Alfa Romeo': ['33 Stradale', 'Giulia GTA'],
    'Genesis': ['G90 Magma', 'GV80 Coupe'],
    'Polestar': ['Polestar 1', 'Polestar 6 LA Concept']
  };
  
  const brandModels = models[brand] || ['Elite Edition', 'Grand Tourer', 'Performance Plus'];
  const model = brandModels[i % brandModels.length];

  // Logic for generating realistic price scaling
  const basePrice = 350;
  const topTier = ['Bugatti', 'Koenigsegg', 'Pagani', 'Rimac', 'Apollo', 'Zenvo', 'GMA'].includes(brand);
  const brandPremium = topTier ? 3500 : ((BRANDS.indexOf(brand) < 10) ? 950 : 300);
  
  const isElectric = ['Tesla', 'Lucid', 'Rimac', 'Pininfarina', 'Polestar'].includes(brand) || (i % 8 === 0);
  const isLimited = (i % 15 === 0);

  return {
    id: `car-${i}`,
    brand,
    model: `${model}${isLimited ? ' [1 of 10]' : ''}${i % 7 === 0 ? ' Black Badge' : ''}${i % 11 === 0 ? ' Carbon' : ''}`,
    category: topTier ? Category.SPORT : (brand === 'Tesla' || isElectric ? Category.ELECTRIC : category),
    year: 2025 - (i % 3),
    pricePerDay: basePrice + brandPremium + (i % 50) * 25,
    image: `https://picsum.photos/seed/luxe-car-${i}/1200/800`,
    isAvailable: Math.random() > 0.12, // 88% availability
    specs: {
      engine: isElectric ? 'Electric Quad Motor' : (topTier || i % 6 === 0 ? 'W16 Quad-Turbo' : (i % 4 === 0 ? 'V12 Bi-Turbo' : 'V8 Hybrid')),
      acceleration: (1.7 + (i % 25) / 12).toFixed(1) + 's',
      topSpeed: (310 + (i % 20) * 8) + ' km/h',
      seats: category === Category.SUV ? 5 : (category === Category.LUXURY ? 4 : 2),
      fuelEfficiency: isElectric ? `${550 + (i % 40) * 10} km Range` : `${9 + (i % 14)} L/100km`,
      horsepower: 650 + (i % 25) * 60 + (isElectric ? 450 : 0) + (topTier ? 1100 : 0)
    }
  };
});

export const REVIEWS: Review[] = [
  { id: '1', user: 'Alex Thompson', rating: 5, comment: 'Incredible service in Dubai. The G63 was pristine and delivered right to my hotel at the Burj Al Arab.', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', user: 'Elena Rodriguez', rating: 5, comment: 'Rented a Ferrari in Marbella for the weekend. Seamless delivery and the car sounded like a dream.', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', user: 'Marcus Chen', rating: 5, comment: 'The best luxury fleet I have seen globally. Their white-glove service in Singapore was unmatched.', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', user: 'Sarah Jenkins', rating: 5, comment: 'Excellent communication and punctual delivery in London. The Rolls-Royce was immaculate.', avatar: 'https://i.pravatar.cc/150?u=4' },
];

export const CITIES = [
  "Dubai", "Madrid", "Barcelona", "Marbella", "Ibiza", "Paris", "London", "Monaco", "Milan", "Rome",
  "Geneva", "Zurich", "New York", "Los Angeles", "Miami", "Las Vegas", "Tokyo", "Singapore", "Hong Kong", "Sydney",
  "Munich", "Berlin", "Vienna", "Lisbon", "Amsterdam", "Brussels", "Copenhagen", "Stockholm", "Oslo", "Istanbul",
  "Doha", "Riyadh", "Abu Dhabi", "Cape Town", "Marrakech", "Mexico City", "São Paulo", "Buenos Aires", "Toronto", "Vancouver",
  "Seoul", "Shanghai", "Bangkok", "Bali", "Phuket", "Mumbai", "New Delhi", "Cairo", "Athens", "Prague"
];

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' }
];

export const TRANSLATIONS: Record<string, any> = {
  en: {
    heroTitle: "Elegance Without Borders",
    heroSub: "Based in Dubai & Spain. Delivering Excellence Worldwide.",
    searchPlaceholder: "Search models, brands...",
    aboutUs: "About Us",
    compare: "Compare",
    fleet: "Our Fleet",
    locations: "Global Locations",
    contact: "Contact",
    rentNow: "Rent via WhatsApp",
    compareCars: "Compare Vehicles",
    availability: "Availability",
    available: "Available",
    booked: "Booked",
    pDay: "per day",
    support: "Live Support"
  },
  es: {
    heroTitle: "Elegancia Sin Fronteras",
    heroSub: "Sede en Dubai y España. Excelencia en todo el mundo.",
    searchPlaceholder: "Buscar modelos, marcas...",
    aboutUs: "Sobre Nosotros",
    compare: "Comparar",
    fleet: "Nuestra Flota",
    locations: "Sedes Globales",
    contact: "Contacto",
    rentNow: "Alquilar por WhatsApp",
    compareCars: "Comparar Vehículos",
    availability: "Disponibilidad",
    available: "Disponible",
    booked: "Reservado",
    pDay: "por día",
    support: "Soporte en vivo"
  },
  ar: {
    heroTitle: "أناقة بلا حدود",
    heroSub: "مقرنا في دبي وإسبانيا. نقدم التميز في جميع أنحاء العالم.",
    searchPlaceholder: "البحث عن الموديلات، العلامات التجارية...",
    aboutUs: "اتصل بنا",
    compare: "قارن",
    fleet: "أسطولنا",
    locations: "مواقع عالمية",
    contact: "اتصل",
    rentNow: "استئجار عبر واتساب",
    compareCars: "قارن السيارات",
    availability: "التوفر",
    available: "متاح",
    booked: "محجوز",
    pDay: "يومياً",
    support: "الدعم المباشر"
  }
};
