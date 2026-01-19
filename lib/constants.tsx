import {
  Wrench,
  ThermometerSnowflake,
  Droplet,
  Zap,
  Disc,
  Activity,
  Cog,
  CarFront,
  Battery,
  CircleDot,
  ClipboardCheck,
  Truck,
  Clock,
  ShieldCheck,
  Users
} from 'lucide-react';
import { ServiceItem, Testimonial, NavItem, BrandItem, BlogPost, FleetFeature } from './types';

// Images - using local assets from public folder
export const IMAGES = {
  logo: "/full_logo.png",

  owner: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  hero: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2000",
  shopInterior: "https://images.unsplash.com/photo-1505798577917-36e1183590f2?auto=format&fit=crop&q=80&w=1200",
  logoUnionJack: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",

  // Fleet/Partner Image - Replace with specific 'We Will Fix It' van image if available
  fleet: "https://images.unsplash.com/photo-1616401784845-180886ba9bb1?auto=format&fit=crop&q=80&w=1200"
};

export const LOTTIE_URLS = {
  scrollDown: "https://assets10.lottiefiles.com/packages/lf20_w51pcehl.json",
  mechanic: "https://assets3.lottiefiles.com/packages/lf20_3vbOcw.json",
  deliveryTruck: "https://lottie.host/7e008323-9556-432d-9051-93c4e36504a5/N6zF6i8qjW.json",
  chat: "https://assets8.lottiefiles.com/packages/lf20_u25cckyh.json"
};

export const HERO_SLIDES = [
  "/pwg_slide1.jpg", // Technician with diagnostic equipment
  "/pwg_slide2.jpg", // Powerworks branding wall
  "/pwg_slide3.jpg", // Blue Porsche in workshop
  "/pwg_slide4.jpg"  // Glenn - owner
];

export const HERO_HEADLINES = [
  {
    primary: "British Precision.",
    secondary: "Dubai Hospitality."
  },
  {
    primary: "Your Car.",
    secondary: "Our Priority."
  },
  {
    primary: "Dealer Standards.",
    secondary: "Honest Pricing."
  }
];

export const BRANDS: BrandItem[] = [
  // Luxury European
  { name: "Land Rover", logo: "/landrover.png", url: "/makes/land-rover", slug: "land-rover", vehicleImage: "/vehicles/land-rover.jpg" },
  { name: "Range Rover", logo: "/logos/rangerover.png", url: "/makes/range-rover", slug: "range-rover", vehicleImage: "/vehicles/range-rover.jpg" },
  { name: "Porsche", logo: "/porsche.png", url: "/makes/porsche", slug: "porsche", vehicleImage: "/vehicles/porsche.jpg" },
  { name: "Bentley", logo: "/bentley.png", url: "/makes/bentley", slug: "bentley", vehicleImage: "/vehicles/bentley.jpg" },
  { name: "Mercedes-Benz", logo: "/logos/mercedes.png", url: "/makes/mercedes", slug: "mercedes", vehicleImage: "/vehicles/mercedes.jpg" },
  { name: "Rolls-Royce", logo: "/logos/rollsroyce.png", url: "/makes/rolls-royce", slug: "rolls-royce", vehicleImage: "/vehicles/rolls-royce.jpg" },
  { name: "Jaguar", logo: "/logos/jaguar.png", url: "/makes/jaguar", slug: "jaguar", vehicleImage: "/vehicles/jaguar.jpg" },
  { name: "Aston Martin", logo: "/logos/astonmartin.png", url: "/makes/aston-martin", slug: "aston-martin", vehicleImage: "/vehicles/aston-martin.jpg" },
  // Premium German
  { name: "BMW", logo: "/logos/bmw.png", url: "/makes/bmw", slug: "bmw" },
  { name: "Audi", logo: "/audi.png", url: "/makes/audi", slug: "audi" },
  { name: "Volkswagen", logo: "/vw.png", url: "/makes/volkswagen", slug: "volkswagen", vehicleImage: "/vehicles/volkswagen.jpg" },
  { name: "MINI", logo: "/logos/mini.png", url: "/makes/mini", slug: "mini" },
  // Italian Exotics
  { name: "Ferrari", logo: "/logos/ferrari.png", url: "/makes/ferrari", slug: "ferrari" },
  { name: "Lamborghini", logo: "/logos/lamborghini.png", url: "/makes/lamborghini", slug: "lamborghini" },
  { name: "Maserati", logo: "/logos/maserati.png", url: "/makes/maserati", slug: "maserati" },
  // Japanese
  { name: "Toyota", logo: "/logos/toyota.png", url: "/makes/toyota", slug: "toyota" },
  { name: "Lexus", logo: "/logos/lexus.png", url: "/makes/lexus", slug: "lexus" },
  { name: "Nissan", logo: "/logos/nissan.png", url: "/makes/nissan", slug: "nissan" },
  { name: "Infiniti", logo: "/logos/infiniti.png", url: "/makes/infiniti", slug: "infiniti" },
  { name: "Honda", logo: "/logos/honda.png", url: "/makes/honda", slug: "honda" },
  { name: "Mazda", logo: "/logos/mazda.png", url: "/makes/mazda", slug: "mazda" },
  // American
  { name: "Ford", logo: "/logos/ford.png", url: "/makes/ford", slug: "ford" },
  { name: "Chevrolet", logo: "/logos/chevrolet.png", url: "/makes/chevrolet", slug: "chevrolet" },
  { name: "GMC", logo: "/logos/gmc.png", url: "/makes/gmc", slug: "gmc" },
  { name: "Dodge", logo: "/logos/dodge.png", url: "/makes/dodge", slug: "dodge" },
  { name: "Jeep", logo: "/logos/jeep.png", url: "/makes/jeep", slug: "jeep" },
];

