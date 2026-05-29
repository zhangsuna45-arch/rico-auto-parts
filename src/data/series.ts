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
  // Interior Accessories (3 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-int-1',
    name: 'Leather & Comfort',
    slug: 'leather-comfort',
    categorySlug: 'interior-accessories',
    description: 'Steering covers, seat cushions, and armrest boxes with premium leather and memory foam for a refined interior.',
    image: img(1),
  },
  {
    id: 'ser-int-2',
    name: 'Floor Protection',
    slug: 'floor-protection',
    categorySlug: 'interior-accessories',
    description: '3D custom-fit foot mats and non-slip dashboard mats with waterproof, odorless TPE materials.',
    image: img(2),
  },
  {
    id: 'ser-int-3',
    name: 'Interior Essentials',
    slug: 'interior-essentials',
    categorySlug: 'interior-accessories',
    description: 'Tissue boxes, perfume diffusers, ashtrays, sun shades, stickers, and microfiber towels.',
    image: img(3),
  },

  // ═══════════════════════════════════════════
  // Electronics & Charging (4 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-elec-1',
    name: 'Power & Control',
    slug: 'power-control',
    categorySlug: 'electronics-charging',
    description: 'Fast chargers, remote controls, window switches, and keyless entry systems.',
    image: img(1),
  },
  {
    id: 'ser-elec-2',
    name: 'Display & Tech',
    slug: 'display-tech',
    categorySlug: 'electronics-charging',
    description: 'HUD displays and paddle shifters for enhanced driving information and control.',
    image: img(2),
  },
  {
    id: 'ser-elec-3',
    name: 'Comfort Electronics',
    slug: 'comfort-electronics',
    categorySlug: 'electronics-charging',
    description: 'Quiet 12V car fans for stay-cool comfort during every drive.',
    image: img(3),
  },
  {
    id: 'ser-elec-4',
    name: 'Interior LED',
    slug: 'interior-led',
    categorySlug: 'electronics-charging',
    description: 'App-controlled RGB ambient lighting strips and LED driver modules.',
    image: img(4),
  },

  // ═══════════════════════════════════════════
  // Car Lighting (3 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-lit-1',
    name: 'Headlight & Fog',
    slug: 'headlight-fog',
    categorySlug: 'car-lighting',
    description: 'High-lumen LED headlight bulbs and fog lamp conversions for maximum visibility.',
    image: img(4),
  },
  {
    id: 'ser-lit-2',
    name: 'Signal & Marker',
    slug: 'signal-marker',
    categorySlug: 'car-lighting',
    description: 'Side marker lights, emergency flash lights, and taxi roof lights.',
    image: img(1),
  },
  {
    id: 'ser-lit-3',
    name: 'Truck & Off-Road',
    slug: 'truck-offroad',
    categorySlug: 'car-lighting',
    description: 'Heavy-duty LED light bars for trucks, SUVs and off-road vehicles.',
    image: img(2),
  },

  // ═══════════════════════════════════════════
  // Exterior Accessories (2 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-ext-1',
    name: 'Body Styling',
    slug: 'body-styling',
    categorySlug: 'exterior-accessories',
    description: 'ABS body kits for sporty styling and power-folding side mirrors.',
    image: img(3),
  },
  {
    id: 'ser-ext-2',
    name: 'Antenna & Styling',
    slug: 'antenna-styling',
    categorySlug: 'exterior-accessories',
    description: 'Shark fin antennas and premium 3D chrome car emblems.',
    image: img(1),
  },

  // ═══════════════════════════════════════════
  // Functional Accessories (3 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-util-1',
    name: 'Safety & Child',
    slug: 'safety-child',
    categorySlug: 'functional-accessories',
    description: 'ECE-certified child car seats, safety belts, buckles, and steering wheel locks.',
    image: img(2),
  },
  {
    id: 'ser-util-2',
    name: 'Travel & Storage',
    slug: 'travel-storage',
    categorySlug: 'functional-accessories',
    description: 'Luggage holders, car refrigerators, phone holders, and multi-purpose car trays.',
    image: img(3),
  },
  {
    id: 'ser-util-3',
    name: 'Emergency & Tools',
    slug: 'emergency-tools',
    categorySlug: 'functional-accessories',
    description: 'Air inflators, jump starters, snow chains, air filters, and cigarette lighters.',
    image: img(1),
  },
];

export function getSeriesByCategory(categorySlug: string): ProductSeries[] {
  return seriesList.filter((s) => s.categorySlug === categorySlug);
}

export function getSeriesBySlug(categorySlug: string, seriesSlug: string): ProductSeries | undefined {
  return seriesList.find(
    (s) => s.categorySlug === categorySlug && s.slug === seriesSlug,
  );
}

export function getAllSeriesSlugs(): { categorySlug: string; seriesSlug: string }[] {
  return seriesList.map((s) => ({
    categorySlug: s.categorySlug,
    seriesSlug: s.slug,
  }));
}
