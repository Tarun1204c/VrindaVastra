
cd# E-commerce-website-Vrindavastra-
e-commerce website using react
=======
# VrindaVastra

A full-stack e-commerce application built with React, Vite, Express, MongoDB, and Razorpay.

## Overview

This project contains two main applications:

- `Backend/` — Express API server with authentication, product management, cart/wishlist, orders, payments, reviews, coupons, and user address management.
- `Frontend/` — React single-page application built with Vite and React Router for browsing products, cart checkout, wishlist, user profile, and order history.

## Key Features

- User authentication and JWT-based protected routes
- Product listing, details, add/update/delete (admin only)
- Cart and wishlist management
- Order placement and Razorpay payment integration
- Coupon creation and application
- Review posting and retrieval
- User profile update and password management
- Address management and default address selection
- Admin dashboard endpoints
- Email notifications using Nodemailer

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer, Razorpay, Nodemailer
- Frontend: React, Vite, React Router, Axios, Bootstrap, React Toastify

## Repository Structure

- `Backend/`
  - `config/` — database, mail, Razorpay configuration
  - `controllers/` — business logic for each feature
  - `middleware/` — authentication, authorization, file upload
  - `models/` — Mongoose schemas for users, products, orders, cart, wishlist, etc.
  - `routes/` — API route definitions
  - `uploads/` — static folder for image uploads
  - `server.js` — Express server entrypoint
- `Frontend/`
  - `src/components/` — shared UI components
  - `src/pages/` — route pages
  - `src/routes/` — application routing
  - `src/services/` — Axios API client
  - `src/context/` — cart state context

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- MongoDB connection string
- Razorpay API keys
- Gmail account or SMTP service for email notifications

## Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `Backend/` with the following values:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password_or_app_password
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

> The backend API runs on `http://localhost:5000` by default.

## Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

> The frontend development server runs on `http://localhost:5173` by default.

## Running the App

- Start the backend server first.
- Start the frontend server second.
- Visit `http://localhost:5173` to browse the application.

## API Base URL

The frontend is configured to call the backend API at:

```js
http://localhost:5000/api
```

## Important Notes

- Replace example environment values with secure credentials.
- The current `.env` file may contain sensitive values; do not commit it to version control.
- Uploaded images are served from the backend `uploads/` folder.

## Scripts

### Backend

- `npm start` — run the Express server

### Frontend

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

## Contact

For any issues or improvements, update the project documentation and share the relevant details.
>>>>>>> 211179d (Initial commit)
