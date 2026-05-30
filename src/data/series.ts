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
    description: 'Steering wheel covers, seat cushions, and armrest storage boxes available in various materials and configurations for interior comfort upgrades.',
    image: img(1),
  },
  {
    id: 'ser-int-2',
    name: 'Floor Protection',
    slug: 'floor-protection',
    categorySlug: 'interior-accessories',
    description: 'Vehicle floor mats and dashboard covers available in multiple materials including custom-fit and universal options for all-season protection.',
    image: img(2),
  },
  {
    id: 'ser-int-3',
    name: 'Interior Essentials',
    slug: 'interior-essentials',
    categorySlug: 'interior-accessories',
    description: 'Everyday interior accessories including organizers, air fresheners, sun protection, waste solutions, and cleaning supplies for vehicle upkeep.',
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
    description: 'Vehicle power and control accessories including chargers, remote systems, switch assemblies, and keyless entry solutions for various vehicle applications.',
    image: img(1),
  },
  {
    id: 'ser-elec-2',
    name: 'Display & Tech',
    slug: 'display-tech',
    categorySlug: 'electronics-charging',
    description: 'Dashboard display technology and driving enhancement accessories including HUD units, digital instruments, and steering wheel control modules.',
    image: img(2),
  },
  {
    id: 'ser-elec-3',
    name: 'Comfort Electronics',
    slug: 'comfort-electronics',
    categorySlug: 'electronics-charging',
    description: 'Vehicle climate comfort electronics including 12V cooling fans in various sizes, mounting styles, and airflow configurations.',
    image: img(3),
  },
  {
    id: 'ser-elec-4',
    name: 'Interior LED',
    slug: 'interior-led',
    categorySlug: 'electronics-charging',
    description: 'Interior LED lighting products including ambient light strips, accent lighting, and driver modules in various configurations and control options.',
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
    description: 'LED headlight bulbs and fog lamp replacements covering major bulb types and fitments for passenger cars, trucks, and commercial vehicles.',
    image: img(4),
  },
  {
    id: 'ser-lit-2',
    name: 'Signal & Marker',
    slug: 'signal-marker',
    categorySlug: 'car-lighting',
    description: 'Signal, marker, and indicator lighting products including side markers, emergency warning lights, and commercial vehicle roof lights in various specifications.',
    image: img(1),
  },
  {
    id: 'ser-lit-3',
    name: 'Truck & Off-Road',
    slug: 'truck-offroad',
    categorySlug: 'car-lighting',
    description: 'Auxiliary LED light bars and off-road lighting for trucks, SUVs, and outdoor vehicles in a range of sizes, beam patterns, and mounting options.',
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
    description: 'Vehicle body styling components and mirror assemblies including body kits, trim pieces, and power-folding mirror systems available in various styles.',
    image: img(3),
  },
  {
    id: 'ser-ext-2',
    name: 'Antenna & Styling',
    slug: 'antenna-styling',
    categorySlug: 'exterior-accessories',
    description: 'Vehicle antennas and exterior emblems in various styles and finishes including shark fin designs, traditional masts, and decorative badging.',
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
    description: 'Vehicle safety products including child car seats, seat belts, security locks, and restraint systems meeting international safety standards for multiple markets.',
    image: img(2),
  },
  {
    id: 'ser-util-2',
    name: 'Travel & Storage',
    slug: 'travel-storage',
    categorySlug: 'functional-accessories',
    description: 'Travel and storage solutions for vehicles including cargo carriers, portable refrigeration, device mounts, and multi-purpose organizers for on-the-road convenience.',
    image: img(3),
  },
  {
    id: 'ser-util-3',
    name: 'Emergency & Tools',
    slug: 'emergency-tools',
    categorySlug: 'functional-accessories',
    description: 'Roadside emergency and vehicle maintenance products including tire inflators, jump starters, snow chains, replacement filters, and tool accessories.',
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
