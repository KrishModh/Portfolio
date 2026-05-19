# Krish Portfolio Platform

Premium full-stack developer portfolio platform with:

- `users` public React/Vite portfolio with pure external CSS
- `admin` protected React/Vite dashboard with pure external CSS
- `backend` secure Express/MongoDB/Cloudinary API
- CSS architecture: variables, global rules, animations, utilities, responsive media queries, and section-level styles

## Environment Setup

Copy each example file and fill real values:

```bash
cp backend/.env.example backend/.env
cp users/.env.example users/.env
cp admin/.env.example admin/.env
```

No API URLs, MongoDB URI, JWT secret, Cloudinary credentials, social links, or resume URLs are hardcoded.

Admin dashboard login uses these backend `.env` credentials:

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
```

## Backend

```bash
cd backend
npm install
npm run dev
```

The API exposes:

- `POST /api/auth/login`
- `GET /api/projects`
- `POST /api/projects` protected
- `PUT /api/projects/:id` protected
- `DELETE /api/projects/:id` protected
- `GET /api/certificates`
- `POST /api/certificates` protected
- `PUT /api/certificates/:id` protected
- `DELETE /api/certificates/:id` protected
- `POST /api/contact`
- `GET /api/contact/messages` protected
- `DELETE /api/contact/messages/:id` protected
- `GET /api/settings`
- `PUT /api/settings` protected

## Public Portfolio

```bash
cd users
npm install
npm run dev
```

Vercel-ready via `vercel.json`.

## Admin Dashboard

```bash
cd admin
npm install
npm run dev
```

Render-ready backend and Vercel-ready frontends. Configure CORS using `FRONTEND_URL` and `ADMIN_URL` in the backend `.env`.
