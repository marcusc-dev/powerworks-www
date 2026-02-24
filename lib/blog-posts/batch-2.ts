import { BlogPost } from '../types';

export const BATCH_2_POSTS: BlogPost[] = [
  {
    title: "How to Jump Start a Car: Step-by-Step Guide",
    slug: "how-to-jump-start-car",
    excerpt: "Dead battery? Don't panic. Here's how to safely jump start your car — plus the mistakes that can cause expensive damage.",
    category: "Emergency",
    date: "Mar 18, 2024",
    author: "Glenn",
    readTime: "5 min read",
    image: "/blog/how-to-jump-start-car.jpg",
    content: `
<p class="lead">It's 7am, you're running late, you turn the key and... click. Nothing. Your battery is dead. In Dubai, this happens more often than you'd think — the heat is relentless on batteries. Here's how to jump start your car safely, and when you absolutely should not try.</p>

<h2>What You Need</h2>

<ul>
  <li><strong>Jump leads (booster cables)</strong> — keep a set in your boot. Spend AED 50-80 on decent quality ones with heavy-gauge wire.</li>
  <li><strong>A running car with a good battery</strong> — or a portable jump starter pack (AED 150-300, highly recommended for Dubai)</li>
</ul>

<h2>Step-by-Step Jump Start</h2>

<ol>
  <li><strong>Position both cars</strong> so the batteries are close together. Both cars OFF, keys removed.</li>
  <li><strong>Connect the RED cable</strong> to the <strong>positive (+)</strong> terminal of the DEAD battery first.</li>
  <li><strong>Connect the other RED end</strong> to the <strong>positive (+)</strong> terminal of the GOOD battery.</li>
  <li><strong>Connect the BLACK cable</strong> to the <strong>negative (-)</strong> terminal of the GOOD battery.</li>
  <li><strong>Connect the other BLACK end</strong> to an <strong>unpainted metal surface</strong> on the dead car's engine block — NOT the negative terminal of the dead battery. This is important to prevent sparks near the battery.</li>
  <li><strong>Start the good car</strong> and let it run for 2-3 minutes.</li>
  <li><strong>Try starting the dead car</strong>. If it doesn't start after 10-15 seconds, wait 2 minutes and try again.</li>
  <li><strong>Once started</strong>, remove cables in REVERSE order (black from engine, black from good battery, red from good battery, red from dead battery).</li>
  <li><strong>Drive for at least 20-30 minutes</strong> to recharge the battery. Don't just idle — driving charges faster.</li>
</ol>

<h2>When NOT to Jump Start</h2>

<p><strong>Stop — do not attempt a jump start if:</strong></p>

<ul>
  <li>The battery is <strong>swollen, cracked, or leaking</strong> — this is a serious safety risk</li>
  <li>You can <strong>smell rotten eggs</strong> (hydrogen sulphide) near the battery — it may be venting gas</li>
  <li>The battery is <strong>frozen</strong> — not common in Dubai, but possible if you've driven from a mountain region</li>
  <li>Your car has a <strong>hybrid or electric drivetrain</strong> — these have specific procedures. Check your manual.</li>
</ul>

<h2>Dubai-Specific Tips</h2>

<p><strong>Glenn's advice for Dubai drivers:</strong></p>

<ul>
  <li><strong>Carry a portable jump starter</strong> — they're compact, charge via USB, and mean you don't need another car. Essential for Dubai summers.</li>
  <li><strong>If your battery is over 2 years old</strong> and needed a jump, it's time for a replacement. Dubai heat means once a battery starts failing, it goes downhill fast.</li>
  <li><strong>Don't rely on strangers on the hard shoulder</strong> — it's dangerous on Dubai's fast highways. A portable pack or calling recovery is safer.</li>
</ul>

<h2>After the Jump Start</h2>

<p>A successful jump start doesn't mean your battery is fine. If your battery needed a jump, get it <strong>tested within a day or two</strong>. At Powerworks, battery testing is free and takes 5 minutes — we'll tell you honestly whether it can be recharged or needs replacing.</p>

<p>Stuck with a dead battery? Message me on WhatsApp — if you're nearby in DIP, we might be able to help you out directly.</p>
    `,
    faqs: [
      {
        question: "How do you jump start a car safely?",
        answer: "Connect the red cable to the dead battery's positive terminal first, then to the good battery's positive terminal. Connect the black cable to the good battery's negative terminal, then to an unpainted metal surface on the dead car's engine — never to the dead battery's negative terminal. Start the good car, wait 2-3 minutes, then try the dead car."
      },
      {
        question: "Which jump lead goes on first?",
        answer: "Always connect the red (positive) cable first — to the dead battery's positive terminal, then to the good battery's positive terminal. When removing, disconnect in reverse order: black cables first, then red. This sequence prevents dangerous sparking near the battery."
      },
      {
        question: "How long should I drive after a jump start?",
        answer: "Drive for at least 20-30 minutes after a jump start to recharge the battery. Highway driving is more effective than idling. However, if the battery needed a jump start, have it tested within a day or two — in Dubai's heat, a battery that needed jumping likely needs replacement soon."
      },
      {
        question: "Should I buy a portable jump starter for Dubai?",
        answer: "Yes, absolutely. A portable jump starter (AED 150-300) is one of the best investments for Dubai drivers. Batteries fail more often in extreme heat, and a portable pack means you don't need another car or need to wait for roadside assistance on Dubai's busy highways."
      }
    ]
  },
  {
    title: "How Much Does Car AC Repair Cost in Dubai? (2026 Guide)",
    slug: "car-ac-repair-cost-dubai-guide",
    excerpt: "AC not cooling? Here's what every type of AC repair actually costs in Dubai — from a simple regas to a full compressor replacement.",
    category: "AC & Cooling",
    date: "Apr 1, 2024",
    author: "Glenn",
    readTime: "7 min read",
    image: "/blog/car-ac-repair-cost-dubai-guide.jpg",
    content: `
<p class="lead">When your AC stops working in Dubai, it's not just uncomfortable — it's genuinely dangerous in summer. But before you panic about costs, let me break down what AC repairs actually cost. The range is wide because the causes vary enormously.</p>

<h2>AC Repair Cost Breakdown</h2>

<table class="w-full border-collapse my-6">
  <thead>
    <tr class="bg-gray-100">
      <th class="border p-3 text-left">Repair Type</th>
      <th class="border p-3 text-left">Standard Cars</th>
      <th class="border p-3 text-left">European/Luxury</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border p-3">AC diagnostics</td>
      <td class="border p-3">AED 150–250</td>
      <td class="border p-3">AED 200–350</td>
    </tr>
    <tr>
      <td class="border p-3">AC regas (refrigerant top-up)</td>
      <td class="border p-3">AED 199–300</td>
      <td class="border p-3">AED 250–400</td>
    </tr>
    <tr>
      <td class="border p-3">Cabin air filter replacement</td>
      <td class="border p-3">AED 50–100</td>
      <td class="border p-3">AED 80–200</td>
    </tr>
    <tr>
      <td class="border p-3">AC leak repair</td>
      <td class="border p-3">AED 300–800</td>
      <td class="border p-3">AED 500–1,200</td>
    </tr>
    <tr>
      <td class="border p-3">Expansion valve replacement</td>
      <td class="border p-3">AED 400–700</td>
      <td class="border p-3">AED 600–1,200</td>
    </tr>
    <tr>
      <td class="border p-3">Condenser replacement</td>
      <td class="border p-3">AED 600–1,200</td>
      <td class="border p-3">AED 1,000–2,500</td>
    </tr>
    <tr>
      <td class="border p-3">Evaporator replacement</td>
      <td class="border p-3">AED 800–1,500</td>
      <td class="border p-3">AED 1,500–3,000</td>
    </tr>
    <tr>
      <td class="border p-3">Compressor replacement</td>
      <td class="border p-3">AED 1,200–2,000</td>
      <td class="border p-3">AED 2,000–4,000</td>
    </tr>
  </tbody>
</table>

<h2>Why "Just a Regas" Is Often a Waste of Money</h2>

<p>This is the most important thing I tell customers: <strong>AC refrigerant doesn't just "run out"</strong>. It's a sealed system. If you need a regas, it means there's a leak — and adding more gas without finding and fixing the leak is like filling a bucket with a hole in it.</p>

<p>I've seen customers pay for 3-4 regasses at AED 200-400 each before finally coming to us for a proper diagnosis. That's AED 600-1,600 wasted before they even start fixing the real problem.</p>

<h2>Most Common AC Problems in Dubai</h2>

<ol>
  <li><strong>Condenser damage</strong> (40% of cases) — sits at the front of the car, gets clogged with dust and hit by debris. Dubai's sand is particularly harsh.</li>
  <li><strong>Compressor failure</strong> (25%) — the hardest-working component. Runs constantly in Dubai from April to November.</li>
  <li><strong>Leaks at connections</strong> (20%) — heat cycling causes O-rings and seals to deteriorate faster</li>
  <li><strong>Expansion valve failure</strong> (10%) — causes intermittent cooling and frost on AC lines</li>
  <li><strong>Electrical issues</strong> (5%) — fuses, relays, or compressor clutch problems</li>
</ol>

<h2>How to Save Money on AC Repair</h2>

<p><strong>My honest advice:</strong></p>

<ul>
  <li><strong>Get proper diagnostics first</strong> — paying AED 150-250 for a correct diagnosis saves you from paying for the wrong repair</li>
  <li><strong>Don't chase cheap regasses</strong> — demand leak detection before any gas is added</li>
  <li><strong>Replace the cabin filter regularly</strong> — a clogged filter makes the AC work harder and can cause ice build-up on the evaporator</li>
  <li><strong>Run AC in winter too</strong> — 10 minutes weekly keeps the seals lubricated and prevents leaks</li>
</ul>

<p>AC not cooling properly? Message me on WhatsApp describing the symptoms — cold sometimes, warm always, strange noise, bad smell — and I'll give you an idea of what to expect before you come in.</p>
    `,
    faqs: [
      {
        question: "How much does car AC repair cost in Dubai?",
        answer: "AC repair costs in Dubai range from AED 199-300 for a simple regas to AED 2,000-4,000 for a compressor replacement on a European vehicle. The most common repair — condenser replacement — costs AED 600-2,500 depending on the vehicle. Always get proper diagnostics (AED 150-250) before agreeing to any repair."
      },
      {
        question: "Why does my car AC keep needing a regas?",
        answer: "If your AC repeatedly needs regassing, you have a refrigerant leak. AC systems are sealed — gas doesn't 'run out' on its own. Adding more gas without fixing the leak is wasting money. Proper leak detection using UV dye or electronic detectors should be done before any regas."
      },
      {
        question: "What is the most common AC problem in Dubai?",
        answer: "Condenser damage accounts for about 40% of AC problems in Dubai. The condenser sits at the front of the car and gets clogged with sand and dust, reducing its ability to dissipate heat. In Dubai's extreme temperatures, even minor condenser blockage can cause the AC to blow warm, especially in traffic."
      },
      {
        question: "How can I prevent car AC problems in Dubai?",
        answer: "Run your AC for at least 10 minutes weekly even in winter to keep seals lubricated. Replace the cabin air filter every 10,000-15,000km in Dubai's dusty conditions. Have the condenser inspected and cleaned during annual service. Don't blast the AC immediately — let the car ventilate for a minute first."
      }
    ]
  },
  {
    title: "The Complete Car Service Checklist (What Should Be Included)",
    slug: "complete-car-service-checklist",
    excerpt: "Not all services are created equal. Here's exactly what a proper car service should include — and what many garages skip.",
    category: "Maintenance",
    date: "Apr 15, 2024",
    author: "Glenn",
    readTime: "6 min read",
    image: "/blog/complete-car-service-checklist.jpg",
    content: `
<p class="lead">You've booked your car in for a service. The garage says "all done" and hands you a bill. But how do you know the work was actually done properly? After 25 years in the trade, I can tell you that not all services are equal — and some garages cut corners you'd never notice. Here's what should actually be included.</p>

<h2>Minor Service Checklist</h2>

<p>Every minor service (recommended every 8,000-10,000km in Dubai) should include:</p>

<ul>
  <li><strong>Engine oil replacement</strong> — with oil that meets your manufacturer's specification (this matters enormously)</li>
  <li><strong>Oil filter replacement</strong> — always changed with the oil, no exceptions</li>
  <li><strong>Fluid level checks and top-ups:</strong> coolant, brake fluid, power steering, washer fluid</li>
  <li><strong>Brake inspection:</strong> pad thickness, disc condition, visual check of lines</li>
  <li><strong>Tyre inspection:</strong> tread depth, condition, pressure adjustment</li>
  <li><strong>Battery test:</strong> load test and terminal condition (critical in Dubai)</li>
  <li><strong>Belt inspection:</strong> serpentine belt for cracks and tension</li>
  <li><strong>Lights check:</strong> all exterior lights functioning</li>
  <li><strong>Wiper blades:</strong> condition check (they deteriorate fast in Dubai sun)</li>
  <li><strong>Undercarriage visual inspection:</strong> checking for leaks</li>
</ul>

<h2>Major Service Checklist (Additional Items)</h2>

<p>A major service (typically every 20,000-30,000km, or annually) adds:</p>

<ul>
  <li><strong>Air filter replacement</strong> — in Dubai's dusty conditions, this is essential. A clogged air filter reduces power and increases fuel consumption.</li>
  <li><strong>Cabin/pollen filter replacement</strong> — affects AC performance and air quality</li>
  <li><strong>Spark plug inspection/replacement</strong> (if due based on mileage)</li>
  <li><strong>Brake fluid test</strong> — moisture content check, replace if above 3%</li>
  <li><strong>Coolant condition test</strong> — pH and boiling point check</li>
  <li><strong>Comprehensive diagnostic scan</strong> — checking for stored fault codes across all modules</li>
  <li><strong>Suspension check</strong> — bounce test, visual inspection of bushings and mounts</li>
  <li><strong>Exhaust system check</strong> — leaks, mounting, catalytic converter</li>
  <li><strong>Detailed road test</strong> — checking brakes, steering, transmission behaviour, and unusual noises</li>
</ul>

<h2>Dubai-Specific Additions</h2>

<p><strong>Glenn's take:</strong> In Dubai, I add these checks to every service because our climate demands it:</p>

<ul>
  <li><strong>AC system performance test</strong> — vent temperature measurement</li>
  <li><strong>Cooling system pressure test</strong> — our heat means small leaks become big problems fast</li>
  <li><strong>Battery load test with printout</strong> — not just a visual check</li>
  <li><strong>Rubber hoses and belts</strong> — heat degrades rubber much faster here</li>
</ul>

<h2>How to Verify the Work Was Done</h2>

<ul>
  <li><strong>Ask for the old oil filter</strong> — a good garage will show it to you. If it's not oily and dirty, they didn't change it.</li>
  <li><strong>Check the oil level and colour</strong> — fresh oil is honey-coloured, not black</li>
  <li><strong>Request a written report</strong> — every check should be documented with condition ratings</li>
  <li><strong>Check your mileage sticker</strong> — it should show the correct current mileage and next service due</li>
  <li><strong>Look at the air filter</strong> — if it's dusty, it wasn't replaced</li>
</ul>

<p>At Powerworks, every service comes with a detailed inspection report showing exactly what we checked, what condition everything is in, and what will need attention in the future. No surprises, no hidden problems.</p>

<p>Due for a service? Message me on WhatsApp with your car details and mileage — I'll tell you exactly what's needed and give you a price upfront.</p>
    `,
    faqs: [
      {
        question: "What should be included in a car service?",
        answer: "A proper car service should include: engine oil and filter change, fluid checks and top-ups (coolant, brake, washer), brake inspection, tyre check and pressure adjustment, battery test, belt inspection, lights check, and undercarriage inspection for leaks. A major service adds air and cabin filter replacement, spark plug check, and a diagnostic scan."
      },
      {
        question: "How can I tell if my car was actually serviced properly?",
        answer: "Ask to see the old oil filter (it should be oily and dirty), check that the engine oil is honey-coloured (not black), request a written inspection report, verify the mileage on the service sticker matches your car, and check that the air filter looks clean and new. A reputable garage will show you old parts on request."
      },
      {
        question: "What do cheap garages skip during a service?",
        answer: "Common shortcuts include using sub-standard oil that doesn't meet manufacturer specs, skipping the air filter change, not performing a proper brake inspection, no battery test, no diagnostic scan, and not doing a road test. Some don't even change the oil filter. These shortcuts save the garage money but cost you in the long run."
      },
      {
        question: "Should a car service in Dubai include an AC check?",
        answer: "Yes — in Dubai's extreme climate, every service should include an AC performance check (measuring vent temperature), cooling system inspection, and battery load test. These are Dubai-specific essentials that European service schedules don't account for. A good Dubai garage adds these automatically."
      }
    ]
  },
  {
    title: "Car Valuation in the UAE: How to Know What Your Car Is Worth",
    slug: "car-valuation-uae-guide",
    excerpt: "Selling your car? Buying used? Here's how to accurately value any car in the UAE — and the factors that affect the price most.",
    category: "Buying Guide",
    date: "May 2, 2024",
    author: "Glenn",
    readTime: "6 min read",
    image: "/blog/car-valuation-uae-guide.jpg",
    content: `
<p class="lead">Whether you're selling your car or buying used, knowing its true market value saves you from leaving money on the table or overpaying. The UAE car market has its own unique factors that affect value — and some of them might surprise you.</p>

<h2>How to Check Your Car's Value</h2>

<p>Start with these online tools to get a baseline:</p>

<ul>
  <li><strong>Dubicars Value Tool:</strong> Free instant estimate based on make, model, year, and mileage. Good starting point but doesn't account for condition.</li>
  <li><strong>AutoTrader UAE:</strong> Search for similar cars listed for sale. The asking price is usually 5-10% above actual selling price.</li>
  <li><strong>CarSwitch:</strong> Their inspection-based valuation is more accurate but requires listing the car.</li>
  <li><strong>Facebook Marketplace / Dubizzle:</strong> Check what similar cars are listed at. Real market data.</li>
</ul>

<p><strong>Glenn's tip:</strong> Check at least 3 sources and look at actual <em>sold</em> prices, not just asking prices. What someone lists a car for and what it actually sells for can differ by 10-20%.</p>

<h2>Factors That Increase Value</h2>

<ul>
  <li><strong>Full service history</strong> — this is the single biggest value factor. A car with full stamps can be worth 15-20% more than one without.</li>
  <li><strong>GCC specification</strong> — GCC-spec cars are worth 10-20% more than imports (and for good reason)</li>
  <li><strong>Low mileage</strong> — under 15,000km/year is considered low in the UAE</li>
  <li><strong>Desirable colour</strong> — white, black, and grey hold value best in the UAE</li>
  <li><strong>Agency maintained</strong> — though this matters less than people think for older cars</li>
  <li><strong>No accident history</strong> — a clean record commands a premium</li>
</ul>

<h2>Factors That Decrease Value</h2>

<ul>
  <li><strong>Missing or incomplete service history</strong> — biggest red flag for buyers</li>
  <li><strong>Non-GCC spec</strong> — American imports especially suffer in resale</li>
  <li><strong>Accident history</strong> — even minor accidents drop value by 10-30%</li>
  <li><strong>High mileage</strong> — over 20,000km/year raises concern</li>
  <li><strong>Multiple owners</strong> — 3+ owners in a few years suggests problems</li>
  <li><strong>Unusual colours</strong> — that lime green wrap seemed fun at the time...</li>
  <li><strong>Modifications</strong> — aftermarket modifications usually decrease value</li>
</ul>

<h2>Depreciation by Brand</h2>

<table class="w-full border-collapse my-6">
  <thead>
    <tr class="bg-gray-100">
      <th class="border p-3 text-left">Brand</th>
      <th class="border p-3 text-left">3-Year Depreciation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border p-3">Toyota, Lexus</td>
      <td class="border p-3">25–35%</td>
    </tr>
    <tr>
      <td class="border p-3">Nissan, Honda</td>
      <td class="border p-3">35–45%</td>
    </tr>
    <tr>
      <td class="border p-3">BMW, Mercedes, Audi</td>
      <td class="border p-3">45–55%</td>
    </tr>
    <tr>
      <td class="border p-3">Range Rover, Porsche</td>
      <td class="border p-3">40–55%</td>
    </tr>
    <tr>
      <td class="border p-3">Chinese brands (MG, Chery)</td>
      <td class="border p-3">55–70%</td>
    </tr>
  </tbody>
</table>

<h2>When to Sell</h2>

<p>The best time to sell is typically <strong>just before a major service is due</strong> (timing belt, major gearbox service) or <strong>before the warranty expires</strong>. January-March is generally the best selling season in UAE as new residents arrive and bonus season means buyers have cash.</p>

<p>Want to know what your car is worth before selling? Or need a pre-purchase inspection before buying? Message me on WhatsApp — I'll give you an honest assessment based on what I see in the market every day.</p>
    `,
    faqs: [
      {
        question: "How can I find out what my car is worth in the UAE?",
        answer: "Use Dubicars' free valuation tool for a quick estimate, then check AutoTrader UAE and Dubizzle for similar cars listed for sale. Actual selling prices are typically 5-10% below asking prices. For the most accurate valuation, get a professional inspection that documents the car's true condition."
      },
      {
        question: "What affects car resale value most in the UAE?",
        answer: "The biggest factors are: full service history (adds 15-20% value), GCC specification (10-20% premium over imports), clean accident history, low mileage (under 15,000km/year), and desirable colour (white, black, grey). Missing service history is the single biggest value destroyer."
      },
      {
        question: "Which cars hold their value best in the UAE?",
        answer: "Toyota and Lexus hold their value best in the UAE, depreciating only 25-35% over 3 years. Nissan and Honda lose 35-45%. European luxury brands (BMW, Mercedes) depreciate 45-55% in 3 years, while Chinese brands can lose 55-70%. The Nissan Patrol and Toyota Land Cruiser are famously strong value holders."
      },
      {
        question: "When is the best time to sell a car in the UAE?",
        answer: "January to March is the best selling season — new expats arrive, and bonus payouts mean buyers have cash. Sell before major expensive services are due (timing belt, gearbox service) and before the manufacturer warranty expires. Avoid selling during Ramadan and summer when the market is quieter."
      }
    ]
  },
  {
    title: "Car Maintenance Schedule by Mileage: The Complete Guide",
    slug: "car-maintenance-schedule-mileage",
    excerpt: "What needs doing at 10k, 20k, 40k, 60k, 80k and 100k km — adjusted for Dubai's severe driving conditions.",
    category: "Maintenance",
    date: "May 16, 2024",
    author: "Glenn",
    readTime: "7 min read",
    image: "/blog/car-maintenance-schedule-mileage.jpg",
    content: `
<p class="lead">Your car's manual has a service schedule. But it was written for European or Japanese conditions — moderate temperatures, good roads, minimal dust. Dubai is a completely different beast. Here's the maintenance schedule I recommend based on 25 years of keeping cars alive in this climate.</p>

<h2>The Dubai-Adjusted Maintenance Schedule</h2>

<table class="w-full border-collapse my-6">
  <thead>
    <tr class="bg-gray-100">
      <th class="border p-3 text-left">Item</th>
      <th class="border p-3 text-left">10K km</th>
      <th class="border p-3 text-left">20K km</th>
      <th class="border p-3 text-left">40K km</th>
      <th class="border p-3 text-left">60K km</th>
      <th class="border p-3 text-left">80K km</th>
      <th class="border p-3 text-left">100K km</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border p-3">Engine oil & filter</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
    </tr>
    <tr>
      <td class="border p-3">Cabin air filter</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
    </tr>
    <tr>
      <td class="border p-3">Engine air filter</td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
    </tr>
    <tr>
      <td class="border p-3">Brake fluid</td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
    </tr>
    <tr>
      <td class="border p-3">Coolant flush</td>
      <td class="border p-3"></td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3"></td>
    </tr>
    <tr>
      <td class="border p-3">Transmission fluid</td>
      <td class="border p-3"></td>
      <td class="border p-3"></td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
    </tr>
    <tr>
      <td class="border p-3">Spark plugs</td>
      <td class="border p-3"></td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3"></td>
    </tr>
    <tr>
      <td class="border p-3">Timing belt/chain check</td>
      <td class="border p-3"></td>
      <td class="border p-3"></td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
      <td class="border p-3">✓</td>
    </tr>
    <tr>
      <td class="border p-3">Serpentine belt</td>
      <td class="border p-3"></td>
      <td class="border p-3"></td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
    </tr>
    <tr>
      <td class="border p-3">Full suspension check</td>
      <td class="border p-3"></td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3"></td>
      <td class="border p-3">✓</td>
      <td class="border p-3"></td>
    </tr>
  </tbody>
</table>

<h2>What This Costs Over 100,000km</h2>

<p>For a typical European car (BMW 3 Series, Mercedes C-Class):</p>

<ul>
  <li><strong>10 oil services × AED 450 = AED 4,500</strong></li>
  <li><strong>5 air filter changes × AED 100 = AED 500</strong></li>
  <li><strong>3 brake fluid changes × AED 200 = AED 600</strong></li>
  <li><strong>2 coolant flushes × AED 300 = AED 600</strong></li>
  <li><strong>2 transmission services × AED 800 = AED 1,600</strong></li>
  <li><strong>2 spark plug sets × AED 400 = AED 800</strong></li>
  <li><strong>1 timing belt/chain service × AED 2,000 = AED 2,000</strong></li>
</ul>

<p><strong>Total: approximately AED 10,600 over 100,000km</strong> — that's about AED 880 per year for a car driven 12,000km annually. Compare this to a single engine rebuild at AED 15,000+ and the maths speaks for itself.</p>

<h2>The Most Expensive Mistakes</h2>

<p><strong>My honest advice — these are the services people skip that cost them the most:</strong></p>

<ol>
  <li><strong>Transmission fluid</strong> — "lifetime fluid" marketing costs people AED 8,000-40,000 in gearbox failures</li>
  <li><strong>Timing belt</strong> — skipping this can mean a new engine (AED 15,000-50,000+)</li>
  <li><strong>Coolant</strong> — old coolant corrodes radiators and head gaskets (AED 5,000-15,000 to fix)</li>
  <li><strong>Brake fluid</strong> — absorbs moisture over time, can cause brake failure in extreme heat</li>
</ol>

<p>Not sure where your car is at? Message me on WhatsApp with your make, model, year, and current mileage. I'll tell you exactly what's due and what it should cost.</p>
    `,
    faqs: [
      {
        question: "What maintenance does a car need at 100,000km?",
        answer: "At 100,000km, a car needs: engine oil and filter change, transmission fluid replacement, timing belt or chain inspection/replacement, coolant flush, brake fluid change, serpentine belt replacement, spark plug replacement, full suspension check, and comprehensive brake inspection. In Dubai, these intervals are shorter than manufacturer recommendations."
      },
      {
        question: "How much does car maintenance cost over 100,000km in Dubai?",
        answer: "Following a proper maintenance schedule for a European car in Dubai costs approximately AED 10,000-12,000 over 100,000km — about AED 800-1,000 per year. This preventive investment saves significantly compared to the cost of major failures: engine rebuild (AED 15,000+), transmission replacement (AED 15,000-40,000), or head gasket repair (AED 5,000-15,000)."
      },
      {
        question: "What is the most important car maintenance item?",
        answer: "Regular oil changes are the single most important maintenance item — they protect every moving part in your engine. In Dubai, change oil every 8,000-10,000km using the correct specification. The second most critical items are coolant system maintenance and transmission fluid changes, both of which prevent catastrophic and expensive failures."
      },
      {
        question: "Why are Dubai maintenance intervals shorter than manufacturer recommendations?",
        answer: "Dubai's driving conditions are classified as 'severe' by every manufacturer: extreme heat (40-50°C), constant stop-start traffic, short trips, high AC load, and sand/dust exposure. These conditions break down fluids faster, accelerate component wear, and stress cooling systems beyond what European service schedules account for."
      }
    ]
  }
];
