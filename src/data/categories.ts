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
    description: 'Steering Covers, Seat Cushions, Floor Mats and More.',
    image: '/images/categories/interior.jpg',
  },
  {
    id: '2',
    name: 'Air Fresheners',
    slug: 'air-fresheners',
    description: 'Vent Clips, Diffusers and OEM Fragrance Solutions.',
    image: '/images/categories/electronics.jpg',
  },
  {
    id: '3',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Chargers, HUD Displays, Switches and Ambient Lighting.',
    image: '/images/categories/electronics.jpg',
  },
  {
    id: '4',
    name: 'Lighting',
    slug: 'lighting',
    description: 'Headlights, Fog Lamps, LED Strips and Signal Lights.',
    image: '/images/categories/lighting.jpg',
  },
  {
    id: '5',
    name: 'Exterior Accessories',
    slug: 'exterior-accessories',
    description: 'Mirrors, Emblems, Antennas and Styling Parts.',
    image: '/images/categories/exterior.jpg',
  },
  {
    id: '6',
    name: 'Utility & Safety Products',
    slug: 'utility-safety-products',
    description: 'Inflators, Refrigerators, Child Seats and Safety Essentials.',
    image: '/images/categories/safety.jpg',
  },
];
