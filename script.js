/**
 * CINEMORA - Core Application Engine & Client Router
 * Tagline: "Your Seat. Your Show. Your Experience."
 * Light, warm premium design with real photography, theme switcher & trending carousel.
 */

(function() {
  'use strict';

  // 1. STATE & STORAGE MANAGEMENT
  const STORAGE_KEYS = {
    THEME: 'cinemora_theme',
    CITY: 'cinemora_city',
    USER: 'cinemora_user',
    FAVOURITES: 'cinemora_favourites',
    BOOKINGS: 'cinemora_bookings',
    REVIEWS: 'cinemora_reviews',
    OCCUPIED: 'cinemora_occupied_seats'
  };

  const DEFAULT_USER = {
    name: 'Aryan Sharma',
    email: 'aryan.sharma@example.com',
    phone: '+91 98765 43210',
    tier: 'gold', // 'silver', 'gold', 'royale'
    points: 420,
    isLoggedIn: true
  };

  const API_BASE_URL = 'http://localhost:5000/api';

  const AppState = {
    theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'light',
    currentCity: localStorage.getItem(STORAGE_KEYS.CITY) || 'ahmedabad',
    user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || DEFAULT_USER,
    favourites: JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVOURITES)) || ['mv-01', 'mv-04'],
    bookings: JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || [],
    userReviews: JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || [],
    trendingTab: 'today', // 'today', 'week', 'city', 'all'
    selectedLanguage: 'All',
    selectedGenre: 'All',
    searchQuery: '',
    cinebotOpen: false,
    currentBookingDraft: {
      showId: null,
      movie: null,
      cinema: null,
      date: null,
      time: null,
      format: null,
      seats: [],
      fnb: {},
      coupon: null
    },
    heroCarouselIndex: 0,
    heroTimer: null
  };

  function saveState(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }

  // 2. UTILITIES & FORMATTING
  function formatCurrency(amount) {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  }

  function getCityName(cityId) {
    const city = CINEMORA_DATA.cities.find(c => c.id === cityId);
    return city ? city.name : 'Ahmedabad';
  }

  function getMovieById(movieId) {
    return CINEMORA_DATA.movies.find(m => m.id === movieId);
  }

  function getCinemaById(cinemaId) {
    return CINEMORA_DATA.cinemas.find(c => c.id === cinemaId);
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : '✦'}</span>
      <span class="toast-msg">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-in 0.3s ease reverse forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // 3. THEME MANAGEMENT (LIGHT DEFAULT / DARK TOGGLE)
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    AppState.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.textContent = AppState.theme === 'dark' ? '☀️' : '🌙';
      btn.title = `Switch to ${AppState.theme === 'dark' ? 'Light' : 'Dark'} Theme`;
    }
  }

  // 4. SEAT OCCUPANCY SIMULATOR
  function getOccupiedSeatsForShow(showId) {
    let allOccupied = JSON.parse(localStorage.getItem(STORAGE_KEYS.OCCUPIED)) || {};
    if (allOccupied[showId]) {
      return allOccupied[showId];
    }

    const occupied = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
    let hash = 0;
    for (let i = 0; i < showId.length; i++) {
      hash = (hash << 5) - hash + showId.charCodeAt(i);
      hash |= 0;
    }

    rows.forEach(row => {
      const maxSeats = row === 'J' ? 5 : (row === 'G' || row === 'H' ? 10 : 12);
      for (let s = 1; s <= maxSeats; s++) {
        const check = Math.abs((hash * 31 + row.charCodeAt(0) * 17 + s * 13) % 100);
        if (check < 26) {
          occupied.push(`${row}${s}`);
        }
      }
    });

    allOccupied[showId] = occupied;
    saveState(STORAGE_KEYS.OCCUPIED, allOccupied);
    return occupied;
  }

  // 5. HASH ROUTING CONTROLLER
  function handleRoute() {
    const hash = window.location.hash || '#/';
    const appRoot = document.getElementById('appContent');
    if (!appRoot) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const mobileNav = document.getElementById('mobileNavDrawer');
    if (mobileNav) mobileNav.classList.remove('active');

    if (hash === '#/' || hash === '#/movies' || hash === '') {
      renderHomePage(appRoot);
    } else if (hash.startsWith('#/movie/')) {
      const movieId = hash.replace('#/movie/', '');
      renderMovieDetailsPage(appRoot, movieId);
    } else if (hash.startsWith('#/book/')) {
      const showId = hash.replace('#/book/', '');
      renderSeatBookingPage(appRoot, showId);
    } else if (hash === '#/checkout') {
      renderCheckoutPage(appRoot);
    } else if (hash.startsWith('#/ticket/')) {
      const bookingId = hash.replace('#/ticket/', '');
      renderTicketPassPage(appRoot, bookingId);
    } else if (hash === '#/cinemas') {
      renderCinemasPage(appRoot);
    } else if (hash === '#/offers') {
      renderOffersPage(appRoot);
    } else if (hash === '#/membership') {
      renderMembershipPage(appRoot);
    } else if (hash === '#/reviews') {
      renderReviewsPage(appRoot);
    } else if (hash === '#/bookings') {
      renderMyBookingsPage(appRoot);
    } else if (hash === '#/account') {
      renderAccountPage(appRoot);
    } else {
      renderHomePage(appRoot);
    }

    updateNavActiveState(hash);
  }

  function updateNavActiveState(hash) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === hash || (hash === '#/' && href === '#/movies')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // 6. RENDER: HOME PAGE WITH NEW TRENDING CAROUSEL & MOSAIC
  function renderHomePage(container) {
    const cityCinemas = CINEMORA_DATA.cinemas.filter(c => c.cityId === AppState.currentCity);
    const featuredMovies = CINEMORA_DATA.movies.filter(m => m.isFeatured);
    const currentHeroMovie = featuredMovies[AppState.heroCarouselIndex % featuredMovies.length] || CINEMORA_DATA.movies[0];

    // Filter trending movies by active tab
    let trendingList = CINEMORA_DATA.movies.slice(0, 10);
    if (AppState.trendingTab === 'city') {
      // In My City filter: prioritize language of the city
      const cityObj = CINEMORA_DATA.cities.find(c => c.id === AppState.currentCity);
      if (cityObj && (cityObj.state === 'Gujarat')) {
        trendingList = [getMovieById('mv-03')].concat(CINEMORA_DATA.movies.filter(m => m.id !== 'mv-03')).slice(0, 10);
      } else if (cityObj && (cityObj.state === 'Maharashtra')) {
        trendingList = [getMovieById('mv-02'), getMovieById('mv-11')].concat(CINEMORA_DATA.movies.filter(m => m.id !== 'mv-02' && m.id !== 'mv-11')).slice(0, 10);
      }
    } else if (AppState.trendingTab === 'week') {
      trendingList = CINEMORA_DATA.movies.slice().reverse().slice(0, 10);
    }

    // Filter now showing movies by selected language & genre
    const filteredMovies = CINEMORA_DATA.movies.filter(movie => {
      const langMatch = AppState.selectedLanguage === 'All' || movie.language.toLowerCase() === AppState.selectedLanguage.toLowerCase() || movie.languagesAvailable.some(l => l.toLowerCase() === AppState.selectedLanguage.toLowerCase());
      const genreMatch = AppState.selectedGenre === 'All' || movie.genres.includes(AppState.selectedGenre);
      return langMatch && genreMatch;
    });

    const nowShowing = filteredMovies.slice(0, 8);
    const comingSoon = CINEMORA_DATA.movies.filter(m => !m.isTrending).slice(0, 4);

    container.innerHTML = `
      <!-- Hero Showcase Section (Cinematic Contrast Banner) -->
      <section class="hero-showcase" id="heroShowcase">
        <img class="hero-backdrop" src="${currentHeroMovie.backdropSvg}" alt="${currentHeroMovie.title} Backdrop" loading="lazy" width="1400" height="700" onerror="this.src='assets/img/hero-01.jpg'">
        <div class="hero-gradient-overlay"></div>
        
        <div class="container hero-content-grid">
          <div class="hero-text-col">
            <div class="hero-meta-badges">
              <span class="badge-demo">FEATURED THEATRICAL RELEASE</span>
              <span class="badge-tag" style="background:rgba(255,255,255,0.2); color:#FFF; border-color:rgba(255,255,255,0.3);">${currentHeroMovie.certification}</span>
              <span class="badge-tag" style="background:rgba(255,255,255,0.2); color:#FFF; border-color:rgba(255,255,255,0.3);">${currentHeroMovie.duration}</span>
              <span class="badge-tag" style="background:rgba(255,255,255,0.2); color:#FFF; border-color:rgba(255,255,255,0.3);">${currentHeroMovie.language}</span>
              <span class="hero-rating-pill">★ ${currentHeroMovie.criticRating} Critic Choice</span>
            </div>
            
            <h1 class="hero-title">${currentHeroMovie.title}</h1>
            <p class="hero-tagline">"${currentHeroMovie.tagline}"</p>
            <p class="hero-synopsis">${currentHeroMovie.synopsis}</p>
            
            <div class="hero-specs">
              <span>🎭 ${currentHeroMovie.genres.join(' • ')}</span>
              <span>•</span>
              <span>🎬 Dir: ${currentHeroMovie.director}</span>
            </div>

            <div class="hero-actions">
              <a href="#/movie/${currentHeroMovie.id}" class="btn btn-primary btn-lg">
                <span>🎟️ Book Tickets</span>
              </a>
              <a href="#/movie/${currentHeroMovie.id}" class="btn btn-secondary btn-lg" style="background:rgba(255,255,255,0.15); color:#FFF; border-color:rgba(255,255,255,0.3);">
                <span>View Details</span>
              </a>
              <button class="btn btn-outline-gold btn-lg" style="color:#FDE047; border-color:#FDE047;" onclick="CinemoraApp.openTrailerModal('${currentHeroMovie.id}')">
                <span>▶ Watch Trailer</span>
              </button>
            </div>
          </div>

          <div class="hero-poster-col">
            <div class="hero-poster-card">
              <img class="hero-poster-img" src="${currentHeroMovie.posterPath}" alt="${currentHeroMovie.title} Poster" width="340" height="480" onerror="this.src='assets/img/poster-01.jpg'">
            </div>
          </div>
        </div>

        <div class="hero-controls">
          ${featuredMovies.map((_, idx) => `
            <div class="hero-dot ${idx === AppState.heroCarouselIndex ? 'active' : ''}" onclick="CinemoraApp.setHeroSlide(${idx})"></div>
          `).join('')}
        </div>
      </section>

      <!-- REQUIREMENT C: NEW "TRENDING NOW" SECTION (RIGHT BELOW HERO) -->
      <section class="trending-section" id="trendingSection">
        <div class="container">
          <div class="trending-header-wrap">
            <div>
              <div style="display:flex; align-items:center; gap:0.6rem;">
                <span class="badge-trending">🔥 TRENDING NOW</span>
                <span class="badge-demo">Demo Ranking</span>
              </div>
              <h2 class="section-title" style="margin-top:0.4rem;">Top 10 Box Office Sensations</h2>
              <p class="trending-subtitle">Trending in <strong>${getCityName(AppState.currentCity)}</strong> & across major metropolitan hubs</p>
            </div>

            <!-- Tabs: Today, This Week, In My City, All Languages -->
            <div class="trending-tabs-list">
              <button class="trending-tab-btn ${AppState.trendingTab === 'today' ? 'active' : ''}" onclick="CinemoraApp.setTrendingTab('today')">Today</button>
              <button class="trending-tab-btn ${AppState.trendingTab === 'week' ? 'active' : ''}" onclick="CinemoraApp.setTrendingTab('week')">This Week</button>
              <button class="trending-tab-btn ${AppState.trendingTab === 'city' ? 'active' : ''}" onclick="CinemoraApp.setTrendingTab('city')">In ${getCityName(AppState.currentCity)}</button>
              <button class="trending-tab-btn ${AppState.trendingTab === 'all' ? 'active' : ''}" onclick="CinemoraApp.setTrendingTab('all')">All Languages</button>
            </div>
          </div>

          <!-- Horizontal Scroll-Snap Carousel Container with Arrows -->
          <div class="trending-carousel-container">
            <button class="carousel-arrow-btn arrow-prev" onclick="CinemoraApp.scrollTrending(-1)" aria-label="Previous Trending Movies">❮</button>
            
            <div class="trending-scroll-snap" id="trendingScrollContainer">
              ${trendingList.map((movie, index) => `
                <div class="trending-card" onclick="window.location.hash='#/movie/${movie.id}'">
                  <img class="trending-photo" src="${movie.posterPath}" alt="${movie.title}" loading="lazy" width="280" height="420" onerror="this.src='assets/img/poster-01.jpg'">
                  <div class="trending-photo-overlay">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                      <span class="trending-rank-number">#${index + 1}</span>
                      <span class="badge-trending">🔥 TOP ${index + 1}</span>
                    </div>

                    <div class="trending-card-meta">
                      <div class="trending-quick-info">
                        <span class="quick-info-pill">⏱️ ${movie.duration}</span>
                        <span class="quick-info-pill">${movie.certification}</span>
                        <span class="quick-info-pill">★ ${movie.criticRating}</span>
                      </div>
                      
                      <h3 class="trending-card-title">${movie.title}</h3>
                      <p class="trending-card-sub">${movie.language} • ${movie.genres.join(', ')}</p>
                      
                      <a href="#/movie/${movie.id}" class="btn btn-primary btn-sm" style="width:100%; margin-top:0.4rem;" onclick="event.stopPropagation();">
                        Book Tickets
                      </a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <button class="carousel-arrow-btn arrow-next" onclick="CinemoraApp.scrollTrending(1)" aria-label="Next Trending Movies">❯</button>
          </div>
        </div>
      </section>

      <!-- REQUIREMENT C: MOSAIC "PHOTO HIGHLIGHTS" STRIP -->
      <section class="mosaic-strip-section">
        <div class="container">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <h4 style="font-size:1.1rem; font-weight:800; color:var(--text);">📸 Visual Experience Highlights</h4>
            <a href="credits.html" style="font-size:0.8rem; color:var(--gold-dark); font-weight:700;">Photo Credits & Attribution ↗</a>
          </div>

          <div class="mosaic-strip-grid">
            ${CINEMORA_DATA.images.highlights.map(hl => `
              <a href="${hl.link}" class="mosaic-item">
                <img class="mosaic-img" src="${hl.image}" alt="${hl.title}" loading="lazy" width="200" height="140">
                <div class="mosaic-caption">
                  <div class="mosaic-title">${hl.title}</div>
                  <div class="mosaic-desc">${hl.desc}</div>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Filter Bar: Language Chips & Genre Dropdown -->
      <section class="section-filter-bar" style="padding-top:2.5rem;">
        <div class="container filter-container">
          <div class="language-chips-scroll">
            ${['All', 'Hindi', 'Gujarati', 'English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi', 'Punjabi'].map(lang => `
              <button class="lang-chip ${AppState.selectedLanguage === lang ? 'active' : ''}" onclick="CinemoraApp.filterLanguage('${lang}')">
                ${lang}
              </button>
            `).join('')}
          </div>

          <div class="genre-filter-wrap">
            <select class="genre-select-dropdown" onchange="CinemoraApp.filterGenre(this.value)">
              <option value="All" ${AppState.selectedGenre === 'All' ? 'selected' : ''}>All Genres</option>
              <option value="Action" ${AppState.selectedGenre === 'Action' ? 'selected' : ''}>Action</option>
              <option value="Historical Epic" ${AppState.selectedGenre === 'Historical Epic' ? 'selected' : ''}>Historical Epic</option>
              <option value="Crime Noir" ${AppState.selectedGenre === 'Crime Noir' ? 'selected' : ''}>Crime Noir</option>
              <option value="Comedy" ${AppState.selectedGenre === 'Comedy' ? 'selected' : ''}>Comedy</option>
              <option value="Sci-Fi" ${AppState.selectedGenre === 'Sci-Fi' ? 'selected' : ''}>Sci-Fi</option>
              <option value="Mystery" ${AppState.selectedGenre === 'Mystery' ? 'selected' : ''}>Mystery</option>
              <option value="Musical" ${AppState.selectedGenre === 'Musical' ? 'selected' : ''}>Musical</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Now Showing Movies Section (Light Grid) -->
      <section class="content-section">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Now Showing</h2>
              <p class="section-subtitle">Blockbuster cinematic releases currently playing in ${getCityName(AppState.currentCity)}</p>
            </div>
            <a href="#/movies" class="section-view-all">View All (${filteredMovies.length}) →</a>
          </div>

          <div class="movies-grid">
            ${nowShowing.map(movie => renderMovieCardHtml(movie)).join('')}
          </div>
        </div>
      </section>

      <!-- Popular Near You (Dynamically updates with City) -->
      <section class="content-section" style="background: var(--surface-2);">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Popular Near You</h2>
              <p class="section-subtitle">Top-rated cinema theatres currently trending in <strong>${getCityName(AppState.currentCity)}</strong></p>
            </div>
            <button class="btn btn-outline-gold btn-sm" onclick="CinemoraApp.openCityModal()">
              <span>📍 Change City (${getCityName(AppState.currentCity)})</span>
            </button>
          </div>

          <div class="experiences-grid">
            ${cityCinemas.map(cinema => `
              <div class="exp-card">
                <div class="exp-img-wrap">
                  <img class="exp-img" src="${cinema.interiorSvg}" alt="${cinema.name}" loading="lazy" width="400" height="200" onerror="this.src='assets/img/cinema-01.jpg'">
                </div>
                <div class="exp-body">
                  <span class="exp-badge">⭐ ${cinema.rating} / 5.0 • ${cinema.screens} Screens</span>
                  <h3 class="exp-title">${cinema.name}</h3>
                  <p class="exp-desc">📍 ${cinema.locality}</p>
                  <div class="exp-features">
                    ${cinema.formats.map(f => `<span class="exp-feature-pill">${f}</span>`).join('')}
                  </div>
                  <div style="margin-top: 1.5rem; display: flex; gap: 0.8rem;">
                    <a href="#/cinemas" class="btn btn-primary btn-sm" style="flex: 1;">View Showtimes</a>
                    <a href="${cinema.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Sample map location">Directions ↗</a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Luxury Cinema Experiences Section -->
      <section class="content-section">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Luxury Cinema Experiences</h2>
              <p class="section-subtitle">Indulge in unmatched acoustic perfection, gourmet in-seat dining & motorized VIP comfort</p>
            </div>
          </div>

          <div class="experiences-grid">
            ${CINEMORA_DATA.luxuryExperiences.map(exp => `
              <div class="exp-card">
                <div class="exp-img-wrap">
                  <img class="exp-img" src="${exp.imageSvg}" alt="${exp.title}" loading="lazy" width="400" height="200" onerror="this.src='assets/img/recliner.jpg'">
                </div>
                <div class="exp-body">
                  <span class="exp-badge">${exp.badge}</span>
                  <h3 class="exp-title">${exp.title}</h3>
                  <p class="exp-desc">${exp.desc}</p>
                  <div class="exp-features">
                    ${exp.features.map(f => `<span class="exp-feature-pill">✦ ${f}</span>`).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Cinemora Club Membership Banner (Light Surface with Gold Highlight) -->
      <section class="content-section" style="background: var(--surface-2);">
        <div class="container">
          <div class="section-header" style="justify-content: center; text-align: center; border: none;">
            <div>
              <span class="badge-demo">CINEMORA PRIVILEGE CLUB</span>
              <h2 class="section-title" style="justify-content: center; margin-top: 0.5rem;">Elevate Every Screening</h2>
              <p class="section-subtitle">Unlock Zero Convenience Fees, Free Gourmet Popcorn, and VIP Royale Lounge Upgrades.</p>
            </div>
          </div>

          <div class="membership-grid">
            ${Object.values(CINEMORA_DATA.membershipTiers).map(tier => `
              <div class="member-card ${tier.id === 'gold' ? 'featured' : ''}">
                ${tier.badge ? `<span class="badge-trending" style="position: static; margin-bottom: 0.8rem; display: inline-block;">${tier.badge}</span>` : ''}
                <h3 class="member-tier-title" style="color: ${tier.color};">${tier.name}</h3>
                <div class="member-price">${tier.priceLabel}</div>
                <ul class="member-perks-list">
                  ${tier.perks.map(p => `
                    <li class="member-perk-item">
                      <span class="perk-check">✓</span>
                      <span>${p}</span>
                    </li>
                  `).join('')}
                </ul>
                <button class="btn ${tier.id === 'gold' ? 'btn-gold' : 'btn-secondary'}" onclick="CinemoraApp.joinMembership('${tier.id}')">
                  ${AppState.user.tier === tier.id ? 'Current Plan' : 'Join / Upgrade Tier'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Bank & Partner Offers -->
      <section class="content-section">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Exclusive Bank & Promo Offers</h2>
              <p class="section-subtitle">Simulated credit card perks and instant discount codes for your movie night</p>
            </div>
            <a href="#/offers" class="section-view-all">View All Offers →</a>
          </div>

          <div class="offers-grid">
            ${CINEMORA_DATA.offers.slice(0, 3).map(offer => `
              <div class="offer-card">
                <span class="offer-badge">${offer.badge}</span>
                <h3 class="offer-title">${offer.title}</h3>
                <p class="offer-desc">${offer.description}</p>
                <div class="offer-footer">
                  <span class="promo-code-box">🎟️ ${offer.code}</span>
                  <button class="btn btn-secondary btn-sm" onclick="CinemoraApp.copyPromoCode('${offer.code}')">Copy Code</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Coming Soon Movies -->
      <section class="content-section" style="background: var(--surface-2);">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Coming Soon to Cinemora</h2>
              <p class="section-subtitle">Mark your calendars for upcoming anticipated theatrical releases</p>
            </div>
          </div>

          <div class="movies-grid">
            ${comingSoon.map(movie => renderMovieCardHtml(movie, true)).join('')}
          </div>
        </div>
      </section>

      <!-- FAQs Section -->
      <section class="content-section">
        <div class="container">
          <div class="section-header" style="justify-content: center; text-align: center; border: none; margin-bottom: 2.5rem;">
            <div>
              <h2 class="section-title" style="justify-content: center;">Frequently Asked Questions</h2>
              <p class="section-subtitle">Everything you need to know about bookings, couple sofas & digital passes</p>
            </div>
          </div>

          <div class="faq-accordion">
            ${CINEMORA_DATA.faqs.map((faq, idx) => `
              <div class="faq-item" id="faqItem-${idx}">
                <button class="faq-trigger" onclick="CinemoraApp.toggleFaq(${idx})">
                  <span>${faq.question}</span>
                  <span class="faq-arrow">▼</span>
                </button>
                <div class="faq-body">
                  <div class="faq-body-inner">
                    <p>${faq.answer}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    startHeroAutoSlide();
  }

  function startHeroAutoSlide() {
    clearInterval(AppState.heroTimer);
    AppState.heroTimer = setInterval(() => {
      const featured = CINEMORA_DATA.movies.filter(m => m.isFeatured);
      AppState.heroCarouselIndex = (AppState.heroCarouselIndex + 1) % featured.length;
      const hero = document.getElementById('heroShowcase');
      if (hero) {
        renderHomePage(document.getElementById('appContent'));
      } else {
        clearInterval(AppState.heroTimer);
      }
    }, 8000);
  }

  // Render single movie card HTML (Real Photography Poster + Overlay)
  function renderMovieCardHtml(movie, isComingSoon = false) {
    const isFav = AppState.favourites.includes(movie.id);
    return `
      <div class="movie-card" data-movie-id="${movie.id}">
        <div class="movie-poster-wrap">
          ${movie.isTrending ? '<span class="card-badge-top">TRENDING</span>' : ''}
          <button class="favourite-btn ${isFav ? 'active' : ''}" onclick="CinemoraApp.toggleFavourite('${movie.id}')" title="Add to Favourites" aria-label="Add ${movie.title} to favourites">
            ♥
          </button>
          
          <img class="movie-poster-img" src="${movie.posterPath}" alt="${movie.title} Poster" loading="lazy" width="240" height="360" onerror="this.src='assets/img/poster-01.jpg'">
          
          <div class="movie-photo-overlay">
            <span style="font-size:0.65rem; color:#FDE047; font-weight:700; text-shadow:0 1px 3px rgba(0,0,0,0.8);">DEMO POSTER</span>
          </div>

          <div class="card-rating-strip">
            <span class="critic-star">★ ${movie.criticRating} <small style="color:#CBD5E1;font-weight:normal;">(${movie.votesCount.toLocaleString('en-IN')})</small></span>
            <span style="font-weight:700;">${movie.certification}</span>
          </div>
        </div>

        <div class="card-body">
          <h3 class="movie-card-title" title="${movie.title}">${movie.title}</h3>
          <p class="movie-card-genre">${movie.genres.join(', ')}</p>
          <div class="movie-card-meta">
            <span>⏱️ ${movie.duration}</span>
            <span>•</span>
            <span>🗣️ ${movie.language}</span>
          </div>
          
          <div class="card-actions">
            <a href="#/movie/${movie.id}" class="btn btn-secondary btn-sm">Details</a>
            <a href="#/movie/${movie.id}" class="btn btn-primary btn-sm">${isComingSoon ? 'Notify' : 'Book'}</a>
          </div>
        </div>
      </div>
    `;
  }

  // 7. RENDER: MOVIE DETAILS VIEW (#/movie/:id)
  function renderMovieDetailsPage(container, movieId) {
    const movie = getMovieById(movieId) || CINEMORA_DATA.movies[0];
    const isFav = AppState.favourites.includes(movie.id);
    const cityCinemas = CINEMORA_DATA.cinemas.filter(c => c.cityId === AppState.currentCity);

    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = i === 0 ? 'TODAY' : (i === 1 ? 'TOMORROW' : d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase());
      const dateStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      days.push({ dayName, dateStr, iso: d.toISOString().split('T')[0] });
    }

    container.innerHTML = `
      <div class="details-page-wrap">
        <!-- Details Hero (Cinematic Photo Backdrop) -->
        <div class="details-hero" style="background:#0B0C10;">
          <img class="details-backdrop" src="${movie.backdropSvg}" alt="${movie.title} Backdrop" loading="lazy" onerror="this.src='assets/img/hero-01.jpg'">
          <div class="hero-gradient-overlay"></div>

          <div class="container details-grid">
            <div class="details-poster-card">
              <img class="details-poster-img" src="${movie.posterPath}" alt="${movie.title}" width="280" height="400" onerror="this.src='assets/img/poster-01.jpg'">
            </div>

            <div class="details-info" style="color:#FFF;">
              <div class="hero-meta-badges">
                <span class="badge-demo">SIMULATED SHOWTIMES</span>
                <span class="badge-tag" style="background:rgba(255,255,255,0.2); color:#FFF; border-color:rgba(255,255,255,0.3);">${movie.certification}</span>
                <span class="badge-tag" style="background:rgba(255,255,255,0.2); color:#FFF; border-color:rgba(255,255,255,0.3);">${movie.duration}</span>
                <span class="badge-tag" style="background:rgba(255,255,255,0.2); color:#FFF; border-color:rgba(255,255,255,0.3);">${movie.language}</span>
                <span class="badge-tag" style="background:rgba(255,255,255,0.2); color:#FFF; border-color:rgba(255,255,255,0.3);">${movie.releaseYear}</span>
              </div>
              
              <h1 class="details-title" style="color:#FFF;">${movie.title}</h1>
              <p class="details-tagline">"${movie.tagline}"</p>
              <p style="color:#E2E8F0; line-height:1.7; max-width:720px; margin-bottom:1rem;">
                ${movie.synopsis}
              </p>

              <!-- Dual Rating Meter (Critic vs Audience) -->
              <div class="ratings-meter-box" style="background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.25);">
                <div class="meter-col">
                  <span class="meter-val">★ ${movie.criticRating}</span>
                  <span class="meter-lbl" style="color:#CBD5E1;">Critic Choice</span>
                </div>
                <div class="meter-divider" style="background:rgba(255,255,255,0.2);"></div>
                <div class="meter-col">
                  <span class="meter-val">★ ${movie.audienceRating || movie.publicRating}</span>
                  <span class="meter-lbl" style="color:#CBD5E1;">Public Score</span>
                </div>
                <div class="meter-divider" style="background:rgba(255,255,255,0.2);"></div>
                <div class="meter-col">
                  <span class="meter-val">${(movie.votesCount || 1240).toLocaleString('en-IN')}</span>
                  <span class="meter-lbl" style="color:#CBD5E1;">Total Votes</span>
                </div>
              </div>

              <!-- AI Market Sentiment Analysis Card (New Feature) -->
              <div class="ai-sentiment-badge" style="background: rgba(0,0,0,0.5); border: 1px solid var(--gold); border-radius: var(--radius-md); padding: 1rem 1.4rem; margin-top: 1.2rem; max-width: 720px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                  <span style="font-size: 0.82rem; font-weight: 800; color: var(--gold-light); letter-spacing: 0.08em; text-transform: uppercase;">
                    ⚡ AI Market Box Office & Sentiment Analysis
                  </span>
                  <span style="font-size: 0.75rem; background: rgba(46, 158, 106, 0.2); color: #4ADE80; padding: 2px 8px; border-radius: 12px; font-weight: 700;">
                    LIVE PULSE
                  </span>
                </div>
                <div style="font-size: 0.95rem; font-weight: 700; color: #FFF; margin-bottom: 0.3rem;">
                  Verdict: ${movie.criticRating >= 7.5 ? '🔥 High-Demand Blockbuster' : '⭐ Strong Word-of-Mouth Run'}
                </div>
                <p style="font-size: 0.85rem; color: #E2E8F0; line-height: 1.5; margin: 0;">
                  Audience sentiment is currently tracking at <strong>${Math.min(98, Math.round(movie.criticRating * 10 + 5))}% Positive</strong> with heavy booking velocity for Recliner suites and IMAX screens.
                </p>
              </div>

              <!-- Quick Action Buttons -->
              <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:0.5rem;">
                <button class="btn btn-outline-gold" style="color:#FDE047; border-color:#FDE047;" onclick="CinemoraApp.openTrailerModal('${movie.id}')">
                  <span>▶ Watch Trailer</span>
                </button>
                <button class="btn btn-secondary" style="background:rgba(255,255,255,0.15); color:#FFF; border-color:rgba(255,255,255,0.3);" onclick="CinemoraApp.toggleFavourite('${movie.id}')">
                  <span>${isFav ? '❤️ Saved to Favourites' : '🤍 Add to Favourites'}</span>
                </button>
                <button class="btn btn-secondary" style="background:rgba(255,255,255,0.15); color:#FFF; border-color:rgba(255,255,255,0.3);" onclick="CinemoraApp.shareMovie('${movie.title}')">
                  <span>↗ Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cast & Crew -->
        <section class="content-section" style="padding-top:2rem;">
          <div class="container">
            <h3 style="font-size:1.4rem; margin-bottom:1rem; color:var(--text);">Cast & Creative Minds</h3>
            <div class="cast-scroller">
              ${movie.cast.map(c => `
                <div class="cast-card">
                  <div class="cast-avatar-circle">${c.name.charAt(0)}</div>
                  <h4 class="cast-name" style="color:var(--text);">${c.name}</h4>
                  <p class="cast-role">${c.role}</p>
                </div>
              `).join('')}
              <div class="cast-card">
                <div class="cast-avatar-circle" style="border-color:var(--red);">🎬</div>
                <h4 class="cast-name" style="color:var(--text);">${movie.director}</h4>
                <p class="cast-role">Director</p>
              </div>
              <div class="cast-card">
                <div class="cast-avatar-circle" style="border-color:var(--blue);">🎵</div>
                <h4 class="cast-name" style="color:var(--text);">${movie.musicDirector}</h4>
                <p class="cast-role">Music Maestro</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Date Selector & Theatres Schedule -->
        <section class="content-section" id="bookingScheduleSection" style="background:var(--surface-2);">
          <div class="container">
            <div class="section-header">
              <div>
                <h2 class="section-title">Select Cinema & Showtime</h2>
                <p class="section-subtitle">Showing schedules across <strong>${getCityName(AppState.currentCity)}</strong></p>
              </div>
              <button class="btn btn-outline-gold btn-sm" onclick="CinemoraApp.openCityModal()">
                Change City (${getCityName(AppState.currentCity)})
              </button>
            </div>

            <!-- 7-Day Date Selector Tabs -->
            <div class="language-chips-scroll" style="margin-bottom:2rem;">
              ${days.map((day, idx) => `
                <button class="lang-chip ${idx === 0 ? 'active' : ''}" style="text-align:center; padding:0.6rem 1.4rem;" onclick="CinemoraApp.selectShowDate('${day.iso}', this)">
                  <div style="font-size:0.75rem; text-transform:uppercase;">${day.dayName}</div>
                  <div style="font-size:0.95rem; font-weight:800;">${day.dateStr}</div>
                </button>
              `).join('')}
            </div>

            <!-- Cinemas Showtimes List -->
            <div class="cinema-schedules-list">
              ${cityCinemas.map(cinema => {
                const showtimes = ['09:30 AM', '01:00 PM', '04:30 PM', '07:45 PM', '10:45 PM'];
                return `
                  <div class="cinema-schedule-card" style="background:var(--surface);">
                    <div class="cinema-sched-header">
                      <div>
                        <h3 class="cinema-sched-name" style="color:var(--text);">🏛️ ${cinema.name}</h3>
                        <p class="cinema-sched-loc">📍 ${cinema.locality} • <a href="${cinema.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--gold-dark); font-weight:700;">View on Map</a></p>
                        <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
                          ${cinema.amenities.slice(0, 3).map(a => `<span class="badge-tag" style="font-size:0.7rem;">✓ ${a}</span>`).join('')}
                        </div>
                      </div>
                      <span class="badge-demo">AUDI 1 & 2</span>
                    </div>

                    <div class="showtimes-pills-wrap">
                      ${showtimes.map((time, sIdx) => {
                        const showId = `show-${movie.id}-${cinema.id}-${sIdx}`;
                        const format = cinema.formats[sIdx % cinema.formats.length];
                        return `
                          <button class="showtime-pill-btn" onclick="CinemoraApp.startBooking('${showId}', '${movie.id}', '${cinema.id}', '${time}', '${format}')">
                            <span class="showtime-time">${time}</span>
                            <span class="showtime-format">${format}</span>
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>

        <!-- Audience Reviews -->
        <section class="content-section">
          <div class="container">
            <div class="section-header">
              <div>
                <h2 class="section-title">Audience & Critic Reviews</h2>
                <p class="section-subtitle">Verified feedback from movie lovers who watched this screening</p>
              </div>
              <button class="btn btn-primary btn-sm" onclick="CinemoraApp.openReviewModal('${movie.id}')">
                ✍️ Write a Review
              </button>
            </div>

            <div class="offers-grid">
              ${CINEMORA_DATA.reviews.filter(r => r.movieId === movie.id).concat(AppState.userReviews.filter(r => r.movieId === movie.id)).map(rev => `
                <div class="offer-card" style="border-left: 3px solid var(--gold);">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
                    <span style="font-weight:700; color:var(--text);">${rev.author} <small style="color:var(--gold-dark);">(${rev.city})</small></span>
                    <span style="color:var(--gold-dark); font-weight:800;">★ ${rev.rating}.0 / 5</span>
                  </div>
                  <h4 style="font-size:1.05rem; margin-bottom:0.4rem; color:var(--text);">${rev.headline}</h4>
                  <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6;">${rev.text}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // 8. RENDER: SEAT BOOKING VIEW (LIGHT PANEL + REAL PHOTO CATEGORY CARDS)
  function renderSeatBookingPage(container, showId) {
    const draft = AppState.currentBookingDraft;
    const movie = draft.movie || CINEMORA_DATA.movies[0];
    const cinema = draft.cinema || CINEMORA_DATA.cinemas[0];
    const occupiedSeats = getOccupiedSeatsForShow(showId);

    container.innerHTML = `
      <div class="seat-booking-view">
        <div class="container">
          <!-- Booking Header Bar -->
          <div class="booking-header-bar">
            <div class="booking-movie-meta">
              <h2>${movie.title}</h2>
              <p class="booking-cinema-sub">
                🏛️ ${cinema.name} | Screen 2 (${draft.format || 'Dolby Atmos'}) | 📅 ${draft.date || 'Today'} • ⏰ ${draft.time || '07:45 PM'}
              </p>
            </div>
            <div style="display:flex; gap:0.8rem; align-items:center;">
              <span class="badge-demo">Simulated Availability</span>
              <a href="#/movie/${movie.id}" class="btn btn-secondary btn-sm">← Change Show</a>
            </div>
          </div>

          <!-- Category Showcase Cards Above Seat Map (With Real Photo for Recliner & Couple Sofa) -->
          <div class="category-showcase-grid">
            ${Object.values(CINEMORA_DATA.seatCategories).map(cat => `
              <div class="cat-showcase-card" id="catCard-${cat.id}" onclick="CinemoraApp.highlightCategoryRows('${cat.id}')">
                <img class="cat-showcase-img" src="${cat.photoPath}" alt="${cat.name}" width="54" height="54">
                <div>
                  <div class="cat-showcase-name">${cat.displayName}</div>
                  <div class="cat-showcase-price">${formatCurrency(cat.price)} <small style="font-size:0.7rem; color:var(--text-muted);">${cat.id === 'sofa' ? '/ unit' : '/ seat'}</small></div>
                  <div class="cat-showcase-desc">${cat.description}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Curved Glowing Cinema Screen Stage (Dark for cinema contrast) -->
          <div class="screen-stage-area">
            <svg class="curved-screen-svg" viewBox="0 0 500 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="screenBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#0284C7" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path d="M 20 40 Q 250 8 480 40" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" filter="drop-shadow(0 0 10px #38BDF8)" />
              <path d="M 20 40 Q 250 8 480 40 L 460 50 Q 250 20 40 50 Z" fill="url(#screenBeam)" />
            </svg>
            <div class="screen-caption">✦ ALL EYES THIS WAY • AUDITORIUM SCREEN ✦</div>
          </div>

          <!-- Seat Map: ON LIGHT PANEL (Requirement A) -->
          <div class="seat-map-wrapper">
            <div class="auditorium-grid" id="auditoriumGrid">
              ${CINEMORA_DATA.auditoriumLayout.map(row => `
                <div class="seat-row" data-category="${row.category}" id="row-${row.rowLabel}">
                  <span class="row-label">${row.rowLabel}</span>
                  
                  ${row.seats.map(seat => {
                    if (seat.isAisle) {
                      return '<div class="seat-aisle-gap"></div>';
                    }

                    const seatId = `${row.rowLabel}${seat.no}`;
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isSelected = draft.seats.some(s => s.id === seatId);
                    const catObj = CINEMORA_DATA.seatCategories[seat.type];
                    const isSofa = seat.type === 'sofa';
                    const ariaLabel = `Row ${row.rowLabel}, Seat ${seat.label || seat.no}, ${catObj.name}, ${formatCurrency(row.price)}, ${isOccupied ? 'Occupied' : (isSelected ? 'Selected' : 'Available')}`;

                    return `
                      <button 
                        class="seat-btn ${isSofa ? 'seat-btn-sofa' : ''} ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}" 
                        id="seat-${seatId}"
                        data-seat-id="${seatId}"
                        data-row="${row.rowLabel}"
                        data-no="${seat.no}"
                        data-type="${seat.type}"
                        data-price="${row.price}"
                        data-capacity="${catObj.capacity}"
                        data-label="${seat.label || (row.rowLabel + seat.no)}"
                        ${isOccupied ? 'disabled' : ''}
                        onclick="CinemoraApp.toggleSeatSelect('${seatId}')"
                        title="${ariaLabel}"
                        aria-label="${ariaLabel}"
                        aria-pressed="${isSelected}">
                        <img class="seat-btn-icon" src="${catObj.iconPath}" alt="${catObj.name}">
                      </button>
                    `;
                  }).join('')}

                  <span class="row-label">${row.rowLabel}</span>
                </div>
              `).join('')}
            </div>

            <!-- Seat Legend on Light Panel -->
            <div class="seat-legend-bar">
              <div class="legend-item">
                <div class="legend-box" style="border: 1.5px solid var(--green); background: #FFF;"></div>
                <span>Standard (₹220)</span>
              </div>
              <div class="legend-item">
                <div class="legend-box" style="border: 1.5px solid var(--blue); background: rgba(59,111,216,0.1);"></div>
                <span>Premium (₹380)</span>
              </div>
              <div class="legend-item">
                <div class="legend-box" style="border: 1.5px solid var(--purple); background: rgba(123,79,209,0.1);"></div>
                <span>VIP Recliner (₹650)</span>
              </div>
              <div class="legend-item">
                <div class="legend-box" style="width:36px; border: 1.5px solid var(--sofa-tint); background: rgba(215,38,61,0.1);"></div>
                <span>Couple Sofa (₹1200 / 2p)</span>
              </div>
              <div class="legend-item">
                <div class="legend-box" style="background: var(--gold); border: 1.5px solid var(--gold-dark);"></div>
                <span>Selected</span>
              </div>
              <div class="legend-item">
                <div class="legend-box" style="background: #E2E8F0; border: 1.5px solid #CBD5E1;"></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Floating Booking Summary Bar -->
        <div class="booking-bottom-panel" id="bookingBottomPanel">
          <div class="container booking-panel-grid">
            <div style="display:flex; align-items:center; gap:1.2rem; flex-wrap:wrap;">
              <div>
                <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Selected Seats</span>
                <div class="selected-seats-list" id="selectedSeatsContainer">
                  ${renderSelectedSeatsThumbnails(draft.seats)}
                </div>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:2rem;">
              <div class="live-price-box">
                <span class="live-price-val" id="liveTotalPrice">${formatCurrency(calculateSeatTotal(draft.seats))}</span>
                <span style="font-size:0.72rem; color:var(--text-muted);">Incl. simulated taxes & fees</span>
              </div>

              <div style="display:flex; gap:0.8rem;">
                <button class="btn btn-secondary btn-sm" onclick="CinemoraApp.clearSelection()">Clear</button>
                <button class="btn btn-primary" onclick="CinemoraApp.proceedToCheckout()" id="btnProceedCheckout" ${draft.seats.length === 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                  <span>Continue →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderSelectedSeatsThumbnails(seats) {
    if (!seats || seats.length === 0) {
      return '<span style="color:var(--text-muted); font-size:0.88rem;">No seats selected yet (Max 10 seats)</span>';
    }

    return seats.map(s => {
      const cat = CINEMORA_DATA.seatCategories[s.type];
      return `
        <span class="selected-seat-chip">
          <img class="selected-seat-thumb" src="${cat.iconPath}" alt="${cat.name}">
          <span>${s.label} (${formatCurrency(s.price)})</span>
        </span>
      `;
    }).join('');
  }

  function calculateSeatTotal(seats) {
    if (!seats || seats.length === 0) return 0;
    return seats.reduce((sum, s) => sum + s.price, 0);
  }

  // 9. RENDER: CHECKOUT VIEW (#/checkout)
  function renderCheckoutPage(container) {
    const draft = AppState.currentBookingDraft;
    if (!draft.seats || draft.seats.length === 0) {
      container.innerHTML = `
        <div class="container" style="padding: 6rem 0; text-align: center;">
          <h2>No Seats Selected</h2>
          <p style="color: var(--text-muted); margin: 1rem 0 2rem;">Please choose a movie and select your seats first.</p>
          <a href="#/movies" class="btn btn-primary">Browse Movies</a>
        </div>
      `;
      return;
    }

    const movie = draft.movie || CINEMORA_DATA.movies[0];
    const cinema = draft.cinema || CINEMORA_DATA.cinemas[0];
    const seatBase = calculateSeatTotal(draft.seats);

    const isMemberDiscount = AppState.user.tier === 'gold' || AppState.user.tier === 'royale';
    const convenienceFee = isMemberDiscount ? 0 : Math.round(draft.seats.length * 35.4);
    const gstTax = Math.round(seatBase * 0.18);

    let fnbTotal = 0;
    Object.keys(draft.fnb).forEach(itemId => {
      const count = draft.fnb[itemId];
      const item = CINEMORA_DATA.fnbItems.find(f => f.id === itemId);
      if (item && count > 0) {
        fnbTotal += item.price * count;
      }
    });

    let discount = 0;
    if (draft.coupon) {
      if (draft.coupon.discountType === 'flat') {
        discount = draft.coupon.discountAmount;
      } else if (draft.coupon.discountType === 'percentage') {
        discount = Math.min((seatBase * draft.coupon.discountPercent) / 100, draft.coupon.maxDiscount);
      }
    }

    const grandTotal = Math.max(0, seatBase + convenienceFee + gstTax + fnbTotal - discount);

    container.innerHTML = `
      <div class="checkout-view">
        <div class="container">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <span class="badge-demo">Order Review & Simulated Checkout</span>
              <h1 style="font-size:2.2rem; margin-top:0.3rem;">Complete Your Booking</h1>
            </div>
            <div style="background:var(--red-soft); border:1px solid rgba(215,38,61,0.3); padding:0.5rem 1rem; border-radius:var(--radius-full); color:var(--red); font-weight:700;">
              ⏳ Seat Reservation Timer: <span id="checkoutTimer">07:54</span>
            </div>
          </div>

          <div class="checkout-grid">
            <div class="checkout-main-col">
              <!-- Add F&B Snacks Section with Real Photos -->
              <div class="checkout-card">
                <h3 class="checkout-card-title">🍿 Add Gourmet In-Seat Concessions</h3>
                <div class="fnb-addon-grid">
                  ${CINEMORA_DATA.fnbItems.map(item => {
                    const count = draft.fnb[item.id] || 0;
                    return `
                      <div class="fnb-addon-card">
                        <img class="fnb-addon-img" src="${item.iconSvg}" alt="${item.name}" width="56" height="56">
                        <div style="flex:1;">
                          <h4 style="font-size:0.95rem; font-weight:700; color:var(--text);">${item.name}</h4>
                          <p style="font-size:0.75rem; color:var(--text-muted);">${item.desc}</p>
                          <div style="font-size:0.92rem; font-weight:800; color:var(--gold-dark); margin-top:0.3rem;">
                            ${formatCurrency(item.price)}
                          </div>
                        </div>
                        <div class="fnb-stepper">
                          <button class="stepper-btn" onclick="CinemoraApp.updateFnbQuantity('${item.id}', -1)">-</button>
                          <span style="font-weight:700; min-width:18px; text-align:center;">${count}</span>
                          <button class="stepper-btn" onclick="CinemoraApp.updateFnbQuantity('${item.id}', 1)">+</button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Payment Method Section -->
              <div class="checkout-card">
                <h3 class="checkout-card-title">💳 Select Demo Payment Method</h3>
                <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.2rem;">
                  ✦ Everything is DEMO. Never enter real CVV, PIN, or banking passwords.
                </p>

                <div class="payment-tabs">
                  <button class="pay-tab-btn active" onclick="CinemoraApp.switchPayTab('upi', this)">UPI / QR (Demo)</button>
                  <button class="pay-tab-btn" onclick="CinemoraApp.switchPayTab('card', this)">Debit / Credit Card</button>
                  <button class="pay-tab-btn" onclick="CinemoraApp.switchPayTab('netbanking', this)">Net Banking</button>
                  <button class="pay-tab-btn" onclick="CinemoraApp.switchPayTab('wallets', this)">Wallets</button>
                </div>

                <!-- UPI Tab -->
                <div class="payment-tab-content show" id="payTab-upi">
                  <div style="display:flex; gap:2rem; align-items:center; flex-wrap:wrap;">
                    <div style="background:#FFF; border:1px solid var(--border); padding:12px; border-radius:12px; width:140px; height:140px; display:flex; align-items:center; justify-content:center;">
                      <svg viewBox="0 0 100 100" width="100%" height="100%">
                        <rect x="0" y="0" width="30" height="30" fill="#1F1B16" />
                        <rect x="5" y="5" width="20" height="20" fill="#FFF" />
                        <rect x="10" y="10" width="10" height="10" fill="#1F1B16" />
                        
                        <rect x="70" y="0" width="30" height="30" fill="#1F1B16" />
                        <rect x="75" y="5" width="20" height="20" fill="#FFF" />
                        <rect x="80" y="10" width="10" height="10" fill="#1F1B16" />

                        <rect x="0" y="70" width="30" height="30" fill="#1F1B16" />
                        <rect x="5" y="75" width="20" height="20" fill="#FFF" />
                        <rect x="10" y="80" width="10" height="10" fill="#1F1B16" />

                        <rect x="40" y="40" width="20" height="20" fill="#C9A227" />
                        <rect x="35" y="10" width="8" height="8" fill="#1F1B16" />
                        <rect x="50" y="20" width="8" height="8" fill="#1F1B16" />
                        <rect x="70" y="50" width="12" height="12" fill="#1F1B16" />
                        <rect x="45" y="75" width="10" height="10" fill="#1F1B16" />
                      </svg>
                    </div>

                    <div style="flex:1;">
                      <h4 style="font-size:1rem; margin-bottom:0.4rem; color:var(--text);">Scan Simulated QR Code</h4>
                      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
                        Scan with any UPI app (GPay, PhonePe, Paytm) or enter mock VPA below:
                      </p>
                      <input type="text" class="form-control" value="guest@cinemoraupi" readonly style="max-width:280px;">
                    </div>
                  </div>
                </div>

                <!-- Card Tab -->
                <div class="payment-tab-content" id="payTab-card">
                  <div class="mock-card-form" style="display:flex; flex-direction:column; gap:1rem;">
                    <button type="button" class="btn btn-secondary btn-sm" style="align-self:flex-start;" onclick="CinemoraApp.autofillDemoCard()">
                      ⚡ Auto-fill Test Card
                    </button>
                    <div class="form-group">
                      <label>Card Number (Demo)</label>
                      <input type="text" id="demoCardNum" class="form-control" placeholder="4111 •••• •••• 1111" value="4111 2222 3333 4444">
                    </div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
                      <div class="form-group">
                        <label>Expiry Date</label>
                        <input type="text" id="demoCardExp" class="form-control" placeholder="MM/YY" value="12/28">
                      </div>
                      <div class="form-group">
                        <label>Demo CVV</label>
                        <input type="text" id="demoCardCvv" class="form-control" placeholder="•••" value="888">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Net Banking Tab -->
                <div class="payment-tab-content" id="payTab-netbanking">
                  <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap:0.8rem;">
                    ${['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank'].map(bank => `
                      <button class="city-pick-btn" onclick="CinemoraApp.selectDemoBank('${bank}')">🏛️ ${bank}</button>
                    `).join('')}
                  </div>
                </div>

                <!-- Wallets Tab -->
                <div class="payment-tab-content" id="payTab-wallets">
                  <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap:0.8rem;">
                    ${['Paytm Wallet', 'PhonePe', 'Amazon Pay', 'Mobikwik'].map(w => `
                      <button class="city-pick-btn" onclick="showToast('Selected ${w} (Demo Mode)')">📱 ${w}</button>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Sidebar: Order Summary & Coupon -->
            <div class="checkout-summary-col">
              <div class="checkout-card" style="position:sticky; top:90px;">
                <h3 class="checkout-card-title">Order Breakdown</h3>
                
                <div style="border-bottom:1px solid var(--border); padding-bottom:1rem; margin-bottom:1rem;">
                  <h4 style="font-size:1.15rem; color:var(--text);">${movie.title}</h4>
                  <p style="font-size:0.82rem; color:var(--text-muted);">${cinema.name} • Audi 2</p>
                  <p style="font-size:0.82rem; color:var(--gold-dark); font-weight:700;">📅 ${draft.date || 'Today'} | ⏰ ${draft.time || '07:45 PM'}</p>
                </div>

                <div style="display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1.2rem; font-size:0.88rem;">
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Seats (${draft.seats.length}): ${draft.seats.map(s => s.label).join(', ')}</span>
                    <span style="font-weight:700;">${formatCurrency(seatBase)}</span>
                  </div>

                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">
                      Convenience Fee
                      ${isMemberDiscount ? '<span style="color:var(--gold-dark); font-size:0.75rem;">(Waived for Member!)</span>' : ''}
                    </span>
                    <span style="font-weight:700; ${isMemberDiscount ? 'color:var(--green);' : ''}">
                      ${isMemberDiscount ? 'FREE' : formatCurrency(convenienceFee)}
                    </span>
                  </div>

                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Integrated GST (18%)</span>
                    <span style="font-weight:700;">${formatCurrency(gstTax)}</span>
                  </div>

                  ${fnbTotal > 0 ? `
                    <div style="display:flex; justify-content:space-between;">
                      <span style="color:var(--text-muted);">Food & Beverages</span>
                      <span style="font-weight:700;">${formatCurrency(fnbTotal)}</span>
                    </div>
                  ` : ''}

                  ${discount > 0 ? `
                    <div style="display:flex; justify-content:space-between; color:var(--green);">
                      <span>Coupon Discount (${draft.coupon.code})</span>
                      <span style="font-weight:700;">-${formatCurrency(discount)}</span>
                    </div>
                  ` : ''}
                </div>

                <!-- Promo Code Box -->
                <div style="margin-bottom:1.5rem;">
                  <div style="display:flex; gap:0.5rem;">
                    <input type="text" id="couponInput" class="form-control" placeholder="Enter coupon code" value="${draft.coupon ? draft.coupon.code : ''}" style="text-transform:uppercase;">
                    <button class="btn btn-secondary btn-sm" onclick="CinemoraApp.applyCoupon()">Apply</button>
                  </div>
                  <small style="color:var(--text-muted); font-size:0.75rem; margin-top:0.3rem; display:block;">
                    Try codes: <strong>CINEMORA50</strong>, <strong>GOLDLUXE</strong>, <strong>FIRSTSHOW</strong>
                  </small>
                </div>

                <!-- Grand Total -->
                <div style="border-top:1.5px dashed var(--border); padding-top:1rem; display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                  <span style="font-size:1.1rem; font-weight:700;">Total Payable</span>
                  <span style="font-size:1.8rem; font-weight:900; color:var(--text);">${formatCurrency(grandTotal)}</span>
                </div>

                <button class="btn btn-primary btn-lg" style="width:100%; font-size:1.1rem;" onclick="CinemoraApp.confirmBookingPayment(${grandTotal})">
                  Pay ${formatCurrency(grandTotal)} (Demo)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    startCheckoutCountdown();
  }

  function startCheckoutCountdown() {
    let timeLeft = 474;
    const timerElem = document.getElementById('checkoutTimer');
    const timerInterval = setInterval(() => {
      if (!document.getElementById('checkoutTimer')) {
        clearInterval(timerInterval);
        return;
      }
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        showToast('Reservation session expired. Please reselect your seats.', 'error');
        window.location.hash = '#/movies';
        return;
      }
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      if (timerElem) {
        timerElem.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }

  // 10. RENDER: DIGITAL BOARDING PASS TICKET VIEW (#/ticket/:bookingId)
  function renderTicketPassPage(container, bookingId) {
    const booking = AppState.bookings.find(b => b.id === bookingId) || AppState.bookings[AppState.bookings.length - 1];

    if (!booking) {
      container.innerHTML = `
        <div class="container" style="padding: 6rem 0; text-align:center;">
          <h2>No Ticket Found</h2>
          <p style="color:var(--text-muted); margin:1rem 0;">No active ticket matching this ID was found.</p>
          <a href="#/bookings" class="btn btn-primary">Go to My Bookings</a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="ticket-pass-wrap">
        <div style="text-align:center; margin-bottom:2rem;">
          <span class="badge-demo">CONFIRMED DEMO RESERVATION</span>
          <h1 style="font-size:2.2rem; margin-top:0.4rem; color:var(--text);">🎉 You're All Set for the Show!</h1>
          <p style="color:var(--text-muted);">Your digital M-Ticket has been generated and saved to your profile.</p>
        </div>

        <div class="cinema-boarding-pass">
          <div class="ticket-main-section">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
              <img src="assets/logo.svg" alt="Cinemora Logo" style="height:36px;">
              <span class="badge-tag" style="background:var(--gold-soft); color:var(--gold-dark); font-weight:800; border-color:var(--gold);">
                BOARDING PASS
              </span>
            </div>

            <h2 class="ticket-movie-title">${booking.movieTitle}</h2>
            <p class="ticket-cinema-info">🏛️ ${booking.cinemaName} • Screen 2 (${booking.format || 'Dolby Atmos'})</p>

            <div class="ticket-specs-row">
              <div class="ticket-spec-cell">
                <h5>Show Date</h5>
                <p>${booking.date}</p>
              </div>
              <div class="ticket-spec-cell">
                <h5>Show Time</h5>
                <p>${booking.time}</p>
              </div>
              <div class="ticket-spec-cell">
                <h5>Reserved Seats</h5>
                <p style="color:var(--gold-dark);">${booking.seatLabels.join(', ')}</p>
              </div>
              <div class="ticket-spec-cell">
                <h5>Total Paid</h5>
                <p>${formatCurrency(booking.totalPaid)}</p>
              </div>
            </div>

            <div style="font-size:0.8rem; color:var(--text-muted); display:flex; justify-content:space-between; align-items:center;">
              <span>Booking Ref: <strong>${booking.id}</strong></span>
              <span>Guest: ${booking.userName}</span>
            </div>
          </div>

          <div class="ticket-stub-section">
            <div class="qr-code-box">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <rect x="0" y="0" width="30" height="30" fill="#1F1B16" />
                <rect x="5" y="5" width="20" height="20" fill="#FFF" />
                <rect x="10" y="10" width="10" height="10" fill="#1F1B16" />
                
                <rect x="70" y="0" width="30" height="30" fill="#1F1B16" />
                <rect x="75" y="5" width="20" height="20" fill="#FFF" />
                <rect x="80" y="10" width="10" height="10" fill="#1F1B16" />

                <rect x="0" y="70" width="30" height="30" fill="#1F1B16" />
                <rect x="5" y="75" width="20" height="20" fill="#FFF" />
                <rect x="10" y="80" width="10" height="10" fill="#1F1B16" />

                <rect x="40" y="40" width="20" height="20" fill="#C9A227" />
                <rect x="35" y="15" width="6" height="6" fill="#1F1B16" />
                <rect x="50" y="25" width="6" height="6" fill="#1F1B16" />
                <rect x="70" y="50" width="10" height="10" fill="#1F1B16" />
                <rect x="45" y="75" width="8" height="8" fill="#1F1B16" />
              </svg>
            </div>
            <div style="font-family:monospace; font-size:0.88rem; font-weight:700; color:var(--gold-dark);">M-TICKET #${booking.id}</div>
            <small style="font-size:0.7rem; color:var(--text-muted); margin-top:0.4rem;">Scan at auditorium foyer</small>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:1.2rem; margin-top:2.5rem; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="window.print()">
            <span>🖨️ Download / Print Ticket</span>
          </button>
          <a href="#/bookings" class="btn btn-secondary">
            <span>🎟️ View All Bookings</span>
          </a>
          <a href="#/movies" class="btn btn-outline-gold">
            <span>Book Another Movie</span>
          </a>
        </div>
      </div>
    `;
  }

  // 11. RENDER: MY BOOKINGS PAGE (#/bookings)
  function renderMyBookingsPage(container) {
    const bookings = AppState.bookings;

    container.innerHTML = `
      <div class="content-section">
        <div class="container">
          <div class="section-header">
            <div>
              <h1 class="section-title">My Bookings</h1>
              <p class="section-subtitle">Your active and previous simulated movie ticket reservations</p>
            </div>
            <span class="badge-demo">LocalStorage Persisted</span>
          </div>

          ${bookings.length === 0 ? `
            <div style="text-align:center; padding:5rem 0; background:var(--surface); border-radius:var(--radius-lg); border:1px solid var(--border);">
              <div style="font-size:3rem; margin-bottom:1rem;">🎟️</div>
              <h3 style="font-size:1.5rem; margin-bottom:0.5rem; color:var(--text);">No Bookings Yet</h3>
              <p style="color:var(--text-muted); margin-bottom:1.5rem;">You haven't booked any movie tickets yet. Start by browsing movies playing in ${getCityName(AppState.currentCity)}!</p>
              <a href="#/movies" class="btn btn-primary">Explore Movies</a>
            </div>
          ` : `
            <div style="display:flex; flex-direction:column; gap:1.5rem;">
              ${bookings.map(b => `
                <div class="checkout-card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem;">
                  <div>
                    <span class="badge-demo" style="margin-bottom:0.5rem; display:inline-block;">${b.status || 'CONFIRMED'}</span>
                    <h3 style="font-size:1.4rem; color:var(--text);">${b.movieTitle}</h3>
                    <p style="color:var(--gold-dark); font-size:0.92rem; font-weight:700; margin:0.3rem 0;">
                      🏛️ ${b.cinemaName} • 📅 ${b.date} • ⏰ ${b.time}
                    </p>
                    <p style="color:var(--text-muted); font-size:0.85rem;">
                      Seats: <strong>${b.seatLabels ? b.seatLabels.join(', ') : 'Seats'}</strong> | Paid: <strong>${formatCurrency(b.totalPaid)}</strong> | Ref: #${b.id}
                    </p>
                  </div>

                  <div style="display:flex; gap:0.8rem; align-items:center;">
                    <a href="#/ticket/${b.id}" class="btn btn-primary btn-sm">View Boarding Pass</a>
                    <button class="btn btn-secondary btn-sm" onclick="CinemoraApp.cancelBooking('${b.id}')">Cancel (Refund)</button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  // 12. RENDER: CINEMAS DIRECTORY PAGE (#/cinemas)
  function renderCinemasPage(container) {
    const cityCinemas = CINEMORA_DATA.cinemas.filter(c => c.cityId === AppState.currentCity);

    container.innerHTML = `
      <div class="content-section">
        <div class="container">
          <div class="section-header">
            <div>
              <h1 class="section-title">Cinemas & Multiplexes</h1>
              <p class="section-subtitle">Premium theatres in <strong>${getCityName(AppState.currentCity)}</strong></p>
            </div>
            <button class="btn btn-outline-gold btn-sm" onclick="CinemoraApp.openCityModal()">
              📍 Change City (${getCityName(AppState.currentCity)})
            </button>
          </div>

          <div class="experiences-grid">
            ${cityCinemas.map(c => `
              <div class="exp-card">
                <div class="exp-img-wrap">
                  <img class="exp-img" src="${c.interiorSvg}" alt="${c.name}" loading="lazy" width="400" height="200" onerror="this.src='assets/img/cinema-01.jpg'">
                </div>
                <div class="exp-body">
                  <span class="exp-badge">⭐ ${c.rating} / 5.0 • ${c.screens} Screens</span>
                  <h3 class="exp-title">${c.name}</h3>
                  <p class="exp-desc">📍 ${c.locality}</p>
                  
                  <div class="exp-features" style="margin-bottom:1rem;">
                    ${c.formats.map(f => `<span class="exp-feature-pill">${f}</span>`).join('')}
                  </div>

                  <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1.2rem;">
                    <strong>Amenities:</strong> ${c.amenities.join(', ')}
                  </div>

                  <div style="display:flex; gap:0.8rem; margin-top:auto;">
                    <a href="#/movies" class="btn btn-primary btn-sm" style="flex:1;">View Movies</a>
                    <a href="${c.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Google Maps ↗</a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 13. RENDER: OFFERS (#/offers)
  function renderOffersPage(container) {
    container.innerHTML = `
      <div class="content-section">
        <div class="container">
          <div class="section-header">
            <div>
              <h1 class="section-title">Exclusive Bank & Promo Offers</h1>
              <p class="section-subtitle">Simulated discounts for credit cards, debit cards and festive celebrations</p>
            </div>
            <span class="badge-demo">Demo Promotions</span>
          </div>

          <div class="offers-grid">
            ${CINEMORA_DATA.offers.map(offer => `
              <div class="offer-card">
                <span class="offer-badge">${offer.badge}</span>
                <h3 class="offer-title">${offer.title}</h3>
                <p class="offer-desc">${offer.description}</p>
                <div class="offer-footer">
                  <span class="promo-code-box">🎟️ ${offer.code}</span>
                  <button class="btn btn-secondary btn-sm" onclick="CinemoraApp.copyPromoCode('${offer.code}')">Copy Code</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 14. RENDER: MEMBERSHIP (#/membership)
  function renderMembershipPage(container) {
    container.innerHTML = `
      <div class="content-section">
        <div class="container">
          <div class="section-header" style="justify-content:center; text-align:center; border:none; margin-bottom:3rem;">
            <div>
              <span class="badge-demo">CINEMORA CLUB REWARDS</span>
              <h1 class="section-title" style="justify-content:center; margin-top:0.5rem;">Join India's Most Luxurious Film Club</h1>
              <p class="section-subtitle">Zero convenience fees, complimentary caramel popcorn & priority recliner seating</p>
            </div>
          </div>

          <div class="membership-grid">
            ${Object.values(CINEMORA_DATA.membershipTiers).map(tier => `
              <div class="member-card ${tier.id === 'gold' ? 'featured' : ''}">
                ${tier.badge ? `<span class="badge-trending" style="position:static; margin-bottom:0.8rem; display:inline-block;">${tier.badge}</span>` : ''}
                <h3 class="member-tier-title" style="color:${tier.color};">${tier.name}</h3>
                <div class="member-price">${tier.priceLabel}</div>
                <ul class="member-perks-list">
                  ${tier.perks.map(p => `
                    <li class="member-perk-item">
                      <span class="perk-check">✓</span>
                      <span>${p}</span>
                    </li>
                  `).join('')}
                </ul>
                <button class="btn ${tier.id === 'gold' ? 'btn-gold' : 'btn-secondary'}" onclick="CinemoraApp.joinMembership('${tier.id}')">
                  ${AppState.user.tier === tier.id ? 'Current Active Tier' : 'Upgrade to ' + tier.name}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 15. RENDER: REVIEWS (#/reviews)
  function renderReviewsPage(container) {
    const allReviews = CINEMORA_DATA.reviews.concat(AppState.userReviews);

    container.innerHTML = `
      <div class="content-section">
        <div class="container">
          <div class="section-header">
            <div>
              <h1 class="section-title">Community Reviews & Critic Buzz</h1>
              <p class="section-subtitle">Real ratings and reflections from Indian cinephiles</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="CinemoraApp.openReviewModal('mv-01')">
              ✍️ Write a Review
            </button>
          </div>

          <div class="offers-grid">
            ${allReviews.map(rev => {
              const movie = getMovieById(rev.movieId);
              return `
                <div class="offer-card" style="border-left:3px solid var(--gold);">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
                    <div>
                      <h4 style="font-size:1.1rem; color:var(--text);">${movie ? movie.title : 'Movie'}</h4>
                      <small style="color:var(--text-muted);">${rev.author} • ${rev.city}</small>
                    </div>
                    <span style="color:var(--gold-dark); font-weight:800; font-size:1.1rem;">★ ${rev.rating}.0 / 5</span>
                  </div>
                  <h5 style="font-size:1rem; margin-bottom:0.4rem; color:var(--text);">${rev.headline}</h5>
                  <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6;">${rev.text}</p>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 16. RENDER: ACCOUNT (#/account)
  function renderAccountPage(container) {
    const favMovies = CINEMORA_DATA.movies.filter(m => AppState.favourites.includes(m.id));

    container.innerHTML = `
      <div class="content-section">
        <div class="container">
          <div class="section-header">
            <div>
              <h1 class="section-title">My Account</h1>
              <p class="section-subtitle">Manage profile preferences, Cinemora Club status & saved movies</p>
            </div>
            <span class="badge-demo">Demo User Profile</span>
          </div>

          <div class="checkout-card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem; margin-bottom:3rem;">
            <div style="display:flex; gap:1.5rem; align-items:center;">
              <div class="cast-avatar-circle" style="width:90px; height:90px; font-size:2.2rem; margin:0;">
                ${AppState.user.name.charAt(0)}
              </div>
              <div>
                <span class="badge-demo" style="margin-bottom:0.4rem; display:inline-block; text-transform:uppercase;">
                  👑 ${AppState.user.tier} Privilege Member
                </span>
                <h2 style="font-size:1.8rem; color:var(--text);">${AppState.user.name}</h2>
                <p style="color:var(--text-muted); font-size:0.9rem;">
                  ✉️ ${AppState.user.email} | 📞 ${AppState.user.phone}
                </p>
              </div>
            </div>

            <div style="text-align:right;">
              <div style="font-size:2rem; font-weight:900; color:var(--gold-dark);">${AppState.user.points}</div>
              <small style="color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em;">Cinemora Reward Points</small>
            </div>
          </div>

          <h2 class="section-title" style="margin-bottom:1.5rem;">Saved Favourites (${favMovies.length})</h2>
          ${favMovies.length === 0 ? `
            <p style="color:var(--text-muted);">No favourites saved yet. Click the heart icon on any movie poster to save it here!</p>
          ` : `
            <div class="movies-grid">
              ${favMovies.map(movie => renderMovieCardHtml(movie)).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  // 17. PUBLIC APPLICATION INTERFACE
  window.CinemoraApp = {
    // Theme Switcher Toggle (Requirement A)
    toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      AppState.theme = nextTheme;
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem(STORAGE_KEYS.THEME, nextTheme);
      updateThemeIcon();
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light Warm'} Theme`, 'info');
    },

    // Trending Controls (Requirement C)
    setTrendingTab(tab) {
      AppState.trendingTab = tab;
      renderHomePage(document.getElementById('appContent'));
    },
    scrollTrending(direction) {
      const container = document.getElementById('trendingScrollContainer');
      if (container) {
        const scrollAmount = 300 * direction;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    },

    // City Selector
    openCityModal() {
      const modal = document.getElementById('cityModal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },
    closeCityModal() {
      const modal = document.getElementById('cityModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    },
    filterCityModal(query) {
      const grid = document.getElementById('cityModalGrid');
      if (!grid) return;
      const q = (query || '').toLowerCase().trim();
      const filtered = CINEMORA_DATA.cities.filter(c => 
        c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
      );
      if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; padding: 1rem; color: var(--text-muted); text-align: center;">No matching cities found</div>';
      } else {
        grid.innerHTML = filtered.map(c => `
          <button class="city-pick-btn ${c.id === AppState.currentCity ? 'active' : ''}" onclick="CinemoraApp.selectCity('${c.id}')">
            ${c.popular ? '🔥 ' : ''}${c.name}
          </button>
        `).join('');
      }
    },
    selectCity(cityId) {
      AppState.currentCity = cityId;
      localStorage.setItem(STORAGE_KEYS.CITY, cityId);
      
      const cityBtn = document.getElementById('currentCityLabel');
      if (cityBtn) cityBtn.textContent = getCityName(cityId);

      this.closeCityModal();
      showToast(`City changed to ${getCityName(cityId)}`, 'info');
      handleRoute();
    },

    // Search
    handleSearchInput(query) {
      const dropdown = document.getElementById('searchResultsDropdown');
      if (!dropdown) return;

      if (!query || query.trim().length < 2) {
        dropdown.classList.remove('show');
        dropdown.innerHTML = '';
        return;
      }

      const q = query.toLowerCase().trim();
      const matches = CINEMORA_DATA.movies.filter(m => 
        m.title.toLowerCase().includes(q) ||
        m.language.toLowerCase().includes(q) ||
        m.genres.some(g => g.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some(c => c.name.toLowerCase().includes(q))
      );

      if (matches.length === 0) {
        dropdown.innerHTML = '<div style="padding:1rem; color:var(--text-muted); font-size:0.85rem;">No matching movies found</div>';
      } else {
        dropdown.innerHTML = matches.map(m => `
          <div class="search-item" onclick="window.location.hash='#/movie/${m.id}'; document.getElementById('searchResultsDropdown').classList.remove('show');">
            <img class="search-item-img" src="${m.posterPath}" alt="${m.title}" width="32" height="48" onerror="this.src='assets/img/poster-01.jpg'">
            <div>
              <div class="search-item-title">${m.title}</div>
              <div class="search-item-meta">${m.language} • ${m.genres.join(', ')} • ★ ${m.criticRating}</div>
            </div>
          </div>
        `).join('');
      }

      dropdown.classList.add('show');
    },

    // Filters
    filterLanguage(lang) {
      AppState.selectedLanguage = lang;
      renderHomePage(document.getElementById('appContent'));
    },
    filterGenre(genre) {
      AppState.selectedGenre = genre;
      renderHomePage(document.getElementById('appContent'));
    },

    // Hero carousel
    setHeroSlide(idx) {
      AppState.heroCarouselIndex = idx;
      renderHomePage(document.getElementById('appContent'));
    },

    // Favourites
    toggleFavourite(movieId) {
      const idx = AppState.favourites.indexOf(movieId);
      if (idx > -1) {
        AppState.favourites.splice(idx, 1);
        showToast('Removed from favourites', 'info');
      } else {
        AppState.favourites.push(movieId);
        showToast('Added to your favourites ❤️', 'success');
      }
      saveState(STORAGE_KEYS.FAVOURITES, AppState.favourites);
      
      document.querySelectorAll(`[data-movie-id="${movieId}"] .favourite-btn`).forEach(btn => {
        btn.classList.toggle('active', AppState.favourites.includes(movieId));
      });
    },

    // Booking Flow
    startBooking(showId, movieId, cinemaId, time, format) {
      AppState.currentBookingDraft = {
        showId: showId,
        movie: getMovieById(movieId),
        cinema: getCinemaById(cinemaId),
        date: 'Today',
        time: time,
        format: format,
        seats: [],
        fnb: {},
        coupon: null
      };

      window.location.hash = `#/book/${showId}`;
    },

    selectShowDate(dateStr, btn) {
      AppState.currentBookingDraft.date = dateStr;
      document.querySelectorAll('#bookingScheduleSection .lang-chip').forEach(c => c.classList.remove('active'));
      if (btn) btn.classList.add('active');
      showToast(`Selected date: ${dateStr}`, 'info');
    },

    highlightCategoryRows(catId) {
      document.querySelectorAll('.cat-showcase-card').forEach(c => c.classList.remove('highlighted'));
      const card = document.getElementById(`catCard-${catId}`);
      if (card) card.classList.add('highlighted');

      document.querySelectorAll('.seat-row').forEach(row => {
        if (row.dataset.category === catId) {
          row.classList.add('highlighted');
        } else {
          row.classList.remove('highlighted');
        }
      });
    },

    toggleSeatSelect(seatId) {
      const draft = AppState.currentBookingDraft;
      const btn = document.getElementById(`seat-${seatId}`);
      if (!btn || btn.disabled) return;

      const row = btn.dataset.row;
      const no = parseInt(btn.dataset.no, 10);
      const type = btn.dataset.type;
      const price = parseFloat(btn.dataset.price);
      const capacity = parseInt(btn.dataset.capacity, 10);
      const label = btn.dataset.label;

      const existingIndex = draft.seats.findIndex(s => s.id === seatId);

      if (existingIndex > -1) {
        draft.seats.splice(existingIndex, 1);
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        if (draft.seats.length >= 10) {
          showToast('Maximum 10 seats allowed per booking.', 'error');
          return;
        }

        draft.seats.push({
          id: seatId,
          row: row,
          no: no,
          type: type,
          price: price,
          capacity: capacity,
          label: label
        });

        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
      }

      const container = document.getElementById('selectedSeatsContainer');
      if (container) {
        container.innerHTML = renderSelectedSeatsThumbnails(draft.seats);
      }

      const totalElem = document.getElementById('liveTotalPrice');
      if (totalElem) {
        totalElem.textContent = formatCurrency(calculateSeatTotal(draft.seats));
      }

      const proceedBtn = document.getElementById('btnProceedCheckout');
      if (proceedBtn) {
        proceedBtn.disabled = draft.seats.length === 0;
        proceedBtn.style.opacity = draft.seats.length === 0 ? '0.5' : '1';
        proceedBtn.style.cursor = draft.seats.length === 0 ? 'not-allowed' : 'pointer';
      }
    },

    clearSelection() {
      AppState.currentBookingDraft.seats = [];
      document.querySelectorAll('.seat-btn.selected').forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
      });

      const container = document.getElementById('selectedSeatsContainer');
      if (container) {
        container.innerHTML = renderSelectedSeatsThumbnails([]);
      }

      const totalElem = document.getElementById('liveTotalPrice');
      if (totalElem) {
        totalElem.textContent = '₹0';
      }

      const proceedBtn = document.getElementById('btnProceedCheckout');
      if (proceedBtn) {
        proceedBtn.disabled = true;
        proceedBtn.style.opacity = '0.5';
        proceedBtn.style.cursor = 'not-allowed';
      }
    },

    proceedToCheckout() {
      if (!AppState.currentBookingDraft.seats || AppState.currentBookingDraft.seats.length === 0) {
        showToast('Please select at least 1 seat to continue.', 'error');
        return;
      }
      window.location.hash = '#/checkout';
    },

    updateFnbQuantity(itemId, delta) {
      const draft = AppState.currentBookingDraft;
      const current = draft.fnb[itemId] || 0;
      const next = Math.max(0, current + delta);
      draft.fnb[itemId] = next;
      renderCheckoutPage(document.getElementById('appContent'));
    },

    applyCoupon() {
      const input = document.getElementById('couponInput');
      if (!input) return;

      const code = input.value.trim().toUpperCase();
      const offer = CINEMORA_DATA.offers.find(o => o.code === code);

      if (offer) {
        AppState.currentBookingDraft.coupon = offer;
        showToast(`Coupon ${code} applied successfully! 🎉`, 'success');
        renderCheckoutPage(document.getElementById('appContent'));
      } else {
        showToast('Invalid promo code. Please check and try again.', 'error');
      }
    },

    copyPromoCode(code) {
      navigator.clipboard.writeText(code).then(() => {
        showToast(`Code ${code} copied to clipboard!`, 'success');
      }).catch(() => {
        showToast(`Promo Code: ${code}`, 'info');
      });
    },

    switchPayTab(tabName, btn) {
      document.querySelectorAll('.pay-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.payment-tab-content').forEach(c => c.classList.remove('show'));

      if (btn) btn.classList.add('active');
      const target = document.getElementById(`payTab-${tabName}`);
      if (target) target.classList.add('show');
    },

    autofillDemoCard() {
      const num = document.getElementById('demoCardNum');
      const exp = document.getElementById('demoCardExp');
      const cvv = document.getElementById('demoCardCvv');
      if (num) num.value = '4111 5555 8888 9999';
      if (exp) exp.value = '08/29';
      if (cvv) cvv.value = '777';
      showToast('Demo Card Details Auto-filled!', 'success');
    },

    selectDemoBank(bank) {
      showToast(`Selected ${bank} for Net Banking (Simulated)`, 'info');
    },

    async confirmBookingPayment(totalPaid) {
      const draft = AppState.currentBookingDraft;
      const bookingId = 'CNM-' + Date.now().toString().slice(-6);

      const bookingRecord = {
        id: bookingId,
        movieId: draft.movie.id,
        movieTitle: draft.movie.title,
        cinemaName: draft.cinema.name,
        date: draft.date || 'Today',
        time: draft.time || '07:45 PM',
        format: draft.format || 'Dolby Atmos',
        seatLabels: draft.seats.map(s => s.label),
        totalPaid: totalPaid,
        userName: AppState.user.name,
        bookingTime: new Date().toISOString(),
        status: 'CONFIRMED'
      };

      AppState.bookings.unshift(bookingRecord);
      saveState(STORAGE_KEYS.BOOKINGS, AppState.bookings);

      const occupiedMap = JSON.parse(localStorage.getItem(STORAGE_KEYS.OCCUPIED)) || {};
      const currentOccupied = occupiedMap[draft.showId] || [];
      draft.seats.forEach(s => currentOccupied.push(s.id));
      occupiedMap[draft.showId] = currentOccupied;
      saveState(STORAGE_KEYS.OCCUPIED, occupiedMap);

      try {
        await fetch(`${API_BASE_URL}/bookings/reserve`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            showId: draft.showId,
            movieId: draft.movie.id,
            movieTitle: draft.movie.title,
            cinemaName: draft.cinema.name,
            seats: draft.seats,
            totalPaid: totalPaid,
            user: AppState.user
          })
        });
      } catch (err) {}
      showToast('Payment successful! Generating your ticket...', 'success');
      setTimeout(() => {
        window.location.hash = `#/ticket/${bookingId}`;
      }, 600);
    },

    cancelBooking(bookingId) {
      const idx = AppState.bookings.findIndex(b => b.id === bookingId);
      if (idx > -1) {
        AppState.bookings.splice(idx, 1);
        saveState(STORAGE_KEYS.BOOKINGS, AppState.bookings);
        showToast('Booking cancelled. 100% demo refund initiated.', 'info');
        renderMyBookingsPage(document.getElementById('appContent'));
      }
    },

    joinMembership(tierId) {
      AppState.user.tier = tierId;
      saveState(STORAGE_KEYS.USER, AppState.user);
      showToast(`Upgraded to ${CINEMORA_DATA.membershipTiers[tierId].name}! Enjoy your VIP perks.`, 'success');
      handleRoute();
    },

    toggleFaq(idx) {
      const item = document.getElementById(`faqItem-${idx}`);
      if (!item) return;

      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const body = i.querySelector('.faq-body');
        if (body) body.style.maxHeight = '0px';
      });

      if (!isOpen) {
        item.classList.add('open');
        const body = item.querySelector('.faq-body');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    },

    openTrailerModal(movieId) {
      const movie = getMovieById(movieId) || CINEMORA_DATA.movies[0];
      const modal = document.getElementById('trailerModal');
      const title = document.getElementById('trailerModalTitle');
      if (modal && title) {
        title.textContent = `${movie.title} - Official Theatrical Trailer`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },
    closeTrailerModal() {
      const modal = document.getElementById('trailerModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    },

    openAuthModal() {
      const modal = document.getElementById('authModal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },
    closeAuthModal() {
      const modal = document.getElementById('authModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    },
    demoLogin(role = 'vip') {
      if (role === 'vip') {
        AppState.user = {
          name: 'Vikramaditya Oberoi',
          email: 'vikram.oberoi@cinemora.demo',
          phone: '+91 99887 76655',
          tier: 'royale',
          points: 1250,
          isLoggedIn: true
        };
      } else {
        AppState.user = {
          name: 'Pooja Mehta',
          email: 'pooja.mehta@example.com',
          phone: '+91 91234 56789',
          tier: 'silver',
          points: 120,
          isLoggedIn: true
        };
      }
      saveState(STORAGE_KEYS.USER, AppState.user);
      this.closeAuthModal();
      showToast(`Welcome, ${AppState.user.name}! Signed in as ${AppState.user.tier.toUpperCase()} Member`, 'success');
      handleRoute();
    },

    openReviewModal(movieId) {
      const modal = document.getElementById('reviewModal');
      if (modal) {
        modal.dataset.movieId = movieId;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },
    closeReviewModal() {
      const modal = document.getElementById('reviewModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    },
    submitUserReview() {
      const modal = document.getElementById('reviewModal');
      const headline = document.getElementById('reviewHeadline').value.trim();
      const text = document.getElementById('reviewText').value.trim();
      const rating = parseInt(document.getElementById('reviewRatingSelect').value, 10);

      if (!headline || !text) {
        showToast('Please fill out the headline and review text.', 'error');
        return;
      }

      const newReview = {
        id: 'rev-' + Date.now(),
        movieId: modal.dataset.movieId || 'mv-01',
        author: AppState.user.name,
        city: getCityName(AppState.currentCity),
        rating: rating,
        date: new Date().toISOString().split('T')[0],
        verified: true,
        headline: headline,
        text: text
      };

      AppState.userReviews.unshift(newReview);
      saveState(STORAGE_KEYS.REVIEWS, AppState.userReviews);

      this.closeReviewModal();
      showToast('Thank you! Your review has been published.', 'success');
      handleRoute();
    },

        downloadTicketPdf(bookingId) {
      const element = document.querySelector('.cinema-boarding-pass');
      if (!element) {
        window.print();
        return;
      }
      showToast('Generating high-resolution PDF pass...', 'info');
      if (window.html2pdf) {
        const opt = {
          margin:       0.3,
          filename:     `Cinemora_Ticket_${bookingId}.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        html2pdf().set(opt).from(element).save().then(() => {
          showToast('Ticket PDF downloaded successfully!', 'success');
        });
      } else {
        window.print();
      }
    },

    shareMovie(title) {
      if (navigator.share) {
        navigator.share({
          title: `Book ${title} on Cinemora`,
          text: `Check out ${title} playing at Cinemora Luxe Cinemas!`,
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!', 'info');
      }
    },

    // CINEBOT AI ASSISTANT CLIENT INTERFACE
    toggleCinebot() {
      const win = document.getElementById('cinebotWindow');
      if (!win) return;
      AppState.cinebotOpen = !AppState.cinebotOpen;
      win.classList.toggle('open', AppState.cinebotOpen);
      if (AppState.cinebotOpen) {
        const input = document.getElementById('cinebotInput');
        if (input) input.focus();
      }
    },

    async submitBotChat() {
      const input = document.getElementById('cinebotInput');
      if (!input || !input.value.trim()) return;
      const userText = input.value.trim();
      input.value = '';
      await this.sendBotMessage(userText);
    },

    async sendBotMessage(text) {
      const msgContainer = document.getElementById('cinebotMessages');
      if (!msgContainer) return;

      // Ensure window is visible
      const win = document.getElementById('cinebotWindow');
      if (win && !win.classList.contains('open')) {
        win.classList.add('open');
        AppState.cinebotOpen = true;
      }

      // Append User message
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-msg user-msg';
      userBubble.textContent = text;
      msgContainer.appendChild(userBubble);
      msgContainer.scrollTop = msgContainer.scrollHeight;

      // Typing indicator
      const typingBubble = document.createElement('div');
      typingBubble.className = 'chat-msg bot-msg';
      typingBubble.id = 'botTyping';
      typingBubble.innerHTML = '<em>CineBot is thinking...</em>';
      msgContainer.appendChild(typingBubble);
      msgContainer.scrollTop = msgContainer.scrollHeight;

      try {
        const res = await fetch(`${API_BASE_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        typingBubble.remove();

        const botBubble = document.createElement('div');
        botBubble.className = 'chat-msg bot-msg';
        // Render simple markdown bold and breaks
        let formatted = data.reply
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br>');
        
        if (data.action && data.action.type === 'NAVIGATE') {
          formatted += `<br><br><a href="${data.action.hash}" class="btn btn-primary btn-sm" style="display:inline-block; margin-top:6px;" onclick="CinemoraApp.toggleCinebot()">${data.action.label} →</a>`;
        }
        
        botBubble.innerHTML = formatted;
        msgContainer.appendChild(botBubble);

        // Update suggestion chips if provided
        if (data.suggestions && data.suggestions.length > 0) {
          const chipsContainer = document.getElementById('cinebotChips');
          if (chipsContainer) {
            chipsContainer.innerHTML = data.suggestions.map(s => `
              <button class="bot-chip" onclick="CinemoraApp.sendBotMessage('${s.replace(/'/g, "\\'")}')">${s}</button>
            `).join('');
          }
        }
      } catch (err) {
        typingBubble.remove();
        const errBubble = document.createElement('div');
        errBubble.className = 'chat-msg bot-msg';
        errBubble.innerHTML = 'CineBot is currently in offline demo mode. You can explore trending films directly on the home page!';
        msgContainer.appendChild(errBubble);
      }

      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  };

  // 18. ASYNC LIVE MOVIES LOADER (CONNECTS BACKEND DB & TMDB TO FRONTEND)
  async function loadLiveBackendMovies() {
    try {
      const res = await fetch(`${API_BASE_URL}/movies`);
      if (res.ok) {
        const data = await res.json();
        if (data.movies && data.movies.length > 0) {
          // Merge live TMDB movies seamlessly with local catalog
          CINEMORA_DATA.movies = data.movies;
          console.log(`🎬 Cinemora: Successfully connected to Live Backend Database (${data.movies.length} movies loaded).`);
          handleRoute(); // Refresh UI with live data
        }
      }
    } catch (e) {
      console.log('Backend server not detected or offline, falling back to local dataset.');
    }
  }

  // 18. INITIALIZATION ON DOM READY
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    const cityLabel = document.getElementById('currentCityLabel');
    if (cityLabel) cityLabel.textContent = getCityName(AppState.currentCity);

    const cityGrid = document.getElementById('cityModalGrid');
    if (cityGrid) {
      cityGrid.innerHTML = CINEMORA_DATA.cities.map(c => `
        <button class="city-pick-btn ${c.id === AppState.currentCity ? 'active' : ''}" onclick="CinemoraApp.selectCity('${c.id}')">
          ${c.popular ? '🔥 ' : ''}${c.name}
        </button>
      `).join('');
    }

    window.addEventListener('hashchange', handleRoute);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = 'auto';
      }
    });

    const burgerBtn = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    if (burgerBtn && mobileDrawer) {
      burgerBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('active');
      });
    }

    handleRoute();
    loadLiveBackendMovies();
  });

})();
