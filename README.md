# CINEMORA — Premium Movie-Ticket Booking Platform
> **Tagline:** *"Your Seat. Your Show. Your Experience."*

CINEMORA is a luxury, fully static Indian movie-ticket booking web platform designed to deliver an unforgettable commercial cinema experience. Built from the ground up with vanilla web technologies, the platform showcases a warm ivory luxury aesthetic, fluid micro-interactions, responsive design, real curated stock photography, and an innovative 4-tier seat booking engine.

---

## 🌟 Key Architecture & Highlights

1. **100% Fully Static & Zero External Dependencies**:
   - Crafted strictly with modern **HTML5**, **CSS3**, and **Vanilla JavaScript**.
   - No frameworks, no Node.js, no npm, no build pipelines, and no remote API calls.
   - Works immediately by double-clicking `index.html` via the `file://` protocol.
   - Client-side Hash Routing (`#/movies`, `#/movie/:id`, `#/book/:showId`, `#/checkout`, `#/ticket/:id`, `#/cinemas`, `#/offers`, `#/membership`, `#/reviews`, `#/bookings`, `#/account`).

2. **Light, Warm Premium Colour System & Dark Mode Toggle**:
   - **Default Theme (Warm Ivory Luxury)**:
     - Page Background: `#FAF7F2` (warm ivory)
     - Card / Surface: `#FFFFFF` with glassmorphic navbar blur
     - Alternate Sections: `#F3EEE6`
     - Typography: `#1F1B16` (headings & body) / `#6B645A` (muted)
     - Primary Accents: `#C9A227` (Luxe Gold) & `#D7263D` (Cinematic Crimson)
     - Seat Categories: `#2E9E6A` (Standard Green), `#3B6FD8` (Prime Blue), `#7B4FD1` (Recliner Purple), `#D97706` (Couple Sofa Amber)
   - **Dark Mode Option**: One-click theme switcher in the navbar toggles a deep charcoal/obsidian mode (`[data-theme="dark"]`), preserved in `LocalStorage`.
   - **Accessibility & Contrast**: Built according to WCAG AA guidelines with high-contrast text ratios, visible focus outlines, and responsive typography.

