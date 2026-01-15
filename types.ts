
export enum Category {
  LUXURY = 'Luxury',
  SPORT = 'Sport',
  SUV = 'SUV',
  ELECTRIC = 'Electric',
  CONVERTIBLE = 'Convertible'
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  category: Category;
  year: number;
  pricePerDay: number;
  image: string;
  isAvailable: boolean;
  specs: {
    engine: string;
    acceleration: string;
    topSpeed: string;
    seats: number;
    fuelEfficiency: string;
    horsepower: number;
  };
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Translation {
  heroTitle: string;
  heroSub: string;
  searchPlaceholder: string;
  aboutUs: string;
  compare: string;
  fleet: string;
  locations: string;
  contact: string;
  rentNow: string;
  compareCars: string;
  availability: string;
}
