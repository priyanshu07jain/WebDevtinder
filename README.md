# 🚀 DevTinder - Full Stack Developer Networking App

DevTinder is a MERN stack application designed for developers to connect, swipe, and network. This project focuses on complex state management, secure authentication, and a robust Node.js backend architecture.

## 🛠️ Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, DaisyUI
- **State Management:** Redux Toolkit (@reduxjs/toolkit)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Communication:** Axios (with Credentials)

---

## 🏗️ Project Journey & Milestones

### 1. UI & Setup
- [x] Initialized Vite + React application.
- [x] Configured **Tailwind CSS** and **DaisyUI** for modern styling.
- [x] Built a responsive **NavBar** and **Footer**.
- [x] Implemented **React Router Dom** with Layout nesting using `<Outlet />`.

### 2. Authentication & Security
- [x] Created a secure **Login/Signup** system.
- [x] Integrated **Axios** with `withCredentials: true` to handle secure cookie-based sessions.
- [x] **CORS Configuration:** Backend enabled for specific origins with credential support.
- [x] **Route Protection:** Implemented logic to redirect unauthorized users to `/login`.
- [x] **Logout:** Securely clear sessions and state.

### 3. State Management (Redux)
- [x] Configured `configureStore`.
- [x] Created specialized slices: `userSlice`, `feedSlice`, `connectionSlice`, and `requestSlice`.
- [x] Verified data flow using **Redux DevTools**.
- [x] Dynamic UI updates (NavBar reflects user state instantly).

### 4. Core Features
- [x] **Feed:** Fetch and display developer cards; implemented "Ignore" and "Interested" logic.
- [x] **Connections:** View and manage accepted connections.
- [x] **Requests:** Manage incoming/outgoing connection requests (Accept/Reject).
- [x] **Profile:** Edit profile details with real-time **Toast Notifications** on success.

---

## 🛣️ Routing Architecture
The app follows a structured routing tree:
- `Route=/` → **Body** (Layout wrapper)
    - `index` → **Feed**
    - `/login` → **Login/Signup**
    - `/profile` → **Edit Profile**
    - `/connections` → **Connections List**
    - `/requests` → **Pending Requests**

---
