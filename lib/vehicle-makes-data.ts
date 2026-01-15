export interface VehicleMake {
  slug: string;
  name: string;
  shortName: string;
  logo: string;
  vehicleImage?: string;
  country: string;
  tier: 'luxury' | 'premium' | 'mainstream';
  popularModels: string[];
  glennQuote: string;
  overview: string;
  specializations: string[];
  commonIssues: string[];
  metaTitle: string;
  metaDescription: string;
}

// Priority makes based on Dubai market - luxury & premium European brands dominate
export const VEHICLE_MAKES: VehicleMake[] = [
  {
    slug: 'bmw',
    name: 'BMW',
    shortName: 'BMW',
    logo: '/logos/bmw.png',
    country: 'Germany',
    tier: 'premium',
    popularModels: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X7', 'M3', 'M5'],
    glennQuote: "I've worked on BMWs for over 25 years. They're brilliant driver's cars, but they need proper maintenance - especially in Dubai's heat. The cooling system and electronics are the usual suspects. We see a lot of oil leaks from valve cover gaskets too. Look after your BMW properly and it'll reward you with years of driving pleasure.",
    overview: "BMW vehicles demand specialist knowledge and genuine parts. At Powerworks Garage, our technicians are trained in BMW-specific diagnostics and repair procedures. We use dealer-level ISTA diagnostic equipment to accurately identify issues, and we stock common BMW parts to minimize your downtime.",
    specializations: [
      'BMW ISTA/ISTA+ diagnostics',
      'N20/N55/B58 engine specialists',
      'BMW transmission service (ZF 8HP)',
      'Cooling system overhauls',
      'Electrical fault diagnosis'
    ],
    commonIssues: [
      'Coolant leaks and water pump failure',
      'Oil filter housing gasket leaks',
      'VANOS solenoid issues',
      'Electric water pump failure',
      'iDrive and electronics glitches'
    ],
    metaTitle: 'BMW Service Dubai | BMW Specialist Garage | Powerworks',
    metaDescription: 'Expert BMW service & repair in Dubai. ISTA diagnostics, trained technicians, genuine parts. 3 Series, 5 Series, X5 specialists. Al Quoz. Book today.'
  },
  {
    slug: 'mercedes',
    name: 'Mercedes-Benz',
    shortName: 'Mercedes',
    logo: '/logos/mercedes.png',
    vehicleImage: '/vehicles/mercedes.jpg',
    country: 'Germany',
    tier: 'luxury',
    popularModels: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'AMG GT'],
    glennQuote: "Mercedes-Benz build fantastic cars, but they've become incredibly complex. The AIRMATIC suspension, 9G-TRONIC gearbox, and all that tech needs someone who knows what they're doing. We've invested heavily in Mercedes diagnostic equipment because getting the diagnosis right saves our customers money.",
    overview: "Mercedes-Benz vehicles represent the pinnacle of German engineering, but they require specialist care. Our technicians use Mercedes-Benz XENTRY diagnostics to accurately identify issues. We service everything from the practical C-Class to the flagship S-Class and high-performance AMG models.",
    specializations: [
      'Mercedes XENTRY diagnostics',
      'AIRMATIC suspension repair',
      '9G-TRONIC transmission service',
      'OM651/M276/M278 engine specialists',
      'COMAND system troubleshooting'
    ],
    commonIssues: [
      'AIRMATIC suspension air leaks',
      'Balance shaft wear (M272/M273)',
      'Transmission conductor plate failure',
      'Camshaft adjuster issues',
      'Battery drain problems'
    ],
    metaTitle: 'Mercedes Service Dubai | Mercedes Specialist Garage | Powerworks',
    metaDescription: 'Expert Mercedes-Benz service in Dubai. XENTRY diagnostics, AIRMATIC repair, all models serviced. C-Class to S-Class. Al Quoz garage. Book now.'
  },
  {
    slug: 'audi',
    name: 'Audi',
    shortName: 'Audi',
    logo: '/audi.png',
    country: 'Germany',
    tier: 'premium',
    popularModels: ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'RS6'],
    glennQuote: "Audi's Quattro system is legendary for a reason - these cars handle brilliantly. But the 2.0 TFSI engines need their timing chains checked regularly, and don't skip the DSG service. We're seeing more and more Audis in Dubai, and most of the work we do is preventative. Keep on top of maintenance and they're reliable cars.",
    overview: "Audi vehicles combine sophisticated technology with Quattro all-wheel-drive capability. We service all Audi models using ODIS diagnostic equipment, from the compact A3 to the flagship A8 and performance RS models. Our technicians understand Audi's unique engineering and common failure points.",
    specializations: [
      'Audi ODIS diagnostics',
      'DSG/S-Tronic service',
      'Quattro system service',
      'TFSI engine specialists',
      'MMI system troubleshooting'
    ],
    commonIssues: [
      'Timing chain tensioner wear (2.0 TFSI)',
      'DSG mechatronic unit failure',
      'Carbon buildup on intake valves',
      'Water pump and thermostat leaks',
      'PCV valve issues'
    ],
    metaTitle: 'Audi Service Dubai | Audi Specialist Garage | Powerworks',
    metaDescription: 'Expert Audi service in Dubai. ODIS diagnostics, DSG service, Quattro specialists. A4, A6, Q5, Q7 serviced. Al Quoz. Book your appointment.'
  },
  {
    slug: 'porsche',
    name: 'Porsche',
    shortName: 'Porsche',
    logo: '/porsche.png',
    vehicleImage: '/vehicles/porsche.jpg',
    country: 'Germany',
    tier: 'luxury',
    popularModels: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', 'Boxster', 'Cayman'],
    glennQuote: "Porsche make some of the finest sports cars in the world. The 911 is an icon. But they're not immune to issues - the IMS bearing on older models, coolant pipe leaks on Cayennes, PDK service... these cars deserve specialist attention. We treat every Porsche like the special machine it is.",
    overview: "Porsche ownership is a passion, and maintaining these performance machines requires specialist knowledge. We service all Porsche models from the iconic 911 to the practical Cayenne and electric Taycan. Our technicians use PIWIS diagnostic equipment and understand Porsche engineering.",
    specializations: [
      'Porsche PIWIS diagnostics',
      'PDK transmission service',
      'IMS bearing upgrade',
      'Flat-six engine specialists',
      'PASM suspension service'
    ],
    commonIssues: [
      'IMS bearing failure (997/986/987)',
      'Coolant pipe leaks (Cayenne)',
      'AOS (Air-Oil Separator) failure',
      'Bore scoring (older 911s)',
      'PDK clutch wear'
    ],
    metaTitle: 'Porsche Service Dubai | Porsche Specialist Garage | Powerworks',
    metaDescription: 'Expert Porsche service in Dubai. PIWIS diagnostics, PDK service, 911 & Cayenne specialists. British-standard care for your Porsche. Al Quoz.'
  },
  {
    slug: 'land-rover',
    name: 'Land Rover',
    shortName: 'Land Rover',
    logo: '/landrover.png',
    vehicleImage: '/vehicles/land-rover.jpg',
    country: 'United Kingdom',
    tier: 'luxury',
    popularModels: ['Defender', 'Discovery', 'Discovery Sport'],
    glennQuote: "As a Brit, I've got a soft spot for Land Rovers. They're proper luxury SUVs, but they do have their quirks. Air suspension, supercharged V8s, and all that technology means they need careful attention. We know these vehicles inside out - many of our team have worked on them since the P38 days.",
    overview: "Land Rover represents British luxury and capability. These sophisticated SUVs require specialist knowledge, particularly around their air suspension systems and complex electronics. As a British-owned garage, we have particular expertise with Land Rover and Range Rover vehicles.",
    specializations: [
      'JLR SDD/Pathfinder diagnostics',
      'Air suspension repair',
      'Supercharged V8 service',
      'Transfer case service',
      'InControl system support'
    ],
    commonIssues: [
      'Air suspension compressor failure',
      'Coolant leaks (supercharged V8)',
      'Timing chain issues (3.0 V6)',
      'Turbo and supercharger wear',
      'Electrical gremlins'
    ],
    metaTitle: 'Land Rover Service Dubai | Defender & Discovery Specialist | Powerworks',
    metaDescription: 'Expert Land Rover service in Dubai. British-owned garage, SDD diagnostics, air suspension specialists. Defender, Discovery. Al Quoz.'
  },
  {
    slug: 'range-rover',
    name: 'Range Rover',
    shortName: 'Range Rover',
    logo: '/logos/rangerover.png',
    vehicleImage: '/vehicles/range-rover.jpg',
    country: 'United Kingdom',
    tier: 'luxury',
    popularModels: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque'],
    glennQuote: "Range Rover is the ultimate luxury SUV. Whether it's a classic Vogue, a sporty Sport, or the sleek Velar - these are special vehicles. The air suspension, supercharged engines, and advanced electronics all need expert attention. We've been working on Range Rovers for decades.",
    overview: "Range Rover defines luxury SUV excellence. From the flagship Range Rover to the sporty Range Rover Sport and elegant Velar, these vehicles demand specialist care. Our British-owned garage has deep expertise with all Range Rover models and their sophisticated systems.",
    specializations: [
      'JLR SDD/Pathfinder diagnostics',
      'Air suspension repair & calibration',
      'Supercharged V8 service',
      'Hybrid system maintenance (P400e)',
      'InControl/Pivi Pro system support'
    ],
    commonIssues: [
      'Air suspension compressor failure',
      'Coolant leaks (supercharged V8)',
      'Transfer case issues',
      'Turbo and supercharger wear',
      'Electrical and infotainment glitches'
    ],
    metaTitle: 'Range Rover Service Dubai | Range Rover Specialist | Powerworks',
    metaDescription: 'Expert Range Rover service in Dubai. British-owned garage, air suspension specialists, SDD diagnostics. Range Rover Sport, Velar, Evoque. Al Quoz.'
  },
  {
    slug: 'rolls-royce',
    name: 'Rolls-Royce',
    shortName: 'Rolls-Royce',
    logo: '/logos/rollsroyce.png',
    vehicleImage: '/vehicles/rolls-royce.jpg',
    country: 'United Kingdom',
    tier: 'luxury',
    popularModels: ['Phantom', 'Ghost', 'Cullinan', 'Wraith', 'Dawn', 'Spectre'],
    glennQuote: "Rolls-Royce represents the absolute pinnacle of automotive luxury. These are hand-built masterpieces from Goodwood, and they deserve nothing less than perfection in their care. Every Rolls-Royce that comes through our doors gets the white-glove treatment it deserves.",
    overview: "Rolls-Royce Motor Cars represent the highest standard of automotive excellence. These hand-crafted British vehicles require meticulous care and specialist knowledge. We service all modern Rolls-Royce models with the reverence and expertise they demand.",
    specializations: [
      'Rolls-Royce diagnostic systems',
      'V12 engine service (N74)',
      'Air suspension and self-leveling',
      'Starlight headliner care',
      'Bespoke component maintenance'
    ],
    commonIssues: [
      'Air suspension system maintenance',
      'V12 ignition and coil issues',
      'Electronics and battery management',
      'Brake system service',
      'Coolant system maintenance'
    ],
    metaTitle: 'Rolls-Royce Service Dubai | Rolls-Royce Specialist | Powerworks',
    metaDescription: 'Expert Rolls-Royce service in Dubai. British-owned garage, Phantom, Ghost, Cullinan specialists. Luxury care for luxury vehicles. Al Quoz.'
  },
  {
    slug: 'aston-martin',
    name: 'Aston Martin',
    shortName: 'Aston Martin',
    logo: '/logos/astonmartin.png',
    vehicleImage: '/vehicles/aston-martin.jpg',
    country: 'United Kingdom',
    tier: 'luxury',
    popularModels: ['DB11', 'DB12', 'Vantage', 'DBS', 'DBX', 'Valkyrie'],
    glennQuote: "Aston Martin - proper British sports cars with soul. The V8 Vantage, the DB11, the DBX SUV... these are special machines. They share a lot of technology with Mercedes-AMG now, but they're distinctly Aston. We treat every one like the work of art it is.",
    overview: "Aston Martin creates some of the world's most desirable sports cars and GT vehicles. These hand-built British machines combine breathtaking design with serious performance. Our expertise covers all modern Aston Martins including the Mercedes-AMG powered models.",
    specializations: [
      'Aston Martin diagnostic systems',
      'AMG-sourced V8 twin-turbo service',
      'V12 engine specialists',
      'Carbon ceramic brake service',
      'Adaptive suspension calibration'
    ],
    commonIssues: [
      'Cooling system maintenance',
      'Transmission service (ZF 8-speed)',
      'Electronics and infotainment',
      'Suspension wear in Dubai heat',
      'Battery drain issues'
    ],
    metaTitle: 'Aston Martin Service Dubai | Aston Martin Specialist | Powerworks',
    metaDescription: 'Expert Aston Martin service in Dubai. British-owned garage, DB11, Vantage, DBX specialists. V8 & V12 expertise. Al Quoz. Book today.'
  },
  {
    slug: 'volkswagen',
    name: 'Volkswagen',
    shortName: 'VW',
    logo: '/vw.png',
    vehicleImage: '/vehicles/volkswagen.jpg',
    country: 'Germany',
    tier: 'mainstream',
    popularModels: ['Golf', 'Passat', 'Tiguan', 'Touareg', 'Arteon', 'ID.4'],
    glennQuote: "Volkswagen are the backbone of reliable German motoring. The Golf is a brilliant all-rounder, and the Touareg is seriously underrated. We see a lot of DSG gearbox work and timing chain issues on the older TSI engines. Stay on top of the maintenance schedule and they'll last forever.",
    overview: "Volkswagen offers German engineering at accessible prices. We service all VW models using VAS/ODIS diagnostic equipment. From the practical Golf to the capable Touareg, our technicians understand VW engineering and common issues specific to Dubai's climate.",
    specializations: [
      'VW ODIS/VAS diagnostics',
      'DSG transmission service',
      'TSI/TDI engine specialists',
      '4MOTION system service',
      'Infotainment troubleshooting'
    ],
    commonIssues: [
      'Timing chain tensioner failure (TSI)',
      'DSG mechatronic issues',
      'Water pump leaks',
      'Carbon buildup (direct injection)',
      'High-pressure fuel pump wear'
    ],
    metaTitle: 'Volkswagen Service Dubai | VW Specialist Garage | Powerworks',
    metaDescription: 'Expert Volkswagen service in Dubai. ODIS diagnostics, DSG service, Golf, Passat, Tiguan specialists. German car expertise. Al Quoz. Book today.'
  },
  {
    slug: 'bentley',
    name: 'Bentley',
    shortName: 'Bentley',
    logo: '/bentley.png',
    vehicleImage: '/vehicles/bentley.jpg',
    country: 'United Kingdom',
    tier: 'luxury',
    popularModels: ['Continental GT', 'Flying Spur', 'Bentayga', 'Mulsanne'],
    glennQuote: "Bentley represents the absolute pinnacle of luxury motoring. These are hand-crafted masterpieces that deserve the utmost care and attention. We're proud to service Bentleys here - from the Continental GT to the mighty Bentayga. Every one gets the VIP treatment it deserves.",
    overview: "Bentley vehicles represent uncompromising luxury and performance. These hand-crafted British masterpieces require specialist care and genuine parts. We service all modern Bentley models, treating each vehicle with the reverence it deserves.",
    specializations: [
      'Bentley diagnostic systems',
      'W12 engine service',
      'Air suspension calibration',
      'Naim audio systems',
      'Mulliner customization care'
    ],
    commonIssues: [
      'Air suspension leaks',
      'Coil pack and ignition issues',
      'Coolant system maintenance',
      'Brake system wear',
      'Electronics and battery drain'
    ],
    metaTitle: 'Bentley Service Dubai | Bentley Specialist Garage | Powerworks',
    metaDescription: 'Expert Bentley service in Dubai. Continental GT, Bentayga, Flying Spur specialists. British-owned garage with genuine care. Al Quoz. Book now.'
  },
  {
    slug: 'toyota',
    name: 'Toyota',
    shortName: 'Toyota',
    logo: '/logos/toyota.png',
    country: 'Japan',
    tier: 'mainstream',
    popularModels: ['Land Cruiser', 'Prado', 'Camry', 'Corolla', 'RAV4', 'Hilux', 'Fortuner'],
    glennQuote: "Toyota build some of the most reliable vehicles on the planet. The Land Cruiser is legendary in the UAE for good reason. But even Toyotas need proper maintenance - especially in this heat. We see a lot of AC compressor work and cooling system services. Keep up with the schedule and they'll run forever.",
    overview: "Toyota vehicles are renowned for reliability, and Dubai's roads are full of them for good reason. We service all Toyota models from the legendary Land Cruiser to the practical Corolla. Our technicians understand Toyota engineering and the specific demands of the UAE climate.",
    specializations: [
      'Toyota Techstream diagnostics',
      'Land Cruiser specialists',
      'Diesel engine service',
      'Hybrid system maintenance',
      'Automatic transmission service'
    ],
    commonIssues: [
      'AC compressor wear',
      'Timing belt service',
      'Suspension bushings in heat',
      'Automatic transmission service',
      'Power steering pump leaks'
    ],
    metaTitle: 'Toyota Service Dubai | Land Cruiser Specialist | Powerworks Garage',
    metaDescription: 'Expert Toyota service in Dubai. Land Cruiser, Prado, Camry specialists. Japanese reliability with British service standards. Al Quoz. Book today.'
  },
  {
    slug: 'nissan',
    name: 'Nissan',
    shortName: 'Nissan',
    logo: '/logos/nissan.png',
    country: 'Japan',
    tier: 'mainstream',
    popularModels: ['Patrol', 'Altima', 'Maxima', 'X-Trail', 'Pathfinder', 'GT-R'],
    glennQuote: "The Nissan Patrol is a UAE institution - these things are built like tanks. We service a lot of them here, plus the GT-R for the performance enthusiasts. Nissans are generally reliable but the CVT transmissions need their fluid changed more often than people think, especially in Dubai's heat.",
    overview: "Nissan vehicles, from the iconic Patrol to the high-performance GT-R, are popular choices in Dubai. We service all Nissan models with proper diagnostic equipment and quality parts. Our technicians understand Nissan engineering and the UAE's demanding driving conditions.",
    specializations: [
      'Nissan CONSULT diagnostics',
      'Patrol specialists',
      'CVT transmission service',
      'GT-R performance service',
      'VQ engine specialists'
    ],
    commonIssues: [
      'CVT transmission wear',
      'Timing chain guides (VQ engines)',
      'AC compressor failure',
      'Suspension wear',
      'Fuel pump issues'
    ],
    metaTitle: 'Nissan Service Dubai | Patrol Specialist Garage | Powerworks',
    metaDescription: 'Expert Nissan service in Dubai. Patrol, Altima, GT-R specialists. CVT service, full diagnostics. Japanese engineering, British service. Al Quoz.'
  },
  {
    slug: 'jaguar',
    name: 'Jaguar',
    shortName: 'Jaguar',
    logo: '/logos/jaguar.png',
    vehicleImage: '/vehicles/jaguar.jpg',
    country: 'United Kingdom',
    tier: 'luxury',
    popularModels: ['F-PACE', 'E-PACE', 'XE', 'XF', 'F-TYPE', 'I-PACE'],
    glennQuote: "Jaguar has come a long way - the new models are fantastic. The F-PACE is brilliant, and the F-TYPE is proper British sports car. As a Brit, I love seeing these cars come in. They share a lot with Land Rover under the skin, so our expertise crosses over nicely.",
    overview: "Jaguar combines British style with modern technology. These vehicles share platforms and systems with Land Rover, and our expertise extends across both marques. We service all Jaguar models from the compact E-PACE to the stunning F-TYPE sports car.",
    specializations: [
      'JLR SDD/Pathfinder diagnostics',
      'Ingenium engine specialists',
      'Air suspension service',
      'InControl system support',
      'F-TYPE performance service'
    ],
    commonIssues: [
      'Timing chain issues (early Ingenium)',
      'Air suspension leaks',
      'Infotainment glitches',
      'Cooling system maintenance',
      'Electrical issues'
    ],
    metaTitle: 'Jaguar Service Dubai | Jaguar Specialist Garage | Powerworks',
    metaDescription: 'Expert Jaguar service in Dubai. British-owned garage, F-PACE, XF, F-TYPE specialists. SDD diagnostics. Al Quoz. Book your Jaguar service.'
  },
  {
    slug: 'ford',
    name: 'Ford',
    shortName: 'Ford',
    logo: '/logos/ford.png',
    country: 'USA',
    tier: 'mainstream',
    popularModels: ['Explorer', 'Expedition', 'Mustang', 'F-150', 'Edge', 'Bronco'],
    glennQuote: "Ford makes proper American muscle and capable SUVs. The Mustang is an icon, and the Explorer is a solid family choice. The EcoBoost engines are clever tech but need their turbos looked after in this heat. We're seeing more Broncos now too - great fun those are.",
    overview: "Ford offers American engineering with a focus on capability and performance. We service all Ford models from the iconic Mustang to the practical Explorer. Our technicians understand Ford's EcoBoost technology and automatic transmission systems.",
    specializations: [
      'Ford IDS diagnostics',
      'EcoBoost turbo service',
      '10-speed transmission service',
      'Mustang performance work',
      '4x4 system maintenance'
    ],
    commonIssues: [
      'EcoBoost carbon buildup',
      'Turbocharger wear',
      'Transmission shudder',
      'Timing chain wear',
      'AC system in extreme heat'
    ],
    metaTitle: 'Ford Service Dubai | Mustang & Explorer Specialist | Powerworks',
    metaDescription: 'Expert Ford service in Dubai. Mustang, Explorer, Expedition specialists. EcoBoost experts. American muscle, British service standards. Al Quoz.'
  },
  {
    slug: 'chevrolet',
    name: 'Chevrolet',
    shortName: 'Chevy',
    logo: '/logos/chevrolet.png',
    country: 'USA',
    tier: 'mainstream',
    popularModels: ['Tahoe', 'Suburban', 'Camaro', 'Corvette', 'Traverse', 'Silverado'],
    glennQuote: "Chevrolet build proper American trucks and SUVs. The Tahoe and Suburban are huge but surprisingly refined. And the Camaro and Corvette - brilliant performance machines. We service quite a few here, mostly the bigger SUVs. Solid vehicles that need proper maintenance.",
    overview: "Chevrolet represents American automotive tradition with capable SUVs and performance icons. We service all Chevrolet models from the massive Suburban to the performance Corvette. Our technicians understand GM engineering and systems.",
    specializations: [
      'GM GDS2 diagnostics',
      'V8 engine specialists',
      '10-speed transmission service',
      'Corvette performance work',
      '4x4 and AWD service'
    ],
    commonIssues: [
      'Lifter and cam wear (V8)',
      'Transmission issues',
      'AC system strain',
      'Electrical concerns',
      'Suspension wear'
    ],
    metaTitle: 'Chevrolet Service Dubai | Tahoe & Camaro Specialist | Powerworks',
    metaDescription: 'Expert Chevrolet service in Dubai. Tahoe, Suburban, Camaro, Corvette specialists. V8 expertise. Al Quoz garage. Book your Chevy service.'
  }
];

export function getMakeBySlug(slug: string): VehicleMake | undefined {
  return VEHICLE_MAKES.find(make => make.slug === slug);
}

export function getMakesByTier(tier: VehicleMake['tier']): VehicleMake[] {
  return VEHICLE_MAKES.filter(make => make.tier === tier);
}
