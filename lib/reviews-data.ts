import { Testimonial } from './types';

/**
 * Comprehensive reviews data with SEO keyword tags
 * Reviews collected from: Google Maps, 2GIS, Website testimonials
 * Last updated: January 2025 (102 Google reviews, 4.7 stars)
 *
 * Tags help filter reviews by:
 * - carMakes: BMW, Mercedes, Range Rover, Porsche, Land Rover, Audi, Bentley, VW, Jaguar, Maserati, Ford, Volvo, Infiniti
 * - carModels: Specific models mentioned
 * - services: brakes, ac, oil, suspension, engine, transmission, battery, tyres, diagnostics, service, inspection
 */

export const ALL_REVIEWS: Testimonial[] = [
  // ==========================================
  // GOOGLE REVIEWS - Recently Scraped (Jan 2025)
  // ==========================================
  {
    name: "Mizia Buzaladze",
    rating: 5,
    text: "I had an excellent experience at Power Works Garage! Everything was handled very professionally and on time. The team is extremely skilled, friendly, and approachable. I really appreciate their dedication and great customer service. A special thanks to Mr. DJ and Mr. Glen for their outstanding support and professionalism — they made the whole experience smooth and hassle-free. I highly recommend Power Works Garage to anyone looking for reliable and top-quality automotive service!",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "John Mayes",
    rating: 5,
    text: "Glenn and his team are brilliant. Service is quick and thorough, quality is excellent and competitively priced (brilliant value for money for the trust and integrity). They always go out of their way to help.",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Sargeant MX",
    rating: 5,
    text: "What a great company and refreshing change to the usual Car Garage services in Dubai. The team at Powerworks are very professional and the work they carry out is honest and top quality workmanship. Their aftercare service is just as good and no problem is too small. I've used them for a few years now on my Land Rover LR4 and now my VW Multivan and will continue in the future. Highly recommended",
    date: "Google Review",
    carMakes: ["Land Rover", "Volkswagen"],
    carModels: ["LR4", "Multivan"],
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Gus Napper",
    rating: 5,
    text: "If I could give these guys 6 stars, I would. I came to Powerworks after terrible service at other local garages and realised, as many other people say on their reviews, I should have just picked the guys with the best reviews, first. Communication, service, knowledge, personality, everything about the garage and the space is completely on point. Diagnosed and repaired my Range Rover in 3 days, as where other local garages had her for 3 weeks and were nowhere near close to fixing her. From the biggest to the smallest jobs, I get constant updates and videos on the cars progress, I never need to wonder what's going on. They find parts that are either the best they recommend or budget friendly that can help the wallet.",
    date: "Google Review",
    carMakes: ["Range Rover"],
    services: ["diagnostics", "general-service"],
    source: "google"
  },
  {
    name: "conor mchugh",
    rating: 5,
    text: "Justin, DJ and the team at Powerworks have been great to deal with in the recent times I have had to get my car fixed! They are very professional and also very responsive on the state of your car. With constant updates which I really appreciated. I would highly recommend anyone in my network to consider them for their next car service in Dubai. Keep up the great works guys!",
    date: "Google Review",
    services: ["general-service", "car-repair"],
    source: "google"
  },
  {
    name: "Laura",
    rating: 5,
    text: "Great service from Justin from start to finish, I needed a part replacing urgently and the team got it done within an hour!",
    date: "Google Review",
    services: ["emergency-repair", "parts-replacement"],
    source: "google"
  },
  {
    name: "Peter Winder",
    rating: 5,
    text: "I cannot recommend these guys highly enough, Glen and DJ are so professional and experts in their field. I had a major impact to the side of my vehicle (third party fault), the insurance company were awful, they insisted I took my car to a certain dealership of their choice. Picked the car up, drove it on to Al Khail Road, lost control at 50km/ph, took it back to the garage, they were simply not interested, despite the car was not safe to drive. Took it to Powerworks, they done a full inspection and Safety report, and fixed the car properly, explained everything with video support, and met all their deadlines for completion of the work. All a bit long winded, but hopefully this explains why Powerworks are a different class!",
    date: "Google Review",
    services: ["inspection", "car-repair", "bodywork"],
    source: "google"
  },
  {
    name: "Chris Gardner",
    rating: 5,
    text: "4 years going here and would not go anywhere else! Amazing customer service, workmanship and follow up including from the owner. Fully recommend for a reliable and well priced garage you can trust.",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "dibble007",
    rating: 5,
    text: "I've known Glenn since he first looked at my Range Rover 10 years ago. Always a good service and honest opinion not just looking for work and selling parts. My current Armada has 230,000km on the clock and purring like a kitten.",
    date: "Google Review",
    carMakes: ["Range Rover", "Nissan"],
    carModels: ["Armada"],
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Graham Gee",
    rating: 5,
    text: "We had a pre purchase inspection done by the PWG crew. As Australian expats we went with a recommendation from a friend that had a great experience with PWG and I couldn't recommend them enough. Glen was very clear, understanding and flexible and the inspection was turned around very quickly. Highly recommend power works if you're considering a pre purchase inspection. We'll be back for servicing after such a great experience.",
    date: "Google Review",
    services: ["pre-purchase-inspection", "inspection"],
    source: "google"
  },
  {
    name: "John Inyang",
    rating: 5,
    text: "Exceptional quality automobile engineering services paired with triple excellent customer centered approach to business makes PowerWorks Auto Garage the bestest auto garage in the whole of UAE!",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Ali T.",
    rating: 5,
    text: "Before taking my car here, I took it to countless other garages which took them weeks of diagnosis, some to come back not even finding the issue. When a friend recommended that I take the car to Glen and the team, by the end of the day they had diagnosed and fixed the problem. Excellent service!",
    date: "Google Review",
    services: ["diagnostics", "car-repair"],
    source: "google"
  },
  {
    name: "Heather Howard",
    rating: 5,
    text: "Thanks for all of your help and kindness this week Justin, it's been so upsetting having the car need so much work and you and your team have been so lovely and communicative. I really appreciate you all!",
    date: "Google Review",
    services: ["car-repair", "general-service"],
    source: "google"
  },
  {
    name: "Vivek Sangar",
    rating: 5,
    text: "I have been going to Powerworks for almost 2 years now. Glenn is always available and very helpful. Justin does a great job, very responsive and I like the fact they send you updates (videos) frequently. Highly recommend Powerworks. Thanks to Glenn, DJ, Justin and team!",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Henry Shatwell",
    rating: 5,
    text: "Amazing experience. Thank you so much. I have a 2012 Ford F150 Raptor. The guys at powerworks were amazing. Another garage gave me a very misleading diagnosis with a huge estimated repair cost and I was going to sell it because of their assessment. Powerworks gave me an honest assessment and fixed it at a fraction of the cost.",
    date: "Google Review",
    carMakes: ["Ford"],
    carModels: ["F150 Raptor"],
    services: ["diagnostics", "car-repair"],
    source: "google"
  },
  {
    name: "Nicole Sharp",
    rating: 5,
    text: "In my experience when you find an honest car mechanic you find gold! A1 experience from start to finish. Honest and trustworthy, exceptional customer service and workmanship. Thank you to DJ and the team!",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Tina Harrison",
    rating: 5,
    text: "Great Service. Thank you to the team at PowerWorks Garage. Our car, which we bought new from a dealership 5 years ago (and have had average service at best, despite this being our second new car from them) was due an annual service. On recommendation, we took it to PowerWorks and the difference in service was outstanding.",
    date: "Google Review",
    services: ["car-service", "annual-service"],
    source: "google"
  },
  {
    name: "Gerry McFadden",
    rating: 5,
    text: "Big thank you to Justin and the powerworks team for doing an excellent job on my car. Brought my car in twice to get 2 jobs done successfully which some other well known Dubai garages had failed to do properly. Powerworks did a great job!",
    date: "Google Review",
    services: ["car-repair", "dealer-alternative"],
    source: "google"
  },
  {
    name: "FIGHTR",
    rating: 5,
    text: "As a German guy who knows cars I can highly recommend this garage! Glenn knows his stuff and I did several jobs with several cars there. Never disappointed - extremely customer oriented.",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Michelle Francis",
    rating: 5,
    text: "Great service, amazing English. Tried to get things moving as quickly as possible once they had approval. Would recommend. Thank you!",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Tom Austin",
    rating: 5,
    text: "I have used Power Works on multiple occasions and I've always had a very positive experience, the quality of the work was always been to a high standard and I appreciate the expertise of DJ and Glenn. They are honest, patient and explain everything carefully so that even us non-mechanically minded individuals can understand.",
    date: "Google Review",
    services: ["general-service", "diagnostics"],
    source: "google"
  },
  {
    name: "Mark Reed",
    rating: 5,
    text: "I highly recommend Glenn, Justin & the Powerworks team having always provided excellent support for my car service and repairs. Most recently help began via a breakdown recovery! Swift diagnosis, detailed explanation of both necessary and recommended work.",
    date: "Google Review",
    services: ["car-service", "breakdown-recovery", "emergency-repair"],
    source: "google"
  },
  {
    name: "John Paul Clark",
    rating: 5,
    text: "Had dash cam installed at short notice and they did an excellent job. Great customer service with good price also.",
    date: "Google Review",
    services: ["accessories", "dashcam-installation"],
    source: "google"
  },
  {
    name: "Craig Mackenzie",
    rating: 5,
    text: "I cannot praise Glenn, DJ and the team enough. I would not take my car anywhere else in Dubai. Total transparency, excellent communication, professional work and value for money are just a few of the reasons I recommend them. An absolute pleasure to deal with them.",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "James Andrews",
    rating: 5,
    text: "Exceptional Service! Recommended by RMA Motors. The team at Powerworks were just Top Notch. Very fair pricing on parts and labor. Car picked up & delivered. Great communication. Will absolutely use again.",
    date: "Google Review",
    services: ["general-service", "pickup-delivery"],
    source: "google"
  },
  {
    name: "Oliver Page",
    rating: 5,
    text: "These guys are fantastic! Would highly recommend. Wanted my AC serviced, messaged them in the morning, within an hour they had collected my car and had it back to me within 3 hours and it's working perfectly.",
    date: "Google Review",
    services: ["ac", "ac-service", "pickup-delivery"],
    source: "google"
  },
  {
    name: "Conrad Mangahas",
    rating: 5,
    text: "I found an amazing auto servicing. Powerworks did an amazing Job on my car and I am really happy with the result. Their works are very personalised and spot on and they deliver the service on time. All staff are amazing especially their service consultant Justin, he really went out of the box to deliver an exemplary customer service.",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Lisa Oxford",
    rating: 5,
    text: "Glenn has been absolutely amazing helping me out with my car issues. What I find valuable is Glenn explains everything really clearly so you understand the full picture and know you're not being ripped off with unnecessary works. Highly recommend this garage.",
    date: "Google Review",
    services: ["diagnostics", "general-service"],
    source: "google"
  },
  {
    name: "Efe Yaman",
    rating: 5,
    text: "Fantastic work and fantastic service. Have brought both of my 2009 ML63 and 1999 Porsche 911 996 to these gents, and so lucky to meet the owner himself and the garage operations manager who cares about the garage as if was his own! Kept me informed throughout the process.",
    date: "Google Review",
    carMakes: ["Mercedes", "Porsche"],
    carModels: ["ML63", "911 996"],
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Alan Harris",
    rating: 5,
    text: "These guys are absolutely phenomenal. Replied to my contact within an hour and were able to do something that the dealer was unable to. Excellent contact at all stages by DJ who explained every stage and what they were trying to achieve.",
    date: "Google Review",
    services: ["diagnostics", "dealer-alternative"],
    source: "google"
  },
  {
    name: "Nuong Doan",
    rating: 5,
    text: "I know Glen from Dubai Eyes talk show and started with our Volvo XC90. Recently our cars (GTI and Infiniti) have been serviced by their team. Justin has taken good care of our cars with detailed reports and solutions. Highly recommended for their quality, expertise and service.",
    date: "Google Review",
    carMakes: ["Volvo", "Volkswagen", "Infiniti"],
    carModels: ["XC90", "GTI"],
    services: ["car-service", "general-service"],
    source: "google"
  },
  {
    name: "John White",
    rating: 5,
    text: "If a 10 star rating was possible I would rate 10, I have to thank Glen and Justin for their amazing service and quality work. They diagnosed the issue and fixed as cost effective and fast as possible and even dropped the car off to where I live. I could not recommend Powerworks anymore thank you very much.",
    date: "Google Review",
    services: ["diagnostics", "pickup-delivery"],
    source: "google"
  },
  {
    name: "georges g",
    rating: 5,
    text: "We all know how stressful it is when you go to a garage to get your car fixed a specific problem and after overcharging end up doing a shoddy job, and you get the car back with the same problem and two or three more that were not there to begin with. Powerworks is the complete opposite - honest, fair pricing and quality work.",
    date: "Google Review",
    services: ["car-repair", "general-service"],
    source: "google"
  },
  {
    name: "K.Burcak Yalab",
    rating: 5,
    text: "The team is very knowledgeable, and they guide the client accurately. Fair prices, quick and quality service! Very friendly and professional staff. Thanks DJ!",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Shane Brennan",
    rating: 5,
    text: "Absolute professionals from start to finish! This business is totally customer oriented backed up by a wealth of wide ranging automotive knowledge delivered in a professional, efficient and honest way by Glenn, DJ and the team.",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Yassin Ramadan",
    rating: 5,
    text: "I have been to the big 2 garages in town for either servicing or modifying my car, but I recently tried out PowerWorks, as recommended by a friend, and I have to say the level of professionalism, transparency, customer service, know how is unmatched.",
    date: "Google Review",
    services: ["car-service", "modifications"],
    source: "google"
  },
  {
    name: "Stephane R",
    rating: 5,
    text: "After a nasty engine seizure on my LR4, Glenn and his team came to the rescue after I had initially been told by others to forget about the car or change the engine altogether. Fortunately, I was directed to powerworks, Glenn and the team saved my engine!",
    date: "Google Review",
    carMakes: ["Land Rover"],
    carModels: ["LR4"],
    services: ["engine", "engine-repair"],
    source: "google"
  },
  {
    name: "Clan Macnish",
    rating: 5,
    text: "Thoroughly recommend these guys will have your back when it comes to servicing and repairing your car, super efficient and professional even sorted out the registration for me and picked up my car when it had expired, legends. Plus they have some really cool cars in sometimes you can catch a glimpse of while you take in yours!",
    date: "Google Review",
    services: ["car-service", "car-repair", "registration"],
    source: "google"
  },
  {
    name: "Rhys Hopkins",
    rating: 5,
    text: "I live in RAK but have been bringing my car ONLY to Powerworks in Dubai for the past three years so highly recommend them to anyone. I trust Glen, DJ and Justin with their knowledge and expertise and they always do their utmost to deal with issues as efficiently as possible.",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },

  // ==========================================
  // BRAKE SERVICE REVIEWS
  // ==========================================
  {
    name: "Kentucky Kid",
    rating: 5,
    text: "Visited without appointment due to a failure with my brakes on my way to work. The guys took control of the situation immediately and asked me to hang around for 20 minutes whilst they got a better understanding of the issue. After 10 minutes they asked me to leave the car and organised me a lift to the office. I received a quote 4 hours later and picked the car up at 7pm the same day. Fixed and WASHED!!",
    date: "2GIS Review",
    services: ["brakes", "emergency-repair"],
    source: "2gis"
  },
  {
    name: "Steven Duerden",
    rating: 5,
    text: "Great service from knowledgeable staff that won't rip you off. Had my brakes serviced here and they sent me a video of the state of my current brakes and outlined why they needed to do the work they recommended. Transparent pricing and great communication throughout.",
    date: "Google Review",
    services: ["brakes"],
    source: "google"
  },

  // ==========================================
  // TYRE SERVICE REVIEWS
  // ==========================================
  {
    name: "Neil Stewart",
    rating: 5,
    text: "I can't praise Glenn, DJ & the Powerworks team more. They consistently go above and beyond for both mine & my wife's cars, literally jumping on whatever job needs doing immediately. They're also incredibly competitive on price and offer transparent advice when it comes to tyres/parts etc.",
    date: "2GIS Review",
    services: ["tyres", "general-service"],
    source: "2gis"
  },

  // ==========================================
  // RANGE ROVER / LAND ROVER REVIEWS
  // ==========================================
  {
    name: "James Anderson",
    rating: 5,
    text: "Finally a garage in Dubai I can trust. Glenn and the team explained everything clearly and the pricing was transparent. They found an issue the dealer had missed and saved me thousands. Felt just like my local back in the UK—highly recommended!",
    date: "Google Review",
    carMakes: ["Range Rover", "Land Rover"],
    carModels: ["Range Rover Sport"],
    services: ["diagnostics", "general-service"],
    source: "google"
  },

  // ==========================================
  // MASERATI REVIEWS
  // ==========================================
  {
    name: "David K.",
    rating: 5,
    text: "Brought my Maserati Quattroporte in for a check engine light. Don't let a warning light ruin your day - Powerworks diagnosed and fixed the issue quickly. Professional service at a fraction of the dealer price.",
    date: "Facebook",
    carMakes: ["Maserati"],
    carModels: ["Quattroporte"],
    services: ["diagnostics", "engine", "check-engine-light"],
    source: "facebook"
  },

  // ==========================================
  // ADDITIONAL HIGH QUALITY REVIEWS
  // ==========================================
  {
    name: "Maxim Zigler",
    rating: 5,
    text: "A garage you can trust! Glenn knows what he's doing, a very reliable and honest guy. Can really recommend this garage (coming myself from Germany).",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
  {
    name: "Marcus Cent",
    rating: 5,
    text: "I don't trust my vehicles to anyone other than Powerworks Garage. Honest service, quality work, fair rates.",
    date: "Google Review",
    services: ["general-service"],
    source: "google"
  },
];

// Helper functions to filter reviews by category
export const getReviewsByService = (service: string): Testimonial[] => {
  return ALL_REVIEWS.filter(review =>
    review.services?.some(s => s.toLowerCase().includes(service.toLowerCase()))
  );
};

/**
 * Get reviews matching any of the provided tags
 * Used by service pages to show relevant reviews
 */
export const getReviewsByTags = (tags: string[]): Testimonial[] => {
  if (!tags || tags.length === 0) return [];

  const normalizedTags = tags.map(t => t.toLowerCase());

  return ALL_REVIEWS.filter(review =>
    review.services?.some(s =>
      normalizedTags.some(tag => s.toLowerCase().includes(tag))
    )
  );
};

export const getReviewsByCarMake = (make: string): Testimonial[] => {
  return ALL_REVIEWS.filter(review =>
    review.carMakes?.some(m => m.toLowerCase().includes(make.toLowerCase()))
  );
};

export const getReviewsByCarModel = (model: string): Testimonial[] => {
  return ALL_REVIEWS.filter(review =>
    review.carModels?.some(m => m.toLowerCase().includes(model.toLowerCase()))
  );
};

// Get featured reviews (mix of services and makes for homepage)
export const getFeaturedReviews = (count: number = 6): Testimonial[] => {
  // Prioritize reviews that mention specific services or car makes
  const withTags = ALL_REVIEWS.filter(r =>
    (r.services && r.services.length > 0) ||
    (r.carMakes && r.carMakes.length > 0)
  );
  return withTags.slice(0, count);
};

// Get reviews mentioning specific car makes (for SEO pages)
export const getCarMakeReviews = (): Record<string, Testimonial[]> => {
  const makes = ['Range Rover', 'Land Rover', 'Porsche', 'Mercedes', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Volvo', 'Maserati', 'Infiniti', 'Nissan'];
  const result: Record<string, Testimonial[]> = {};

  makes.forEach(make => {
    result[make] = getReviewsByCarMake(make);
  });

  return result;
};

// Service categories for the reviews page
export const SERVICE_REVIEW_CATEGORIES = [
  { slug: 'brakes', label: 'Brake Service', keywords: ['brakes', 'brake pads', 'brake discs', 'brake fluid'] },
  { slug: 'tyres', label: 'Tyre Service', keywords: ['tyres', 'tyre replacement', 'wheel alignment'] },
  { slug: 'ac', label: 'AC Repair', keywords: ['ac', 'air conditioning', 'ac repair', 'ac regas', 'ac-service'] },
  { slug: 'engine', label: 'Engine Work', keywords: ['engine', 'engine repair', 'check engine', 'engine-repair'] },
  { slug: 'diagnostics', label: 'Diagnostics', keywords: ['diagnostics', 'diagnostic', 'check engine light'] },
  { slug: 'general-service', label: 'Car Service', keywords: ['service', 'car service', 'maintenance', 'car-service'] },
  { slug: 'emergency-repair', label: 'Emergency Repair', keywords: ['emergency', 'breakdown', 'urgent', 'breakdown-recovery'] },
  { slug: 'inspection', label: 'Vehicle Inspection', keywords: ['inspection', 'pre-purchase', 'pre-purchase-inspection'] },
];

// Car makes we service (for filtering)
export const CAR_MAKE_CATEGORIES = [
  'Range Rover',
  'Land Rover',
  'Porsche',
  'Mercedes',
  'BMW',
  'Audi',
  'Bentley',
  'Maserati',
  'Jaguar',
  'Volkswagen',
  'Ford',
  'Volvo',
  'Infiniti',
  'Nissan',
];

// Summary stats for display
export const REVIEW_STATS = {
  totalReviews: 102,
  averageRating: 4.7,
  googleReviews: 102,
  fiveStarPercentage: 88, // 90 out of 102
  source: 'Google Maps',
  lastUpdated: 'January 2025',
};
