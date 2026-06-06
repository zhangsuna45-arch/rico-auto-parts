import { readFileSync, writeFileSync } from 'node:fs';

const renames = [
  ["name: 'Steering Cover'", "name: 'Steering Covers'"],
  ["name: 'Seat Cushion'", "name: 'Seat Cushions'"],
  ["name: 'Foot Mat'", "name: 'Floor Mats'"],
  ["name: 'Non-Slip Mat'", "name: 'Non-Slip Mats'"],
  ["name: 'Tissue Box'", "name: 'Tissue Boxes'"],
  ["name: 'Armrest Box'", "name: 'Armrest Boxes'"],
  ["name: 'Ashtray'", "name: 'Ashtrays'"],
  ["name: 'Sun Shade'", "name: 'Sunshades'"],
  ["name: 'Towel',", "name: 'Car Towels',"],
  ["name: 'Perfume'", "name: 'Air Fresheners'"],
  ["name: 'Charger'", "name: 'Car Chargers'"],
  ["name: 'HUD'", "name: 'Head-Up Displays (HUD)'"],
  ["name: 'Fan',", "name: 'Car Fans',"],
  ["name: 'Remote Control'", "name: 'Remote Controls'"],
  ["name: 'Window Switch'", "name: 'Power Window Switches'"],
  ["name: 'Keyless Entry'", "name: 'Keyless Entry Systems'"],
  ["name: 'Paddle Shifter'", "name: 'Paddle Shifters'"],
  ["name: 'LED Ambient Light'", "name: 'LED Ambient Lights'"],
  ["name: 'LED Module'", "name: 'LED Modules'"],
  ["name: 'Scissor Jack'", "name: 'Scissor Jacks'"],
  ["name: 'Hydraulic Jack'", "name: 'Hydraulic Jacks'"],
  ["name: 'Bottle Jack'", "name: 'Bottle Jacks'"],
  ["name: 'Baby Seat'", "name: 'Baby Car Seats'"],
  ["name: 'Safety Belt'", "name: 'Seat Belts'"],
  ["name: 'Buckle'", "name: 'Seat Belt Buckles'"],
  ["name: 'Lock'", "name: 'Car Door Locks'"],
  ["name: 'Luggage Holder'", "name: 'Luggage Holders'"],
  ["name: 'Ice Box'", "name: 'Car Coolers'"],
  ["name: 'Air Inflator'", "name: 'Air Inflators'"],
  ["name: 'Phone Holder'", "name: 'Phone Holders'"],
  ["name: 'Car Tray'", "name: 'Car Trays'"],
  ["name: 'Cigarette Lighter'", "name: 'Cigarette Lighters'"],
  ["name: 'Air Filter'", "name: 'Cabin Air Filters'"],
  ["name: 'Snowchain'", "name: 'Snow Chains'"],
  ["name: 'Head Light'", "name: 'Headlights'"],
  ["name: 'Fog Lamp'", "name: 'Fog Lights'"],
  ["name: 'Side Marker Light'", "name: 'Side Marker Lights'"],
  ["name: 'Flash Light'", "name: 'Flashlights'"],
  ["name: 'Taxi Light'", "name: 'Taxi Roof Lights'"],
  ["name: 'Truck Light'", "name: 'Truck Lights'"],
  ["name: 'Body Kit'", "name: 'Body Kits'"],
  ["name: 'Antenna'", "name: 'Antennas'"],
  ["name: 'Mirror'", "name: 'Side Mirrors'"],
];

let content = readFileSync('src/data/products.ts', 'utf8');

for (const [oldName, newName] of renames) {
  if (content.includes(oldName)) {
    content = content.replaceAll(oldName, newName);
    console.log(`Replaced: ${oldName} → ${newName}`);
  } else {
    console.log(`NOT FOUND: ${oldName}`);
  }
}

writeFileSync('src/data/products.ts', content, 'utf8');
console.log('\nDone updating products.ts');
