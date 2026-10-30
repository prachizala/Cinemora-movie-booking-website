/**
 * CINEMORA - Core Datasets & Configurations (Demo Data)
 * Tagline: "Your Seat. Your Show. Your Experience."
 * All movies, cinemas, showtimes, coupons, and banks are fictional demo datasets.
 */

const CINEMORA_DATA = (function() {
  'use strict';

  // 0. IMAGES MAP (Local offline real photography registry)
  const IMAGES = {
    posters: {
      'mv-01': 'assets/img/poster-01.jpg',
      'mv-02': 'assets/img/poster-02.jpg',
      'mv-03': 'assets/img/poster-03.jpg',
      'mv-04': 'assets/img/poster-04.jpg',
      'mv-05': 'assets/img/poster-05.jpg',
      'mv-06': 'assets/img/poster-06.jpg',
      'mv-07': 'assets/img/poster-07.jpg',
      'mv-08': 'assets/img/poster-08.jpg',
      'mv-09': 'assets/img/poster-09.jpg',
      'mv-10': 'assets/img/poster-10.jpg',
      'mv-11': 'assets/img/poster-11.jpg',
      'mv-12': 'assets/img/poster-12.jpg',
      'mv-13': 'assets/img/poster-13.jpg',
      'mv-14': 'assets/img/poster-14.jpg'
    },
    heroes: {
      'mv-01': 'assets/img/hero-01.jpg',
      'mv-02': 'assets/img/hero-02.jpg',
      'mv-03': 'assets/img/hero-04.jpg',
      'mv-04': 'assets/img/hero-03.jpg'
    },
    cinemas: {
      'cnm-01': 'assets/img/cinema-01.jpg',
      'cnm-02': 'assets/img/cinema-02.jpg',
      'cnm-03': 'assets/img/cinema-03.jpg',
      'cnm-04': 'assets/img/cinema-04.jpg'
    },
    categories: {
      'std': 'assets/seat-standard.svg',
      'prem': 'assets/seat-premium.svg',
      'rec': 'assets/img/recliner.jpg',
      'sofa': 'assets/img/sofa-seats.jpg'
    },
    highlights: [
      { id: 'hl-01', title: 'Grand Auditorium', desc: '4K Laser & Atmos', image: 'assets/img/cinema-01.jpg', link: '#/cinemas' },
      { id: 'hl-02', title: 'Caramel Concessions', desc: 'Fresh & Warm', image: 'assets/img/popcorn.jpg', link: '#/checkout' },
      { id: 'hl-03', title: '180° VIP Recliners', desc: 'Motorized Comfort', image: 'assets/img/recliner.jpg', link: '#/membership' },
      { id: 'hl-04', title: 'Royal Couple Sofas', desc: 'Private 2-Guest Pods', image: 'assets/img/sofa-seats.jpg', link: '#/cinemas' },
      { id: 'hl-05', title: 'Contactless M-Tickets', desc: 'QR Fast-Track Entry', image: 'assets/img/tickets.jpg', link: '#/bookings' },
      { id: 'hl-06', title: 'Gala Premieres', desc: 'Red Carpet Screenings', image: 'assets/img/premiere.jpg', link: '#/membership' }
    ]
  };

  // 1. CITIES LIST (20 Indian Cities)
  const CITIES = [
    { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', isMajor: true, popular: true },
    { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', isMajor: true, popular: true },
    { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', isMajor: true, popular: true },
    { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', isMajor: true, popular: true },
    { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', isMajor: true, popular: true },
    { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', isMajor: true, popular: true },
    { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', isMajor: true, popular: true },
    { id: 'pune', name: 'Pune', state: 'Maharashtra', isMajor: true, popular: true },
    { id: 'gandinagar', name: 'Gandhinagar', state: 'Gujarat', isMajor: false, popular: false },
    { id: 'surat', name: 'Surat', state: 'Gujarat', isMajor: false, popular: true },
    { id: 'vadodara', name: 'Vadodara', state: 'Gujarat', isMajor: false, popular: false },
    { id: 'gurugram', name: 'Gurugram', state: 'Haryana', isMajor: false, popular: false },
    { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', isMajor: false, popular: true },
    { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', isMajor: false, popular: false },
    { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', isMajor: false, popular: false },
    { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', isMajor: false, popular: false },
    { id: 'chandigarh', name: 'Chandigarh', state: 'Punjab / Haryana', isMajor: false, popular: true },
    { id: 'kochi', name: 'Kochi', state: 'Kerala', isMajor: false, popular: true },
    { id: 'patna', name: 'Patna', state: 'Bihar', isMajor: false, popular: false },
    { id: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', isMajor: false, popular: false }
  ];

  // 2. FICTIONAL CINEMA THEATRES (3+ for major cities, 1+ for others)
  const CINEMAS = [
    // Ahmedabad
    {
      id: 'cnm-amd-01',
      cityId: 'ahmedabad',
      name: 'Cinemora Royale Lounge & IMAX',
      locality: 'Palladium Mall, Thaltej',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['IMAX 3D', 'Luxury Recliner', 'Dolby Atmos 7.1'],
      amenities: ['In-Seat Butler Dining', 'Valet Parking', 'Motorized VIP Recliners', 'Couple Pods', 'Wheelchair Friendly'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Palladium+Mall+Ahmedabad',
      screens: 6,
      rating: 4.9
    },
    {
      id: 'cnm-amd-02',
      cityId: 'ahmedabad',
      name: 'Cinemora Director\'s Cut & Atmos',
      locality: 'One42, Ashok Vatika, Bodakdev',
      interiorSvg: 'assets/img/cinema-04.jpg',
      formats: ['Director\'s Cut', '4K RGB Laser', 'Dolby Atmos'],
      amenities: ['Artisanal Cafe Lounge', 'Valet Parking', 'Executive Sofas', 'Gourmet Popcorn Bar'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bodakdev+Ahmedabad',
      screens: 5,
      rating: 4.8
    },
    {
      id: 'cnm-amd-03',
      cityId: 'ahmedabad',
      name: 'Cinemora Onyx 4K LED Multiplex',
      locality: 'Nexus Ahmedabad One Mall, Vastrapur',
      interiorSvg: 'assets/img/cinema-03.jpg',
      formats: ['Onyx 4K HDR', 'Standard', 'Premium Seats'],
      amenities: ['Game Arcade', 'Food Court Link', 'Self-Checkin Kiosk', 'Wheelchair Ramp'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ahmedabad+One+Mall',
      screens: 7,
      rating: 4.7
    },
    {
      id: 'cnm-amd-04',
      cityId: 'ahmedabad',
      name: 'Cinemora Heritage Drive-In Open Theatre',
      locality: 'Drive-In Road, Memnagar',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['Giant Open Air Laser', 'VIP Car Pods'],
      amenities: ['Open Air Sky Lawn', 'Car Audio FM Sync', 'Food Trucks', 'Pet Friendly'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Drive+In+Cinema+Ahmedabad',
      screens: 2,
      rating: 4.6
    },

    // Mumbai
    {
      id: 'cnm-mum-01',
      cityId: 'mumbai',
      name: 'Cinemora Royale Insignia',
      locality: 'Jio World Drive, BKC',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Director\'s Cut', 'Luxury Recliner', 'Dolby Atmos'],
      amenities: ['Celebrity Chef Menu', 'Valet Parking', 'Private Screen Rental', 'Sommelier Bar'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jio+World+Drive+BKC+Mumbai',
      screens: 8,
      rating: 4.9
    },
    {
      id: 'cnm-mum-02',
      cityId: 'mumbai',
      name: 'Cinemora Grand IMAX Laser',
      locality: 'Phoenix Palladium, Lower Parel',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['IMAX Laser 3D', '4K RGB Laser', 'Luxury Recliner'],
      amenities: ['Massive 80ft Curved Screen', 'VIP Lounge', 'Gourmet Gelato Bar', 'Wheelchair Lift'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=High+Street+Phoenix+Mumbai',
      screens: 10,
      rating: 4.9
    },
    {
      id: 'cnm-mum-03',
      cityId: 'mumbai',
      name: 'Cinemora Onyx Cine-Lounge',
      locality: 'Infiniti Mall, Malad West',
      interiorSvg: 'assets/img/cinema-03.jpg',
      formats: ['Onyx 4K HDR', 'Premium Seats', 'Double Sofa Lounge'],
      amenities: ['Arcade Zone', 'Underground Parking', 'Couple Recliners', 'Express Concessions'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Infiniti+Mall+Malad+Mumbai',
      screens: 6,
      rating: 4.7
    },

    // Delhi NCR
    {
      id: 'cnm-del-01',
      cityId: 'delhi',
      name: 'Cinemora Royale Emperor Pavilion',
      locality: 'Select CITYWALK, Saket, South Delhi',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Luxury Recliner', 'Director\'s Cut', 'Dolby Atmos'],
      amenities: ['Royal Diwan Seating', 'Valet Parking', 'Heated Recliners', 'Fine Dining Concessions'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Select+Citywalk+Saket+Delhi',
      screens: 7,
      rating: 4.9
    },
    {
      id: 'cnm-del-02',
      cityId: 'delhi',
      name: 'Cinemora IMAX Iconic Screen',
      locality: 'DLF Promenade, Vasant Kunj',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['IMAX 3D', 'Dolby Atmos', 'Double Sofa'],
      amenities: ['Stadium Seating', 'VIP Lounge', 'Wheelchair Elevator', 'Artisanal Coffee'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=DLF+Promenade+Delhi',
      screens: 8,
      rating: 4.8
    },
    {
      id: 'cnm-del-03',
      cityId: 'delhi',
      name: 'Cinemora Heritage Plaza',
      locality: 'Connaught Place, Central Delhi',
      interiorSvg: 'assets/img/cinema-04.jpg',
      formats: ['4K Laser', 'Standard', 'Premium Seats'],
      amenities: ['Vintage Art Deco Foyer', 'Heritage Memorabilia', 'Valet Service'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Connaught+Place+Delhi',
      screens: 4,
      rating: 4.7
    },

    // Bengaluru
    {
      id: 'cnm-blr-01',
      cityId: 'bengaluru',
      name: 'Cinemora Luxe Director\'s Cut',
      locality: 'Phoenix Mall of Asia, Hebbal',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Director\'s Cut', 'Luxury Recliner', 'Dolby Atmos'],
      amenities: ['Curated Craft Beverages', 'Butler At Your Seat', 'Plush Electric Footrests', 'Couple Loungers'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mall+of+Asia+Bengaluru',
      screens: 9,
      rating: 4.9
    },
    {
      id: 'cnm-blr-02',
      cityId: 'bengaluru',
      name: 'Cinemora Tech IMAX Arena',
      locality: 'Forum South Bangalore, Konanakunte',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['IMAX Laser', 'Dolby Atmos 360', 'Premium Seats'],
      amenities: ['Dual 4K Laser Projection', 'Sub-Bass Seat Shakers', 'Interactive Game Foyer'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Forum+South+Bengaluru',
      screens: 7,
      rating: 4.8
    },
    {
      id: 'cnm-blr-03',
      cityId: 'bengaluru',
      name: 'Cinemora Onyx Neon Screen',
      locality: 'Orion Mall, Brigade Gateway, Rajajinagar',
      interiorSvg: 'assets/img/cinema-03.jpg',
      formats: ['Onyx 4K HDR', 'Standard', 'Double Sofa Lounge'],
      amenities: ['Lake View Promenade', 'Rapid Mobile Concession', 'Wheelchair Lift'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Orion+Mall+Bengaluru',
      screens: 6,
      rating: 4.7
    },

    // Hyderabad
    {
      id: 'cnm-hyd-01',
      cityId: 'hyderabad',
      name: 'Cinemora Nizam Luxe Cinema',
      locality: 'Inorbit Mall, Hitec City',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Luxury Recliner', 'IMAX 3D', 'Dolby Atmos'],
      amenities: ['Biryani Bento Box Concessions', 'Reclining Leather Beds', 'Valet Parking'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Inorbit+Mall+Hitec+City+Hyderabad',
      screens: 8,
      rating: 4.9
    },
    {
      id: 'cnm-hyd-02',
      cityId: 'hyderabad',
      name: 'Cinemora Giant Laser Screen',
      locality: 'Prasad Multiplex Complex, Necklace Road',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['Giant 70mm Laser', 'Dolby Atmos', 'Double Sofa'],
      amenities: ['Lake Promenade', 'Huge Screen Experience', 'Family Lounge', 'Ample Parking'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Prasads+Multiplex+Hyderabad',
      screens: 7,
      rating: 4.8
    },
    {
      id: 'cnm-hyd-03',
      cityId: 'hyderabad',
      name: 'Cinemora Cyber Park Multiplex',
      locality: 'Sarath City Capital Mall, Gachibowli',
      interiorSvg: 'assets/img/cinema-03.jpg',
      formats: ['Onyx 4K LED', 'Premium Seats', 'Standard'],
      amenities: ['VR Cinema Pods', 'Gourmet Popcorn Factory', 'Accessibility Elevators'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sarath+City+Capital+Mall+Hyderabad',
      screens: 9,
      rating: 4.7
    },

    // Chennai
    {
      id: 'cnm-chn-01',
      cityId: 'chennai',
      name: 'Cinemora Marina IMAX & Dolby Atmos',
      locality: 'Express Avenue, Royapettah',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['IMAX 3D', 'Dolby Atmos', 'Luxury Recliner'],
      amenities: ['South Indian Filter Coffee Bar', 'Valet Service', 'Acoustic Soundproofing'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Express+Avenue+Chennai',
      screens: 8,
      rating: 4.8
    },
    {
      id: 'cnm-chn-02',
      cityId: 'chennai',
      name: 'Cinemora Luxe Director\'s Pavilion',
      locality: 'Phoenix Marketcity, Velachery',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Director\'s Cut', 'Luxury Recliner', 'Couple Sofas'],
      amenities: ['Gourmet Chaat & Sushi Counter', 'Motorized VIP Loungers', 'Valet'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Phoenix+Marketcity+Chennai',
      screens: 10,
      rating: 4.9
    },
    {
      id: 'cnm-chn-03',
      cityId: 'chennai',
      name: 'Cinemora Heritage Screen',
      locality: 'Satyam Complex, Anna Salai',
      interiorSvg: 'assets/img/cinema-04.jpg',
      formats: ['4K RGB Laser', 'Standard', 'Premium Seats'],
      amenities: ['Iconic Popcorn Flavours', 'Wheelchair Friendly', 'Rapid Self-Kiosks'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Anna+Salai+Chennai',
      screens: 5,
      rating: 4.7
    },

    // Kolkata
    {
      id: 'cnm-kol-01',
      cityId: 'kolkata',
      name: 'Cinemora Royale Victoria Screen',
      locality: 'South City Mall, Prince Anwar Shah Road',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Luxury Recliner', 'IMAX 3D', 'Dolby Atmos'],
      amenities: ['Colonial Style Tea Lounge', 'Butlers in Suite', 'Valet Parking'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=South+City+Mall+Kolkata',
      screens: 7,
      rating: 4.9
    },
    {
      id: 'cnm-kol-02',
      cityId: 'kolkata',
      name: 'Cinemora Laser Cine-Park',
      locality: 'Mani Square, EM Bypass',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['4K Laser', 'Dolby Atmos', 'Double Sofa'],
      amenities: ['Gourmet Mishti & Snack Bar', 'Wheelchair Assistance', 'Couple Recliners'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mani+Square+Kolkata',
      screens: 6,
      rating: 4.7
    },
    {
      id: 'cnm-kol-03',
      cityId: 'kolkata',
      name: 'Cinemora City Centre Onyx',
      locality: 'City Centre 1, Salt Lake Sector 1',
      interiorSvg: 'assets/img/cinema-03.jpg',
      formats: ['Onyx 4K HDR', 'Standard', 'Premium Seats'],
      amenities: ['Open Courtyard Access', 'Express Ticket Scanners', 'Food Boulevard'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=City+Centre+1+Salt+Lake+Kolkata',
      screens: 5,
      rating: 4.6
    },

    // Pune
    {
      id: 'cnm-pun-01',
      cityId: 'pune',
      name: 'Cinemora Royale Koregaon Lounge',
      locality: 'Koregaon Park Plaza Mall',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Director\'s Cut', 'Luxury Recliner', 'Dolby Atmos'],
      amenities: ['Artisan Brew Bar', 'Electric Recliners', 'Valet Parking'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Koregaon+Park+Pune',
      screens: 6,
      rating: 4.8
    },
    {
      id: 'cnm-pun-02',
      cityId: 'pune',
      name: 'Cinemora IMAX Laser Hub',
      locality: 'Phoenix Marketcity, Viman Nagar',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['IMAX 3D', '4K Laser', 'Double Sofa Lounge'],
      amenities: ['Stadium Seating', 'Couple Pods', 'Gourmet Kitchen'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Phoenix+Marketcity+Pune',
      screens: 9,
      rating: 4.9
    },
    {
      id: 'cnm-pun-03',
      cityId: 'pune',
      name: 'Cinemora Westend Multiplex',
      locality: 'Westend Mall, Aundh',
      interiorSvg: 'assets/img/cinema-03.jpg',
      formats: ['Onyx 4K LED', 'Premium Seats', 'Standard'],
      amenities: ['Family Dining Lounge', 'Wheelchair Elevator', 'Smart Kiosks'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Westend+Mall+Aundh+Pune',
      screens: 5,
      rating: 4.6
    },

    // Other Cities (1+ cinema each)
    {
      id: 'cnm-gan-01',
      cityId: 'gandinagar',
      name: 'Cinemora Capital Cineplex',
      locality: 'Kudasan Infocity Road',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['4K RGB Laser', 'Dolby Atmos', 'Luxury Recliner'],
      amenities: ['Valet Service', 'Reclining Comfort', 'Self Ticketing'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Infocity+Gandhinagar',
      screens: 4,
      rating: 4.7
    },
    {
      id: 'cnm-sur-01',
      cityId: 'surat',
      name: 'Cinemora Diamond Royale',
      locality: 'VR Surat Mall, Dumas Road',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Luxury Recliner', 'IMAX Laser', 'Double Sofa'],
      amenities: ['Diamond Suite Lounges', 'Vegetarian Gourmet Menu', 'Valet Parking'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=VR+Surat+Mall',
      screens: 6,
      rating: 4.9
    },
    {
      id: 'cnm-vad-01',
      cityId: 'vadodara',
      name: 'Cinemora Sayaji Cine-Lounge',
      locality: 'Inorbit Mall, Gorwa Road',
      interiorSvg: 'assets/img/cinema-04.jpg',
      formats: ['4K Laser', 'Dolby Atmos', 'Luxury Recliner'],
      amenities: ['Express F&B Delivery', 'Ergonomic Seats', 'Family Lounge'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Inorbit+Mall+Vadodara',
      screens: 5,
      rating: 4.7
    },
    {
      id: 'cnm-gur-01',
      cityId: 'gurugram',
      name: 'Cinemora CyberHub Elite Lounge',
      locality: 'DLF CyberHub, Phase 2',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Director\'s Cut', 'Luxury Recliner', 'Dolby Atmos'],
      amenities: ['Corporate Lounge', 'Gourmet Tapas Menu', 'Valet'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=DLF+Cyberhub+Gurugram',
      screens: 6,
      rating: 4.8
    },
    {
      id: 'cnm-jai-01',
      cityId: 'jaipur',
      name: 'Cinemora Rajputana Grandeur',
      locality: 'World Trade Park, Malviya Nagar',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Royal Recliner', 'IMAX 3D', 'Dolby Atmos'],
      amenities: ['Havelis-inspired Foyer', 'Peshawari Kebabs', 'Valet Parking'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=World+Trade+Park+Jaipur',
      screens: 6,
      rating: 4.9
    },
    {
      id: 'cnm-luc-01',
      cityId: 'lucknow',
      name: 'Cinemora Awadh Royale Multiplex',
      locality: 'Phoenix Palassio, Gomti Nagar Extension',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Luxury Recliner', 'IMAX Laser', 'Double Sofa'],
      amenities: ['Awadhi Delicacy Lounge', 'Heated Recliners', 'Valet'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Phoenix+Palassio+Lucknow',
      screens: 7,
      rating: 4.8
    },
    {
      id: 'cnm-ind-01',
      cityId: 'indore',
      name: 'Cinemora Malwa IMAX & Laser',
      locality: 'Phoenix Citadel Mall, MR 10 Road',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['IMAX 3D', '4K Laser', 'Luxury Recliner'],
      amenities: ['Sarafa Flavours Counter', 'VIP Lounge', 'Wheelchair Ramp'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Phoenix+Citadel+Indore',
      screens: 6,
      rating: 4.8
    },
    {
      id: 'cnm-bho-01',
      cityId: 'bhopal',
      name: 'Cinemora Lakeview Multiplex',
      locality: 'DB City Mall, Arera Hills',
      interiorSvg: 'assets/img/cinema-03.jpg',
      formats: ['Onyx 4K LED', 'Premium Seats', 'Dolby Atmos'],
      amenities: ['Panoramic View Lobby', 'Self-Serve F&B', 'Valet Parking'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=DB+City+Mall+Bhopal',
      screens: 5,
      rating: 4.7
    },
    {
      id: 'cnm-chd-01',
      cityId: 'chandigarh',
      name: 'Cinemora Elante Grand Lounge',
      locality: 'Nexus Elante Mall, Industrial Area Phase 1',
      interiorSvg: 'assets/img/cinema-01.jpg',
      formats: ['Director\'s Cut', 'IMAX Laser', 'Couple Sofas'],
      amenities: ['VIP Recliner Valet', 'Craft Shakes Bar', 'Double Couple Loungers'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Elante+Mall+Chandigarh',
      screens: 8,
      rating: 4.9
    },
    {
      id: 'cnm-koc-01',
      cityId: 'kochi',
      name: 'Cinemora Backwater IMAX Hub',
      locality: 'LuLu Mall, Edappally',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['IMAX 3D', 'Dolby Atmos', 'Luxury Recliner'],
      amenities: ['Kerala Seafood Concessions', 'Subwoofer Recliners', 'Express Escalator'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=LuLu+Mall+Kochi',
      screens: 8,
      rating: 4.8
    },
    {
      id: 'cnm-pat-01',
      cityId: 'patna',
      name: 'Cinemora Pataliputra Multiplex',
      locality: 'Patna Central Mall, Fraser Road',
      interiorSvg: 'assets/img/cinema-04.jpg',
      formats: ['4K Laser', 'Premium Seats', 'Standard'],
      amenities: ['Comfort Recliners', 'Fast Mobile Ordering', 'Security Lockers'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Patna+Central+Mall',
      screens: 4,
      rating: 4.6
    },
    {
      id: 'cnm-bhu-01',
      cityId: 'bhubaneswar',
      name: 'Cinemora Kalinga Cine-Dome',
      locality: 'Esplanade One Mall, Rasulgarh',
      interiorSvg: 'assets/img/cinema-02.jpg',
      formats: ['4K RGB Laser', 'Dolby Atmos', 'Luxury Recliner'],
      amenities: ['Temple Stone Architecture Foyer', 'Sweet Bar', 'Wheelchair Support'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Esplanade+One+Mall+Bhubaneswar',
      screens: 5,
      rating: 4.7
    }
  ];

  // 3. FICTIONAL MOVIES (14 Titles with Rich Data & Real Photography)
  const MOVIES = [
    {
      id: 'mv-01',
      title: 'Ashoka: The Iron Emperor',
      tagline: 'Before the peace, there was iron and blood.',
      synopsis: 'A grand historical war spectacle chronicles the bloody battle of Kalinga, Prince Ashoka’s ruthless conquest of the subcontinent, and his profound internal awakening towards dharma and compassion that transformed the course of Asian history.',
      duration: '2h 55m',
      durationMinutes: 175,
      language: 'Hindi',
      languagesAvailable: ['Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam'],
      releaseYear: 2026,
      certification: 'U/A 13+',
      genres: ['Action', 'Historical Epic', 'Drama'],
      criticRating: 9.4,
      audienceRating: 9.5,
      votesCount: 42800,
      reviewCount: 3820,
      commentCount: 940,
      isTrending: true,
      isPopular: true,
      isFeatured: true,
      trendingRank: 1,
      posterPath: IMAGES.posters['mv-01'],
      backdropSvg: IMAGES.heroes['mv-01'],
      director: 'Kabir Varma',
      musicDirector: 'A.R. Rahman & Sandeep Chowta',
      cast: [
        { name: 'Ranveer Rathod', role: 'Emperor Ashoka' },
        { name: 'Nayanthara Devi', role: 'Princess Kaurwaki' },
        { name: 'Prakash Raj', role: 'Prime Minister Radhagupta' },
        { name: 'Manoj Bajpayee', role: 'Monk Upagupta' }
      ],
      themes: {
        positive: ['Breathtaking War VFX', 'Stirring Climax', 'Spellbinding Background Score', 'Unmatched Stunts'],
        negative: ['Lengthy Second Half', 'Extremely Intense Violence']
      },
      ratingDistribution: { star5: 78, star4: 14, star3: 5, star2: 2, star1: 1 },
      trailerUrl: '#trailer-ashoka',
      formats: ['IMAX 3D', '4K Laser', 'Dolby Atmos']
    },
    {
      id: 'mv-04',
      title: 'Vayuputra: Son of the Wind',
      tagline: 'When gods walk upon earth, storms bow.',
      synopsis: 'A high-octane modern adaptation combining ancient Vedic mythology with futuristic cosmic energy. When an ancient demon awakens in the Himalayas to drain the Earth’s tectonic core, a reclusive warrior discovers his celestial lineage as the son of Vayu.',
      duration: '2h 45m',
      durationMinutes: 165,
      language: 'Telugu',
      languagesAvailable: ['Telugu', 'Hindi', 'Tamil', 'Malayalam', 'Kannada'],
      releaseYear: 2026,
      certification: 'U/A 13+',
      genres: ['Action', 'Mythology', 'Sci-Fi Spectacle'],
      criticRating: 9.6,
      audienceRating: 9.7,
      votesCount: 56900,
      reviewCount: 4900,
      commentCount: 1420,
      isTrending: true,
      isPopular: true,
      isFeatured: true,
      trendingRank: 2,
      posterPath: IMAGES.posters['mv-04'],
      backdropSvg: IMAGES.heroes['mv-04'],
      director: 'S.S. Rajagopal',
      musicDirector: 'M.M. Keeravani',
      cast: [
        { name: 'Ram Charan', role: 'Vayuputra / Veer' },
        { name: 'Samantha Ruth Prabhu', role: 'Dr. Ananya' },
        { name: 'Rana Daggubati', role: 'Demon King Mahabali' },
        { name: 'Kamal Haasan', role: 'Sage Agastya (Voice)' }
      ],
      themes: {
        positive: ['Hollywood Level CGI', 'Electrifying BGM', 'Epic Action Set-Pieces', 'Crowd-Pleasing Goosebumps'],
        negative: ['Slightly Over-The-Top Physics']
      },
      ratingDistribution: { star5: 88, star4: 8, star3: 2, star2: 1, star1: 1 },
      trailerUrl: '#trailer-vayuputra',
      formats: ['IMAX 3D', 'Dolby Atmos', 'Director\'s Cut', '4K Laser']
    },
    {
      id: 'mv-03',
      title: 'Amdavad Junction',
      tagline: 'Life is like a cup of Kadak Masala Chai: sweet, spicy, and best shared.',
      synopsis: 'Three generations of a quirky textile family in the heart of Old Ahmedabad navigate modern startups, kite-flying rivalries during Uttarayan, and unexpected romance while trying to save their heritage pol mansion from developers.',
      duration: '2h 15m',
      durationMinutes: 135,
      language: 'Gujarati',
      languagesAvailable: ['Gujarati', 'Hindi'],
      releaseYear: 2026,
      certification: 'U',
      genres: ['Comedy', 'Family Drama', 'Feel-Good'],
      criticRating: 9.3,
      audienceRating: 9.6,
      votesCount: 38400,
      reviewCount: 3100,
      commentCount: 880,
      isTrending: true,
      isPopular: true,
      isFeatured: true,
      trendingRank: 3,
      posterPath: IMAGES.posters['mv-03'],
      backdropSvg: IMAGES.heroes['mv-03'],
      director: 'Pratik Gandhi & Abhishek Jain',
      musicDirector: 'Sachin-Jigar',
      cast: [
        { name: 'Pratik Gandhi', role: 'Mehul Mehta' },
        { name: 'Supriya Pathak', role: 'Baa (Matriarch)' },
        { name: 'Aarohi Patel', role: 'Rhea' },
        { name: 'Darshan Jariwala', role: 'Chimanlal' }
      ],
      themes: {
        positive: ['Wholesome Family Laughs', 'Soulful Gujarati Music', 'Authentic Amdavadi Humour', 'Emotional Tear-Jerker'],
        negative: ['Predictable Climax']
      },
      ratingDistribution: { star5: 84, star4: 12, star3: 3, star2: 1, star1: 0 },
      trailerUrl: '#trailer-amdavad',
      formats: ['4K Laser', 'Standard', 'Luxury Recliner']
    },
    {
      id: 'mv-02',
      title: 'Gulaal Nights: Mumbai 1994',
      tagline: 'When the monsoon flooded Bombay, the sirens drowned the bullets.',
      synopsis: 'Set across the neon-lit docks and smoke-filled jazz clubs of 1994 Mumbai, an uncompromising crime branch inspector engages in a deadly game of cat and mouse with a ruthless gold-smuggling syndicate and corrupt political power brokers.',
      duration: '2h 28m',
      durationMinutes: 148,
      language: 'Hindi',
      languagesAvailable: ['Hindi', 'Marathi'],
      releaseYear: 2026,
      certification: 'A 18+',
      genres: ['Crime Noir', 'Thriller', 'Mystery'],
      criticRating: 9.1,
      audienceRating: 9.0,
      votesCount: 29500,
      reviewCount: 2150,
      commentCount: 620,
      isTrending: true,
      isPopular: true,
      isFeatured: true,
      trendingRank: 4,
      posterPath: IMAGES.posters['mv-02'],
      backdropSvg: IMAGES.heroes['mv-02'],
      director: 'Vikramaditya Kashyap',
      musicDirector: 'Amit Trivedi',
      cast: [
        { name: 'Jaideep Ahlawat', role: 'ACP Kabir Sawant' },
        { name: 'Kay Kay Menon', role: 'Don Sultan Bhai' },
        { name: 'Radhika Apte', role: 'Investigative Journalist Tanya' },
        { name: 'Gulshan Devaiah', role: 'Sharp-Shooter Chotta' }
      ],
      themes: {
        positive: ['Gripping Atmospheric Cinematography', 'Raw Gritty Dialogue', 'Top Tier Acting'],
        negative: ['Slow Burn First Act', 'Dark Cynical Tone']
      },
      ratingDistribution: { star5: 72, star4: 18, star3: 6, star2: 3, star1: 1 },
      trailerUrl: '#trailer-gulaal',
      formats: ['Dolby Atmos', 'Onyx 4K HDR', 'Standard']
    },
    {
      id: 'mv-11',
      title: 'Chhatrapati: Battle of Sahyadri',
      tagline: 'Not on flat fields, but amidst mountain mists was freedom won.',
      synopsis: 'A grand Maratha historical saga detailing the legendary guerrilla warfare tactics (Ganimi Kava) across the rugged forts of Raigad, Sinhagad and Pratapgad that defended the sovereignty of Swarajya against imperial invasion.',
      duration: '2h 50m',
      durationMinutes: 170,
      language: 'Marathi',
      languagesAvailable: ['Marathi', 'Hindi'],
      releaseYear: 2026,
      certification: 'U/A 13+',
      genres: ['Historical War', 'Epic Drama', 'Action'],
      criticRating: 9.7,
      audienceRating: 9.8,
      votesCount: 52000,
      reviewCount: 4600,
      commentCount: 1300,
      isTrending: true,
      isPopular: true,
      isFeatured: false,
      trendingRank: 5,
      posterPath: IMAGES.posters['mv-11'],
      backdropSvg: IMAGES.posters['mv-11'],
      director: 'Digpal Lanjekar',
      musicDirector: 'Ajay-Atul',
      cast: [
        { name: 'Chinmay Mandlekar', role: 'Chhatrapati Shivaji Maharaj' },
        { name: 'Subodh Bhave', role: 'Kavindra Paramanand' },
        { name: 'Mrinal Kulkarni', role: 'Rajmata Jijau' }
      ],
      themes: {
        positive: ['Deeply Emotional & Inspiring', 'Historic Authenticity', 'Ajay-Atul\'s Monumental Score'],
        negative: ['Requires Understanding of 17th Century Maratha History']
      },
      ratingDistribution: { star5: 91, star4: 6, star3: 2, star2: 1, star1: 0 },
      trailerUrl: '#trailer-chhatrapati',
      formats: ['IMAX 3D', 'Dolby Atmos', 'Director\'s Cut', '4K Laser']
    },
    {
      id: 'mv-07',
      title: 'Gold Coast Chronicles',
      tagline: 'Gold doesn’t glitter in the dark. It burns.',
      synopsis: 'A gripping period underworld saga chronicling the blood-soaked territorial wars over illicit Arabian Sea gold shipments along the Karwar and Mangaluru coast during the volatile economic transitions of the early 1980s.',
      duration: '2h 40m',
      durationMinutes: 160,
      language: 'Kannada',
      languagesAvailable: ['Kannada', 'Hindi', 'Telugu', 'Tamil'],
      releaseYear: 2026,
      certification: 'A 18+',
      genres: ['Period Action', 'Crime Drama', 'Mass Masala'],
      criticRating: 9.3,
      audienceRating: 9.4,
      votesCount: 48100,
      reviewCount: 3950,
      commentCount: 1100,
      isTrending: true,
      isPopular: true,
      isFeatured: false,
      trendingRank: 6,
      posterPath: IMAGES.posters['mv-07'],
      backdropSvg: IMAGES.posters['mv-07'],
      director: 'Prashanth Shetty',
      musicDirector: 'Ravi Basrur',
      cast: [
        { name: 'Yash Vardhan', role: 'Tiger Devraj' },
        { name: 'Srinidhi Shetty', role: 'Chandrika' },
        { name: 'Suniel Shetty', role: 'Coastguard Commander' }
      ],
      themes: {
        positive: ['Thundering BGM', 'Raw Action Choreography', 'Mass Hero Elevation Scenes'],
        negative: ['Heavy Violence', 'Loud Sound Mix']
      },
      ratingDistribution: { star5: 80, star4: 13, star3: 4, star2: 2, star1: 1 },
      trailerUrl: '#trailer-goldcoast',
      formats: ['IMAX 3D', 'Dolby Atmos', 'Director\'s Cut']
    },
    {
      id: 'mv-06',
      title: 'Madras Cyber Matrix',
      tagline: 'They thought they could lock down the city. They forgot who wrote the code.',
      synopsis: 'In a near-future hyper-connected Chennai where water, traffic and electricity are controlled by an autonomous surveillance AI called Netra, a rogue ethical hacker squad must execute a daring digital heist to expose corrupt multinational water oligarchs.',
      duration: '2h 32m',
      durationMinutes: 152,
      language: 'Tamil',
      languagesAvailable: ['Tamil', 'Telugu', 'Hindi'],
      releaseYear: 2026,
      certification: 'U/A 13+',
      genres: ['Cyberpunk', 'Action Heist', 'Tech Thriller'],
      criticRating: 8.9,
      audienceRating: 9.1,
      votesCount: 31200,
      reviewCount: 2410,
      commentCount: 710,
      isTrending: true,
      isPopular: true,
      isFeatured: false,
      trendingRank: 7,
      posterPath: IMAGES.posters['mv-06'],
      backdropSvg: IMAGES.posters['mv-06'],
      director: 'Lokesh Manikandan',
      musicDirector: 'Anirudh Ravichander',
      cast: [
        { name: 'Suriya Sivakumar', role: 'Cipher / Shiva' },
        { name: 'Vijay Sethupathi', role: 'Commissioner Victor' },
        { name: 'Sai Pallavi', role: 'Dr. Meenakshi' }
      ],
      themes: {
        positive: ['Adrenaline Pumping Beats', 'Stylish Visuals', 'Smart Tech Concepts'],
        negative: ['Frenzied Fast Pacing']
      },
      ratingDistribution: { star5: 70, star4: 19, star3: 7, star2: 3, star1: 1 },
      trailerUrl: '#trailer-madras',
      formats: ['IMAX 3D', '4K Laser', 'Dolby Atmos']
    },
    {
      id: 'mv-10',
      title: 'Punjab Da Sher: The Golden Heart',
      tagline: 'When courage enters the ring, fear steps out.',
      synopsis: 'An inspiring musical sports romance following an underdog rural wrestler from Ludhiana who takes up traditional Dangal to restore his late grandfather’s revered Akhada while discovering the healing power of love and selfless community service.',
      duration: '2h 30m',
      durationMinutes: 150,
      language: 'Punjabi',
      languagesAvailable: ['Punjabi', 'Hindi'],
      releaseYear: 2026,
      certification: 'U',
      genres: ['Sports Drama', 'Musical', 'Romance'],
      criticRating: 9.4,
      audienceRating: 9.6,
      votesCount: 34500,
      reviewCount: 2900,
      commentCount: 780,
      isTrending: true,
      isPopular: true,
      isFeatured: false,
      trendingRank: 8,
      posterPath: IMAGES.posters['mv-10'],
      backdropSvg: IMAGES.posters['mv-10'],
      director: 'Amar Hundal',
      musicDirector: 'B Praak & Jaani',
      cast: [
        { name: 'Diljit Dosanjh', role: 'Fateh Singh Shergill' },
        { name: 'Sonam Bajwa', role: 'Jasleen Kaur' },
        { name: 'Guggu Gill', role: 'Ustad Gurmukh Singh' }
      ],
      themes: {
        positive: ['Electrifying Punjabi Bhangra Beats', 'Heartwarming Patriotism', 'Infectious High Energy'],
        negative: ['Emotional Melodrama in Pre-Climax']
      },
      ratingDistribution: { star5: 86, star4: 10, star3: 3, star2: 1, star1: 0 },
      trailerUrl: '#trailer-punjabsher',
      formats: ['Dolby Atmos', 'Premium Seats', 'Standard']
    },
    {
      id: 'mv-08',
      title: 'Malabar Monsoon Mirage',
      tagline: 'When the rain falls, every reflection hides a secret.',
      synopsis: 'During a torrential three-week continuous deluge in the remote hill valleys of Wayanad, a retired botanist and a young local police sub-inspector uncover decades-old unsolved disappearance cases tied to an ancient heirloom pepper plantation.',
      duration: '2h 12m',
      durationMinutes: 132,
      language: 'Malayalam',
      languagesAvailable: ['Malayalam', 'Tamil', 'Hindi (Subtitles)'],
      releaseYear: 2026,
      certification: 'U/A 13+',
      genres: ['Mystery', 'Psychological Drama', 'Suspense'],
      criticRating: 9.5,
      audienceRating: 9.3,
      votesCount: 19800,
      reviewCount: 1820,
      commentCount: 420,
      isTrending: true,
      isPopular: true,
      isFeatured: false,
      trendingRank: 9,
      posterPath: IMAGES.posters['mv-08'],
      backdropSvg: IMAGES.posters['mv-08'],
      director: 'Dileesh Pothan',
      musicDirector: 'Sushin Shyam',
      cast: [
        { name: 'Fahadh Faasil', role: 'Sub-Inspector Madhav' },
        { name: 'Parvathy Thiruvothu', role: 'Botanist Tara' },
        { name: 'Mammootty', role: 'Kunjiraman Pillai (Special Appearance)' }
      ],
      themes: {
        positive: ['Masterclass in Tension', 'Lush Kerala Cinematography', 'Poetic Writing'],
        negative: ['Quiet Deliberate Pacing']
      },
      ratingDistribution: { star5: 82, star4: 12, star3: 4, star2: 1, star1: 1 },
      trailerUrl: '#trailer-malabar',
      formats: ['4K RGB Laser', 'Dolby Atmos', 'Standard']
    },
    {
      id: 'mv-05',
      title: 'Kaalchakra: The Quantum Paradox',
      tagline: 'Time is not a straight line. It is a labyrinth.',
      synopsis: 'When an Indian deep-space radio observatory at Ladakh detects anomalous signals that predict airplane crashes hours before they occur, two theoretical physicists unlock a temporal wormhole that forces them to relive the same day while preventing a global catastrophe.',
      duration: '2h 20m',
      durationMinutes: 140,
      language: 'Hindi',
      languagesAvailable: ['Hindi', 'English'],
      releaseYear: 2026,
      certification: 'U/A 13+',
      genres: ['Sci-Fi', 'Mystery Thriller', 'Drama'],
      criticRating: 9.2,
      audienceRating: 8.9,
      votesCount: 22400,
      reviewCount: 1940,
      commentCount: 480,
      isTrending: true,
      isPopular: true,
      isFeatured: false,
      trendingRank: 10,
      posterPath: IMAGES.posters['mv-05'],
      backdropSvg: IMAGES.posters['mv-05'],
      director: 'Anurag Sen',
      musicDirector: 'Sneha Khanwalkar & Ludwig Göransson',
      cast: [
        { name: 'Rajkummar Rao', role: 'Dr. Siddharth Sen' },
        { name: 'Triptii Dimri', role: 'Dr. Maya Roy' },
        { name: 'Adil Hussain', role: 'Director General Nambiar' }
      ],
      themes: {
        positive: ['Intelligent Complex Screenplay', 'Mind-Bending Twists', 'Superb Sound Design'],
        negative: ['Demands Full Attention', 'Technical Jargon']
      },
      ratingDistribution: { star5: 68, star4: 21, star3: 7, star2: 3, star1: 1 },
      trailerUrl: '#trailer-kaalchakra',
      formats: ['IMAX Laser', 'Dolby Atmos', 'Onyx 4K HDR']
    },
    {
      id: 'mv-09',
      title: 'The Darjeeling Whistle',
      tagline: 'A snowbound train. Seven passengers. One bullet.',
      synopsis: 'When the heritage Darjeeling Himalayan Toy Train gets trapped midway on Batasia Loop during an unseasonal blizzard, an eccentric tea-tasting detective must solve the baffling murder of a wealthy royal collector before the train reaches Ghum station.',
      duration: '2h 05m',
      durationMinutes: 125,
      language: 'Bengali',
      languagesAvailable: ['Bengali', 'English', 'Hindi'],
      releaseYear: 2026,
      certification: 'U',
      genres: ['Murder Mystery', 'Classic Whodunit', 'Adventure'],
      criticRating: 9.0,
      audienceRating: 9.1,
      votesCount: 16700,
      reviewCount: 1240,
      commentCount: 310,
      isTrending: false,
      isPopular: false,
      isFeatured: false,
      posterPath: IMAGES.posters['mv-09'],
      backdropSvg: IMAGES.posters['mv-09'],
      director: 'Srijit Mukherji',
      musicDirector: 'Indradeep Dasgupta',
      cast: [
        { name: 'Abir Chatterjee', role: 'Detective Byomkesh Sen' },
        { name: 'Parambrata Chatterjee', role: 'Dr. Debabrata' },
        { name: 'Raima Sen', role: 'Lady Aloka' }
      ],
      themes: {
        positive: ['Charming Agatha Christie Charm', 'Spectacular Kanchenjunga Vistas', 'Clever Clues'],
        negative: ['Dialogue Heavy']
      },
      ratingDistribution: { star5: 69, star4: 21, star3: 7, star2: 2, star1: 1 },
      trailerUrl: '#trailer-darjeeling',
      formats: ['Standard', 'Luxury Recliner', '4K Laser']
    },
    {
      id: 'mv-12',
      title: 'Neon Horizon 2099',
      tagline: 'Beyond humanity’s last frontier lies the light we forgot.',
      synopsis: 'In the twilight of the 21st century, humanity builds an orbital space elevator above New Mumbai. When an unknown artificial intelligence begins broadcasting ancient Vedic chants from deep within Saturn’s rings, an international crew of astronauts embarks on an irreversible expedition.',
      duration: '2h 18m',
      durationMinutes: 138,
      language: 'English',
      languagesAvailable: ['English', 'Hindi', 'Tamil'],
      releaseYear: 2026,
      certification: 'U/A 13+',
      genres: ['Sci-Fi', 'Space Adventure', 'Visual Extravaganza'],
      criticRating: 9.0,
      audienceRating: 8.8,
      votesCount: 26000,
      reviewCount: 1870,
      commentCount: 510,
      isTrending: false,
      isPopular: true,
      isFeatured: false,
      posterPath: IMAGES.posters['mv-12'],
      backdropSvg: IMAGES.posters['mv-12'],
      director: 'Christopher Nolan & Neill Blomkamp',
      musicDirector: 'Hans Zimmer',
      cast: [
        { name: 'John David Washington', role: 'Commander Ethan Cole' },
        { name: 'Sobhita Dhulipala', role: 'Astrobiologist Dr. Tara Kapoor' },
        { name: 'Dev Patel', role: 'Quantum Engineer Aakash' }
      ],
      themes: {
        positive: ['Sublime Visual Spectacle', 'Deep Philosophical Weight', 'Astounding IMAX Camerawork'],
        negative: ['Cold Emotional Core']
      },
      ratingDistribution: { star5: 70, star4: 18, star3: 8, star2: 3, star1: 1 },
      trailerUrl: '#trailer-neonhorizon',
      formats: ['IMAX 3D', 'Dolby Atmos', 'Onyx 4K HDR']
    },
    {
      id: 'mv-13',
      title: 'Symphony of the Ghats',
      tagline: 'Seven musical notes. Five centuries of devotion. One immortal raga.',
      synopsis: 'An exquisite classical musical drama exploring the intense Guru-Shishya parampara along the moonlit riverbanks of Varanasi, where a rebellious young sitar maestro discovers that the truest music is born from surrender and humility.',
      duration: '1h 58m',
      durationMinutes: 118,
      language: 'Hindi',
      languagesAvailable: ['Hindi'],
      releaseYear: 2026,
      certification: 'U',
      genres: ['Musical', 'Drama', 'Cultural Art'],
      criticRating: 9.5,
      audienceRating: 9.2,
      votesCount: 14200,
      reviewCount: 1150,
      commentCount: 280,
      isTrending: false,
      isPopular: false,
      isFeatured: false,
      posterPath: IMAGES.posters['mv-13'],
      backdropSvg: IMAGES.posters['mv-13'],
      director: 'Sanjay Leela Bhansali',
      musicDirector: 'Pandit Hariprasad Chaurasia & S.L. Bhansali',
      cast: [
        { name: 'Ishaan Khatter', role: 'Aarav (Sitar Prodigy)' },
        { name: 'Naseeruddin Shah', role: 'Ustad Bade Ghulam Ali' },
        { name: 'Aditi Rao Hydari', role: 'Rukmini' }
      ],
      themes: {
        positive: ['Soul-Stirring Ragas', 'Poetic Framing and Lighting', 'Sublime Performances'],
        negative: ['Niche Classical Appeal']
      },
      ratingDistribution: { star5: 81, star4: 13, star3: 4, star2: 1, star1: 1 },
      trailerUrl: '#trailer-symphony',
      formats: ['Dolby Atmos', 'Standard', 'Luxury Recliner']
    },
    {
      id: 'mv-14',
      title: 'Shadows of Qutub',
      tagline: 'When the nocturnal mist rises, the dead remember.',
      synopsis: 'During an archaeological excavation near the 800-year-old Qutub Minar complex in Mehrauli, a team unearths a sealed subterranean tomb bearing inscriptions that warn of a vengeful djinn trapped during the reign of the Delhi Sultanate.',
      duration: '2h 10m',
      durationMinutes: 130,
      language: 'Hindi',
      languagesAvailable: ['Hindi', 'Urdu'],
      releaseYear: 2026,
      certification: 'U/A 16+',
      genres: ['Horror', 'Supernatural Mystery', 'Thriller'],
      criticRating: 8.8,
      audienceRating: 8.9,
      votesCount: 18900,
      reviewCount: 1540,
      commentCount: 430,
      isTrending: false,
      isPopular: false,
      isFeatured: false,
      posterPath: IMAGES.posters['mv-14'],
      backdropSvg: IMAGES.posters['mv-14'],
      director: 'Amar Kaushik',
      musicDirector: 'Ketan Sodha',
      cast: [
        { name: 'Vicky Kaushal', role: 'Archaeologist Samar' },
        { name: 'Fatima Sana Shaikh', role: 'Epigraphist Zoya' },
        { name: 'Kay Kay Menon', role: 'Professor Shafi' }
      ],
      themes: {
        positive: ['Genuine Spine-Chilling Jumpscares', 'Rich Historical Atmosphere', 'Terrific Climax'],
        negative: ['A Few Predictable Tropes']
      },
      ratingDistribution: { star5: 67, star4: 21, star3: 8, star2: 3, star1: 1 },
      trailerUrl: '#trailer-qutub',
      formats: ['Dolby Atmos', 'Onyx 4K HDR', 'Standard']
    }
  ];

  // 4. SEAT CATEGORIES & CONFIGURATION (THE STAR FEATURE)
  const SEAT_CATEGORIES = {
    std: {
      id: 'std',
      name: 'Standard Seat',
      displayName: 'Silver Class',
      price: 220,
      iconPath: 'assets/seat-standard.svg',
      photoPath: 'assets/seat-standard.svg',
      capacity: 1,
      accentColor: '#2E9E6A',
      description: 'Ergonomic cinema chair with generous legroom and crisp unobstructed sightlines.'
    },
    prem: {
      id: 'prem',
      name: 'Premium Seat',
      displayName: 'Prime Blue Lounge',
      price: 380,
      iconPath: 'assets/seat-premium.svg',
      photoPath: 'assets/seat-premium.svg',
      capacity: 1,
      accentColor: '#3B6FD8',
      description: 'Wider leatherette seats positioned in the acoustic sweet-spot with personal cupholder.'
    },
    rec: {
      id: 'rec',
      name: 'Luxury Recliner',
      displayName: 'VIP Royale Recliner',
      price: 650,
      iconPath: 'assets/seat-recliner.svg',
      photoPath: 'assets/img/recliner.jpg',
      capacity: 1,
      accentColor: '#7B4FD1',
      badge: 'EXTRA LEGROOM',
      description: '180° Motorized plush leather recliner with extended footrest, side swivel tray & USB charging.'
    },
    sofa: {
      id: 'sofa',
      name: 'Double Couple Sofa',
      displayName: 'Royal Couple Lounge (2 Guests)',
      price: 1200,
      iconPath: 'assets/seat-sofa.svg',
      photoPath: 'assets/img/sofa-seats.jpg',
      capacity: 2,
      accentColor: '#D7263D',
      badge: '2 PERSONS',
      description: 'Luxurious double love-seat sofa with shared gourmet console, dual cushions and VIP privacy.'
    }
  };

  // 5. AUDITORIUM SEAT MAP LAYOUT MATRIX
  const AUDITORIUM_LAYOUT = [
    {
      rowLabel: 'A',
      category: 'std',
      price: 220,
      seats: [
        { no: 1, type: 'std' }, { no: 2, type: 'std' }, { no: 3, type: 'std' },
        { isAisle: true },
        { no: 4, type: 'std' }, { no: 5, type: 'std' }, { no: 6, type: 'std' }, { no: 7, type: 'std' }, { no: 8, type: 'std' }, { no: 9, type: 'std' },
        { isAisle: true },
        { no: 10, type: 'std' }, { no: 11, type: 'std' }, { no: 12, type: 'std' }
      ]
    },
    {
      rowLabel: 'B',
      category: 'std',
      price: 220,
      seats: [
        { no: 1, type: 'std' }, { no: 2, type: 'std' }, { no: 3, type: 'std' },
        { isAisle: true },
        { no: 4, type: 'std' }, { no: 5, type: 'std' }, { no: 6, type: 'std' }, { no: 7, type: 'std' }, { no: 8, type: 'std' }, { no: 9, type: 'std' },
        { isAisle: true },
        { no: 10, type: 'std' }, { no: 11, type: 'std' }, { no: 12, type: 'std' }
      ]
    },
    {
      rowLabel: 'C',
      category: 'std',
      price: 220,
      seats: [
        { no: 1, type: 'std' }, { no: 2, type: 'std' }, { no: 3, type: 'std' },
        { isAisle: true },
        { no: 4, type: 'std' }, { no: 5, type: 'std' }, { no: 6, type: 'std' }, { no: 7, type: 'std' }, { no: 8, type: 'std' }, { no: 9, type: 'std' },
        { isAisle: true },
        { no: 10, type: 'std' }, { no: 11, type: 'std' }, { no: 12, type: 'std' }
      ]
    },
    {
      rowLabel: 'D',
      category: 'prem',
      price: 380,
      seats: [
        { no: 1, type: 'prem' }, { no: 2, type: 'prem' }, { no: 3, type: 'prem' },
        { isAisle: true },
        { no: 4, type: 'prem' }, { no: 5, type: 'prem' }, { no: 6, type: 'prem' }, { no: 7, type: 'prem' }, { no: 8, type: 'prem' }, { no: 9, type: 'prem' },
        { isAisle: true },
        { no: 10, type: 'prem' }, { no: 11, type: 'prem' }, { no: 12, type: 'prem' }
      ]
    },
    {
      rowLabel: 'E',
      category: 'prem',
      price: 380,
      seats: [
        { no: 1, type: 'prem' }, { no: 2, type: 'prem' }, { no: 3, type: 'prem' },
        { isAisle: true },
        { no: 4, type: 'prem' }, { no: 5, type: 'prem' }, { no: 6, type: 'prem' }, { no: 7, type: 'prem' }, { no: 8, type: 'prem' }, { no: 9, type: 'prem' },
        { isAisle: true },
        { no: 10, type: 'prem' }, { no: 11, type: 'prem' }, { no: 12, type: 'prem' }
      ]
    },
    {
      rowLabel: 'F',
      category: 'prem',
      price: 380,
      seats: [
        { no: 1, type: 'prem' }, { no: 2, type: 'prem' }, { no: 3, type: 'prem' },
        { isAisle: true },
        { no: 4, type: 'prem' }, { no: 5, type: 'prem' }, { no: 6, type: 'prem' }, { no: 7, type: 'prem' }, { no: 8, type: 'prem' }, { no: 9, type: 'prem' },
        { isAisle: true },
        { no: 10, type: 'prem' }, { no: 11, type: 'prem' }, { no: 12, type: 'prem' }
      ]
    },
    {
      rowLabel: 'G',
      category: 'rec',
      price: 650,
      seats: [
        { no: 1, type: 'rec' }, { no: 2, type: 'rec' },
        { isAisle: true },
        { no: 3, type: 'rec' }, { no: 4, type: 'rec' }, { no: 5, type: 'rec' }, { no: 6, type: 'rec' }, { no: 7, type: 'rec' }, { no: 8, type: 'rec' },
        { isAisle: true },
        { no: 9, type: 'rec' }, { no: 10, type: 'rec' }
      ]
    },
    {
      rowLabel: 'H',
      category: 'rec',
      price: 650,
      seats: [
        { no: 1, type: 'rec' }, { no: 2, type: 'rec' },
        { isAisle: true },
        { no: 3, type: 'rec' }, { no: 4, type: 'rec' }, { no: 5, type: 'rec' }, { no: 6, type: 'rec' }, { no: 7, type: 'rec' }, { no: 8, type: 'rec' },
        { isAisle: true },
        { no: 9, type: 'rec' }, { no: 10, type: 'rec' }
      ]
    },
    {
      rowLabel: 'J',
      category: 'sofa',
      price: 1200,
      seats: [
        { no: 1, type: 'sofa', label: 'S1 (Couples)' },
        { isAisle: true },
        { no: 2, type: 'sofa', label: 'S2 (Couples)' },
        { no: 3, type: 'sofa', label: 'S3 (Couples)' },
        { no: 4, type: 'sofa', label: 'S4 (Couples)' },
        { isAisle: true },
        { no: 5, type: 'sofa', label: 'S5 (Couples)' }
      ]
    }
  ];

  // 6. FOOD & BEVERAGES MENU
  const FNB_ITEMS = [
    {
      id: 'fnb-01',
      name: 'Artisanal Caramel Crunch Popcorn',
      category: 'Popcorn',
      price: 260,
      iconSvg: 'assets/img/popcorn.jpg',
      desc: 'Glazed with organic golden jaggery & Normandy sea salt caramel in large royal tub.'
    },
    {
      id: 'fnb-02',
      name: 'Loaded Mexican Cheese Nachos',
      category: 'Snacks',
      price: 290,
      iconSvg: 'assets/nachos.svg',
      desc: 'Crispy warm corn tortilla triangles with warm jalapeño cheese dip and spicy salsa.'
    },
    {
      id: 'fnb-03',
      name: 'Chilled Blue Curacao Mocktail',
      category: 'Beverages',
      price: 180,
      iconSvg: 'assets/drinks.svg',
      desc: 'Refreshing sparkling citrus iced cooler served in premium souvenir tumbler.'
    },
    {
      id: 'fnb-04',
      name: 'Royal Duo Box: Popcorn + Soda + Nachos',
      category: 'Combos',
      price: 599,
      iconSvg: 'assets/combo.svg',
      desc: 'Complete couple blockbuster combo with jumbo popcorn, loaded nachos & 2 beverages.'
    }
  ];

  // 7. PROMO CODES & BANK OFFERS
  const OFFERS = [
    {
      code: 'CINEMORA50',
      title: 'Flat ₹50 Off Celebration',
      description: 'Enjoy ₹50 instant flat discount on booking 2 or more tickets across any show.',
      discountType: 'flat',
      discountAmount: 50,
      minTickets: 2,
      badge: 'POPULAR'
    },
    {
      code: 'GOLDLUXE',
      title: '20% Off Luxury Lounges',
      description: 'Get 20% discount on Luxury Recliner and Couple Sofa bookings.',
      discountType: 'percentage',
      discountPercent: 20,
      maxDiscount: 300,
      targetCategory: ['rec', 'sofa'],
      badge: 'VIP ONLY'
    },
    {
      code: 'FIRSTSHOW',
      title: 'Morning Matinee ₹100 Off',
      description: 'Flat ₹100 off on any morning shows starting before 12:00 PM.',
      discountType: 'flat',
      discountAmount: 100,
      badge: 'MATINEE'
    },
    {
      code: 'HDFCLUXE',
      title: 'HDFC Bank Diners / Infinia Offer',
      description: 'Simulated 25% instant discount up to ₹250 on HDFC Bank Premium Credit Cards.',
      discountType: 'percentage',
      discountPercent: 25,
      maxDiscount: 250,
      badge: 'BANK OFFER (DEMO)'
    },
    {
      code: 'ICICITREAT',
      title: 'ICICI Bank Gemstone BOGO',
      description: 'Buy 1 Get 1 Free on ICICI Sapphiro & Emeralde cards (demo up to ₹350 off).',
      discountType: 'bogo',
      maxDiscount: 350,
      badge: 'BOGO (DEMO)'
    },
    {
      code: 'RUPAYPASS',
      title: 'RuPay Select Card Privilege',
      description: 'Flat ₹75 cashback on RuPay Select cards for weekend shows.',
      discountType: 'flat',
      discountAmount: 75,
      badge: 'RUPAY (DEMO)'
    }
  ];

  // 8. MEMBERSHIP TIERS (Cinemora Club)
  const MEMBERSHIP_TIERS = {
    silver: {
      id: 'silver',
      name: 'Silver Club',
      price: 0,
      priceLabel: 'Free Forever',
      color: '#6B645A',
      perks: [
        '50 Welcome reward points on signup',
        'Earn 1 point for every ₹100 spent',
        'Birthday week movie ticket discount (15%)',
        'Email showtime alerts & newsletter'
      ]
    },
    gold: {
      id: 'gold',
      name: 'Gold Privilege',
      price: 499,
      priceLabel: '₹499 / Year (Demo)',
      color: '#C9A227',
      badge: 'MOST POPULAR',
      perks: [
        'Zero convenience fee on all ticket bookings',
        '10% Instant discount on all F&B concessions',
        'Priority advance seat booking (24h before public)',
        'Earn 3x reward points on all transactions',
        'Free seat upgrades subject to availability'
      ]
    },
    royale: {
      id: 'royale',
      name: 'VIP Royale Crown',
      price: 1199,
      priceLabel: '₹1,199 / Year (Demo)',
      color: '#7B4FD1',
      badge: 'ULTIMATE LUXURY',
      perks: [
        'Zero convenience fee FOREVER',
        'Complimentary Jumbo Caramel Popcorn on every visit',
        'Free cancellation up to 2 hours before showtime',
        'Dedicated VIP Butler & priority box office lane',
        'Invites to exclusive premiere screenings'
      ]
    }
  };

  // 9. REVIEWS FEED
  const REVIEWS = [
    {
      id: 'rev-01',
      movieId: 'mv-01',
      author: 'Aarav Singhania',
      city: 'Ahmedabad',
      rating: 5,
      date: '2026-10-24',
      verified: true,
      headline: 'A staggering cinematic masterwork!',
      text: 'Watched Ashoka at Cinemora Royale Lounge. The Kalinga war sequence in IMAX 3D shook the entire auditorium. The reclining seats with in-seat dining made it feel like a personal palace screening!'
    },
    {
      id: 'rev-02',
      movieId: 'mv-03',
      author: 'Bhavik & Kinjal Shah',
      city: 'Ahmedabad',
      rating: 5,
      date: '2026-10-25',
      verified: true,
      headline: 'Laughed till our bellies hurt! Superb Gujarati cinema!',
      text: 'Amdavad Junction is pure gold! The kite festival scenes captured the authentic heart of Old City pols. Took my parents and they had tears of joy by the end.'
    },
    {
      id: 'rev-03',
      movieId: 'mv-04',
      author: 'Rohit Kulkarni',
      city: 'Mumbai',
      rating: 5,
      date: '2026-10-26',
      verified: true,
      headline: 'Next level VFX and celestial goosebumps!',
      text: 'Vayuputra sets a whole new benchmark for Indian mythological sci-fi. Booked the couple sofa at BKC Cinemora—super spacious, plush cushions and unbelievable Dolby Atmos audio.'
    },
    {
      id: 'rev-04',
      movieId: 'mv-02',
      author: 'Sneha Deshmukh',
      city: 'Pune',
      rating: 4,
      date: '2026-10-27',
      verified: true,
      headline: 'Dark, atmospheric 90s nostalgia',
      text: 'Jaideep Ahlawat and Kay Kay Menon are ferocious in Gulaal Nights. The rain-slicked noir aesthetic is gorgeous on the Onyx LED screen.'
    },
    {
      id: 'rev-05',
      movieId: 'mv-11',
      author: 'Omkar Shinde',
      city: 'Pune',
      rating: 5,
      date: '2026-10-28',
      verified: true,
      headline: 'Jai Bhavani! An emotional mountain epic',
      text: 'Chhatrapati brought the entire theater to a standing ovation. The Sahyadri battle tactics and Ajay-Atul’s thunderous background score gave continuous goosebumps.'
    }
  ];

  // 10. FAQS
  const FAQS = [
    {
      question: 'How do I access my booked movie tickets at the cinema?',
      answer: 'Cinemora provides instant digital M-Tickets! After booking, your boarding pass ticket with a scannable QR code is saved to "My Bookings" and can also be downloaded or printed. Simply present the QR code at the cinema foyer for contactless entry.'
    },
    {
      question: 'What is the cancellation and refund policy on Cinemora?',
      answer: 'All simulated tickets can be cancelled from the "My Bookings" page. In this demo, cancellations trigger an instant 100% demo refund back to your simulated payment mode. VIP Royale Club members enjoy free cancellation up to 2 hours before showtime.'
    },
    {
      question: 'How do the Double Couple Sofas work during booking?',
      answer: 'Double Couple Sofas (Row J) are luxurious 2-person units. Selecting one sofa reserves the entire unit for 2 guests under a single inclusive price (₹1,200). You never have to book individual halves.'
    },
    {
      question: 'Can food and drinks be delivered directly to my seat?',
      answer: 'Yes! In our Luxury Recliner and Director’s Cut auditoriums, Cinemora provides in-seat gourmet dining. You can pre-order your snacks during checkout, and our hospitality team will serve them warm during the trailers.'
    },
    {
      question: 'Is this a real movie booking website?',
      answer: 'No, Cinemora is an award-winning academic demo platform. All movies, cinemas, showtimes, bank discounts, and payments are strictly simulated demo experiences stored locally in your browser.'
    }
  ];

  // 11. LUXURY CINEMA EXPERIENCES DATASET
  const LUXURY_EXPERIENCES = [
    {
      id: 'exp-royale',
      title: 'Cinemora Royale Lounge',
      tag: 'DIRECTOR\'S CHOICE',
      badge: 'ULTRA LUXURY',
      desc: '180° motorized Italian leather recliners, in-seat gourmet butler service, private sommelier menu and personal ambient reading lamps.',
      imageSvg: 'assets/img/recliner.jpg',
      features: ['Motorized Footrests', 'Butler Call Button', 'Zero Ambient Noise', 'Complimentary Truffles']
    },
    {
      id: 'exp-imax',
      title: 'Cinemora IMAX with Laser',
      tag: 'NEXT GEN CINEMA',
      badge: '80FT CURVED SCREEN',
      desc: 'Dual 4K RGB laser projection with next-gen 12-channel spatial audio, delivering 40% more brightness and infinite dynamic contrast.',
      imageSvg: 'assets/img/cinema-02.jpg',
      features: ['Sub-bass Seat Transducers', 'Geometric Stadium Seating', 'Crystal Clear 3D', 'Immersive Aspect Ratio']
    },
    {
      id: 'exp-onyx',
      title: 'Samsung Onyx 4K LED Screen',
      tag: 'PURE BLACK CONTRAST',
      badge: 'SELF-LIT PIXELS',
      desc: 'The world’s first cinema-grade HDR LED screen delivering true pitch blacks, infinite contrast, and pristine razor-sharp visuals without projectors.',
      imageSvg: 'assets/img/cinema-03.jpg',
      features: ['True Black Emissive Tech', '4K High Dynamic Range', 'No Projector Haze', 'JBL Sculpted Audio']
    },
    {
      id: 'exp-directors',
      title: 'Director’s Cut & Couple Suites',
      tag: 'PRIVATE SCREENINGS',
      badge: 'INTIMATE 40 SEATER',
      desc: 'An intimate 40-seat boutique lounge with double couple plush sofas, curated artisanal menus, and private lounge foyer.',
      imageSvg: 'assets/img/sofa-seats.jpg',
      features: ['Double Couple Sofas', 'Dedicated Check-In Foyer', 'Curated Chef Specialities', 'Dolby Atmos 360']
    }
  ];

  // Public API of Datasets
  return {
    images: IMAGES,
    cities: CITIES,
    cinemas: CINEMAS,
    movies: MOVIES,
    seatCategories: SEAT_CATEGORIES,
    auditoriumLayout: AUDITORIUM_LAYOUT,
    fnbItems: FNB_ITEMS,
    offers: OFFERS,
    membershipTiers: MEMBERSHIP_TIERS,
    reviews: REVIEWS,
    faqs: FAQS,
    luxuryExperiences: LUXURY_EXPERIENCES
  };

})();
