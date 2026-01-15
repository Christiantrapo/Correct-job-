
import { Category, Car, Review } from './types';

const BRANDS = [
  'Rolls-Royce', 'Lamborghini', 'Ferrari', 'Bentley', 'Porsche', 
  'Mercedes-Benz', 'Audi', 'McLaren', 'Aston Martin', 'BMW',
  'Bugatti', 'Koenigsegg', 'Pagani', 'Maserati', 'Range Rover',
  'Lotus', 'Maybach', 'Lucid', 'Tesla', 'Cadillac', 'Rimac',
  'Pininfarina', 'Apollo', 'Hennessey', 'Zenvo', 'GMA', 'De Tomaso'
];

const CATEGORIES = Object.values(Category);

// Generate 500 luxury cars with extreme diversity
export const CARS: Car[] = Array.from({ length: 500 }, (_, i) => {
  const brand = BRANDS[i % BRANDS.length];
  const category = CATEGORIES[i % CATEGORIES.length];
  
  const models: Record<string, string[]> = {
    'Rolls-Royce': ['Phantom', 'Cullinan', 'Ghost', 'Spectre', 'Dawn', 'Wraith', 'Boat Tail'],
    'Lamborghini': ['Urus Performante', 'Revuelto', 'Huracán STO', 'Aventador Ultimae', 'Sian', 'Veneno', 'Countach LPI 800-4'],
    'Ferrari': ['SF90 Stradale', 'Purosangue', '296 GTB', '812 GTS', 'Roma Spider', 'F8 Tributo', 'Daytona SP3', 'LaFerrari'],
    'Bentley': ['Continental GT Mulliner', 'Bentayga EWB', 'Flying Spur Speed', 'Bacalar', 'Batur'],
    'Porsche': ['911 Turbo S', 'Taycan Turbo S', 'Cayenne Turbo GT', 'Panamera Turbo S', '718 GT4 RS', '911 GT3 RS', '918 Spyder'],
    'Mercedes-Benz': ['G63 AMG Magno', 'S680 Maybach', 'GT 63 S E Performance', 'SL 63 AMG', 'AMG One', 'EQS 580'],
    'Audi': ['RS Q8', 'R8 V10 Performance Quattro', 'RS6 Avant', 'e-tron GT RS', 'RS7 Performance'],
    'McLaren': ['750S Spider', 'Artura', '720S', 'Senna', 'GT', 'P1', 'Speedtail', 'Elva'],
    'Aston Martin': ['DBS Volante', 'DBX 707', 'Vantage F1 Edition', 'Valhalla', 'Valkyrie', 'One-77'],
    'BMW': ['M8 Competition', 'XM Label Red', 'i7 M70', 'M5 CS', 'Z4 M40i', 'M4 CSL'],
    'Bugatti': ['Chiron Super Sport', 'Mistral', 'Bolide', 'Divo', 'Centodieci', 'Veyron Grand Sport'],
    'Koenigsegg': ['Jesko Attack', 'Gemera', 'Regera', 'Agera RS', 'One:1', 'CC850'],
    'Pagani': ['Huayra Roadster BC', 'Utopia', 'Zonda Cinque', 'Huayra Imola'],
    'Maserati': ['MC20 Cielo', 'GranTurismo Folgore', 'Grecale Trofeo', 'MC12'],
    'Range Rover': ['SV Autobiography', 'Sport SVR', 'Velar HST', 'Evoque Dynamic'],
    'Lotus': ['Evija', 'Emira', 'Eletre R'],
    'Maybach': ['GLS 600', 'S-Class Night Series', 'Electric SUV'],
    'Lucid': ['Air Sapphire', 'Air Grand Touring'],
    'Tesla': ['Model S Plaid', 'Model X Plaid', 'Roadster 2.0', 'Cybertruck Foundation'],
    'Cadillac': ['Escalade-V', 'CT5-V Blackwing', 'Celestiq'],
    'Rimac': ['Nevera', 'Concept One'],
    'Pininfarina': ['Battista', 'B95 Speedster'],
    'Apollo': ['Intensa Emozione', 'Project Evo'],
    'Hennessey': ['Venom F5', 'VelociRaptor 6x6'],
    'Zenvo': ['Aurora', 'TSR-S'],
    'GMA': ['T.50', 'T.33'],
    'De Tomaso': ['P72']
  };
  
  const brandModels = models[brand] || ['Elite Edition', 'Grand Tourer', 'Performance Plus'];
  const model = brandModels[i % brandModels.length];

  // Logic for generating realistic price scaling
  const basePrice = 300;
  const topTier = ['Bugatti', 'Koenigsegg', 'Pagani', 'Rimac', 'Apollo'].includes(brand);
  const brandPremium = topTier ? 2500 : ((BRANDS.indexOf(brand) < 8) ? 800 : 200);
  
  const isElectric = ['Tesla', 'Lucid', 'Rimac', 'Pininfarina'].includes(brand) || (i % 7 === 0);

  return {
    id: `car-${i}`,
    brand,
    model: `${model}${i % 7 === 0 ? ' Black Badge' : ''}${i % 11 === 0 ? ' Carbon Edition' : ''}${i % 13 === 0 ? ' Heritage' : ''}`,
    category: topTier ? Category.SPORT : category,
    year: 2025 - (i % 4),
    pricePerDay: basePrice + brandPremium + (i % 100) * 20,
    image: `https://picsum.photos/seed/luxe-car-${i}/1200/800`,
    isAvailable: Math.random() > 0.15, // 85% availability
    specs: {
      engine: isElectric ? 'Electric Quad Motor' : (topTier || i % 5 === 0 ? 'W16 Quad-Turbo' : (i % 3 === 0 ? 'V12 Bi-Turbo' : 'V8 Hybrid')),
      acceleration: (1.8 + (i % 20) / 10).toFixed(1) + 's',
      topSpeed: (300 + (i % 15) * 10) + ' km/h',
      seats: category === Category.SUV ? 5 : (category === Category.LUXURY ? 4 : 2),
      fuelEfficiency: isElectric ? `${500 + (i % 30) * 10} km Range` : `${10 + (i % 12)} L/100km`,
      horsepower: 600 + (i % 20) * 50 + (isElectric ? 400 : 0) + (topTier ? 1000 : 0)
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