export const SERVICES: ServiceItem[] = [
  { title: "Car Service", description: "Comprehensive maintenance for all makes and models.", icon: CarFront, slug: "car-service-dubai", serviceImage: "/Icons/general-service.png", priceFrom: "AED 349" },
  { title: "AC Repair", description: "Keep your cool in the Dubai heat with expert AC diagnostics.", icon: ThermometerSnowflake, slug: "ac-repair-dubai", serviceImage: "/Icons/ac-service.png", priceFrom: "AED 199" },
  { title: "Oil Change", description: "Premium oils and filters to protect your engine's longevity.", icon: Droplet, slug: "oil-change-dubai", serviceImage: "/Icons/oil-and-fluids.png", priceFrom: "AED 199" },
  { title: "Electrical Diagnostics", description: "Advanced troubleshooting for modern vehicle electronics.", icon: Zap, slug: "electrical-diagnostics-dubai", serviceImage: "/Icons/electrical.png", priceFrom: "AED 150" },
  { title: "Brake Service", description: "Safety first with high-quality brake pads and rotor services.", icon: Disc, slug: "brake-service-dubai", serviceImage: "/Icons/brakes.png", priceFrom: "AED 299" },
  { title: "Suspension", description: "Smooth ride guarantee with shock and strut replacement.", icon: Activity, slug: "suspension-repair-dubai", serviceImage: "/Icons/suspension.png", priceFrom: "AED 399" },
  { title: "Transmission Repair", description: "Expert gearbox maintenance and fluid changes.", icon: Cog, slug: "transmission-repair-dubai", serviceImage: "/Icons/transmission.png", priceFrom: "AED 499" },
  { title: "Engine Work", description: "From tune-ups to complete overhauls by certified pros.", icon: Wrench, slug: "engine-repair-dubai", serviceImage: "/Icons/engine.png", priceFrom: "AED 299" },
  { title: "Battery Replacement", description: "High-performance batteries for reliable starting.", icon: Battery, slug: "battery-replacement-dubai", serviceImage: "/Icons/battery.png", priceFrom: "AED 299" },
  { title: "Tyre Replacement", description: "Top brands fitted and balanced perfectly.", icon: CircleDot, slug: "tyre-replacement-dubai", serviceImage: "/Icons/tyres.png", priceFrom: "AED 250" },
  { title: "Pre-Purchase Inspection", description: "Buy with confidence. Detailed reports on used cars.", icon: ClipboardCheck, slug: "pre-purchase-inspection-dubai", serviceImage: "/Icons/inspection.png", priceFrom: "AED 349" },
];

