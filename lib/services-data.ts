export type ServiceIconName =
  | 'CarFront'
  | 'ThermometerSnowflake'
  | 'Droplet'
  | 'Zap'
  | 'Disc'
  | 'Activity'
  | 'Cog'
  | 'Wrench'
  | 'Battery'
  | 'CircleDot'
  | 'ClipboardCheck'
  | 'Truck'
  | 'Gauge'
  | 'Settings'
  | 'Shield';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  iconName: ServiceIconName;
  heroImage: string;
  overview: string;
  included: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  priceFrom: string;
  faqs: ServiceFAQ[];
  relatedServices: string[];
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: 'car-service-dubai',
    title: 'Car Service Dubai',
    shortTitle: 'Car Service',
    description: 'Comprehensive car servicing for all makes and models in Dubai.',
    iconName: 'CarFront',
    heroImage: '/header-gp.jpg',
    overview: `Keep your vehicle running at peak performance with our comprehensive car service packages. At Powerworks Garage, we follow British workshop standards to deliver thorough, transparent servicing for all makes and models. Whether you drive a family SUV or a European sports car, our certified technicians use genuine and OEM-equivalent parts to maintain your manufacturer warranty.`,
    included: [
      'Engine oil and filter change',
      'Multi-point vehicle inspection (50+ checks)',
      'Brake system inspection',
      'Fluid level checks and top-ups',
      'Tyre pressure and condition check',
      'Battery health test',
      'Air filter inspection',
      'Lights and electrical check',
      'Wiper blade inspection',
      'Digital service report'
    ],
    process: [
      { step: 1, title: 'Book Online or Call', description: 'Schedule your service at a time that suits you. We offer free pickup from Dubai Marina, JVC, and Al Quoz areas.' },
      { step: 2, title: 'Vehicle Inspection', description: 'Our technicians perform a comprehensive multi-point inspection, documenting everything with photos.' },
      { step: 3, title: 'Transparent Quote', description: 'We contact you with a detailed breakdown of recommended work. No surprises, no hidden fees.' },
      { step: 4, title: 'Expert Service', description: 'Using quality parts and proper procedures, we complete the work to British workshop standards.' },
      { step: 5, title: 'Quality Check & Handover', description: 'Final inspection, digital report delivery, and we explain everything we did.' }
    ],
    priceFrom: 'AED 349',
    faqs: [
      { question: 'How often should I service my car in Dubai?', answer: 'In Dubai\'s harsh climate, we recommend servicing every 10,000 km or 6 months, whichever comes first. The extreme heat accelerates oil degradation and puts extra strain on cooling systems.' },
      { question: 'Will servicing at Powerworks void my warranty?', answer: 'No. Under UAE consumer protection laws, you can service your vehicle at any qualified garage without affecting your manufacturer warranty. We use genuine or OEM-equivalent parts and provide full documentation.' },
      { question: 'Do you service all car brands?', answer: 'Yes, we service all makes and models including European (BMW, Mercedes, Audi, Porsche, VW), Japanese (Toyota, Nissan, Honda), American (Ford, Chevrolet, Jeep), and British (Land Rover, Jaguar, Bentley) vehicles.' },
      { question: 'How long does a full service take?', answer: 'A minor service typically takes 2-3 hours. A major service may take 4-6 hours depending on your vehicle. We offer a comfortable waiting lounge or free pickup/dropoff service.' }
    ],
    relatedServices: ['oil-change-dubai', 'brake-service-dubai', 'ac-repair-dubai'],
    metaTitle: 'Car Service Dubai | Full Service from AED 349 | Powerworks Garage',
    metaDescription: 'Professional car service in Dubai. British-standard servicing for all makes & models. 50+ point inspection, genuine parts, warranty preserved. Book online today.'
  },
  {
    slug: 'ac-repair-dubai',
    title: 'Car AC Repair Dubai',
    shortTitle: 'AC Repair',
    description: 'Expert car AC repair and regas services to keep you cool in the Dubai heat.',
    iconName: 'ThermometerSnowflake',
    heroImage: '/header-tools.jpg',
    overview: `Don't suffer through Dubai's scorching summers with a weak AC system. Powerworks Garage specializes in diagnosing and repairing all car air conditioning problems. From simple regas services to complex compressor replacements, our technicians use professional-grade equipment and quality refrigerants to restore your AC to full cooling power.`,
    included: [
      'Full AC system diagnostic',
      'Refrigerant pressure test',
      'Leak detection with UV dye',
      'Compressor performance check',
      'Condenser inspection',
      'Cabin filter check',
      'Evaporator inspection',
      'AC regas (R134a or R1234yf)',
      'System performance test',
      'Temperature output verification'
    ],
    process: [
      { step: 1, title: 'Diagnostic Check', description: 'We connect professional diagnostic equipment to measure pressures, temperatures, and identify any fault codes.' },
      { step: 2, title: 'Leak Detection', description: 'Using UV dye and electronic detectors, we locate any leaks in the system before simply regassing.' },
      { step: 3, title: 'Repair or Replace', description: 'We fix identified issues - whether it\'s a leaking hose, faulty compressor, or blocked condenser.' },
      { step: 4, title: 'Vacuum & Regas', description: 'The system is vacuumed to remove moisture, then recharged with the correct refrigerant amount.' },
      { step: 5, title: 'Performance Test', description: 'We verify vent temperatures reach optimal cooling levels before handover.' }
    ],
    priceFrom: 'AED 199',
    faqs: [
      { question: 'Why is my car AC blowing warm air?', answer: 'Common causes include low refrigerant (often from a leak), faulty compressor, blocked condenser, electrical issues, or a failed blend door actuator. We diagnose the root cause before recommending repairs.' },
      { question: 'How often should I regas my car AC?', answer: 'AC systems naturally lose about 10% refrigerant per year. In Dubai\'s climate, we recommend checking your AC annually and regassing every 2-3 years or when cooling performance drops.' },
      { question: 'Is it worth fixing an old AC compressor?', answer: 'It depends on your vehicle\'s age and value. We provide honest advice - sometimes a quality rebuilt compressor is cost-effective, other times replacement makes more sense. We never push unnecessary repairs.' },
      { question: 'Can you fix AC for all car brands?', answer: 'Yes, we service AC systems for all makes including those using the newer R1234yf refrigerant found in many 2017+ European vehicles.' }
    ],
    relatedServices: ['car-service-dubai', 'electrical-diagnostics-dubai', 'engine-repair-dubai'],
    metaTitle: 'Car AC Repair Dubai | AC Regas from AED 199 | Powerworks Garage',
    metaDescription: 'Car AC not cooling? Expert AC repair & regas in Dubai. Professional diagnostics, leak detection, compressor repair. All makes serviced. Same-day service available.'
  },
  {
    slug: 'oil-change-dubai',
    title: 'Oil Change Dubai',
    shortTitle: 'Oil Change',
    description: 'Quick, professional oil changes using premium oils and genuine filters.',
    iconName: 'Droplet',
    heroImage: '/header-parts.jpg',
    overview: `Regular oil changes are the single most important thing you can do to extend your engine's life - especially in Dubai's extreme heat. At Powerworks Garage, we use premium fully synthetic oils from trusted brands like Castrol, Mobil 1, and Liqui Moly, matched to your vehicle's exact specifications. Every oil change includes a complimentary vehicle health check.`,
    included: [
      'Drain old engine oil completely',
      'Replace oil filter with OEM-quality filter',
      'Refill with manufacturer-spec oil',
      'Check and top up all fluids',
      'Tyre pressure check',
      'Visual brake inspection',
      'Battery condition check',
      'Reset service indicator',
      'Complimentary exterior wash',
      'Digital service record'
    ],
    process: [
      { step: 1, title: 'Specification Check', description: 'We verify the correct oil grade and capacity for your specific vehicle model and year.' },
      { step: 2, title: 'Complete Drain', description: 'Old oil is fully drained while warm for maximum removal of contaminants.' },
      { step: 3, title: 'Filter Replacement', description: 'We fit a quality OEM-spec filter - never cheap aftermarket alternatives.' },
      { step: 4, title: 'Premium Oil Fill', description: 'Your engine is filled with the correct amount of manufacturer-approved oil.' },
      { step: 5, title: 'System Reset', description: 'Service indicator is reset and we update your digital service history.' }
    ],
    priceFrom: 'AED 199',
    faqs: [
      { question: 'How often should I change oil in Dubai?', answer: 'Due to the extreme heat, we recommend every 8,000-10,000 km or 6 months, whichever comes first. Dubai\'s stop-start traffic and high temperatures break down oil faster than in cooler climates.' },
      { question: 'What oil do you use?', answer: 'We stock premium fully synthetic oils from Castrol, Mobil 1, Liqui Moly, and Total. We always use the grade specified by your manufacturer (0W-20, 5W-30, 5W-40, etc.).' },
      { question: 'Can I wait while you do the oil change?', answer: 'Yes! A standard oil change takes about 30-45 minutes. Our customer lounge has WiFi, refreshments, and comfortable seating.' },
      { question: 'Do you offer oil change packages?', answer: 'Yes, we offer discounted multi-service packages. Ask about our annual maintenance plans that include multiple oil changes at reduced rates.' }
    ],
    relatedServices: ['car-service-dubai', 'engine-repair-dubai', 'brake-service-dubai'],
    metaTitle: 'Oil Change Dubai | Premium Oil Change from AED 199 | Powerworks Garage',
    metaDescription: 'Professional oil change in Dubai using Castrol, Mobil 1 & Liqui Moly oils. All makes & models. 45-minute service with free health check. Book online today.'
  },
  {
    slug: 'electrical-diagnostics-dubai',
    title: 'Car Electrical Diagnostics Dubai',
    shortTitle: 'Electrical Diagnostics',
    description: 'Advanced diagnostics for all vehicle electrical and electronic systems.',
    iconName: 'Zap',
    heroImage: '/header-tools.jpg',
    overview: `Modern vehicles contain dozens of electronic control units, sensors, and complex wiring systems. When warning lights appear or electrical components fail, you need expert diagnosis - not guesswork. Powerworks Garage uses dealer-level diagnostic equipment to accurately identify electrical faults, saving you money on unnecessary part replacements.`,
    included: [
      'Full OBD-II diagnostic scan',
      'Manufacturer-specific fault code reading',
      'Live data analysis',
      'Battery and charging system test',
      'Starter motor test',
      'Alternator output check',
      'Parasitic drain test',
      'Sensor functionality checks',
      'Wiring continuity tests',
      'Detailed diagnostic report'
    ],
    process: [
      { step: 1, title: 'Symptom Discussion', description: 'We listen to your concerns and note when/how the problem occurs.' },
      { step: 2, title: 'Code Scanning', description: 'Using dealer-level tools, we read all stored and pending fault codes from every module.' },
      { step: 3, title: 'Live Data Analysis', description: 'We monitor sensor readings in real-time to identify anomalies.' },
      { step: 4, title: 'Component Testing', description: 'Suspected components are tested individually to confirm the root cause.' },
      { step: 5, title: 'Report & Recommendation', description: 'You receive a clear explanation of the problem and repair options.' }
    ],
    priceFrom: 'AED 150',
    faqs: [
      { question: 'What does the check engine light mean?', answer: 'The check engine light can indicate hundreds of different issues from a loose gas cap to serious engine problems. Professional diagnosis is needed to read the specific fault code and determine the cause.' },
      { question: 'Can you diagnose all car brands?', answer: 'Yes, we have diagnostic equipment for all major brands including specialized tools for BMW, Mercedes, Audi, VW, Porsche, Land Rover, and more.' },
      { question: 'Why is my battery draining overnight?', answer: 'A parasitic drain is often caused by a faulty module, aftermarket accessory, or stuck relay. We perform current draw tests to identify exactly what\'s draining your battery.' },
      { question: 'How accurate is your diagnosis?', answer: 'Our dealer-level equipment combined with experienced technicians means highly accurate diagnosis. We don\'t guess or recommend replacing parts until we\'ve confirmed the fault.' }
    ],
    relatedServices: ['battery-replacement-dubai', 'car-service-dubai', 'engine-repair-dubai'],
    metaTitle: 'Car Electrical Diagnostics Dubai | From AED 150 | Powerworks Garage',
    metaDescription: 'Expert car electrical diagnostics in Dubai. Dealer-level equipment for all brands. Check engine light, battery drain, sensor faults diagnosed accurately.'
  },
  {
    slug: 'brake-service-dubai',
    title: 'Brake Service & Repair Dubai',
    shortTitle: 'Brake Service',
    description: 'Complete brake system service including pads, rotors, fluid, and calipers.',
    iconName: 'Disc',
    heroImage: '/header-parts.jpg',
    overview: `Your brakes are your vehicle's most critical safety system. Powerworks Garage provides comprehensive brake services from routine pad replacements to complete system overhauls. We use quality brake components from trusted brands like Brembo, ATE, and Textar, ensuring your stopping power meets or exceeds original specifications.`,
    included: [
      'Brake pad thickness measurement',
      'Rotor/disc inspection and measurement',
      'Caliper condition check',
      'Brake fluid condition test',
      'Brake line inspection',
      'Handbrake adjustment',
      'ABS sensor check',
      'Brake pad replacement (if needed)',
      'Rotor resurfacing or replacement',
      'Brake fluid flush available'
    ],
    process: [
      { step: 1, title: 'Visual Inspection', description: 'We remove wheels to inspect pads, rotors, calipers, and brake lines thoroughly.' },
      { step: 2, title: 'Measurement', description: 'Pad thickness and rotor wear are measured precisely against minimum specifications.' },
      { step: 3, title: 'Recommendation', description: 'We explain what needs replacement now vs. what can wait, with clear pricing.' },
      { step: 4, title: 'Quality Parts', description: 'We fit premium brake components matched to your vehicle and driving style.' },
      { step: 5, title: 'Bed-In Advice', description: 'After fitting new brakes, we explain the proper bed-in procedure for optimal performance.' }
    ],
    priceFrom: 'AED 299',
    faqs: [
      { question: 'How do I know if my brakes need replacing?', answer: 'Warning signs include squealing or grinding noises, vibration when braking, longer stopping distances, or a spongy brake pedal. We recommend inspection every 20,000 km or annually.' },
      { question: 'Should I replace rotors with new pads?', answer: 'Not always. If rotors are within specification and not warped or scored, they can be reused. We measure and advise honestly - we won\'t sell you rotors you don\'t need.' },
      { question: 'What brake pads do you use?', answer: 'We stock quality brands including Brembo, ATE, Textar, and TRW. We match the pad compound to your driving style - ceramic for quiet daily driving, semi-metallic for performance.' },
      { question: 'How long do brake pads last in Dubai?', answer: 'Typically 30,000-50,000 km depending on driving style and vehicle weight. Stop-start traffic wears brakes faster than highway driving.' }
    ],
    relatedServices: ['car-service-dubai', 'suspension-repair-dubai', 'tyre-replacement-dubai'],
    metaTitle: 'Brake Service Dubai | Brake Pads & Rotors from AED 299 | Powerworks Garage',
    metaDescription: 'Professional brake repair in Dubai. Quality Brembo, ATE, Textar parts. Brake pads, rotors, fluid flush, caliper service. All makes. Free inspection with service.'
  },
  {
    slug: 'suspension-repair-dubai',
    title: 'Suspension Repair Dubai',
    shortTitle: 'Suspension',
    description: 'Expert suspension repairs for a smooth, safe ride on Dubai roads.',
    iconName: 'Activity',
    heroImage: '/header-tools.jpg',
    overview: `Dubai's speed bumps, construction zones, and hot climate take a toll on suspension systems. Powerworks Garage diagnoses and repairs all suspension components including shocks, struts, springs, bushings, and control arms. Whether you're experiencing a rough ride, uneven tyre wear, or handling issues, our technicians will restore your vehicle's comfort and safety.`,
    included: [
      'Complete suspension inspection',
      'Shock absorber test',
      'Strut mount inspection',
      'Spring condition check',
      'Bushing wear assessment',
      'Control arm inspection',
      'Ball joint check',
      'Tie rod inspection',
      'Steering rack check',
      'Wheel alignment check'
    ],
    process: [
      { step: 1, title: 'Road Test', description: 'We drive your vehicle to experience the symptoms firsthand.' },
      { step: 2, title: 'Lift Inspection', description: 'On the lift, we check every suspension component for wear and damage.' },
      { step: 3, title: 'Diagnosis', description: 'We identify which components are causing the issue and need replacement.' },
      { step: 4, title: 'Quality Replacement', description: 'Worn parts are replaced with OEM-quality components.' },
      { step: 5, title: 'Alignment Check', description: 'After suspension work, we verify wheel alignment is within spec.' }
    ],
    priceFrom: 'AED 399',
    faqs: [
      { question: 'How do I know if my shocks are worn?', answer: 'Signs include excessive bouncing, nose-diving when braking, uneven tyre wear, poor handling, and fluid leaking from shock bodies. We recommend inspection every 50,000 km.' },
      { question: 'Should I replace shocks in pairs?', answer: 'Yes, we always recommend replacing shocks/struts in pairs (both fronts or both rears) to maintain balanced handling and ride quality.' },
      { question: 'Why is my car pulling to one side?', answer: 'This can be caused by worn suspension components, incorrect alignment, uneven tyre pressure, or brake issues. We diagnose the root cause before recommending repairs.' },
      { question: 'Do you fit lowering springs?', answer: 'Yes, we can fit performance suspension upgrades including lowering springs, coilovers, and upgraded anti-roll bars. We advise on appropriate setups for Dubai road conditions.' }
    ],
    relatedServices: ['brake-service-dubai', 'tyre-replacement-dubai', 'car-service-dubai'],
    metaTitle: 'Suspension Repair Dubai | Shocks & Struts from AED 399 | Powerworks Garage',
    metaDescription: 'Expert suspension repair in Dubai. Shocks, struts, springs, bushings for all makes. Restore ride comfort and handling. Free inspection available.'
  },
  {
    slug: 'transmission-repair-dubai',
    title: 'Transmission Repair Dubai',
    shortTitle: 'Transmission',
    description: 'Expert automatic and manual transmission service and repair.',
    iconName: 'Cog',
    heroImage: '/header-parts.jpg',
    overview: `Transmission problems can be expensive if left unchecked. Powerworks Garage provides expert diagnosis and repair for automatic, manual, CVT, and dual-clutch transmissions. From simple fluid changes to complex rebuilds, our technicians have the expertise to keep your gearbox shifting smoothly. Early intervention often prevents costly replacements.`,
    included: [
      'Transmission diagnostic scan',
      'Fluid level and condition check',
      'Road test for shift quality',
      'Solenoid function testing',
      'Torque converter check',
      'Clutch wear assessment (manual)',
      'Mechatronic unit diagnosis (DCT)',
      'Transmission fluid change',
      'Filter replacement',
      'Adaptation reset'
    ],
    process: [
      { step: 1, title: 'Symptom Analysis', description: 'We discuss when problems occur - cold starts, under load, specific gears, etc.' },
      { step: 2, title: 'Diagnostic Scan', description: 'Electronic diagnosis reveals stored fault codes and clutch adaptation data.' },
      { step: 3, title: 'Road Test', description: 'We experience the symptoms to correlate with diagnostic data.' },
      { step: 4, title: 'Internal Inspection', description: 'If needed, we inspect fluid condition and internal components.' },
      { step: 5, title: 'Repair Solution', description: 'From fluid service to component replacement, we recommend the most cost-effective fix.' }
    ],
    priceFrom: 'AED 499',
    faqs: [
      { question: 'How often should I change transmission fluid?', answer: 'Despite "lifetime fill" claims, we recommend automatic transmission fluid changes every 60,000-80,000 km in Dubai\'s climate. Heat breaks down fluid faster here.' },
      { question: 'Why is my automatic transmission slipping?', answer: 'Slipping can indicate worn clutch packs, low fluid, failed solenoids, or torque converter issues. Early diagnosis often allows for repair rather than replacement.' },
      { question: 'Can you repair CVT transmissions?', answer: 'Yes, we service CVT transmissions including fluid changes and belt/pulley inspection. We can advise if repair or replacement is more economical.' },
      { question: 'Do you rebuild transmissions?', answer: 'Yes, we can rebuild automatic transmissions. Often this is more cost-effective than replacement, especially for older vehicles with otherwise good condition.' }
    ],
    relatedServices: ['car-service-dubai', 'engine-repair-dubai', 'electrical-diagnostics-dubai'],
    metaTitle: 'Transmission Repair Dubai | Gearbox Service from AED 499 | Powerworks Garage',
    metaDescription: 'Expert transmission repair in Dubai. Automatic, manual, CVT, DSG serviced. Fluid changes, rebuilds, diagnostics. All makes. Honest advice, fair pricing.'
  },
  {
    slug: 'engine-repair-dubai',
    title: 'Engine Repair Dubai',
    shortTitle: 'Engine Repair',
    description: 'Complete engine diagnostics, repair, and rebuild services.',
    iconName: 'Wrench',
    heroImage: '/header-parts.jpg',
    overview: `From minor repairs to complete rebuilds, Powerworks Garage has the expertise to handle all engine work. Our technicians diagnose problems accurately using dealer-level equipment, then provide honest recommendations. We service petrol and diesel engines of all sizes, using quality parts to restore performance and reliability.`,
    included: [
      'Comprehensive engine diagnostic',
      'Compression and leak-down testing',
      'Timing chain/belt inspection',
      'Valve clearance check',
      'Injector testing',
      'Turbocharger inspection',
      'Cooling system check',
      'Oil leak diagnosis',
      'Engine mount inspection',
      'Performance data analysis'
    ],
    process: [
      { step: 1, title: 'Diagnostic Assessment', description: 'We scan for fault codes and analyze live engine data.' },
      { step: 2, title: 'Physical Inspection', description: 'Visual and mechanical inspection of accessible components.' },
      { step: 3, title: 'Testing', description: 'Compression tests, leak-down tests, and other procedures as needed.' },
      { step: 4, title: 'Diagnosis Report', description: 'We explain the problem clearly and provide repair options with pricing.' },
      { step: 5, title: 'Expert Repair', description: 'Using quality parts and proper procedures, we complete the repair to factory standards.' }
    ],
    priceFrom: 'AED 299',
    faqs: [
      { question: 'Why is my engine making a ticking noise?', answer: 'Ticking can indicate low oil level, worn lifters, exhaust leak, or injector noise. Diagnosis is needed to determine severity and whether repair is urgent.' },
      { question: 'Is it worth rebuilding an engine?', answer: 'Often yes, especially for vehicles in otherwise good condition. A rebuild can cost significantly less than engine replacement and give many more years of service.' },
      { question: 'What causes engine overheating?', answer: 'Common causes include coolant leaks, failed water pump, thermostat stuck closed, blocked radiator, or head gasket failure. We diagnose and fix the root cause.' },
      { question: 'Can you repair turbocharged engines?', answer: 'Yes, we service all turbocharged vehicles including turbo replacements, wastegate repairs, and boost leak diagnosis.' }
    ],
    relatedServices: ['car-service-dubai', 'oil-change-dubai', 'electrical-diagnostics-dubai'],
    metaTitle: 'Engine Repair Dubai | Engine Diagnostics from AED 299 | Powerworks Garage',
    metaDescription: 'Expert engine repair in Dubai. Diagnostics, rebuilds, timing belts, turbo repairs. Petrol & diesel. All makes serviced. Honest diagnosis, quality repairs.'
  },
  {
    slug: 'battery-replacement-dubai',
    title: 'Car Battery Replacement Dubai',
    shortTitle: 'Battery',
    description: 'Premium car batteries with free fitting and old battery disposal.',
    iconName: 'Battery',
    heroImage: '/header-tools.jpg',
    overview: `Dubai's extreme heat is brutal on car batteries - they often fail within 2-3 years here. Powerworks Garage stocks premium batteries from Varta, Bosch, and AC Delco sized for your vehicle. All batteries come with warranty, and we include free fitting, electrical system check, and environmentally responsible disposal of your old battery.`,
    included: [
      'Battery capacity testing',
      'Charging system check',
      'Starter motor test',
      'Parasitic drain test',
      'Terminal cleaning',
      'Premium battery supply',
      'Professional fitting',
      'Memory saver use (preserves settings)',
      'System reset if required',
      'Old battery disposal'
    ],
    process: [
      { step: 1, title: 'Battery Test', description: 'We test your current battery\'s capacity and cold cranking amps.' },
      { step: 2, title: 'System Check', description: 'We verify the alternator and charging system are working correctly.' },
      { step: 3, title: 'Right Battery', description: 'We match a battery with the correct size, capacity, and terminal type.' },
      { step: 4, title: 'Professional Fit', description: 'Using a memory saver, we swap batteries without losing your car\'s settings.' },
      { step: 5, title: 'Verification', description: 'We test the new installation and reset any battery monitoring systems.' }
    ],
    priceFrom: 'AED 299',
    faqs: [
      { question: 'How long do car batteries last in Dubai?', answer: 'Typically 2-3 years due to the extreme heat. Premium batteries may last 3-4 years with good care. We recommend testing annually after the second year.' },
      { question: 'Why did my new battery die quickly?', answer: 'Often this indicates a charging system problem or parasitic drain. We test your electrical system with every battery replacement to avoid repeat failures.' },
      { question: 'Do you offer roadside battery replacement?', answer: 'Yes, we can come to you for battery replacement in many Dubai areas. Call us for availability and response time.' },
      { question: 'Will I lose my radio code and settings?', answer: 'We use a memory saver device during battery replacement to preserve all your car\'s settings, seat positions, and radio presets.' }
    ],
    relatedServices: ['electrical-diagnostics-dubai', 'car-service-dubai', 'ac-repair-dubai'],
    metaTitle: 'Car Battery Replacement Dubai | Batteries from AED 299 | Powerworks Garage',
    metaDescription: 'Quality car batteries in Dubai. Varta, Bosch, AC Delco. Free fitting, system check, warranty included. Mobile fitting available. Call now.'
  },
  {
    slug: 'tyre-replacement-dubai',
    title: 'Tyre Replacement Dubai',
    shortTitle: 'Tyres',
    description: 'Premium tyres from top brands with professional fitting and balancing.',
    iconName: 'CircleDot',
    heroImage: '/header-parts.jpg',
    overview: `Quality tyres are essential for safety in Dubai's high-speed road environment. Powerworks Garage supplies and fits tyres from leading brands including Michelin, Continental, Pirelli, Bridgestone, and budget-friendly options. Every tyre fitting includes precision balancing, valve replacement, and a complimentary alignment check.`,
    included: [
      'Tyre condition assessment',
      'Tread depth measurement',
      'Size and spec verification',
      'Premium tyre supply',
      'Professional mounting',
      'Precision balancing',
      'New valve fitting',
      'Torque wrench tightening',
      'Alignment check',
      'Old tyre disposal'
    ],
    process: [
      { step: 1, title: 'Assessment', description: 'We check your current tyres and measure tread depth on all positions.' },
      { step: 2, title: 'Recommendation', description: 'Based on your driving and budget, we recommend suitable tyre options.' },
      { step: 3, title: 'Professional Fitting', description: 'Tyres are mounted using modern equipment that protects your wheels.' },
      { step: 4, title: 'Precision Balance', description: 'Each wheel is balanced to eliminate vibration at highway speeds.' },
      { step: 5, title: 'Alignment Check', description: 'We verify alignment is within spec to maximize tyre life.' }
    ],
    priceFrom: 'AED 250',
    faqs: [
      { question: 'How long do tyres last in Dubai?', answer: 'Typically 40,000-60,000 km depending on driving style and tyre quality. The hot roads accelerate wear compared to cooler climates.' },
      { question: 'Should I replace all four tyres at once?', answer: 'Ideally yes, or at least in pairs on the same axle. Mismatched tyres can affect handling. For AWD vehicles, all four should be replaced together.' },
      { question: 'What tyre brands do you recommend?', answer: 'For premium: Michelin, Continental, Pirelli. For mid-range: Dunlop, Yokohama, Hankook. For budget: Westlake, Sailun. We match recommendations to your needs.' },
      { question: 'Do you offer wheel alignment?', answer: 'We provide a complimentary alignment check with tyre purchase. Full alignment service is available if adjustment is needed.' }
    ],
    relatedServices: ['suspension-repair-dubai', 'brake-service-dubai', 'car-service-dubai'],
    metaTitle: 'Tyre Replacement Dubai | Premium Tyres from AED 250 | Powerworks Garage',
    metaDescription: 'Quality tyres in Dubai. Michelin, Continental, Pirelli, Bridgestone. Professional fitting, balancing, alignment check included. All sizes in stock.'
  },
  {
    slug: 'pre-purchase-inspection-dubai',
    title: 'Pre-Purchase Car Inspection Dubai',
    shortTitle: 'Pre-Purchase',
    description: 'Comprehensive used car inspection before you buy.',
    iconName: 'ClipboardCheck',
    heroImage: '/header-gp.jpg',
    overview: `Buying a used car in Dubai? Don't take risks. Our comprehensive pre-purchase inspection covers over 150 checkpoints including mechanical, electrical, and structural items. We provide an unbiased, detailed report to help you negotiate confidently or walk away from a bad deal. This inspection has saved our customers thousands of dirhams.`,
    included: [
      'Engine health assessment',
      'Transmission function test',
      'Full diagnostic scan',
      'Brake system inspection',
      'Suspension check',
      'AC performance test',
      'Electrical systems check',
      'Underbody inspection',
      'Paint and body check',
      'Service history review',
      'Road test',
      'Detailed written report'
    ],
    process: [
      { step: 1, title: 'Schedule', description: 'Book an inspection at our garage or the seller\'s location.' },
      { step: 2, title: '150+ Point Check', description: 'Our technician systematically inspects every major system.' },
      { step: 3, title: 'Diagnostic Scan', description: 'We read all control modules for hidden fault codes.' },
      { step: 4, title: 'Road Test', description: 'A test drive evaluates real-world performance and identifies issues.' },
      { step: 5, title: 'Detailed Report', description: 'You receive a comprehensive report with photos and repair cost estimates.' }
    ],
    priceFrom: 'AED 349',
    faqs: [
      { question: 'Can you inspect a car at the seller\'s location?', answer: 'Yes, we offer mobile pre-purchase inspections throughout Dubai. There\'s a small additional fee for locations outside our usual service area.' },
      { question: 'What does the inspection cover?', answer: 'We check engine, transmission, suspension, brakes, electrical systems, AC, body condition, paint depth, underbody for accident damage, and perform a full diagnostic scan.' },
      { question: 'How long does the inspection take?', answer: 'A thorough pre-purchase inspection takes approximately 90 minutes. We don\'t rush - finding problems before you buy is the whole point.' },
      { question: 'Will you tell me if the car has been in an accident?', answer: 'We check for signs of previous repairs including paint thickness variations, panel gaps, underbody damage, and structural issues. We\'ll report any findings.' }
    ],
    relatedServices: ['car-service-dubai', 'electrical-diagnostics-dubai', 'engine-repair-dubai'],
    metaTitle: 'Pre-Purchase Car Inspection Dubai | from AED 349 | Powerworks Garage',
    metaDescription: 'Used car inspection in Dubai. 150+ point check, diagnostic scan, road test, detailed report. Mobile inspections available. Buy with confidence.'
  },
  {
    slug: 'car-recovery-dubai',
    title: 'Car Recovery Dubai',
    shortTitle: 'Recovery',
    description: '24/7 car recovery and breakdown assistance across Dubai.',
    iconName: 'Truck',
    heroImage: '/header-fleet.jpg',
    overview: `Stranded in Dubai? Our recovery service operates across the emirate, providing professional vehicle transport when you need it most. Whether you've had a breakdown, accident, or flat battery, we'll get you and your car to safety. Our flatbed trucks handle everything from compact cars to luxury vehicles with care.`,
    included: [
      '24/7 availability',
      'Modern flatbed trucks',
      'Luxury vehicle transport',
      'Accident recovery',
      'Breakdown assistance',
      'Jump start service',
      'Flat tyre assistance',
      'Fuel delivery',
      'Dubai-wide coverage',
      'Careful vehicle handling'
    ],
    process: [
      { step: 1, title: 'Call Us', description: 'Contact our recovery line with your location and vehicle details.' },
      { step: 2, title: 'Quick Response', description: 'We dispatch the nearest available recovery vehicle to you.' },
      { step: 3, title: 'Safe Loading', description: 'Your vehicle is carefully loaded using proper equipment.' },
      { step: 4, title: 'Transport', description: 'We deliver your vehicle to our garage or your chosen destination.' },
      { step: 5, title: 'Next Steps', description: 'If repairs are needed, we can begin diagnosis immediately.' }
    ],
    priceFrom: 'AED 200',
    faqs: [
      { question: 'How quickly can you reach me?', answer: 'Within Dubai, we typically arrive within 30-45 minutes depending on traffic and your location. We\'ll give you an accurate ETA when you call.' },
      { question: 'Can you transport lowered or modified cars?', answer: 'Yes, our flatbed trucks can accommodate lowered vehicles, and we carry ramps suitable for cars with low ground clearance.' },
      { question: 'Do you recover motorcycles?', answer: 'Yes, we can transport motorcycles on our flatbed trucks. Let us know when you call so we bring appropriate securing equipment.' },
      { question: 'What if I just need a jump start?', answer: 'We offer jump start service if your battery is the only issue. If the battery is dead and needs replacement, we can fit a new one roadside in many cases.' }
    ],
    relatedServices: ['battery-replacement-dubai', 'electrical-diagnostics-dubai', 'engine-repair-dubai'],
    metaTitle: 'Car Recovery Dubai | 24/7 Breakdown Service from AED 200 | Powerworks',
    metaDescription: 'Professional car recovery in Dubai. 24/7 flatbed service, breakdown assistance, jump starts. Quick response, careful handling. All vehicles welcome.'
  },
  {
    slug: 'fleet-maintenance-dubai',
    title: 'Fleet Maintenance Dubai',
    shortTitle: 'Fleet Services',
    description: 'Dedicated fleet maintenance programs for businesses in Dubai.',
    iconName: 'Settings',
    heroImage: '/header-fleet.jpg',
    overview: `Keep your business moving with Powerworks Fleet Services. We provide comprehensive maintenance programs for company fleets of all sizes - from small business vehicles to large commercial operations. Enjoy priority scheduling, dedicated account management, competitive pricing, and detailed maintenance reporting to minimize downtime and control costs.`,
    included: [
      'Dedicated account manager',
      'Priority scheduling',
      'Free pickup and delivery',
      'Preventive maintenance programs',
      'Fleet-wide service tracking',
      'Monthly reporting',
      'Volume pricing',
      'Emergency breakdown support',
      '24/7 contact line',
      'Driver reporting system'
    ],
    process: [
      { step: 1, title: 'Fleet Assessment', description: 'We review your current fleet and maintenance needs.' },
      { step: 2, title: 'Custom Program', description: 'We design a maintenance schedule optimized for your vehicles and usage.' },
      { step: 3, title: 'Seamless Service', description: 'We collect, service, and return vehicles with minimal business disruption.' },
      { step: 4, title: 'Tracking & Reporting', description: 'You receive regular reports on fleet health and maintenance history.' },
      { step: 5, title: 'Ongoing Support', description: 'Your account manager handles all coordination and questions.' }
    ],
    priceFrom: 'Custom Quote',
    faqs: [
      { question: 'What size fleets do you service?', answer: 'We work with fleets from 5 vehicles to 100+. Our programs scale to your needs, whether you have a small delivery operation or a large sales team.' },
      { question: 'Do you offer free pickup and delivery?', answer: 'Yes, fleet clients receive complimentary pickup and delivery throughout Dubai. We work around your schedule to minimize vehicle downtime.' },
      { question: 'Can you service all vehicle types?', answer: 'We service cars, SUVs, vans, and light commercial vehicles. For heavy trucks or specialized equipment, we can recommend specialist partners.' },
      { question: 'How do you handle urgent breakdowns?', answer: 'Fleet clients have access to our priority support line. We mobilize recovery and expedite repairs to get your vehicle back in service quickly.' }
    ],
    relatedServices: ['car-service-dubai', 'oil-change-dubai', 'tyre-replacement-dubai'],
    metaTitle: 'Fleet Maintenance Dubai | Business Vehicle Service | Powerworks Garage',
    metaDescription: 'Fleet maintenance programs in Dubai. Priority service, free pickup/delivery, dedicated account management. Keep your business vehicles running reliably.'
  },
  {
    slug: 'timing-belt-dubai',
    title: 'Timing Belt Replacement Dubai',
    shortTitle: 'Timing Belt',
    description: 'Critical timing belt and chain replacement to protect your engine.',
    iconName: 'Gauge',
    heroImage: '/header-parts.jpg',
    overview: `A failed timing belt can destroy your engine in seconds. Powerworks Garage provides expert timing belt and chain replacement services following manufacturer intervals. We replace all related components including tensioners, idlers, and water pump to ensure reliability. Don't gamble with this critical maintenance item.`,
    included: [
      'Timing belt/chain inspection',
      'Tensioner assessment',
      'Idler pulley check',
      'Water pump inspection',
      'Timing belt replacement',
      'Tensioner replacement',
      'Idler replacement',
      'Water pump (if due)',
      'Coolant refresh',
      'Timing verification'
    ],
    process: [
      { step: 1, title: 'Interval Check', description: 'We verify if your vehicle is due based on mileage and age.' },
      { step: 2, title: 'Component Inspection', description: 'We assess belt condition and related components.' },
      { step: 3, title: 'Complete Kit', description: 'We use complete timing kits including all wear items.' },
      { step: 4, title: 'Expert Installation', description: 'Our technicians set timing precisely to factory specifications.' },
      { step: 5, title: 'Verification', description: 'We verify correct operation before returning your vehicle.' }
    ],
    priceFrom: 'AED 1,200',
    faqs: [
      { question: 'When should I replace my timing belt?', answer: 'Most manufacturers recommend 80,000-120,000 km or 5-7 years, whichever comes first. In Dubai\'s heat, we recommend the earlier end of these intervals.' },
      { question: 'What happens if the timing belt breaks?', answer: 'On interference engines (most modern cars), a broken belt causes pistons to hit valves, resulting in severe engine damage costing thousands to repair.' },
      { question: 'Should I replace the water pump too?', answer: 'Yes, we strongly recommend it. The water pump is driven by the timing belt and replacing it during this service adds minimal cost but prevents future failures.' },
      { question: 'Does my car have a timing belt or chain?', answer: 'We can tell you which system your vehicle uses. Chains typically last longer but still require inspection. Belts need replacement at set intervals.' }
    ],
    relatedServices: ['engine-repair-dubai', 'car-service-dubai', 'oil-change-dubai'],
    metaTitle: 'Timing Belt Replacement Dubai | from AED 1,200 | Powerworks Garage',
    metaDescription: 'Timing belt replacement in Dubai. Complete kit including tensioners, water pump. All makes serviced. Protect your engine - book today.'
  },
  {
    slug: 'car-inspection-dubai',
    title: 'Vehicle Inspection Dubai',
    shortTitle: 'Inspection',
    description: 'Comprehensive vehicle health checks and safety inspections.',
    iconName: 'Shield',
    heroImage: '/header-gp.jpg',
    overview: `Whether you want a general health check or need to prepare for RTA testing, Powerworks Garage provides thorough vehicle inspections. Our multi-point inspection covers all major systems, identifying current issues and potential problems before they become expensive repairs. Get peace of mind about your vehicle's condition.`,
    included: [
      'Engine condition check',
      'Transmission assessment',
      'Brake system inspection',
      'Suspension check',
      'Steering inspection',
      'Electrical system test',
      'Lights and signals check',
      'Tyre condition assessment',
      'Fluid level checks',
      'Visual underbody inspection',
      'Road test',
      'Written report'
    ],
    process: [
      { step: 1, title: 'Visual Inspection', description: 'We examine exterior, interior, and engine bay condition.' },
      { step: 2, title: 'System Checks', description: 'Each major system is tested and assessed.' },
      { step: 3, title: 'Diagnostic Scan', description: 'We check for stored fault codes in all modules.' },
      { step: 4, title: 'Road Test', description: 'A test drive verifies on-road performance and handling.' },
      { step: 5, title: 'Report Delivery', description: 'You receive a detailed report with findings and recommendations.' }
    ],
    priceFrom: 'AED 199',
    faqs: [
      { question: 'What\'s the difference between inspection and service?', answer: 'An inspection is diagnostic only - we check and report. A service includes maintenance work like oil change, filter replacement, and adjustments.' },
      { question: 'Can you prepare my car for RTA testing?', answer: 'Yes, we can inspect your vehicle against RTA requirements and fix any issues before you go for official testing.' },
      { question: 'How often should I get my car inspected?', answer: 'We recommend an annual inspection between services, or anytime you notice changes in performance, handling, or unusual noises.' },
      { question: 'Do you inspect classic cars?', answer: 'Yes, we can inspect classic and vintage vehicles. Our experienced technicians understand older vehicle systems and common issues.' }
    ],
    relatedServices: ['car-service-dubai', 'pre-purchase-inspection-dubai', 'brake-service-dubai'],
    metaTitle: 'Vehicle Inspection Dubai | Car Health Check from AED 199 | Powerworks',
    metaDescription: 'Comprehensive car inspection in Dubai. Multi-point check, diagnostic scan, road test, detailed report. RTA prep available. Book your inspection today.'
  }
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find(service => service.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServiceData[] {
  return SERVICES_DATA.filter(service => slugs.includes(service.slug));
}
