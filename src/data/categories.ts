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
    description: 'A wide range of interior upgrade products including steering covers, seat cushions, floor mats, organizers, and comfort accessories for all vehicle types.',
    image: '/images/categories/interior.jpg',
  },
  {
    id: '2',
    name: 'Air Fresheners',
    slug: 'air-fresheners',
    description: 'Car air fresheners, perfume diffusers, and scent products in various types, fragrances, and designs for a pleasant cabin environment.',
    image: '/images/categories/electronics.jpg',
  },
  {
    id: '3',
    name: 'Electronics',
    slug: 'electronics',
    description: 'In-car electronics and charging solutions covering chargers, HUD displays, cooling fans, window switches, and ambient lighting systems.',
    image: '/images/categories/electronics.jpg',
  },
  {
    id: '4',
    name: 'Lighting',
    slug: 'lighting',
    description: 'Complete automotive lighting solutions including headlight bulbs, fog lamps, signal and marker lights, truck lighting, and warning beacons.',
    image: '/images/categories/lighting.jpg',
  },
  {
    id: '5',
    name: 'Exterior Accessories',
    slug: 'exterior-accessories',
    description: 'Exterior enhancement products including body styling components, antennas, emblems, mirror assemblies, and decorative trim in various finishes.',
    image: '/images/categories/exterior.jpg',
  },
  {
    id: '6',
    name: 'Utility & Safety Products',
    slug: 'utility-safety-products',
    description: 'Practical vehicle accessories covering child safety seats, portable refrigeration, tire inflators, snow chains, and on-the-road travel essentials.',
    image: '/images/categories/safety.jpg',
  },
];