export const FLEET_FEATURES: FleetFeature[] = [
  {
    title: "Free Pickup & Dropoff",
    description: "We collect your fleet vehicles and return them to your HQ, saving your team valuable time.",
    icon: Truck
  },
  {
    title: "100% Uptime Focus",
    description: "Preventative maintenance schedules designed to keep your business moving without interruption.",
    icon: Clock
  },
  {
    title: "Expert & Reliable",
    description: "British-standard mechanical work you can trust, ensuring the longevity of your assets.",
    icon: ShieldCheck
  },
  {
    title: "Priority Service",
    description: "Dedicated account management and fast-track booking for all corporate partners.",
    icon: Users
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Why Dubai Summers Kill Car Batteries",
    slug: "why-dubai-summers-kill-car-batteries",
    excerpt: "Heat is the #1 enemy of your battery. Learn why they fail so often here and how to spot the warning signs before you get stranded.",
    category: "Maintenance",
    date: "Oct 12, 2023",
    author: "Glenn",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    content: `
<p class="lead">If you've lived in Dubai for any length of time, you've probably experienced that dreaded moment: you turn your key (or press your start button), and nothing happens. Your battery is dead—and it always seems to happen at the worst possible time.</p>

<p>Here's the thing most people don't realise: <strong>heat kills batteries faster than cold</strong>. While everyone talks about cold weather and batteries, the reality is that extreme heat—like we experience 8 months of the year in Dubai—is far more damaging.</p>

<h2>Why Heat Destroys Batteries</h2>

<p>Car batteries work through a chemical reaction. When temperatures soar above 35°C (which is basically our daily reality from May to October), several things happen:</p>

<ul>
  <li><strong>Accelerated corrosion:</strong> The internal plates corrode much faster in heat, reducing the battery's ability to hold a charge</li>
  <li><strong>Fluid evaporation:</strong> The electrolyte solution evaporates faster, leaving the plates exposed and damaged</li>
  <li><strong>Increased self-discharge:</strong> Batteries discharge faster when hot, even when your car is parked</li>
</ul>

<p>A battery that would last 4-5 years in the UK might only last 2-3 years in Dubai. I've seen batteries fail after just 18 months here.</p>

<h2>Warning Signs Your Battery is Dying</h2>

<p>Don't wait until you're stranded. Watch for these warning signs:</p>

<ol>
  <li><strong>Slow cranking:</strong> If your engine turns over slowly when starting, that's a red flag</li>
  <li><strong>Dimming lights:</strong> Headlights or interior lights that seem dimmer than usual</li>
  <li><strong>Electrical issues:</strong> Windows moving slowly, or your infotainment system acting strange</li>
  <li><strong>The battery warning light:</strong> If it comes on while driving, get it checked immediately</li>
  <li><strong>Age:</strong> If your battery is over 2 years old in Dubai, have it tested every 6 months</li>
</ol>

<h2>How to Extend Your Battery Life in Dubai</h2>

<p>You can't fight the heat, but you can minimise its impact:</p>

<ul>
  <li><strong>Park in shade whenever possible:</strong> Underground parking isn't just for keeping cool—it protects your battery</li>
  <li><strong>Don't leave electronics running:</strong> Even when parked, devices plugged into USB ports drain your battery</li>
  <li><strong>Drive regularly:</strong> If your car sits for weeks, the battery will drain faster in heat</li>
  <li><strong>Keep terminals clean:</strong> Corrosion builds up faster in humid conditions</li>
</ul>

<h2>When to Replace</h2>

<p>At Powerworks, we test batteries as part of every service. If yours is showing signs of weakness, we'll tell you—but we won't pressure you to replace it before it's necessary. We use quality brands that are designed for hot climates, and we'll properly dispose of your old battery.</p>

<p>If you're experiencing any of the warning signs above, or your battery is approaching 2 years old, message me on WhatsApp and I'll give you an honest assessment. No pressure, just straight talk.</p>
    `
  },
  {
    title: "AC Blowing Warm? It's Not Always Gas",
    slug: "ac-blowing-warm-not-always-gas",
    excerpt: "Before you pay for a regas, read this. The most common AC issues in the UAE are often related to compressors and condensers.",
    category: "AC Repair",
    date: "Sep 28, 2023",
    author: "Glenn",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800",
    content: `
<p class="lead">Your AC isn't blowing cold. It's 45°C outside. You're sweating. Someone tells you "it probably just needs a regas." Before you pay AED 200-400 for refrigerant that might not fix anything, let me explain what's really going on.</p>

<h2>The Regas Myth</h2>

<p>Here's the truth: <strong>AC refrigerant doesn't "run out" like fuel</strong>. It's a sealed system. If you're low on gas, it means there's a leak somewhere—and adding more gas without fixing the leak is just throwing money away.</p>

<p>I can't tell you how many customers come to us after paying for multiple regasses at other shops, only to find the same problem a few weeks later. That's because the underlying issue was never addressed.</p>

<h2>What's Really Causing Your AC Problems</h2>

<p>In Dubai's extreme climate, these are the most common culprits:</p>

<h3>1. Compressor Issues</h3>
<p>The compressor is the heart of your AC system. When it fails, you get warm air. Symptoms include:</p>
<ul>
  <li>AC works intermittently (cold sometimes, warm other times)</li>
  <li>Strange noises when AC is turned on</li>
  <li>AC clutch not engaging</li>
</ul>

<h3>2. Condenser Problems</h3>
<p>The condenser sits at the front of your car and takes a beating from Dubai's dust, sand, and debris. A blocked or damaged condenser can't dissipate heat properly. Signs include:</p>
<ul>
  <li>AC works fine when moving but blows warm at idle</li>
  <li>AC performance drops significantly in traffic</li>
  <li>Visible damage or debris in the condenser fins</li>
</ul>

<h3>3. Expansion Valve Failures</h3>
<p>This component regulates refrigerant flow. When it fails:</p>
<ul>
  <li>AC blows cold, then warm, then cold again</li>
  <li>Frost on the AC lines (yes, even in Dubai heat)</li>
  <li>Hissing sounds from the dashboard</li>
</ul>

<h3>4. Electrical Issues</h3>
<p>Blown fuses, faulty relays, or wiring problems can mimic AC failures. These are often the easiest and cheapest to fix.</p>

<h2>How We Diagnose AC Problems</h2>

<p>At Powerworks, we don't guess. Our diagnostic process includes:</p>
<ol>
  <li><strong>Pressure testing:</strong> We measure high and low side pressures to identify system issues</li>
  <li><strong>Leak detection:</strong> Using UV dye and electronic detectors to find any leaks</li>
  <li><strong>Electrical testing:</strong> Checking all AC-related circuits and components</li>
  <li><strong>Visual inspection:</strong> Examining the condenser, lines, and connections</li>
</ol>

<p>Only after we know exactly what's wrong do we recommend a solution. And yes, sometimes it does just need gas—but we'll find and fix the leak first.</p>

<h2>Preventing AC Problems</h2>

<ul>
  <li><strong>Run your AC regularly:</strong> Even in winter, run it for 10 minutes weekly to keep seals lubricated</li>
  <li><strong>Clean your condenser:</strong> Have it inspected and cleaned during your annual service</li>
  <li><strong>Replace cabin filters:</strong> A clogged filter makes your AC work harder</li>
  <li><strong>Don't blast it immediately:</strong> Let your car ventilate for a minute before cranking the AC to max</li>
</ul>

<p>If your AC isn't performing, message me on WhatsApp with your symptoms. I'll tell you honestly if it sounds like a simple regas or something that needs proper diagnosis.</p>
    `
  },
  {
    title: "The Truth About 'Lifetime' Transmission Fluid",
    slug: "truth-about-lifetime-transmission-fluid",
    excerpt: "Manufacturers say it lasts forever. Mechanics know it doesn't. Here is the recommended interval for changing gearbox oil in this climate.",
    category: "Expert Advice",
    date: "Sep 15, 2023",
    author: "Glenn",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=800",
    content: `
<p class="lead">"Sealed for life." "Lifetime fluid." "Never needs changing." If your car's manual says any of these things about your transmission fluid, I need to tell you something: they're technically correct, but dangerously misleading.</p>

<h2>The Marketing Trick</h2>

<p>Here's what manufacturers mean by "lifetime": the fluid will last the expected lifetime of the transmission <em>under warranty</em>. That's typically 4-5 years or 100,000km. After that? They don't care—you're no longer their problem.</p>

<p>What they don't tell you is that in Dubai's extreme heat, transmission fluid degrades much faster. That "lifetime" fluid becomes a liability.</p>

<h2>What Transmission Fluid Actually Does</h2>

<p>Your transmission fluid:</p>
<ul>
  <li><strong>Lubricates:</strong> Keeps all those intricate gears and clutches moving smoothly</li>
  <li><strong>Cools:</strong> Transfers heat away from the transmission</li>
  <li><strong>Cleans:</strong> Carries away metal particles and debris</li>
  <li><strong>Provides hydraulic pressure:</strong> Essential for shifting in automatic transmissions</li>
</ul>

<p>When fluid degrades, all these functions suffer. And in Dubai's heat, degradation happens 2-3 times faster than in temperate climates.</p>

<h2>Signs Your Transmission Fluid Needs Attention</h2>

<ul>
  <li><strong>Delayed or rough shifting:</strong> The most common early sign</li>
  <li><strong>Slipping:</strong> Engine revs but car doesn't accelerate properly</li>
  <li><strong>Shuddering:</strong> Vibration during gear changes</li>
  <li><strong>Whining or humming:</strong> Unusual noises from the transmission area</li>
  <li><strong>Dark or burnt-smelling fluid:</strong> Fresh fluid is typically red/pink; dark brown or black is bad news</li>
</ul>

<h2>What I Recommend for Dubai</h2>

<p>Regardless of what your manual says, here's my advice based on 25+ years of experience:</p>

<table class="w-full border-collapse my-6">
  <thead>
    <tr class="bg-gray-100">
      <th class="border p-3 text-left">Vehicle Type</th>
      <th class="border p-3 text-left">Recommended Interval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border p-3">Standard automatic</td>
      <td class="border p-3">Every 60,000-80,000 km</td>
    </tr>
    <tr>
      <td class="border p-3">High-performance / sporty driving</td>
      <td class="border p-3">Every 40,000-60,000 km</td>
    </tr>
    <tr>
      <td class="border p-3">Heavy use (towing, off-road)</td>
      <td class="border p-3">Every 30,000-40,000 km</td>
    </tr>
    <tr>
      <td class="border p-3">CVT transmissions</td>
      <td class="border p-3">Every 40,000-60,000 km</td>
    </tr>
  </tbody>
</table>

<h2>The Cost Comparison</h2>

<p>Let's be honest about the numbers:</p>
<ul>
  <li><strong>Transmission fluid change:</strong> AED 500-1,500 (depending on vehicle)</li>
  <li><strong>Transmission rebuild:</strong> AED 8,000-15,000</li>
  <li><strong>Transmission replacement:</strong> AED 15,000-40,000+</li>
</ul>

<p>Regular fluid changes are cheap insurance against catastrophic failure. I've seen too many BMW, Mercedes, and Range Rover owners face massive bills because they believed the "lifetime fluid" marketing.</p>

<h2>How We Do It Right</h2>

<p>At Powerworks, we don't just drain and fill. We:</p>
<ol>
  <li>Use manufacturer-specified fluid (crucial for modern transmissions)</li>
  <li>Replace the filter if applicable</li>
  <li>Check for metal particles in the old fluid (early warning of internal wear)</li>
  <li>Reset adaptation values if needed (important for German cars)</li>
</ol>

<p>Not sure when your transmission was last serviced? Send me a message with your car's details and current mileage. I'll tell you if it's due and what to expect.</p>
    `
  },
  {
    title: "Should You Buy a Used European Car in Dubai?",
    slug: "should-you-buy-used-european-car-dubai",
    excerpt: "German luxury cars depreciate fast here. A 3-year-old BMW can be half price. But is it worth the risk? Here's what I tell my customers.",
    category: "Buying Guide",
    date: "Nov 5, 2023",
    author: "Glenn",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
    content: `
<p class="lead">Dubai is a paradise for used European car buyers. A 3-year-old BMW 5 Series that cost AED 300,000 new can be yours for AED 120,000. A Porsche Cayenne for the price of a new Toyota. Sounds tempting, right?</p>

<p>It can be a brilliant financial decision—or a money pit. After 25 years of fixing these cars, I'll share exactly what I tell customers who ask me this question.</p>

<h2>Why European Cars Depreciate So Fast Here</h2>

<p>Several factors create this buyer's market:</p>
<ul>
  <li><strong>Expat culture:</strong> Many owners leave after 2-3 years and need to sell quickly</li>
  <li><strong>Maintenance fears:</strong> Buyers worry about repair costs, driving prices down</li>
  <li><strong>New car culture:</strong> Dubai loves the latest models; "old" cars lose appeal fast</li>
  <li><strong>Lease returns:</strong> Large volumes of off-lease vehicles flood the market</li>
</ul>

<h2>The Real Question: Can You Afford the Maintenance?</h2>

<p>The purchase price is just the beginning. Here's what to budget annually:</p>

<table class="w-full border-collapse my-6">
  <thead>
    <tr class="bg-gray-100">
      <th class="border p-3 text-left">Vehicle Type</th>
      <th class="border p-3 text-left">Annual Maintenance Budget</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border p-3">BMW 3/5 Series, Mercedes C/E Class</td>
      <td class="border p-3">AED 5,000-10,000</td>
    </tr>
    <tr>
      <td class="border p-3">Audi A4/A6, VW Touareg</td>
      <td class="border p-3">AED 5,000-12,000</td>
    </tr>
    <tr>
      <td class="border p-3">Porsche Cayenne, Panamera</td>
      <td class="border p-3">AED 10,000-20,000</td>
    </tr>
    <tr>
      <td class="border p-3">Range Rover, Land Rover</td>
      <td class="border p-3">AED 12,000-25,000</td>
    </tr>
    <tr>
      <td class="border p-3">BMW X5 M, AMG models</td>
      <td class="border p-3">AED 15,000-30,000</td>
    </tr>
  </tbody>
</table>

<p>These aren't dealer prices—they're what you'd pay at a quality independent garage like ours. Dealer prices are typically 40-60% higher.</p>

<h2>Which European Cars to Buy (and Avoid)</h2>

<h3>Generally Good Buys:</h3>
<ul>
  <li><strong>BMW 3 Series / 5 Series (F30/F10 generation):</strong> Reliable engines, reasonable parts costs</li>
  <li><strong>Mercedes E-Class (W212/W213):</strong> Well-built, ages gracefully</li>
  <li><strong>Porsche Cayenne (958/9YA):</strong> Expensive to buy, but surprisingly reliable</li>
  <li><strong>Audi Q5/Q7:</strong> Solid vehicles if maintained properly</li>
</ul>

<h3>Proceed with Caution:</h3>
<ul>
  <li><strong>Range Rover / Range Rover Sport:</strong> Air suspension issues are extremely common</li>
  <li><strong>BMW X5/X6 (older V8s):</strong> Cooling system and timing chain concerns</li>
  <li><strong>Mercedes S-Class (W221):</strong> Complex electronics, expensive when things go wrong</li>
  <li><strong>Any diesel without service history:</strong> Injectors and DPF issues</li>
</ul>

<h2>My Pre-Purchase Inspection Checklist</h2>

<p>Before buying any used European car, this is what I check:</p>
<ol>
  <li><strong>Full service history:</strong> No history = no deal, period</li>
  <li><strong>Diagnostic scan:</strong> Even if no warning lights are on, stored codes tell stories</li>
  <li><strong>Suspension and steering:</strong> Wear items that cost thousands to replace</li>
  <li><strong>Cooling system:</strong> The most vulnerable system in Dubai heat</li>
  <li><strong>Transmission behaviour:</strong> Proper road test for smooth shifts</li>
  <li><strong>Undercarriage inspection:</strong> Looking for leaks, damage, previous repairs</li>
  <li><strong>Electrical systems:</strong> Testing all features, not just the obvious ones</li>
</ol>

<p>Our pre-purchase inspection costs AED 500-750 depending on the vehicle. It takes 60-90 minutes and could save you tens of thousands in hidden problems.</p>

<h2>The Bottom Line</h2>

<p>Used European cars in Dubai can be an excellent value—<em>if</em> you:</p>
<ul>
  <li>Buy the right model and year</li>
  <li>Get a proper pre-purchase inspection</li>
  <li>Budget properly for maintenance</li>
  <li>Find a trustworthy independent garage (hint: we're here)</li>
</ul>

<p>Thinking about a specific car? Message me the details—year, model, mileage, and price. I'll tell you honestly if it's a good deal or if you should walk away.</p>
    `
  },
  {
    title: "The 10,000km Service Myth",
    slug: "10000km-service-myth",
    excerpt: "Most manufacturers recommend 15,000-20,000km intervals. In Dubai's extreme heat, that's too long. Here's why shorter intervals save you money.",
    category: "Maintenance",
    date: "Nov 18, 2023",
    author: "Glenn",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800",
    content: `
<p class="lead">Your BMW manual says service every 24 months or 30,000km. Your Mercedes condition-based system says you've got 15,000km to go. Your friend says he goes 20,000km between oil changes and his car is "fine."</p>

<p>They're all wrong for Dubai.</p>

<h2>Why Manufacturer Intervals Don't Work Here</h2>

<p>Service intervals are calculated for "normal" driving conditions—which means moderate climates, highway driving, and ambient temperatures between 10-30°C. Dubai driving conditions are anything but normal:</p>

<ul>
  <li><strong>Extreme heat:</strong> 40-50°C for 6 months of the year</li>
  <li><strong>Stop-start traffic:</strong> Constant idling in congestion</li>
  <li><strong>Short trips:</strong> Many cars never reach optimal operating temperature</li>
  <li><strong>Dust and sand:</strong> Constant filtration demands on engine and cabin filters</li>
  <li><strong>AC running constantly:</strong> Extra load on the engine at all times</li>
</ul>

<p>These conditions are classified as "severe" by every manufacturer—but their marketing departments don't advertise the severe service schedule.</p>

<h2>What Happens When You Wait Too Long</h2>

<p>Engine oil in Dubai conditions:</p>
<ul>
  <li>Breaks down faster due to heat cycling</li>
  <li>Accumulates contaminants more quickly</li>
  <li>Loses viscosity, reducing protection</li>
  <li>Becomes acidic, corroding internal components</li>
</ul>

<p>I've seen engines with 30,000km on "lifetime" oil that looked like they had 200,000km. The sludge buildup was horrific.</p>

<h2>My Recommended Service Intervals for Dubai</h2>

<table class="w-full border-collapse my-6">
  <thead>
    <tr class="bg-gray-100">
      <th class="border p-3 text-left">Service Type</th>
      <th class="border p-3 text-left">Manufacturer Interval</th>
      <th class="border p-3 text-left">Dubai Recommendation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border p-3">Engine oil change</td>
      <td class="border p-3">15,000-30,000 km</td>
      <td class="border p-3">8,000-10,000 km</td>
    </tr>
    <tr>
      <td class="border p-3">Oil filter</td>
      <td class="border p-3">With oil change</td>
      <td class="border p-3">Every oil change</td>
    </tr>
    <tr>
      <td class="border p-3">Air filter</td>
      <td class="border p-3">40,000-60,000 km</td>
      <td class="border p-3">15,000-20,000 km</td>
    </tr>
    <tr>
      <td class="border p-3">Cabin filter</td>
      <td class="border p-3">30,000-40,000 km</td>
      <td class="border p-3">10,000-15,000 km</td>
    </tr>
    <tr>
      <td class="border p-3">Brake fluid</td>
      <td class="border p-3">2-3 years</td>
      <td class="border p-3">Every 2 years max</td>
    </tr>
    <tr>
      <td class="border p-3">Coolant</td>
      <td class="border p-3">"Lifetime"</td>
      <td class="border p-3">Every 3-4 years</td>
    </tr>
  </tbody>
</table>

<h2>The Cost Difference</h2>

<p>Let's do the maths over 100,000km:</p>

<p><strong>Following manufacturer intervals (2 oil changes):</strong></p>
<ul>
  <li>2 x AED 800 = AED 1,600</li>
  <li>Potential engine wear damage: AED 10,000-50,000+</li>
</ul>

<p><strong>Following Dubai intervals (10 oil changes):</strong></p>
<ul>
  <li>10 x AED 400 = AED 4,000</li>
  <li>Engine protection: Priceless (but seriously, you'll avoid major repairs)</li>
</ul>

<p>That extra AED 2,400 over 100,000km is the cheapest insurance you'll ever buy.</p>

<h2>What We Include in Our Service</h2>

<p>At Powerworks, every service includes:</p>
<ul>
  <li>Quality oil that meets or exceeds manufacturer specs</li>
  <li>Genuine or OEM-quality filter</li>
  <li>Multi-point inspection of critical systems</li>
  <li>Fluid top-ups at no extra charge</li>
  <li>Honest report on what needs attention now vs. later</li>
</ul>

<p>Not sure when your car is due? Message me with your last service date and mileage. I'll tell you exactly what's needed.</p>
    `
  },
  {
    title: "Warning Signs Your Cooling System is Failing",
    slug: "warning-signs-cooling-system-failing",
    excerpt: "Overheating in Dubai traffic isn't just inconvenient—it can destroy your engine. Know these 5 warning signs before it's too late.",
    category: "Diagnostics",
    date: "Dec 2, 2023",
    author: "Glenn",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800",
    content: `
<p class="lead">In Dubai, your cooling system works harder than almost any other component. When ambient temperatures hit 50°C and you're stuck in traffic with the AC blasting, your engine is fighting for its life. A failing cooling system doesn't give you much warning before it causes catastrophic damage.</p>

<p>Here are the five warning signs I tell every customer to watch for.</p>

<h2>1. Temperature Gauge Climbing Higher Than Normal</h2>

<p>Your temperature gauge should sit in the middle, every time. If you notice it creeping higher—especially in traffic or on hot days—something is wrong.</p>

<p><strong>What it could mean:</strong></p>
<ul>
  <li>Low coolant level (check for leaks)</li>
  <li>Failing water pump</li>
  <li>Thermostat stuck closed</li>
  <li>Blocked radiator</li>
  <li>Failing cooling fans</li>
</ul>

<p><strong>What to do:</strong> If the gauge goes into the red, pull over immediately. Continuing to drive even for a few minutes can cause head gasket failure or warped cylinder heads—repairs that cost AED 10,000-30,000+.</p>

<h2>2. Coolant Leaks (The Puddles Under Your Car)</h2>

<p>Green, orange, or pink puddles under your car are coolant. Even small leaks become big problems quickly.</p>

<p><strong>Common leak points:</strong></p>
<ul>
  <li>Radiator (often the plastic end tanks crack)</li>
  <li>Hoses and connections</li>
  <li>Water pump seal</li>
  <li>Expansion tank (especially on BMWs)</li>
  <li>Heater core</li>
</ul>

<p><strong>What to do:</strong> Don't just top up and ignore it. Small leaks become big leaks, usually at the worst possible time. Get it checked.</p>

<h2>3. Sweet Smell from the Engine Bay or Interior</h2>

<p>Coolant has a distinctive sweet smell. If you notice it:</p>
<ul>
  <li><strong>From engine bay:</strong> External leak, could be dripping onto hot components</li>
  <li><strong>From interior vents:</strong> Heater core leak—this is urgent</li>
</ul>

<p>A leaking heater core means coolant is entering your cabin. Besides being uncomfortable, it can fog your windscreen dangerously and the repair requires dashboard removal (AED 2,000-4,000).</p>

<h2>4. Fluctuating Temperature Gauge</h2>

<p>If your temperature jumps around—normal, then hot, then normal again—you likely have:</p>
<ul>
  <li><strong>Air in the system:</strong> Often after a coolant change or from a small leak</li>
  <li><strong>Failing thermostat:</strong> Sticking open and closed intermittently</li>
  <li><strong>Weak water pump:</strong> Not circulating coolant consistently</li>
</ul>

<p>This is actually one of the easier symptoms to diagnose and fix, but don't ignore it.</p>

<h2>5. Milky Oil or Coolant</h2>

<p>This is the worst-case scenario. If you see:</p>
<ul>
  <li><strong>Milky residue under the oil cap:</strong> Coolant is mixing with oil</li>
  <li><strong>Oil in your coolant reservoir:</strong> Same problem, different symptom</li>
</ul>

<p>This typically indicates a head gasket failure. In Dubai's heat, head gaskets fail more often because of the extreme temperature cycling. Unfortunately, this is not a cheap repair—but catching it early can prevent engine replacement.</p>

<h2>Preventing Cooling System Failures</h2>

<p>Here's what I recommend:</p>
<ul>
  <li><strong>Check coolant level monthly:</strong> Takes 30 seconds, could save your engine</li>
  <li><strong>Flush and replace coolant every 3-4 years:</strong> Old coolant becomes acidic and corrosive</li>
  <li><strong>Inspect hoses during every service:</strong> Look for cracks, bulges, or soft spots</li>
  <li><strong>Test cooling fans:</strong> Make sure they come on when the AC is running or engine is hot</li>
  <li><strong>Replace the thermostat proactively:</strong> Around 100,000km for most vehicles</li>
</ul>

<h2>What We Check at Powerworks</h2>

<p>Our cooling system inspection includes:</p>
<ul>
  <li>Pressure test for leaks</li>
  <li>Coolant condition and freezing/boiling point test</li>
  <li>Thermostat operation</li>
  <li>Fan operation and relay testing</li>
  <li>Water pump condition (visual and listening for bearing noise)</li>
  <li>Hose and connection inspection</li>
</ul>

<p>Noticed any of these warning signs? Don't wait until you're stranded on Sheikh Zayed Road in August. Message me and describe what you're seeing—I'll tell you if it's urgent or can wait.</p>
    `
  }
];

export const REVIEWS: Testimonial[] = [
  {
    name: "John Mayes",
    rating: 5,
    text: "Glenn and his team are brilliant. Service is quick and thorough, quality is excellent and competitively priced (brilliant value for money for the trust and integrity). They always go out of their way to help.",
    date: "Google Review"
  },
  {
    name: "Laura",
    rating: 5,
    text: "Great service from Justin from start to finish, I needed a part replacing urgently and the team got it done within an hour!",
    date: "Google Review"
  },
  {
    name: "Mizia Buzaladze",
    rating: 5,
    text: "I had an excellent experience at Power Works Garage! Everything was handled very professionally and on time. The team is extremely skilled, friendly, and approachable. I really appreciate their dedication and great customer service.",
    date: "Google Review"
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Fleet Services", href: "/fleet-service-dubai" },
  { label: "Ask Glenn", href: "/ask-glenn" },
  { label: "Reviews", href: "/reviews" },
];

// Contact is handled separately in Navbar as a CTA button
