import express from 'express';
import cors from 'cors';
import { getDb, saveDb } from './db.js';
import { fetchLiveIndianTheatricalMovies, analyzeMarketMovie } from './tmdbService.js';
import { processChatQuery } from './cineBotService.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '..')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

// 1. INITIAL SYNC OF MOVIES & CINEMAS ON STARTUP
async function bootstrapData() {
  const db = getDb();
  console.log('🚀 Synchronizing Cinemora Database...');

  // If no movies exist or on bootstrap, fetch live Indian releases from TMDB
  if (!db.movies || db.movies.length === 0) {
    const liveMovies = await fetchLiveIndianTheatricalMovies();
    if (liveMovies && liveMovies.length > 0) {
      db.movies = liveMovies;
      console.log(`✅ Loaded ${liveMovies.length} real live movies from TMDB!`);
    }
  }

  // Ensure initial cinemas & default shows exist
  if (!db.cinemas || db.cinemas.length === 0) {
    db.cinemas = [
      { id: 'cin-01', name: 'Cinemora Royale Lounge & IMAX', city: 'ahmedabad', locality: 'Sindhu Bhavan Road, Bodakdev', screens: 6, rating: 4.9 },
      { id: 'cin-02', name: 'Cinemora Onyx LED & Director Cut', city: 'ahmedabad', locality: 'Palladium Mall, Thaltej', screens: 5, rating: 4.8 },
      { id: 'cin-03', name: 'Cinemora Luxe Atmos', city: 'mumbai', locality: 'Bandra Kurla Complex (BKC)', screens: 8, rating: 4.9 },
      { id: 'cin-04', name: 'Cinemora Grand Palais', city: 'delhi', locality: 'Connaught Place', screens: 7, rating: 4.9 }
    ];
  }

  saveDb(db);
}

// 2. REST API ROUTES

// GET /api/movies - Returns all now showing & trending movies
app.get('/api/movies', (req, res) => {
  const db = getDb();
  res.json({
    success: true,
    count: db.movies.length,
    movies: db.movies
  });
});

// GET /api/movies/refresh-tmdb - Trigger fresh sync of live Indian theatrical releases
app.post('/api/movies/refresh-tmdb', async (req, res) => {
  const liveMovies = await fetchLiveIndianTheatricalMovies();
  if (liveMovies) {
    const db = getDb();
    db.movies = liveMovies;
    saveDb(db);
    return res.json({ success: true, message: 'Successfully updated live movies from TMDB', movies: liveMovies });
  }
  res.status(500).json({ success: false, message: 'Failed to update from TMDB' });
});

// GET /api/movies/:id/analysis - Real-time AI Sentiment & Box Office Analysis for a film
app.get('/api/movies/:id/analysis', (req, res) => {
  const db = getDb();
  const movie = db.movies.find(m => m.id === req.params.id);
  if (!movie) {
    return res.status(404).json({ success: false, message: 'Movie not found' });
  }
  const analysis = analyzeMarketMovie(movie);
  res.json({ success: true, analysis });
});

// GET /api/shows - Available showtimes for a movie and city
app.get('/api/shows', (req, res) => {
  const { movieId, city } = req.query;
  const db = getDb();
  const cityCinemas = db.cinemas.filter(c => !city || c.city === city.toLowerCase());
  
  const sampleShows = cityCinemas.map(c => ({
    cinemaId: c.id,
    cinemaName: c.name,
    locality: c.locality,
    timings: [
      { time: '10:45 AM', format: 'Silver / Prime', showId: `${c.id}-1045` },
      { time: '02:15 PM', format: 'IMAX Laser 3D', showId: `${c.id}-1415` },
      { time: '06:30 PM', format: 'VIP Recliner Suite', showId: `${c.id}-1830` },
      { time: '09:45 PM', format: 'Double Couple Sofa Lounge', showId: `${c.id}-2145` }
    ]
  }));

  res.json({ success: true, shows: sampleShows });
});

// GET /api/seats/:showId - Occupied seat status
app.get('/api/seats/:showId', (req, res) => {
  const db = getDb();
  const occupied = db.occupiedSeats[req.params.showId] || [];
  res.json({ success: true, showId: req.params.showId, occupiedSeats: occupied });
});

// POST /api/bookings/reserve - Lock & finalize seat booking into Database
app.post('/api/bookings/reserve', (req, res) => {
  const { showId, movieId, movieTitle, cinemaName, seats, totalPaid, user } = req.body;
  if (!seats || seats.length === 0) {
    return res.status(400).json({ success: false, message: 'No seats selected' });
  }

  const db = getDb();
  const occupied = db.occupiedSeats[showId] || [];

  // Check if any seat is already booked
  const conflict = seats.some(s => occupied.includes(s.id));
  if (conflict) {
    return res.status(409).json({ success: false, message: 'One or more selected seats have just been booked by another user.' });
  }

  // Mark seats as occupied
  seats.forEach(s => occupied.push(s.id));
  db.occupiedSeats[showId] = occupied;

  // Create booking record
  const bookingId = 'CNM-' + Date.now().toString().slice(-6);
  const newBooking = {
    id: bookingId,
    movieId,
    movieTitle,
    cinemaName,
    seats: seats.map(s => s.label),
    totalPaid,
    userName: user ? user.name : 'Valued Patron',
    bookingTime: new Date().toISOString(),
    status: 'CONFIRMED'
  };

  db.bookings.unshift(newBooking);
  saveDb(db);

  res.json({
    success: true,
    message: 'Booking confirmed successfully!',
    booking: newBooking
  });
});

// GET /api/bookings - Get all bookings
app.get('/api/bookings', (req, res) => {
  const db = getDb();
  res.json({ success: true, bookings: db.bookings });
});

// POST /api/chat - CineBot AI Chat Assistant
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  const db = getDb();
  const response = processChatQuery(message, db);
  res.json({ success: true, ...response });
});

// Start Server
app.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`🎬 CINEMORA Fullstack Server running at http://localhost:${PORT}`);
  console.log(`======================================================\n`);
  await bootstrapData();
});