3. **Curated Real Stock Photography (100% Offline & Licensed)**:
   - Contains 28 high-resolution local images in `assets/img/` downloaded under the free-to-use Unsplash license:
     - 14 distinct cinematic theatrical movie posters (`poster-01.jpg` to `poster-14.jpg`).
     - 4 panoramic wide cinematic hero banners (`hero-01.jpg` to `hero-04.jpg`).
     - 4 authentic cinema auditorium & lobby scenes (`cinema-01.jpg` to `cinema-04.jpg`).
     - Real luxury cinema amenities: motorized leather recliner (`recliner.jpg`), plush double sofa seats (`sofa-seats.jpg`), VIP lounge royale (`lounge-royale.jpg`), gourmet popcorn (`popcorn.jpg`), movie tickets (`tickets.jpg`), and gala premiere lights (`premiere.jpg`).
   - Complete photographic legal ledger & attribution available on [`credits.html`](file:///c:/Users/prachi/OneDrive/Desktop/sem%203/credits.html) and in the footer modal.
   - Fallback CSS gradients ensure no broken visuals even if files are missing.

4. **New "Trending Now" Section with Gold Ranking & Filters**:
   - Prominently positioned directly beneath the hero banner.
   - Horizontal scroll-snap carousel showcasing top theatrical releases.
   - Large gold outline rank typography (**#1**, **#2**, ... **#10**) with red flame badge (`🔥 TRENDING`).
   - Dynamic tabbed filtering: **Today**, **This Week**, **In My City** (adapts dynamically to the selected city), and **All Languages**.
   - Hover zoom, elevation, and quick-info overlay showing duration, genre, certification, and direct "Book Tickets" CTA.
   - **Photo Highlights Strip**: 6-frame visual mosaic linking directly to VIP experiences and offers.

5. **Persistent LocalStorage State**:
   - Stores and synchronizes user bookings, favourite movies, community reviews, membership tier, active city, and theme preference across sessions.

6. **Transparent Demo Compliance**:
   - Every movie, showtime, pricing, coupon, bank offer, and seat occupancy is fictional and clearly badged with **"Demo Data"** / **"Simulated Availability"** in the UI.

7. **Zero Dead Buttons & Zero Broken Links**:
   - Every navigation item, footer link, coupon button, filter tab, and modal trigger executes a tangible, polished action.

---

## 🚀 How to Run

1. Simply double-click `index.html` in your file explorer to open it in any modern browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, open a local static server if preferred:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000 in your browser
   ```
3. To access the operational manager dashboard, open `admin.html` or click the **"Admin Console"** link in the footer.
4. To view image attribution and photography licenses, open `credits.html` or click **"Photography Credits"** in the footer.

---

## 💺 The Star Feature: 4-Tier Seat Booking Engine

The seat booking page (`#/book/:showId`) features:
- **Curved Screen Stage Illustration**: Emits an ambient top-down blue projection cone (*"All Eyes This Way"*).
- **Interactive Category Showcase Cards with Real Photos**: Located directly above the seat map. Shows real photos for VIP Recliners and Couple Sofas alongside prices and perks. Clicking any card highlights the corresponding rows on the map.
- **Buttons with Real SVG Graphics**: Every seat is an interactive `<button>` containing the actual category SVG illustration.
  - Standard Seat (Green stroke on light ivory panel)
  - Premium Seat (Blue stroke)
  - Luxury Recliner (Purple stroke with tilted backrest and footrest)
  - Double Couple Sofa (Rose-gold stroke)
  - Hover tooltip indicates Row, Seat Number, Category, Tariff, and Status.
  - Accessible via full keyboard navigation (`Tab` + `Enter`/`Space`) and `aria-pressed` / `aria-label`.
- **Double Couple Sofa (Row J)**:
  - 2-person wide horizontal love-seat sofa.
  - One click reserves the entire 2-person unit at a single inclusive price (₹1,200). Never half-selectable.
- **Seat Rules**:
  - Maximum 10 seats/units per transaction.
  - Occupied seats are disabled with subtle grayscale shading.
- **Live Summary Drawer**:
  - Displays mini thumbnail SVGs of chosen seats.
  - Real-time recalculation of base ticket fare, convenience fee, GST, and discounts.

---

## 🧪 College Jury Evaluation & Test Checklist

Follow this quick walkthrough to inspect all features:

| Step | Feature to Test | Expected Behavior |
|------|-----------------|-------------------|
| 1 | **Light & Dark Theme Switcher** | Click the ☀️ / 🌙 button in the top navbar. Notice the smooth color transition between warm luxury ivory (`#FAF7F2`) and cinematic midnight dark (`#0E1015`). Preference persists on page refresh! |
| 2 | **Trending Now Carousel** | Inspect the gold-numbered cards (#1 to #10) below the hero. Switch between **Today**, **This Week**, **In My City**, and **All Languages** tabs. Use the arrows or swipe to scroll. |
| 3 | **City Switcher** | Click **"📍 Ahmedabad"** in the top navbar. Choose Mumbai, Delhi, or Bengaluru from the 20 Indian cities grid. Notice how **"Trending in <City>"**, **"Popular Near You"**, and cinema listings immediately adapt. |
| 4 | **Hero Banner & Trailer** | Auto-rotates featured titles with synopsis, rating pill, genre chips. Click dots or **"Watch Trailer"** to view simulated 4K player modal. |
| 5 | **Filter Bar & Search** | Click language chips (e.g. *Gujarati*, *Telugu*, *Hindi*) or type into the global search bar with instant live autocompletion. |
| 6 | **Add to Favourites** | Click the heart icon on any movie card. Heart animates red, count increments, and movie is saved to `#/account`. |
| 7 | **Movie Details (`#/movie/:id`)** | View panoramic backdrop, synopsis, cast circles, dual Critic vs Audience meters, 7-day date selector tabs, and theatre showtimes. |
| 8 | **Seat Booking (`#/book/:showId`)** | Select seats across Standard, Premium, Recliner, and Couple Sofa. Notice the category highlight cards with real photos, live thumbnail badges in the summary bar, and dynamic price calculation. |
| 9 | **F&B Concessions** | On checkout (`#/checkout`), use steppers to add Artisanal Caramel Popcorn or Royal Duo Combos. |
| 10 | **Apply Promo Code** | Type `CINEMORA50`, `GOLDLUXE`, or `FIRSTSHOW` and click Apply to see instant discount deduction. |
| 11 | **Demo Payment** | Switch between UPI (QR Code), Card (**"⚡ Auto-fill Test Card"**), Net Banking, and Wallets. Click Pay. |
| 12 | **Digital Boarding Pass** | View the boarding pass ticket with QR code, barcode, seat tags, and booking reference `#CNM-XXXXXX`. Click **"Download / Print Ticket"** to trigger custom print styles. |
| 13 | **My Bookings (`#/bookings`)** | Inspect the newly booked ticket listed under active reservations. Test the **"Cancel (Refund)"** button. |
| 14 | **Cinemora Club (`#/membership`)** | Upgrade to **VIP Royale**. Notice convenience fees become **FREE** on checkout! |
| 15 | **Admin Console (`admin.html`)** | Inspect live revenue counters, bookings audit log, and test booking generator. |
| 16 | **Image Credits (`credits.html`)** | Click "Photography Credits" in the footer to review full Unsplash licensing and photographer attributions. |
| 17 | **CineBot AI Assistant (New)** | Click the floating **"🤖 Ask CineBot"** button at bottom-right. Ask questions like *"What is trending today?"*, *"Best seats for couples"*, or *"Current bank offers"*. CineBot fetches live intelligence from the backend database! |
| 18 | **AI Market Box Office & Sentiment Analysis** | Click on any movie details page (`#/movie/:id`). Notice the live **AI Market Box Office & Sentiment Analysis** badge indicating positive audience sentiment percentage and screen recommendations. |

---

## ⚡ Fullstack & AI Backend (Node.js + Express + TMDB Ingestion)

The project includes an intelligent fullstack backend located in `/server`:
- **Live TMDB Ingestion (`/server/tmdbService.js`)**: Real-time sync of currently running theatrical releases in India with high-res posters, genres, and ratings.
- **AI Sentiment & Box Office Engine**: Computes real-time market buzz, critical sentiment scores, and recommended auditorium formats.
- **CineBot AI Engine (`/server/cineBotService.js`)**: Real-time cinema concierge API responding to natural language movie queries.
- **Persistent JSON Database (`/server/database.json`)**: Persistent storage for live movies, users, bookings, and occupied seats.

### To start the backend server:
```bash
cd server
node server.js
# Backend API runs on http://localhost:5000
```

---

## 📁 Project File Structure

```text
├── index.html                 # Main single-page application & modal templates
├── admin.html                 # Operations dashboard & booking audit suite
├── credits.html               # Photography attribution ledger & legal disclosure
├── style.css                  # Light luxury design system, dark mode & print styles
├── script.js                  # Client router, state engine & interaction handlers
├── data.js                    # Fictional movies, cities, cinemas, layout & menus
├── README.md                  # Documentation and test checklist
└── assets/
    ├── logo.svg               # Original film strip + ticket notch logo
    ├── seat-standard.svg      # Silver Class standard seat icon
    ├── seat-premium.svg       # Prime Blue lounge seat icon
    ├── seat-recliner.svg      # Motorized VIP Recliner with footrest
    ├── seat-sofa.svg          # Double Couple Sofa unit (2 persons)
    ├── popcorn.svg            # Artisanal Caramel Popcorn
    ├── drinks.svg             # Chilled Blue Curacao Cooler
    ├── nachos.svg             # Loaded Mexican Cheese Nachos
    ├── combo.svg              # Royal Cinema Duo Combo
    ├── cinema-interior-1.svg  # Royale VIP Lounge interior
    ├── cinema-interior-2.svg  # IMAX Laser Curved Screen interior
    ├── cinema-interior-3.svg  # Samsung Onyx 4K LED Screen interior
    ├── cinema-interior-4.svg  # Director's Cut & Dolby Atmos interior
    ├── posters/               # Fallback vector artwork posters (14 files)
    └── img/                   # 28 Curated high-res Unsplash stock photos
        ├── poster-01.jpg to 14.jpg   # 14 Real theatrical mood movie posters
        ├── hero-01.jpg to 04.jpg     # 4 Cinematic widescreen hero backdrops
        ├── cinema-01.jpg to 04.jpg   # 4 Real auditorium & lobby photographs
        ├── recliner.jpg              # VIP leather motorized recliner seat
        ├── sofa-seats.jpg            # Luxury double cinema sofa loungers
        ├── lounge-royale.jpg         # Luxury VIP cinema lounge
        ├── popcorn.jpg               # Artisanal cinema concession popcorn
        ├── tickets.jpg               # Cinematic tickets & reel
        ├── premiere.jpg              # Gala theatrical searchlights
        └── README.txt                # Offline photo registry & license data
```

---

*Crafted for academic demonstration with fine attention to detail, accessibility, and visual elegance.*
