# README.md

# ClubNexus: University Club and Event Management Platform

ClubNexus is a modern, full-stack web application designed to centralize all **student clubs, events, and registration processes** for a university campus (e.g., Chitkara University). It serves as a comprehensive digital hub, moving club interaction from disparate social media pages to a single, seamless platform built for discovery and engagement.

---

## 🚀 Key Features and Project Goals

The primary objective of ClubNexus is to simplify the discovery and interaction process between students and the university's diverse club ecosystem.

* **Centralized Directory:** Provides dedicated, browsable sections for **Technical Clubs** and **Non-Technical Clubs**. The platform currently manages **16 distinct clubs** (8 technical, 8 non-technical).
* **Dual Authentication:** Supports secure local registration/login with password hashing via **`bcryptjs`**, complemented by scaffolding for quick sign-in using **Google OAuth**.
* **Modern User Experience:** Built as a **Single Page Application (SPA)** with React and utilizing a clean, responsive design powered by **Tailwind CSS**.
* **Engaging UI:** Features dynamic, animated backgrounds using the **`tsparticles`** library, enhancing visual appeal on key pages.
* **Detailed Club Pages:** Each club gets its own dedicated page (e.g., `/club/dhwani`) featuring a photo **Slideshow**, mock event listings, and social media links (Instagram, LinkedIn).

---

## ⚙️ Technology Stack

ClubNexus employs a modern MERN-like stack structure (MongoDB, Express, React, Node.js) with a strong emphasis on performance and developer experience.

| Layer | Technology | Key Modules | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend** (SPA) | **React** | `react`, `react-router-dom` (v7.9.5) | Core UI development and client-side routing. |
| | **Styling** | `tailwindcss` (v4.1.17) | Utility-first styling for responsiveness and custom themes. |
| | **Tooling** | `Vite` (v7.2.2) | Fast build tool and dev server with HMR. |
| | **UI Effects** | `react-tsparticles`, `tsparticles-slim` | Animated particle backgrounds for enhanced visual appeal. |
| **Backend** (API/Auth) | **Server** | `express` (v4.19.2), `cors` | RESTful API and server setup. |
| | **Database** | `mongoose` (v8.5.1), `mongodb` | ODM for connecting to MongoDB, used for persisting club and user data. |
| | **Authentication** | `bcryptjs` (v2.4.3), `jsonwebtoken` (v9.0.2) | Password hashing and JWT generation for stateless authentication. |
| | **Validation** | `joi` (v17.13.3) | Schema-based validation for request body data (e.g., during registration). |

---

## 🧱 Project Architecture and Structure

The project follows a decoupled Monorepo pattern (implied by the structure) organized into `/backend` and `/frontend` directories.

### 1. Backend Service (`/backend`)

The Express server handles all data operations and user authentication, running on **Port 5001** (as configured in `vite.config.js` proxy and `server.js` listener).

| File/Directory | Purpose | Implementation Details |
| :--- | :--- | :--- |
| `server.js` | **Main API & Auth Server** | Defines Mongoose schemas for `User` and `Clubs`. Implements GET endpoints for clubs (`/api/technical-clubs`, `/api/nontechnical-clubs`) and POST endpoints for authentication (`/auth/register`, `/auth/login`, and `/auth/google`). Configured to serve the React static build for production deployment. |
| `seed.js` | **Database Seeder** | Script to populate the MongoDB database with initial data for 16 clubs (8 technical, 8 non-technical). |
| `package.json` | Dependencies | Specifies core backend dependencies (Express, Mongoose) and authentication/security libraries. |

### 2. Frontend Application (`/frontend`)

The React application is built using **Vite** and configured as a Single Page Application (SPA).

| File/Directory | Purpose | Key Components/Functionality |
| :--- | :--- | :--- |
| `src/App.jsx` | **Router Configuration** | Defines all 21 routes including core routes (`/`, `/login`, `/register`), category routes, and specific club pages (e.g., `/club/dhwani`). |
| `src/pages/Home.jsx`| **Landing Page** | Fetches and displays featured clubs via API calls, uses the reusable `FaqItem` component, and includes the `ParticlesBg` effect. |
| `src/pages/Login.jsx` | **Login View** | Handles user login form submission to `/auth/login` and manages auth state via `AuthContext`. |
| `src/pages/Register.jsx`| **Registration View**| Collects user details (`name`, `email`, `year`, `batch`, `course`, `password`) and submits them to `/auth/register`. |
| `src/components/Navbar.jsx` | **Navigation** | Global fixed navigation bar that dynamically shows **Login/Sign Up** or **User Profile/Sign Out** based on `AuthContext` state. |
| `frontend/vite.config.js` | **Dev Configuration** | Includes a **proxy** to forward all `/api` and `/auth` requests from the Vite development server to the backend server. |

---

## 🔐 Authentication Flow and Security

