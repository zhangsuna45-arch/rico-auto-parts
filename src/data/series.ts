export interface ProductSeries {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  description: string;
  image: string;
}

export const seriesList: ProductSeries[] = [
  // ═══════════════════════════════════════════
  // Interior Accessories (4 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-int-1',
    name: 'Luxury Leather',
    slug: 'luxury-leather',
    categorySlug: 'interior-accessories',
    description:
      'Premium genuine leather steering covers, seat cushions, and gear covers for a refined interior upgrade.',
    image: '/placeholder-1.svg',
  },
  {
    id: 'ser-int-2',
    name: 'Floor Protection',
    slug: 'floor-protection',
    categorySlug: 'interior-accessories',
    description:
      'Heavy-duty 3D floor mats with anti-slip backing, waterproof and custom-fit for all vehicle types.',
    image: '/placeholder-3.svg',
  },
  {
    id: 'ser-int-3',
    name: 'Dash & Console',
    slug: 'dash-console',
    categorySlug: 'interior-accessories',
    description:
      'Non-slip dashboard mats, console organizers, and interior protection accessories.',
    image: '/placeholder-2.svg',
  },
  {
    id: 'ser-int-4',
    name: 'Sun & Comfort',
    slug: 'sun-comfort',
    categorySlug: 'interior-accessories',
    description:
      'UV sun shades, armrest cushions, and comfort upgrades for all-day driving.',
    image: '/placeholder-4.svg',
  },

  // ═══════════════════════════════════════════
  // Car Electronics (3 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-elec-1',
    name: 'Power & Charging',
    slug: 'power-charging',
    categorySlug: 'car-electronics',
    description:
      'Fast car chargers, wireless charging pads, and multi-port power solutions with smart IC protection.',
    image: '/placeholder-1.svg',
  },
  {
    id: 'ser-elec-2',
    name: 'Display & Gauge',
    slug: 'display-gauge',
    categorySlug: 'car-electronics',
    description:
      'HUD speedometer displays and digital gauge clusters for enhanced driving information.',
    image: '/placeholder-2.svg',
  },
  {
    id: 'ser-elec-3',
    name: 'Interior LED',
    slug: 'interior-led',
    categorySlug: 'car-electronics',
    description:
      'App-controlled RGB ambient lighting strips and OBD diagnostic tools for smart interiors.',
    image: '/placeholder-3.svg',
  },

  // ═══════════════════════════════════════════
  // Car Lighting (3 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-light-1',
    name: 'Headlight & Fog',
    slug: 'headlight-fog',
    categorySlug: 'car-lighting',
    description:
      'High-lumen LED headlight bulbs and fog lamp conversions for maximum road visibility.',
    image: '/placeholder-4.svg',
  },
  {
    id: 'ser-light-2',
    name: 'Truck & Off-Road',
    slug: 'truck-offroad',
    categorySlug: 'car-lighting',
    description:
      'Heavy-duty LED light bars, DRL kits, and off-road lighting for trucks and SUVs.',
    image: '/placeholder-1.svg',
  },
  {
    id: 'ser-light-3',
    name: 'Accent Lighting',
    slug: 'accent-lighting',
    categorySlug: 'car-lighting',
    description:
      'Interior footwell lights, license plate LEDs, and stylish accent illumination.',
    image: '/placeholder-2.svg',
  },

  // ═══════════════════════════════════════════
  // Exterior Accessories (3 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-ext-1',
    name: 'Body Styling',
    slug: 'body-styling',
    categorySlug: 'exterior-accessories',
    description:
      'Side moldings, rear spoilers, and body trim for a sporty exterior upgrade.',
    image: '/placeholder-3.svg',
  },
  {
    id: 'ser-ext-2',
    name: 'Mirror & Window',
    slug: 'mirror-window',
    categorySlug: 'exterior-accessories',
    description:
      'Chrome mirror covers, rain window visors, and door handle covers for premium exterior detail.',
    image: '/placeholder-1.svg',
  },
  {
    id: 'ser-ext-3',
    name: 'Antenna & Styling',
    slug: 'antenna-styling',
    categorySlug: 'exterior-accessories',
    description:
      'Shark-fin antennas, chrome trim, and subtle exterior styling upgrades.',
    image: '/placeholder-4.svg',
  },

  // ═══════════════════════════════════════════
  // Safety & Utility (3 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-safety-1',
    name: 'Child & Travel',
    slug: 'child-travel',
    categorySlug: 'safety-utility',
    description:
      'ECE-certified child car seats and premium dashboard phone holders for safe travel.',
    image: '/placeholder-2.svg',
  },
  {
    id: 'ser-safety-2',
    name: 'Emergency & Repair',
    slug: 'emergency-repair',
    categorySlug: 'safety-utility',
    description:
      'Portable tire inflators, jump starters, and emergency tool kits for roadside readiness.',
    image: '/placeholder-1.svg',
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
