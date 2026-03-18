# OroGlee - Dentist Appointment Booking Platform

A full-stack MERN application for booking dentist appointments with an admin dashboard for managing patient records.

## Live Links

- **Frontend:** https://oro-glee-dentist-booking-platform.vercel.app
- **Backend:** https://oroglee-dentist-booking-platform.onrender.com

## Tech Stack

**Frontend**

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Fetch API

**Backend**

- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs

## Features

- Dentist listing page with cards
- Complete appointment booking flow
- Form validation (client-side)
- Appointment status tracking (Booked / Completed)
- Admin authentication using JWT
- Admin dashboard with stats and patient records table
- Fully responsive UI

## Project Structure

```
OroGlee/
├── backend/
│   ├── models/
│   │   ├── Dentist.js
│   │   ├── Appointment.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── dentists.js
│   │   ├── appointments.js
│   │   └── auth.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── seed/
│   │   └── seedData.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── DentistCard.jsx
│   │   │   └── AppointmentTable.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── App.jsx
│   └── .env.local
```

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Run the admin seed script once:

```bash
node seed/seedData.js
```

Start the backend:

```bash
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend folder:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

## API Endpoints

### Dentists

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /api/dentists     | Fetch all dentists   |
| GET    | /api/dentists/:id | Fetch single dentist |
| POST   | /api/dentists     | Add a dentist        |

### Appointments

| Method | Endpoint          | Description            |
| ------ | ----------------- | ---------------------- |
| GET    | /api/appointments | Fetch all appointments |
| POST   | /api/appointments | Create appointment     |

### Auth

| Method | Endpoint        | Description |
| ------ | --------------- | ----------- |
| POST   | /api/auth/login | Admin login |

## Admin Credentials

```
Username: admin
Password: admin123
```

## Architecture

The backend follows MVC-style separation of concerns. Models define the MongoDB schema, Routes handle API request/response logic, and Middleware handles JWT verification for protected routes. The Appointment model references the Dentist model using MongoDB ObjectId, allowing Mongoose's populate method to return full dentist details when fetching appointments.

The frontend uses React Router for client-side navigation with dynamic URL parameters to pass dentist IDs between pages. JWT tokens are stored in localStorage for persistent admin sessions.

## Deployment

- Backend deployed on **Render**
- Frontend deployed on **Vercel**
- Database hosted on **MongoDB Atlas**