The application utilizes a JWT-based authentication system managed through a dedicated `AuthContext`.

### 1. Registration (`/auth/register`)

1.  The frontend collects comprehensive user data.
2.  The backend validates the data using a **Joi schema**.
3.  The password is hashed using `bcryptjs` with a salt generated by `genSalt(10)`.
4.  A **JSON Web Token (JWT)** is generated and signed using `process.env.JWT_SECRET`, with an expiration time of `3600s`.
5.  The token and user data are returned on a `201` status.

### 2. Login (`/auth/login`)

1.  The backend verifies the provided `email` exists in the database.
2.  The password is authenticated via `bcrypt.compare`.
3.  On successful login, a new **JWT** is issued.

### 3. Client-Side Authentication Management

* The `AuthContext` stores the JWT and user object in `localStorage` upon login.
* It attempts to automatically restore the user session from `localStorage` if a valid (non-expired) token is present on application start.

---

## 🎭 Club Directory & Content Details

The platform currently lists **8 Technical** and **8 Non-Technical** clubs with mock events for demonstration.

### Technical Clubs

| Club Name | Tagline / Description | Example Event |
| :--- | :--- | :--- |
| **Coding Ninjas** | Sharpen coding skills with contests, projects, and mentorship. | CodeSprint: DSA Challenge. |
| **IEEE** | Innovate with technology, research, and professional networking. | Workshop: Intro to Robotics. |
| **GFG Student Chapter**| Dive into open source contributions and problem solving. | DSA Problem Solving Marathon. |
| **ACM** | Advance computing with workshops, papers, and events. | ACM Tech Talk: AI & Ethics. |
| **Open Source** | Contribute to real-world projects and collaborate globally. | Git & GitHub Workshop. |
| **Bit N Bytes** | Explore coding, gaming, and fun digital competitions. | LAN Gaming Night (Valorant). |
| **GDSC** | Learn and build using Google technologies with peers. | Intro to Google Cloud (GCP). |
| **Coding Blocks** | Master programming with bootcamps, courses, and events. | Data Structures Bootcamp. |

### Non-Technical Clubs

| Club Name | Tagline / Description | Example Event |
| :--- | :--- | :--- |
| **Literayllis** | The official literary society that celebrates poetry, debate, and storytelling. | Open Mic Night: "Expressions". |
| **Dhwani** | The music club that unites singers and instrumentalists to create soulful melodies. | Sur-Tarang (Singing Competition). |
| **Nati** | The dramatics club, showcasing stage plays, skits, and street theatre performances. | Rangrezz '24: Annual Theatre Fest. |
| **Custody** | The dance club, where passion meets rhythm and creativity takes the stage. | Hip-Hop Dance Battle. |
| **The Bhangra Regiment**| A high-energy bhangra crew spreading Punjabi culture through dance and enthusiasm. | Beginner Bhangra Workshop. |
| **Reflection** | The photography and cinematography club capturing creativity through the lens. | Lightroom Editing Workshop. |
| **Lethal Giddha Squad**| A dynamic all-girls team reviving traditional Punjabi giddha with a modern touch. | Giddha Workshop for Beginners. |
| **Natraj** | The classical dance club dedicated to Bharatanatyam, Kathak, and Odissi traditions. | Ghungroo Workshop: Kathak Basics. |

---

## 🛠️ Developer Notes

### Frontend Components Deep Dive

| Component | Purpose & Implementation | Key Files |
| :--- | :--- | :--- |
| **`ClubCard.jsx`** | Used in category pages (`TechnicalClubs.jsx`, `NonTechnicalClubs.jsx`) to display a club's name, description, image, and social links, all wrapped in a clickable element that routes to the dedicated club page. | `frontend/src/components/ClubCard.jsx` |
| **`EventCard.jsx`** | A reusable component for individual event listings, displaying `title`, `date`, `time`, and `description` within a card format featuring a prominent "Register Now" button and a red accent color. | `frontend/src/components/EventCard.jsx` |
| **`Slideshow.jsx`** | A gallery component used on individual club pages to showcase recent moments using an image array and a simple **4-second automatic transition**. | `frontend/src/components/Slideshow.jsx` |
| **`ParticlesBg.jsx`** | Renders the particle animation using `react-tsparticles` and the `tsparticles-slim` preset. The background is set to transparent, and particles are colored in red/orange tones (`#dc2626`, `#f97316`). | `frontend/src/components/ParticlesBg.jsx` |

### Static HTML Files (Prototyping)

Several static HTML files (`index.html`, `loginPage.html`, `registerPage.html`, etc.) are present, which served as **design prototypes** and wireframes prior to the React implementation:

* **`registerPage.html`**: Contains detailed client-side validation logic and password strength indicators (not fully carried over to the React version).
* **`bhangraregiment.html`**: A more feature-rich HTML template that includes a dedicated "Meet Our Team" section and multiple mock events, indicating a comprehensive initial design phase.
