import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

// Initialize database with default structure if not exists
const defaultData = {
  movies: [],
  cinemas: [],
  shows: [],
  bookings: [],
  users: [
    {
      id: 'usr-1',
      name: 'Vikramaditya Oberoi',
      email: 'vikram.oberoi@cinemora.demo',
      tier: 'royale',
      points: 1250
    },
    {
      id: 'usr-2',
      name: 'Pooja Mehta',
      email: 'pooja.mehta@example.com',
      tier: 'silver',
      points: 120
    }
  ],
  occupiedSeats: {}, // showId -> array of seatIds
  reviews: [],
  offers: []
};

export function getDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB, re-initializing:', err);
    return defaultData;
  }
}

export function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving DB:', err);
    return false;
  }
}
