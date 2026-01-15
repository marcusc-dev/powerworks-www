export interface FAQ {
  question: string;
  answer: string;
}

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
  faqs: FAQ[];
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
    faqs: [
      {
        question: 'How often should I service my BMW in Dubai?',
        answer: 'In Dubai\'s extreme heat, we recommend servicing your BMW every 10,000 km or annually, whichever comes first. The heat accelerates oil degradation and puts extra strain on the cooling system. BMW\'s Condition Based Service can stretch intervals, but in this climate, more frequent checks prevent costly repairs.'
      },
      {
        question: 'Why is my BMW running hot in Dubai traffic?',
        answer: 'BMW cooling systems work hard in Dubai. Common causes include failing electric water pumps (especially on N52/N54/N55 engines), thermostat issues, or coolant leaks from the expansion tank. The electric water pump is a known weak point—we recommend proactive replacement around 80,000 km.'
      },
      {
        question: 'Is it worth getting genuine BMW parts?',
        answer: 'For critical components like cooling system parts, sensors, and timing chain components—absolutely. BMW engineering tolerances are tight. For routine items like filters and brake pads, quality OEM-equivalent parts work fine. We\'ll always discuss options and never oversell you on parts you don\'t need.'
      },
      {
        question: 'My BMW is showing engine warning lights—is it serious?',
        answer: 'It could be anything from a loose fuel cap to a major issue. BMW\'s system triggers warnings early, which is actually good—it helps catch problems before they cause damage. Bring it in for a diagnostic scan and we\'ll tell you exactly what\'s happening. Most issues we see are sensor-related or minor.'
      }
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
    faqs: [
      {
        question: 'Why does my Mercedes AIRMATIC suspension keep failing?',
        answer: 'Dubai\'s heat and dust are tough on AIRMATIC systems. The rubber air springs crack and leak over time, and the compressor works overtime to compensate. We see this constantly. The good news: we can source quality replacement parts at a fraction of dealer prices. Budget for air spring replacement every 80,000-120,000 km in this climate.'
      },
      {
        question: 'My Mercedes battery keeps going flat—what\'s happening?',
        answer: 'Mercedes vehicles have many systems that stay active when parked, causing battery drain. Common culprits include faulty SAM modules, seat control units, or aftermarket accessories. We use XENTRY diagnostics to identify exactly which module is drawing power. Often it\'s a simple software reset or a €200 part, not a €500 battery.'
      },
      {
        question: 'How much does Mercedes service cost compared to the dealer?',
        answer: 'Typically 30-50% less than the dealer for the same quality work. We use genuine Mercedes parts where it matters and quality OEM alternatives where appropriate. The real saving is in our diagnostic accuracy—we fix the actual problem first time, not replace parts until something works.'
      },
      {
        question: 'Is it true that older Mercedes have balance shaft problems?',
        answer: 'Yes, the M272 and M273 V6 engines from 2004-2008 had balance shaft sprocket issues that could cause catastrophic engine failure. If you have one of these engines and haven\'t had it checked, book in immediately. We can inspect and repair if needed—catching it early saves the engine.'
      }
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
    faqs: [
      {
        question: 'How often should Audi DSG gearboxes be serviced?',
        answer: 'Every 40,000 km without exception—especially in Dubai. Audi calls DSG "lifetime fill" but that\'s optimistic anywhere, let alone here. The heat degrades the fluid faster, and DSG mechatronic failures are expensive (AED 8,000+). A fluid change costs a fraction of that and keeps the gearbox healthy.'
      },
      {
        question: 'My Audi 2.0 TFSI has a rattling noise on cold start—is this serious?',
        answer: 'Potentially yes. This is often the timing chain tensioner, a known issue on 2008-2013 2.0 TFSI engines. If ignored, the chain can skip and destroy the engine. Get it checked immediately. If caught early, the repair is straightforward. If not, you\'re looking at a new engine.'
      },
      {
        question: 'Why is my Audi using so much oil?',
        answer: 'Some Audi TFSI engines have higher oil consumption by design, but excessive consumption (more than 1L per 1,000 km) indicates problems. Common causes include worn piston rings or failed PCV valves. We can diagnose the root cause and advise whether it\'s a simple fix or something more involved.'
      },
      {
        question: 'Can you service my Audi while keeping the warranty?',
        answer: 'Yes, if your Audi is under warranty. UAE law allows independent servicing as long as manufacturer specifications are followed. We use approved oil grades, genuine filters where required, and document everything. Keep your receipts—they\'re your proof of proper maintenance.'
      }
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
    faqs: [
      {
        question: 'Should I worry about the IMS bearing on my Porsche?',
        answer: 'If you have a 1997-2008 Boxster/Cayman (986/987) or 1999-2005 911 (996/early 997), yes. The Intermediate Shaft bearing can fail catastrophically. We can inspect it without major disassembly on most models. For peace of mind, an upgraded bearing during clutch replacement is sensible preventative maintenance.'
      },
      {
        question: 'How often should Porsche PDK be serviced?',
        answer: 'Every 40,000-60,000 km for fluid and filter change. PDK is incredibly sophisticated—the dual-clutch system needs clean fluid to operate smoothly. Skipping service leads to harsh shifts and eventually expensive mechatronic repairs. It\'s one of those "pay now or pay more later" situations.'
      },
      {
        question: 'Why is my Porsche Cayenne leaking coolant?',
        answer: 'The plastic coolant pipes on Cayennes (especially the first and second generation) become brittle in Dubai\'s heat and crack. It\'s a known issue. We recommend proactive replacement around 80,000 km—the parts aren\'t expensive, but a roadside failure can overheat and damage the engine.'
      },
      {
        question: 'Can you work on air-cooled Porsches?',
        answer: 'Absolutely. Glenn has a soft spot for classic 911s. The air-cooled cars are mechanically simpler but need specialists who understand them. We handle everything from routine valve adjustments to engine rebuilds. These cars deserve proper care, not guesswork.'
      }
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
    faqs: [
      {
        question: 'Why does my Land Rover air suspension keep failing?',
        answer: 'Dubai conditions are brutal on air suspension. The compressor runs constantly in our heat, the rubber air springs crack, and sand gets into everything. We see this daily. Budget for air spring replacement every 80,000-100,000 km. The good news: quality aftermarket springs work just as well as OEM at half the price.'
      },
      {
        question: 'Is the new Defender reliable?',
        answer: 'Much more so than the older models, but it\'s complex. The new Defender shares its platform with the Range Rover, which means air suspension and sophisticated electronics. Early models had some teething issues, but most are sorted now. Regular servicing is key—don\'t skip the maintenance schedule.'
      },
      {
        question: 'My Discovery has a coolant leak—how serious is it?',
        answer: 'Potentially very serious. The supercharged V8 in the Discovery has plastic coolant crossover pipes that fail in Dubai\'s heat. If you\'re losing coolant and the engine overheats, you risk head gasket damage. Get it checked immediately. We can usually replace the pipes in a day.'
      },
      {
        question: 'Can you service my classic Land Rover?',
        answer: 'We love the older Defenders and Discoveries. They\'re mechanically simpler and very satisfying to work on. Parts availability is good, and these vehicles were built to be maintained. Whether it\'s a 90s Defender or a TD5 Discovery, we can keep it running properly.'
      }
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
    faqs: [
      {
        question: 'How much does Range Rover air suspension repair cost?',
        answer: 'It depends on what\'s failed. A single air spring replacement is around AED 2,500-4,000 with quality parts. The compressor is AED 3,000-5,000. A full system overhaul with all springs and compressor might be AED 12,000-15,000—still significantly less than the dealer. We diagnose exactly what\'s needed so you don\'t pay for unnecessary parts.'
      },
      {
        question: 'My Range Rover is showing "Suspension Fault"—can I still drive it?',
        answer: 'It depends on the fault. Sometimes the system drops to a safe mode but remains drivable. Other times, driving risks further damage. Don\'t ignore it or try to reset the warning—bring it in for diagnosis. We can usually identify the problem same-day and give you an honest assessment of urgency.'
      },
      {
        question: 'Is the Range Rover Sport more reliable than the full-size?',
        answer: 'They share most of their mechanicals, so reliability is similar. The Sport has less complex luxury features, which means fewer things to go wrong. Both need proper maintenance. The supercharged V8s are bulletproof if serviced correctly; the electrical systems are what cause most headaches.'
      },
      {
        question: 'Should I buy a Range Rover with high mileage?',
        answer: 'Mileage matters less than maintenance history with Range Rovers. A 150,000 km car with full service history can be better than a 70,000 km car with gaps. We offer pre-purchase inspections—AED 500 that could save you thousands. We\'ll tell you exactly what you\'re buying into.'
      }
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
    faqs: [
      {
        question: 'Can an independent garage properly service a Rolls-Royce?',
        answer: 'Absolutely, if they have the right expertise and approach. Rolls-Royce uses BMW underpinnings, so the mechanical systems are familiar to us. What matters is treating these cars with the care they deserve—proper procedures, genuine parts where required, and attention to detail. We give every Rolls-Royce the white-glove treatment.'
      },
      {
        question: 'How much does Rolls-Royce servicing cost?',
        answer: 'Less than you might think at an independent specialist. A standard service is typically 40-50% less than the dealer while maintaining the same standards. Major work like brake overhauls or suspension service offers even bigger savings. We\'ll always provide a detailed quote upfront with no surprises.'
      },
      {
        question: 'My Rolls-Royce battery keeps draining—what causes this?',
        answer: 'These cars have numerous systems that stay active when parked. Common causes include faulty modules, door handle mechanisms, or the Spirit of Ecstasy illumination system. We use BMW diagnostic equipment to identify exactly which system is drawing power. Often it\'s a simple fix once properly diagnosed.'
      },
      {
        question: 'Do you have experience with the Rolls-Royce Cullinan?',
        answer: 'Yes, the Cullinan is becoming increasingly common in Dubai. It shares its platform with the BMW X7 and 7 Series, which we service regularly. The air suspension, V12 engine, and complex electronics are all within our expertise. We treat every Cullinan with the reverence it deserves.'
      }
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
    faqs: [
      {
        question: 'Are modern Aston Martins reliable?',
        answer: 'The Mercedes-AMG powered cars (2018 onwards) are significantly more reliable than their predecessors. The AMG V8 twin-turbo is proven technology. Earlier cars with Ford-derived V8s and V12s need more attention. All Astons need proper maintenance—they\'re hand-built sports cars, not appliances.'
      },
      {
        question: 'How much does Aston Martin servicing cost in Dubai?',
        answer: 'As an independent specialist, we\'re typically 40-50% less than the dealer. A standard service on a modern DB11 or Vantage runs around AED 3,500-5,000 depending on what\'s needed. We use quality parts and follow Aston Martin procedures—the only difference is the badge on our door.'
      },
      {
        question: 'Can you work on the Aston Martin DBX?',
        answer: 'Absolutely. The DBX shares its Mercedes-AMG engine with the DB11 and Vantage, plus many systems from the Mercedes platform. It\'s a complex vehicle but within our expertise. We\'re seeing more DBXs as they become popular in Dubai—great vehicles with proper maintenance.'
      },
      {
        question: 'My Aston Martin has a check engine light—should I be worried?',
        answer: 'Get it diagnosed promptly, but don\'t panic. Modern Astons share Mercedes engine management, so warnings trigger early. Common causes include oxygen sensors, ignition coils, or minor emissions issues. We\'ll scan it and give you an honest assessment—most issues are straightforward to resolve.'
      }
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
    faqs: [
      {
        question: 'How reliable is the VW DSG gearbox?',
        answer: 'Very reliable when serviced properly. The key is regular fluid changes every 40,000 km—VW claims "lifetime fill" but that doesn\'t hold up in Dubai\'s heat. Skipping service leads to jerky shifts and eventual mechatronic failure. With proper care, DSG gearboxes easily last 200,000+ km.'
      },
      {
        question: 'My VW has a rattling noise on startup—what is it?',
        answer: 'On TSI engines (especially 1.8 and 2.0 from 2008-2013), this is often the timing chain tensioner—a serious issue that can destroy the engine if ignored. On newer cars, it might be something simpler like a loose heat shield. Either way, get it checked promptly.'
      },
      {
        question: 'Are VW parts expensive in Dubai?',
        answer: 'OEM parts are reasonable, and quality aftermarket alternatives are readily available. VW shares many parts across the group (Audi, Skoda, SEAT), which keeps costs down. We source the best value parts for each job—sometimes genuine, sometimes quality OEM-equivalent.'
      },
      {
        question: 'Should I buy a VW Touareg in Dubai?',
        answer: 'The Touareg is an underrated luxury SUV—seriously capable and well-built. The current model shares its platform with the Bentley Bentayga and Porsche Cayenne. Older Touaregs with the V8 TDI are bulletproof. Just ensure the air suspension is healthy before buying.'
      }
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
    faqs: [
      {
        question: 'Are Bentleys expensive to maintain?',
        answer: 'They\'re luxury cars with luxury running costs, but independent servicing makes ownership much more accessible. We typically save clients 40-50% compared to the dealer. The W12 engine is actually quite robust; it\'s the complex electronics and air suspension that need attention. Proper maintenance prevents expensive surprises.'
      },
      {
        question: 'Can you service my Bentley Bentayga?',
        answer: 'Absolutely. The Bentayga shares its platform with the VW Touareg and Porsche Cayenne, plus its engines with Audi. We understand these systems intimately. The W12 Bentayga is the ultimate luxury SUV—we treat them with the care they deserve.'
      },
      {
        question: 'My Bentley Continental GT has an air suspension warning—is it serious?',
        answer: 'It needs attention but is usually straightforward to fix. Common causes include leaking air springs or a tired compressor—both of which we see regularly. We\'ll diagnose exactly what\'s failed and give you options. Quality aftermarket parts can save significantly versus dealer prices.'
      },
      {
        question: 'How often should a Bentley be serviced?',
        answer: 'Annually or every 15,000 km, whichever comes first. In Dubai, I\'d lean toward annual regardless of mileage—the heat is hard on fluids and rubber components. Bentleys need regular attention to stay at their best. Skipping services leads to cascading problems.'
      }
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
    faqs: [
      {
        question: 'Why are Toyota Land Cruisers so popular in Dubai?',
        answer: 'They\'re built for exactly this environment—rugged, reliable, and proven over decades of desert use. The V8 in the 200 Series is bulletproof with proper maintenance. They hold their value incredibly well too. If you want a vehicle that will never let you down, a Land Cruiser is hard to beat.'
      },
      {
        question: 'How often should I service my Toyota in Dubai?',
        answer: 'Every 10,000 km or annually for standard service. Toyota\'s maintenance schedule is conservative globally, but Dubai\'s heat means more strain on cooling systems and AC. Stay on schedule and these cars will run forever. We see Land Cruisers with 400,000+ km still going strong.'
      },
      {
        question: 'Does my Toyota Prado need timing belt replacement?',
        answer: 'If you have the diesel (1KD-FTV), yes—every 150,000 km or 5 years. The petrol V6 has a timing chain that\'s good for the life of the engine. Timing belt replacement is about AED 2,500-3,500 including the water pump—cheap insurance against catastrophic engine damage.'
      },
      {
        question: 'My Toyota AC isn\'t cooling properly—what\'s wrong?',
        answer: 'AC works overtime in Dubai. Common causes include low refrigerant (usually from a leak), a failing compressor, or clogged condenser. Toyota AC compressors eventually wear out from constant use. We\'ll diagnose the specific problem before recommending repairs.'
      }
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
    faqs: [
      {
        question: 'Is the Nissan Patrol reliable?',
        answer: 'Extremely. The Patrol is built for the Middle East and thrives in our conditions. The VK56 V8 is robust, and the 7-speed automatic handles well. Keep up with regular maintenance and these vehicles easily pass 300,000 km. They\'re genuinely built to last.'
      },
      {
        question: 'How often should Nissan CVT fluid be changed?',
        answer: 'Every 40,000-60,000 km, despite what Nissan says about "lifetime fill." In Dubai\'s heat, the CVT works harder and fluid degrades faster. Regular fluid changes prevent the jerky operation and eventual failure that plagues neglected CVT transmissions. It\'s cheap prevention.'
      },
      {
        question: 'Can you service my Nissan GT-R?',
        answer: 'Absolutely. The GT-R is an incredible machine—genuine supercar performance. The VR38DETT twin-turbo engine is highly tunable and reliable with proper care. We handle everything from routine service to performance upgrades. These cars deserve specialist attention.'
      },
      {
        question: 'My Nissan is making a whining noise—is it the CVT?',
        answer: 'Possibly, but not necessarily. CVT whine can indicate low fluid, worn parts, or a failing pump. Other causes include power steering (if equipped), alternator bearings, or AC compressor. We\'ll diagnose the exact source before recommending any repairs.'
      }
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
    faqs: [
      {
        question: 'Are modern Jaguars reliable?',
        answer: 'Much more so than their reputation suggests. The current range shares platforms and engines with Land Rover, and the Ingenium engines are solid. Early 2.0 Ingenium diesels had timing chain issues, but these are largely sorted now. Proper maintenance is key—they\'re sophisticated cars.'
      },
      {
        question: 'Can you service my Jaguar F-TYPE?',
        answer: 'Absolutely—it\'s one of our favourites. The F-TYPE is a proper British sports car with either supercharged V6/V8 or the newer four-cylinder turbo. We handle everything from routine service to performance work. These cars reward proper attention.'
      },
      {
        question: 'My Jaguar infotainment keeps freezing—can you fix it?',
        answer: 'Usually yes. Jaguar\'s InControl system can be temperamental. Sometimes it\'s a software issue that needs updating, other times it\'s a failing screen or module. We\'ll diagnose the root cause. Don\'t suffer with a glitchy system—bring it in and we\'ll sort it.'
      },
      {
        question: 'How much does Jaguar servicing cost compared to the dealer?',
        answer: 'Typically 30-40% less for equivalent work. We use genuine Jaguar parts where needed and quality alternatives where appropriate. As a British-owned garage, we have a soft spot for Jags—they get the care they deserve without the dealer markup.'
      }
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
    faqs: [
      {
        question: 'Is the Ford Mustang GT reliable in Dubai?',
        answer: 'The 5.0 V8 is bulletproof—proper American muscle with proven reliability. Just keep up with oil changes and don\'t skip the cooling system maintenance in our climate. The EcoBoost 4-cylinder is also reliable but needs its turbos looked after. Mustangs are actually quite low-maintenance.'
      },
      {
        question: 'My Ford has 10-speed transmission shudder—is this normal?',
        answer: 'Not normal, but unfortunately common. The 10R80 transmission in Explorers, F-150s, and Mustangs can develop shudder. Often it\'s contaminated fluid that needs flushing. In more severe cases, the torque converter might need attention. We\'ll diagnose before recommending any work.'
      },
      {
        question: 'How reliable is the EcoBoost engine?',
        answer: 'Generally good, but turbos work hard in Dubai\'s heat. Key maintenance includes regular oil changes with the correct spec oil and keeping the cooling system healthy. Carbon buildup on direct-injection engines is common—we can clean that. With proper care, EcoBoost engines last well.'
      },
      {
        question: 'Can you work on the Ford Bronco?',
        answer: 'Yes! The new Bronco is brilliant fun—proper off-road capability with modern tech. It shares its platform with the Ranger, so parts and service knowledge are readily available. We\'re seeing more Broncos in Dubai now, and they suit the lifestyle here perfectly.'
      }
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
    faqs: [
      {
        question: 'Are Chevrolet V8 engines reliable?',
        answer: 'The small-block V8 is one of the most proven engines in automotive history. The 5.3L and 6.2L engines are generally bulletproof. However, some newer versions have had lifter and cam issues—we can inspect and advise. With proper maintenance, these engines easily exceed 300,000 km.'
      },
      {
        question: 'My Tahoe/Suburban AC struggles in summer—is this normal?',
        answer: 'These big vehicles have huge cabin volumes, so the AC works hard. If it\'s really struggling, common causes include low refrigerant, a weak compressor, or clogged condenser. Sometimes adding a second condenser fan helps. We\'ll diagnose the specific issue and give you options.'
      },
      {
        question: 'Can you service my Corvette?',
        answer: 'Absolutely—Corvettes are special machines. The C7 and C8 are genuinely world-class sports cars. We handle everything from routine service to performance modifications. The mid-engine C8 is a technical marvel; the front-engine C7 is a proven platform. Both deserve specialist care.'
      },
      {
        question: 'How often should I change transmission fluid in my Chevy?',
        answer: 'Every 60,000 km regardless of what the manual says about "lifetime fill." The 6-speed and 10-speed automatics need clean fluid to shift smoothly. In Dubai\'s heat, fluid degrades faster. Regular changes prevent the transmission problems that plague neglected vehicles.'
      }
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
