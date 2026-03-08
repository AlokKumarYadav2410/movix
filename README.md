# Movix

Full-stack movie discovery platform built with React + Redux Toolkit (frontend) and Node.js + Express + MongoDB (backend).

Movix lets users explore movies, search in real-time, watch trailers, and manage favourites/history with JWT auth and role-based admin controls.

## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit + React Redux
- React Router
- SCSS modules
- Framer Motion
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT auth (cookie-based)
- TMDB API integration
- Express rate limiting

<!-- ## Project Structure

```text
Movix/
  backend/
    src/
      controllers/
      middleware/
      models/
      routes/
      services/
      utils/
    server.js
  frontend/
    src/
      app/
      features/
        auth/
        movies/
        user/
        admin/
      shared/
      styles/
``` -->

## Features

- Movie feed sections (trending, popular, top-rated, upcoming)
- Explore page with debounce search + infinite scroll + filters
- Trailer modal with safe fallback when trailer is unavailable
- JWT cookie auth (register/login/logout)
- Favourites and watch history (persisted in DB)
- Admin dashboard:
  - Add, edit, delete movies
  - View users
  - Ban/unban users
  - Delete users
- Responsive UI with mobile drawer sidebar
- Theme toggle (dark/light)

## Security Notes

- Registration is locked to `role: "user"` on backend.
- Admin access is role-protected (`RequireAdmin` on frontend + admin middleware on backend).
- API rate-limiting is enabled with separate auth and general limits.

## Prerequisites

- Node.js `20.19+` recommended (`20.16.0` may run but shows warnings)
- npm
- MongoDB instance
- TMDB API key

## Environment Variables

Create `backend/.env`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/movix
JWT_SECRET=replace_with_strong_secret
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_tmdb_api_key
```

## Install

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Run (Development)

Use two terminals.

### Terminal 1: backend

```bash
cd backend
npm run dev
```

### Terminal 2: frontend

```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:3000`

## Build

### Frontend

```bash
cd frontend
npm run build
```

## Admin Setup (Current Recommended Flow)

1. Register a normal user from app.
2. Promote user directly in DB.

Using `mongosh`:

```javascript
use movix

db.users.updateOne(
  { email: "admin@movix.com" },
  { $set: { role: "admin", isBanned: false } }
)
```

3. Logout and login again so token contains updated role.

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Movies
- `GET /api/movies/trending`
- `GET /api/movies/popular`
- `GET /api/movies/top-rated` (auth)
- `GET /api/movies/upcoming` (auth)
- `GET /api/movies/search?q=...` (auth)
- `GET /api/movies/:id`
- `GET /api/movies/:id/full` (auth)

### User
- `GET /api/favourites` (auth)
- `POST /api/favourites` (auth)
- `DELETE /api/favourites/:movieId` (auth)
- `GET /api/history` (auth)
- `POST /api/history` (auth)
- `DELETE /api/history` (auth)

### Admin
- `POST /api/movies` (admin)
- `PUT /api/movies/:id` (admin)
- `DELETE /api/movies/:id` (admin)
- `GET /api/users` (admin)
- `PUT /api/users/ban/:id` (admin)
- `PUT /api/users/unban/:id` (admin)
- `DELETE /api/users/:id` (admin)

## Troubleshooting

### Too many requests
- Rate limiting is active by design.
- Auth and general API limits are separated.
- Logout endpoint is excluded from lockout.

### Node engine warnings
- Upgrade Node to `20.19+` or `22.12+` for clean builds.

### Movie details redirect to login
- Movie details are protected and require auth.
- This is intentional and consistent with favourites/history.

## License

For learning and portfolio use.
