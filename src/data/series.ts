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
  // Interior Accessories (13 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-int-01',
    name: 'Steering Wheel Covers',
    slug: 'steering-wheel-covers',
    categorySlug: 'interior-accessories',
    description: 'Steering wheel covers available in various materials, sizes, and designs for universal and custom-fit applications.',
    image: img(1),
  },
  {
    id: 'ser-int-02',
    name: 'Seat Covers',
    slug: 'seat-covers',
    categorySlug: 'interior-accessories',
    description: 'Full and partial seat covers in a range of materials, patterns, and sizes for passenger and commercial vehicles.',
    image: img(2),
  },
  {
    id: 'ser-int-03',
    name: 'Car Seat Cushions',
    slug: 'car-seat-cushions',
    categorySlug: 'interior-accessories',
    description: 'Seat cushions and support pads in various materials, thicknesses, and designs for enhanced driving comfort.',
    image: img(3),
  },
  {
    id: 'ser-int-04',
    name: 'Floor Mats',
    slug: 'floor-mats',
    categorySlug: 'interior-accessories',
    description: 'Vehicle floor mats available in multiple materials including custom-fit, universal, and all-weather options for cabin protection.',
    image: img(4),
  },
  {
    id: 'ser-int-05',
    name: 'Non-Slip Dashboard Mats',
    slug: 'dashboard-mats',
    categorySlug: 'interior-accessories',
    description: 'Dashboard cover mats in various sizes and materials designed to reduce glare and protect against sun damage.',
    image: img(1),
  },
  {
    id: 'ser-int-06',
    name: 'Tissue Boxes',
    slug: 'tissue-boxes',
    categorySlug: 'interior-accessories',
    description: 'Car tissue box holders and dispensers in various styles, materials, and mounting options for interior convenience.',
    image: img(2),
  },
  {
    id: 'ser-int-07',
    name: 'Armrest Boxes',
    slug: 'armrest-boxes',
    categorySlug: 'interior-accessories',
    description: 'Center console armrest storage boxes with compartments, available in various materials and configurations for added utility.',
    image: img(3),
  },
  {
    id: 'ser-int-08',
    name: 'Car Air Fresheners',
    slug: 'car-air-fresheners',
    categorySlug: 'air-fresheners',
    description: 'Interior air fresheners and scent diffusers in various types, fragrances, and designs for a pleasant cabin environment.',
    image: img(4),
  },
  {
    id: 'ser-int-09',
    name: 'Ashtrays',
    slug: 'ashtrays',
    categorySlug: 'interior-accessories',
    description: 'Vehicle ashtrays in portable and built-in styles, available in various materials, sizes, and designs.',
    image: img(1),
  },
  {
    id: 'ser-int-10',
    name: 'Sunshades',
    slug: 'sunshades',
    categorySlug: 'interior-accessories',
    description: 'Windshield and window sunshades in various sizes, materials, and folding mechanisms for heat and UV protection.',
    image: img(2),
  },
  {
    id: 'ser-int-11',
    name: 'Window Films',
    slug: 'window-films',
    categorySlug: 'interior-accessories',
    description: 'Automotive window films and tint materials in various shades, UV protection levels, and specifications.',
    image: img(3),
  },
  {
    id: 'ser-int-12',
    name: 'Stickers & Decals',
    slug: 'stickers-decals',
    categorySlug: 'interior-accessories',
    description: 'Vehicle stickers and decorative decals in a wide range of designs, sizes, and finishes for interior and exterior application.',
    image: img(4),
  },
  {
    id: 'ser-int-13',
    name: 'Car Towels',
    slug: 'car-towels',
    categorySlug: 'interior-accessories',
    description: 'Microfiber and cleaning towels in various sizes, materials, and pack configurations for vehicle care and detailing.',
    image: img(1),
  },

  // ═══════════════════════════════════════════
  // Electronics & Charging (11 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-elec-01',
    name: 'Car Chargers',
    slug: 'car-chargers',
    categorySlug: 'electronics',
    description: 'In-vehicle USB chargers and power adapters in various port configurations, charging protocols, and output ratings.',
    image: img(2),
  },
  {
    id: 'ser-elec-02',
    name: 'HUD Displays',
    slug: 'hud-displays',
    categorySlug: 'electronics',
    description: 'Head-up display units in various projection types, display sizes, and connectivity options for speed and navigation readouts.',
    image: img(3),
  },
  {
    id: 'ser-elec-03',
    name: 'Car Fans',
    slug: 'car-fans',
    categorySlug: 'electronics',
    description: '12V interior cooling fans in various sizes, mounting styles, and airflow ratings for cabin climate comfort.',
    image: img(4),
  },
  {
    id: 'ser-elec-04',
    name: 'Remote Controls',
    slug: 'remote-controls',
    categorySlug: 'electronics',
    description: 'Vehicle remote control units and key fobs in various frequencies, button layouts, and compatibility options.',
    image: img(1),
  },
  {
    id: 'ser-elec-05',
    name: 'Window Switches',
    slug: 'window-switches',
    categorySlug: 'electronics',
    description: 'Power window switch assemblies and control modules in various button configurations for multiple vehicle makes and models.',
    image: img(2),
  },
  {
    id: 'ser-elec-06',
    name: 'Keyless Entry Systems',
    slug: 'keyless-entry',
    categorySlug: 'electronics',
    description: 'Keyless entry and smart lock systems in various technologies, ranges, and installation types for vehicle access control.',
    image: img(3),
  },
  {
    id: 'ser-elec-07',
    name: 'Push Start Systems',
    slug: 'push-start',
    categorySlug: 'electronics',
    description: 'Push-button engine start systems and retrofit kits in various configurations and compatibility options.',
    image: img(4),
  },
  {
    id: 'ser-elec-08',
    name: 'Paddle Shifters',
    slug: 'paddle-shifters',
    categorySlug: 'electronics',
    description: 'Steering wheel paddle shifter extensions and retrofit kits in various materials, sizes, and mounting styles.',
    image: img(1),
  },
  {
    id: 'ser-elec-09',
    name: 'LED Ambient Lights',
    slug: 'led-ambient-lights',
    categorySlug: 'electronics',
    description: 'Interior LED ambient lighting kits in various colors, control methods, and installation configurations for cabin mood lighting.',
    image: img(2),
  },
  {
    id: 'ser-elec-10',
    name: 'LED Light Strips',
    slug: 'led-light-strips',
    categorySlug: 'electronics',
    description: 'Flexible LED light strips in various lengths, color options, and waterproof ratings for interior and exterior accent lighting.',
    image: img(3),
  },
  {
    id: 'ser-elec-11',
    name: 'LED Modules',
    slug: 'led-modules',
    categorySlug: 'electronics',
    description: 'LED driver modules and controllers in various power ratings, channel configurations, and control protocols for lighting customization.',
    image: img(4),
  },

  // ═══════════════════════════════════════════
  // Automotive Lighting (6 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-lit-01',
    name: 'Head Lights',
    slug: 'head-lights',
    categorySlug: 'lighting',
    description: 'LED headlight bulbs and conversion kits covering major bulb types and fitments for passenger cars and commercial vehicles.',
    image: img(1),
  },
  {
    id: 'ser-lit-02',
    name: 'Fog Lamps',
    slug: 'fog-lamps',
    categorySlug: 'lighting',
    description: 'Fog lamp bulbs and assemblies in various types, color temperatures, and mounting configurations for improved visibility.',
    image: img(2),
  },
  {
    id: 'ser-lit-03',
    name: 'Side Marker Lights',
    slug: 'side-marker-lights',
    categorySlug: 'lighting',
    description: 'Side marker and clearance lights in various sizes, colors, and mounting styles for vehicle visibility and compliance.',
    image: img(3),
  },
  {
    id: 'ser-lit-04',
    name: 'Flash Lights',
    slug: 'flash-lights',
    categorySlug: 'lighting',
    description: 'Emergency and warning flash lights in various brightness levels, flash patterns, and mounting options for safety applications.',
    image: img(4),
  },
  {
    id: 'ser-lit-05',
    name: 'Taxi Roof Lights',
    slug: 'taxi-roof-lights',
    categorySlug: 'lighting',
    description: 'Taxi and commercial vehicle roof sign lights in various sizes, colors, and mounting configurations.',
    image: img(1),
  },
  {
    id: 'ser-lit-06',
    name: 'Truck Lights',
    slug: 'truck-lights',
    categorySlug: 'lighting',
    description: 'Heavy-duty auxiliary lighting including light bars and work lights for trucks, SUVs, and off-road applications in various sizes.',
    image: img(2),
  },

  // ═══════════════════════════════════════════
  // Exterior Modifications (5 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-ext-01',
    name: 'Body Kits',
    slug: 'body-kits',
    categorySlug: 'exterior-accessories',
    description: 'Vehicle body styling kits and components including front lips, side skirts, and trim pieces in various styles and finishes.',
    image: img(3),
  },
  {
    id: 'ser-ext-02',
    name: 'Antennas',
    slug: 'antennas',
    categorySlug: 'exterior-accessories',
    description: 'Vehicle antennas in various styles including shark fin, short mast, and traditional designs with multiple finish options.',
    image: img(4),
  },
  {
    id: 'ser-ext-03',
    name: 'Car Emblems',
    slug: 'car-emblems',
    categorySlug: 'exterior-accessories',
    description: 'Decorative vehicle emblems and badges in various sizes, materials, finishes, and designs for exterior customization.',
    image: img(1),
  },
  {
    id: 'ser-ext-04',
    name: 'Car Logos',
    slug: 'car-logos',
    categorySlug: 'exterior-accessories',
    description: 'Brand and custom vehicle logos in various sizes, materials, and finishes including 3D and chrome-effect designs.',
    image: img(2),
  },
  {
    id: 'ser-ext-05',
    name: 'Side Mirrors',
    slug: 'side-mirrors',
    categorySlug: 'exterior-accessories',
    description: 'Exterior side mirror assemblies and replacement components including power-folding, heated, and signal-integrated options.',
    image: img(3),
  },

  // ═══════════════════════════════════════════
  // Functional Accessories (14 series)
  // ═══════════════════════════════════════════
  {
    id: 'ser-util-01',
    name: 'Baby Seats',
    slug: 'baby-seats',
    categorySlug: 'utility-safety-products',
    description: 'Child car seats and booster seats in various age groups, sizes, and configuration types meeting international safety standards.',
    image: img(4),
  },
  {
    id: 'ser-util-02',
    name: 'Safety Belts',
    slug: 'safety-belts',
    categorySlug: 'utility-safety-products',
    description: 'Vehicle safety belts and harness systems in various types, lengths, and attachment configurations for passenger restraint.',
    image: img(1),
  },
  {
    id: 'ser-util-03',
    name: 'Buckles',
    slug: 'buckles',
    categorySlug: 'utility-safety-products',
    description: 'Seat belt buckles and latch components in various styles, sizes, and locking mechanisms for vehicle safety systems.',
    image: img(2),
  },
  {
    id: 'ser-util-04',
    name: 'Car Locks',
    slug: 'car-locks',
    categorySlug: 'utility-safety-products',
    description: 'Vehicle security locks including steering wheel locks, pedal locks, and gear shift locks in various designs and strength ratings.',
    image: img(3),
  },
  {
    id: 'ser-util-05',
    name: 'Luggage Holders',
    slug: 'luggage-holders',
    categorySlug: 'utility-safety-products',
    description: 'Roof-mounted and rear-mounted cargo carriers and luggage solutions in various sizes, capacities, and mounting systems.',
    image: img(4),
  },
  {
    id: 'ser-util-06',
    name: 'Car Refrigerators',
    slug: 'car-refrigerators',
    categorySlug: 'utility-safety-products',
    description: 'Portable vehicle refrigerators and cooler boxes in various capacities, power options, and temperature ranges for mobile cooling.',
    image: img(1),
  },
  {
    id: 'ser-util-07',
    name: 'Air Inflators',
    slug: 'air-inflators',
    categorySlug: 'utility-safety-products',
    description: 'Portable tire inflators and air pumps in various power sources, pressure ratings, and sizes for roadside and workshop use.',
    image: img(2),
  },
  {
    id: 'ser-util-08',
    name: 'Phone Holders',
    slug: 'phone-holders',
    categorySlug: 'utility-safety-products',
    description: 'Dashboard and vent-mount phone holders in various grip types, adjustment ranges, and mounting mechanisms for hands-free use.',
    image: img(3),
  },
  {
    id: 'ser-util-09',
    name: 'Car Trays',
    slug: 'car-trays',
    categorySlug: 'utility-safety-products',
    description: 'Multi-purpose vehicle trays and folding tables in various sizes, materials, and mounting styles for in-car convenience.',
    image: img(4),
  },
  {
    id: 'ser-util-10',
    name: 'Cigarette Lighters',
    slug: 'cigarette-lighters',
    categorySlug: 'utility-safety-products',
    description: '12V cigarette lighter sockets and plug assemblies in various designs, amperage ratings, and installation types for vehicles.',
    image: img(1),
  },
  {
    id: 'ser-util-11',
    name: 'Air Vents',
    slug: 'air-vents',
    categorySlug: 'utility-safety-products',
    description: 'Dashboard air vent assemblies and replacement components in various sizes, styles, and configurations for climate control.',
    image: img(2),
  },
  {
    id: 'ser-util-12',
    name: 'Air Filters',
    slug: 'air-filters',
    categorySlug: 'utility-safety-products',
    description: 'Cabin and engine air filters in various types, sizes, and filtration ratings for passenger and commercial vehicle maintenance.',
    image: img(3),
  },
  {
    id: 'ser-util-13',
    name: 'Snow Chains',
    slug: 'snow-chains',
    categorySlug: 'utility-safety-products',
    description: 'Tire snow chains and traction devices in various sizes, material types, and link patterns for winter driving safety.',
    image: img(4),
  },
  {
    id: 'ser-util-14',
    name: 'Batteries',
    slug: 'batteries',
    categorySlug: 'utility-safety-products',
    description: 'Automotive batteries and power storage solutions in various capacities, sizes, and technologies for vehicle electrical systems.',
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
