export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Interior Accessories',
    slug: 'interior-accessories',
    description: 'Steering covers, seat cushions, foot mats, perfume, and interior essentials',
    image: '/images/categories/interior.jpg',
  },
  {
    id: '2',
    name: 'Electronics & Charging',
    slug: 'electronics-charging',
    description: 'Car chargers, HUD, fan, window switches and LED ambient lighting',
    image: '/images/categories/electronics.jpg',
  },
  {
    id: '3',
    name: 'Car Lighting',
    slug: 'car-lighting',
    description: 'Head lights, fog lamps, side markers, truck lights and flash lights',
    image: '/images/categories/lighting.jpg',
  },
  {
    id: '4',
    name: 'Exterior Accessories',
    slug: 'exterior-accessories',
    description: 'Body kits, antennas, car logos, mirrors and exterior styling',
    image: '/images/categories/exterior.jpg',
  },
  {
    id: '5',
    name: 'Functional Accessories',
    slug: 'functional-accessories',
    description: 'Baby seats, ice boxes, air inflators, snow chains, and travel gear',
    image: '/images/categories/safety.jpg',
  },
];
