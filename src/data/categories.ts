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
    description: 'Seat covers, steering wheel covers, floor mats and interior products',
    image: '/images/categories/interior.jpg',
  },
  {
    id: '2',
    name: 'Car Electronics',
    slug: 'car-electronics',
    description: 'Chargers, HUD, LED lights and smart accessories',
    image: '/images/categories/electronics.jpg',
  },
  {
    id: '3',
    name: 'Car Lighting',
    slug: 'car-lighting',
    description: 'Headlights, fog lamps, truck lights and LED systems',
    image: '/images/categories/lighting.jpg',
  },
  {
    id: '4',
    name: 'Exterior Accessories',
    slug: 'exterior-accessories',
    description: 'Body kits, mirrors, antennas and car styling products',
    image: '/images/categories/exterior.jpg',
  },
  {
    id: '5',
    name: 'Safety & Utility',
    slug: 'safety-utility',
    description: 'Baby seats, inflators, phone holders and travel accessories',
    image: '/images/categories/safety.jpg',
  },
];
