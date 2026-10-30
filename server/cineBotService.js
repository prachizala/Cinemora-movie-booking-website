/**
 * CineBot AI Assistant Engine
 * Answers customer queries regarding currently running movies, show timings, seat recommendations, and offers.
 * Uses intelligent intent extraction and live database awareness.
 */

export function processChatQuery(userMessage, db) {
  const query = (userMessage || '').toLowerCase().trim();
  const movies = db.movies || [];
  const cinemas = db.cinemas || [];

  // 1. GREETINGS
  if (query.match(/^(hi|hello|hey|namaste|kem cho|good morning|good evening)/i)) {
    return {
      reply: `Hello! I'm **CineBot**, your luxury cinema concierge at CINEMORA. 🎬✨\n\nI can help you with:\n- 🍿 **Trending & Now Showing Movies**\n- ⏰ **Showtimes & Theatre Locations**\n- 💺 **Seat Recommendations (Recliner, Couple Sofa, VIP)**\n- 💳 **Discounts & Bank Offers**\n\nWhat are you planning to watch today?`,
      suggestions: ['What is trending today?', 'Show times in Ahmedabad', 'Best couple seats', 'Current bank offers']
    };
  }

  // 2. TRENDING / WHAT TO WATCH
  if (query.includes('trending') || query.includes('popular') || query.includes('recommend') || query.includes('what to watch') || query.includes('top movie')) {
    const topMovies = movies.slice(0, 4);
    const list = topMovies.map((m, idx) => `**#${idx + 1} ${m.title}** (${m.language}) - ⭐ ${m.criticRating}/10 (${m.genres.join(', ')})`).join('\n');
    return {
      reply: `Here are the top trending movies right now on CINEMORA:\n\n${list}\n\nWould you like me to book tickets for any of these?`,
      suggestions: topMovies.map(m => `Book ${m.title}`)
    };
  }

  // 3. SEAT RECOMMENDATIONS (RECLINER / SOFA)
  if (query.includes('seat') || query.includes('recliner') || query.includes('sofa') || query.includes('couple') || query.includes('vip')) {
    return {
      reply: `CINEMORA offers **4 exclusive seating tiers**:\n\n1. 💺 **Double Couple Sofa (Row J)**: Ultra-spacious 2-person wide lounge sofa with shared armrest (₹1,200 total for 2).\n2. 👑 **Luxury Motorized Recliner (Rows G-H)**: 180° recline with plush footrest and gold tray (₹650).\n3. 💎 **Prime Blue Lounger (Rows D-F)**: Extra legroom with prime audio acoustic alignment (₹380).\n4. 🎟️ **Silver Standard (Rows A-C)**: High-comfort theater seats (₹240).\n\nFor dates or anniversaries, we highly recommend the **Double Couple Sofa**!`,
      suggestions: ['Book Couple Sofa', 'View Showtimes', 'Apply Promo Code']
    };
  }

  // 4. OFFERS / COUPONS
  if (query.includes('offer') || query.includes('discount') || query.includes('coupon') || query.includes('promo') || query.includes('card')) {
    return {
      reply: `Here are the active promo codes and bank offers available today:\n\n- 🎟️ **CINEMORA50**: Flat 50% discount up to ₹250 on all movies.\n- 👑 **GOLDLUXE**: Flat ₹300 OFF on Luxury Recliners and Couple Sofas.\n- 💳 **HDFC / ICICI Bank Offer**: Buy 1 Get 1 Free on weekend tickets.\n- 🌟 **VIP Royale Club**: Automatic 0% convenience fees on all bookings!`,
      suggestions: ['Copy CINEMORA50', 'Upgrade to VIP Royale', 'Book a Show']
    };
  }

  // 5. SPECIFIC MOVIE LOOKUP
  const matchedMovie = movies.find(m => query.includes(m.title.toLowerCase()));
  if (matchedMovie) {
    return {
      reply: `**${matchedMovie.title}** is currently playing in our luxury screens!\n\n- **Language**: ${matchedMovie.language}\n- **Rating**: ⭐ ${matchedMovie.criticRating} / 10\n- **Duration**: ${matchedMovie.duration} (${matchedMovie.certification})\n- **Genres**: ${matchedMovie.genres.join(', ')}\n- **Synopsis**: ${matchedMovie.synopsis.slice(0, 140)}...\n\nClick below to book your seats right away:`,
      action: {
        type: 'NAVIGATE',
        hash: `#/movie/${matchedMovie.id}`,
        label: `Book ${matchedMovie.title}`
      },
      suggestions: [`Showtimes for ${matchedMovie.title}`, 'Trending Movies', 'View Offers']
    };
  }

  // 6. SHOWTIMES / CITY
  if (query.includes('time') || query.includes('show') || query.includes('ahmedabad') || query.includes('mumbai') || query.includes('delhi')) {
    return {
      reply: `Prime luxury shows are available throughout the day across all major cities:\n- **Morning**: 10:30 AM (Silver & Prime)\n- **Afternoon**: 01:45 PM & 04:30 PM (IMAX Laser & Recliner)\n- **Prime Evening**: 07:15 PM & 08:45 PM (Director's Cut & Couple Sofa)\n- **Night**: 10:30 PM (Dolby Atmos 360)\n\nYou can select any movie card on the home page to pick your preferred showtime and reserve seats live.`,
      suggestions: ['View Now Showing', 'Choose City', 'Check Offers']
    };
  }

  // DEFAULT FALLBACK
  return {
    reply: `I understand! To help you best, you can ask me about:\n- Today's trending releases in India\n- Recommended luxury seats (Recliner vs Couple Sofa)\n- Active coupons & bank discount codes\n- Show timings in your city`,
    suggestions: ['What is trending?', 'Best seats for couples', 'Show available discounts']
  };
}
