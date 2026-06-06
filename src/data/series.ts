export interface ProductSeries {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  description: string;
  image: string;
}

const img = (n: number) => `/placeholder-${((n - 1) % 4) + 1}.svg`;

export const seriesList: ProductSeries[] = [
  // ═══════════════════════════════════════════
  // Interior Accessories (12 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-int-01',
    name: 'Steering Wheel Covers',
    slug: 'steering-wheel-covers',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(1),
  },
  {
    id: 'ser-int-02',
    name: 'Seat Covers',
    slug: 'seat-covers',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(2),
  },
  {
    id: 'ser-int-03',
    name: 'Car Seat Cushions',
    slug: 'car-seat-cushions',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(3),
  },
  {
    id: 'ser-int-04',
    name: 'Floor Mats',
    slug: 'floor-mats',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(4),
  },
  {
    id: 'ser-int-05',
    name: 'Dashboard Mats',
    slug: 'dashboard-mats',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(1),
  },
  {
    id: 'ser-int-06',
    name: 'Tissue Boxes',
    slug: 'tissue-boxes',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(2),
  },
  {
    id: 'ser-int-07',
    name: 'Armrest Boxes',
    slug: 'armrest-boxes',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(3),
  },
  {
    id: 'ser-int-08',
    name: 'Ashtrays',
    slug: 'ashtrays',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(4),
  },
  {
    id: 'ser-int-09',
    name: 'Sunshades',
    slug: 'sunshades',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(1),
  },
  {
    id: 'ser-int-10',
    name: 'Window Films',
    slug: 'window-films',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(2),
  },
  {
    id: 'ser-int-11',
    name: 'Stickers & Decals',
    slug: 'stickers-decals',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(3),
  },
  {
    id: 'ser-int-12',
    name: 'Car Towels',
    slug: 'car-towels',
    categorySlug: 'interior-accessories',
    description: '',
    image: img(4),
  },

  // ═══════════════════════════════════════════
  // Exterior Accessories (4 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-ext-01',
    name: 'Body Kits',
    slug: 'body-kits',
    categorySlug: 'exterior-accessories',
    description: '',
    image: img(1),
  },
  {
    id: 'ser-ext-02',
    name: 'Antennas',
    slug: 'antennas',
    categorySlug: 'exterior-accessories',
    description: '',
    image: img(2),
  },
  {
    id: 'ser-ext-03',
    name: 'Car Emblems & Logos',
    slug: 'car-emblems-logos',
    categorySlug: 'exterior-accessories',
    description: '',
    image: img(3),
  },
  {
    id: 'ser-ext-04',
    name: 'Side Mirrors',
    slug: 'side-mirrors',
    categorySlug: 'exterior-accessories',
    description: '',
    image: img(4),
  },

  // ═══════════════════════════════════════════
  // Automotive Electronics (8 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-elec-01',
    name: 'Car Chargers',
    slug: 'car-chargers',
    categorySlug: 'electronics',
    description: '',
    image: img(1),
  },
  {
    id: 'ser-elec-02',
    name: 'HUD Displays',
    slug: 'hud-displays',
    categorySlug: 'electronics',
    description: '',
    image: img(2),
  },
  {
    id: 'ser-elec-03',
    name: 'Car Fans',
    slug: 'car-fans',
    categorySlug: 'electronics',
    description: '',
    image: img(3),
  },
  {
    id: 'ser-elec-04',
    name: 'Car Key Remotes',
    slug: 'car-key-remotes',
    categorySlug: 'electronics',
    description: '',
    image: img(4),
  },
  {
    id: 'ser-elec-05',
    name: 'Window Switches',
    slug: 'window-switches',
    categorySlug: 'electronics',
    description: '',
    image: img(1),
  },
  {
    id: 'ser-elec-06',
    name: 'Keyless Entry Systems',
    slug: 'keyless-entry',
    categorySlug: 'electronics',
    description: '',
    image: img(2),
  },
  {
    id: 'ser-elec-07',
    name: 'Push Start Systems',
    slug: 'push-start',
    categorySlug: 'electronics',
    description: '',
    image: img(3),
  },
  {
    id: 'ser-elec-08',
    name: 'Paddle Shifters',
    slug: 'paddle-shifters',
    categorySlug: 'electronics',
    description: '',
    image: img(4),
  },

  // ═══════════════════════════════════════════
  // LED Lighting (9 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-lit-01',
    name: 'LED Ambient Lights',
    slug: 'led-ambient-lights',
    categorySlug: 'lighting',
    description: '',
    image: img(1),
  },
  {
    id: 'ser-lit-02',
    name: 'LED Light Strips',
    slug: 'led-light-strips',
    categorySlug: 'lighting',
    description: '',
    image: img(2),
  },
  {
    id: 'ser-lit-03',
    name: 'LED Modules',
    slug: 'led-modules',
    categorySlug: 'lighting',
    description: '',
    image: img(3),
  },
  {
    id: 'ser-lit-04',
    name: 'Head Lights',
    slug: 'head-lights',
    categorySlug: 'lighting',
    description: '',
    image: img(4),
  },
  {
    id: 'ser-lit-05',
    name: 'Fog Lamps',
    slug: 'fog-lamps',
    categorySlug: 'lighting',
    description: '',
    image: img(1),
  },
  {
    id: 'ser-lit-06',
    name: 'Side Marker Lights',
    slug: 'side-marker-lights',
    categorySlug: 'lighting',
    description: '',
    image: img(2),
  },
  {
    id: 'ser-lit-07',
    name: 'Truck Lights',
    slug: 'truck-lights',
    categorySlug: 'lighting',
    description: '',
    image: img(3),
  },
  {
    id: 'ser-lit-08',
    name: 'Taxi Roof Lights',
    slug: 'taxi-roof-lights',
    categorySlug: 'lighting',
    description: '',
    image: img(4),
  },
  {
    id: 'ser-lit-09',
    name: 'Flash Lights',
    slug: 'flash-lights',
    categorySlug: 'lighting',
    description: '',
    image: img(1),
  },

  // ═══════════════════════════════════════════
  // Air Fresheners (3 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-af-01',
    name: 'Hanging Air Fresheners',
    slug: 'hanging-air-fresheners',
    categorySlug: 'air-fresheners',
    description: '',
    image: img(2),
  },
  {
    id: 'ser-af-02',
    name: 'Vent Clip Air Fresheners',
    slug: 'vent-clip-air-fresheners',
    categorySlug: 'air-fresheners',
    description: '',
    image: img(3),
  },
  {
    id: 'ser-af-03',
    name: 'Dashboard Air Fresheners',
    slug: 'dashboard-air-fresheners',
    categorySlug: 'air-fresheners',
    description: '',
    image: img(4),
  },

  // ═══════════════════════════════════════════
  // Utility & Safety Products (15 series)
  // ═══════════════════════════════════════════

  // — Utility —
  { id: 'ser-util-01', name: 'Phone Holders', slug: 'phone-holders', categorySlug: 'utility-safety-products', description: '', image: img(1) },
  { id: 'ser-util-02', name: 'Car Trays', slug: 'car-trays', categorySlug: 'utility-safety-products', description: '', image: img(2) },
  { id: 'ser-util-03', name: 'Air Vents', slug: 'air-vents', categorySlug: 'utility-safety-products', description: '', image: img(3) },
  { id: 'ser-util-04', name: 'Luggage Holders', slug: 'luggage-holders', categorySlug: 'utility-safety-products', description: '', image: img(4) },
  { id: 'ser-util-05', name: 'Car Refrigerators', slug: 'car-refrigerators', categorySlug: 'utility-safety-products', description: '', image: img(1) },
  { id: 'ser-util-06', name: 'Air Inflators', slug: 'air-inflators', categorySlug: 'utility-safety-products', description: '', image: img(2) },
  { id: 'ser-util-15', name: 'Car Jacks', slug: 'car-jacks', categorySlug: 'utility-safety-products', description: 'Scissor jacks, hydraulic jacks and bottle jacks in various load capacities for passenger and commercial vehicles.', image: img(1) },

  // — Safety —
  { id: 'ser-util-07', name: 'Baby Seats', slug: 'baby-seats', categorySlug: 'utility-safety-products', description: '', image: img(3) },
  { id: 'ser-util-08', name: 'Safety Belts', slug: 'safety-belts', categorySlug: 'utility-safety-products', description: '', image: img(4) },
  { id: 'ser-util-09', name: 'Buckles', slug: 'buckles', categorySlug: 'utility-safety-products', description: '', image: img(1) },
  { id: 'ser-util-10', name: 'Car Locks', slug: 'car-locks', categorySlug: 'utility-safety-products', description: '', image: img(2) },
  { id: 'ser-util-11', name: 'Snow Chains', slug: 'snow-chains', categorySlug: 'utility-safety-products', description: '', image: img(3) },

  // — Maintenance —
  { id: 'ser-util-12', name: 'Cigarette Lighters', slug: 'cigarette-lighters', categorySlug: 'utility-safety-products', description: '', image: img(4) },
  { id: 'ser-util-13', name: 'Air Filters', slug: 'air-filters', categorySlug: 'utility-safety-products', description: '', image: img(1) },
  { id: 'ser-util-14', name: 'Batteries', slug: 'batteries', categorySlug: 'utility-safety-products', description: '', image: img(2) },
];

export function getSeriesByCategory(categorySlug: string): ProductSeries[] {
  return seriesList.filter((s) => s.categorySlug === categorySlug);
}

export function getSeriesBySlug(categorySlug: string, seriesSlug: string): ProductSeries | undefined {
  return seriesList.filter(
    (s) => s.categorySlug === categorySlug && s.slug === seriesSlug,
  )[0];
}

export function getAllSeriesSlugs(): { categorySlug: string; seriesSlug: string }[] {
  return seriesList.map((s) => ({
    categorySlug: s.categorySlug,
    seriesSlug: s.slug,
  }));
}
