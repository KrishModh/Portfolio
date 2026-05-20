<div align="center">

<br/>

```
██╗  ██╗██████╗ ██╗███████╗██╗  ██╗    ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗      ██████╗ ███████╗
██║ ██╔╝██╔══██╗██║██╔════╝██║  ██║    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗    ██╔═══██╗██╔════╝
█████╔╝ ██████╔╝██║███████╗███████║    ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║    ██║   ██║███████╗
██╔═██╗ ██╔══██╗██║╚════██║██╔══██║    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║    ██║   ██║╚════██║
██║  ██╗██║  ██║██║███████║██║  ██║    ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝    ╚██████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝      ╚═════╝ ╚══════╝
```

<br/>

### ✦ Premium Full-Stack Developer Portfolio Platform ✦

<br/>

[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=fff)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=fff)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=fff)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=fff)](https://www.mongodb.com/atlas)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=fff)](https://cloudinary.com)

<br/>

[![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](https://github.com/your-username/krish-portfolio-os/pulls)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red?style=flat-square)](https://github.com/your-username)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-blue?style=flat-square)]()

<br/>

[🌐 Live Portfolio](https://your-portfolio-domain.com) &nbsp;·&nbsp;
[🔐 Admin Panel](https://your-admin-dashboard.vercel.app) &nbsp;·&nbsp;
[📖 API Docs](#-api-reference) &nbsp;·&nbsp;
[🚀 Deploy Now](#-deployment)

<br/>

</div>

---

## 🧠 What Is This?

**Krish Portfolio OS** is not just another portfolio template — it's a **production-grade, full-stack portfolio platform** engineered like a real SaaS product.

It ships with a polished **public-facing portfolio**, a **private admin control center**, and a **secure REST API** — all wired together with MongoDB Atlas, Cloudinary, JWT auth, and a bulletproof security middleware stack.

Built by a **Full Stack Developer & Application Security Engineer** who takes both UX polish and backend hardening seriously.

> *"Your portfolio is your product. Ship it like one."*

---

## ✨ Feature Highlights

<table>
<tr>
<td width="50%">

### 🎨 Public Portfolio
- Animated hero, about, skills, projects & certificates
- Dynamic data — everything from the API, nothing hardcoded
- Framer Motion page transitions & micro-interactions
- Tilt cards, scroll progress bar, and reduced-motion support
- Dark / light theme toggle built-in

</td>
<td width="50%">

### 🛡️ Admin Dashboard
- JWT-protected private dashboard
- Full CRUD for projects, certificates, and settings
- Contact message inbox with read/unread state
- Image uploads with live Cloudinary previews
- Profile editor — name, title, socials, resume URL, hero stats

</td>
</tr>
<tr>
<td width="50%">

### ⚙️ Backend API
- Express REST API with clean route modules
- MongoDB Atlas with text-search indexes
- Cloudinary asset management (upload + delete)
- HTTP-only cookie + bearer token auth support
- Centralized async error handling

</td>
<td width="50%">

### 🔒 Security First
- Helmet for secure HTTP headers
- CORS origin allowlisting
- Rate limiting — global + per-route (contact form)
- NoSQL injection hardening (mongo-sanitize)
- XSS sanitization & express-validator rules

</td>
</tr>
</table>

---

## 🧱 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| ⚛️ React 18 | Component-based UI for both public and admin apps |
| ⚡ Vite 8 | Lightning-fast dev server and optimized production builds |
| 🔀 React Router | Client-side routing, protected dashboard navigation |
| 🎞️ Framer Motion | Page transitions and motion design |
| 🖼️ Lucide React | Consistent icon system |
| 🎨 External CSS | Modular CSS with global variables, utilities, animations |
| 📡 Axios | API client with credential and auth token support |
| 🍞 React Hot Toast | Lightweight toast notification system |

### Backend
| Technology | Purpose |
|---|---|
| 🟢 Node.js | JavaScript runtime for the API service |
| 🚂 Express.js | REST API routing and middleware pipeline |
| 🍃 Mongoose | MongoDB object modeling and schema validation |
| 🔑 JWT | Stateless admin session authentication |
| 📦 Multer | Multipart file upload handling |
| ☁️ Cloudinary SDK | Image upload, transformation, and deletion |

### Security & Platform
| Layer | Tool |
|---|---|
| HTTP Security Headers | `helmet` |
| Origin Control | `cors` with allowlist |
| Rate Limiting | `express-rate-limit` |
| Input Validation | `express-validator` |
| NoSQL Injection Guard | `express-mongo-sanitize` |
| XSS Sanitization | `xss` |
| Response Compression | `compression` |

---

## 🗂️ Project Structure

```
Krish Portfolio OS/
│
├── 👤 users/                        # Public-facing portfolio (Vite + React)
│   └── src/
│       ├── animations/              # Framer Motion variants
│       ├── components/              # Portfolio sections & shared UI
│       ├── context/                 # Theme & portfolio data providers
│       ├── hooks/                   # Reduced motion, UI hooks
│       ├── layouts/                 # Public layout shell
│       ├── pages/                   # Portfolio routes & 404
│       ├── services/                # Public API client (Axios)
│       ├── styles/                  # External CSS architecture
│       └── utils/                   # Skills data, tilt helpers
│
├── 🔐 admin/                        # Private admin dashboard (Vite + React)
│   └── src/
│       ├── components/              # Admin layout, dialogs, image picker
│       ├── context/                 # Auth & theme providers
│       ├── pages/                   # Dashboard, projects, certificates, messages, settings
│       ├── routes/                  # Protected route wrapper
│       ├── services/                # Authenticated admin API client
│       ├── styles/                  # Dashboard CSS modules
│       └── utils/                   # UI interaction helpers
│
├── ⚙️ backend/                      # Express REST API
│   └── src/
│       ├── config/                  # Env, database, Cloudinary config
│       ├── controllers/             # API business logic
│       ├── middleware/              # Auth, upload, validation, error handling
│       ├── models/                  # Mongoose schemas
│       ├── routes/                  # Express route modules
│       ├── scripts/                 # Admin seed utility
│       ├── utils/                   # Async handler, errors, Cloudinary helpers
│       └── validators/              # express-validator rules
│   └── server.js
│
└── 📄 README.md
```

---

## 🖼️ Screenshots

> _Screenshots below are placeholders — replace with your deployed app captures._

| Public Portfolio | Admin Dashboard |
|---|---|
| ![Homepage](./docs/screenshots/homepage.png) | ![Admin](./docs/screenshots/admin-dashboard.png) |

| Projects Section | Mobile View |
|---|---|
| ![Projects](./docs/screenshots/projects.png) | ![Mobile](./docs/screenshots/mobile-responsive.png) |

---

## ⚡ Quick Start

### Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** and **npm**
- **MongoDB Atlas** account & cluster
- **Cloudinary** account
- **Git**

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/krish-portfolio-os.git
cd krish-portfolio-os
```

### 2. Install Dependencies

```bash
# Backend
cd backend && npm install

# Public Portfolio
cd ../users && npm install

# Admin Dashboard
cd ../admin && npm install
```

---

## 🔑 Environment Variables

### `backend/.env`

```env
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>

JWT_SECRET=replace_with_a_long_random_secret_value
JWT_EXPIRES_IN=7d
ADMIN_COOKIE_NAME=portfolio_admin_token

ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=replace_with_a_strong_admin_password

FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
UPLOAD_FOLDER=krish-portfolio

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=120
CONTACT_RATE_LIMIT_MAX=5
```

### `users/.env` & `admin/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> ⚠️ **Never commit real `.env` values.** Use your hosting provider's secret management for production credentials.

---

## 🏃 Running Locally

Open three terminal windows and run each service:

```bash
# Terminal 1 — Backend API
cd backend && npm run dev
# → http://localhost:5000/api

# Terminal 2 — Public Portfolio
cd users && npm run dev
# → http://localhost:5173

# Terminal 3 — Admin Dashboard
cd admin && npm run dev
# → http://localhost:5174
```

**API Health Check:**
```
GET http://localhost:5000/api/health
```

---

## 📡 API Reference

**Base URL:** `/api`

### 🔐 Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/login` | Public | Login with admin credentials |
| `GET` | `/auth/me` | Protected | Get current admin session |
| `POST` | `/auth/logout` | Protected | Clear admin session |

### 🗂️ Projects
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/projects` | Public | List all projects (featured first) |
| `GET` | `/projects/:id` | Public | Get single project |
| `POST` | `/projects` | Protected | Create project with image |
| `PUT` | `/projects/:id` | Protected | Update project |
| `DELETE` | `/projects/:id` | Protected | Delete project + Cloudinary asset |

**Supported fields:** `title` · `description` · `techStack` · `githubUrl` · `liveUrl` · `featured` · `image`

### 🏅 Certificates
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/certificates` | Public | List all certificates by issue date |
| `POST` | `/certificates` | Protected | Create certificate with image |
| `PUT` | `/certificates/:id` | Protected | Update certificate |
| `DELETE` | `/certificates/:id` | Protected | Delete certificate + Cloudinary asset |

**Supported fields:** `title` · `description` · `issuer` · `issuedAt` · `credentialUrl` · `image`

### 📬 Contact & Messages
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/contact` | Public | Submit contact message |
| `GET` | `/contact/messages` | Protected | View message inbox with counts |
| `PATCH` | `/contact/messages/:id/read` | Protected | Mark message as read |
| `DELETE` | `/contact/messages/:id` | Protected | Delete message |

### ⚙️ Settings
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/settings` | Public | Get public profile & portfolio settings |
| `PUT` | `/settings` | Protected | Update profile, socials, resume, stats, about |

**Supported fields:** `name` · `title` · `email` · `location` · `githubUrl` · `linkedinUrl` · `resumeUrl` · `about` · `availability` · `heroStats`

---

## 🚀 Deployment

### Frontend → Vercel

Deploy `users/` and `admin/` as **two separate Vercel projects.**

| Setting | Public Portfolio | Admin Dashboard |
|---|---|---|
| Root Directory | `users` | `admin` |
| Build Command | `npm run build` | `npm run build` |
| Output Directory | `dist` | `dist` |
| Environment Variable | `VITE_API_BASE_URL=https://your-backend.onrender.com/api` | `VITE_API_BASE_URL=https://your-backend.onrender.com/api` |

### Backend → Render

Create a **Render Web Service** pointed at the `backend/` directory:

| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Runtime | Node |

Set all production environment variables from the [Environment Variables](#-environment-variables) section above (with real MongoDB, Cloudinary, and deployment URLs).

### MongoDB Atlas Setup

1. Create a project and cluster in [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Add a database user with a strong password
3. Allow access from your Render service IP (or `0.0.0.0/0` for testing)
4. Copy the connection string → paste as `MONGODB_URI` in Render

### Cloudinary Setup

1. Sign in to [Cloudinary](https://cloudinary.com)
2. Copy your **Cloud Name**, **API Key**, and **API Secret**
3. Set `UPLOAD_FOLDER=krish-portfolio` to organize your media

---

## ✅ Production Checklist

```
□  Add production MongoDB Atlas URI
□  Add production Cloudinary credentials
□  Set a strong JWT_SECRET (32+ random characters)
□  Set a strong ADMIN_USERNAME and ADMIN_PASSWORD
□  Configure FRONTEND_URL and ADMIN_URL to match deployed URLs
□  Deploy backend API before both frontends
□  Set VITE_API_BASE_URL in both Vercel projects
□  Upload real screenshots to docs/screenshots/
□  Test admin login, CRUD flows, image uploads, contact form
□  Verify CORS works for both deployed frontend origins
```

---

## 🎨 UI/UX Philosophy

Krish Portfolio OS is designed to feel like a **premium SaaS product**, not a basic portfolio page.

- **Glassmorphism UI** — layered depth, frosted-glass cards, and purposeful blur
- **Framer Motion** — smooth transitions and staggered reveals that enhance content, not distract from it
- **Responsive-first** — desktop, tablet, and mobile layouts that all feel intentional
- **Theme system** — dark/light modes with consistent CSS variables throughout
- **Micro-interactions** — tilt cards, scroll progress, animated loaders, and page entry effects
- **Accessibility** — reduced-motion awareness built in for sensitive users
- **Modular CSS** — external stylesheets with global variables and utility classes; no style spaghetti

---

## 🔒 Security Architecture

Security isn't an afterthought here — it's a core feature, matching the Application Security Engineering identity behind the portfolio.

| Layer | Implementation |
|---|---|
| 🔑 Authentication | JWT sessions with HTTP-only cookie support |
| 🌍 CORS | Explicit origin allowlist for portfolio and admin URLs |
| 🪖 Headers | Helmet middleware for secure HTTP headers |
| ⏱️ Rate Limiting | Global API limits + stricter per-route limits on contact form |
| ✅ Input Validation | express-validator rules on all write endpoints |
| 💉 NoSQL Injection | mongo-sanitize middleware on all requests |
| 🧹 XSS Sanitization | Contact input cleaned with `xss` library |
| 📤 Upload Safety | Controlled multer + Cloudinary pipeline |
| 🚫 Error Handling | Centralized error responses — no stack traces in production |
| 🔐 Secrets | All credentials loaded from environment variables only |

---

## 🛠️ Build Commands

| App | Command | Output |
|---|---|---|
| Public Portfolio | `cd users && npm run build` | `users/dist/` |
| Admin Dashboard | `cd admin && npm run build` | `admin/dist/` |
| Backend | `cd backend && npm start` | Starts `server.js` |

---

## 📄 License

This project is released under the **MIT License.**

You are free to use, modify, and distribute this project with attribution. For personal or commercial use, update the author branding, screenshots, deployment URLs, and environment configuration before publishing.

---

## 👤 Author

<div align="center">

<br/>

### Krish

**Full Stack Developer · Application Security Engineer**

*Building secure, polished, and scalable web applications with a strong focus on real-world usability, clean engineering, and application security.*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-linkedin)
[![Portfolio](https://img.shields.io/badge/🌐_Live_Portfolio-FF5722?style=for-the-badge)](https://your-portfolio-domain.com)

<br/>

---

<br/>

```
╔════════════════════════════════════════════╗
║    Built, secured, and shipped by Krish    ║
╚════════════════════════════════════════════╝
```

<br/>

⭐ **If this project helped you, drop a star — it means a lot!** ⭐

<br/>

</div>