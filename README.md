# 🚑 RescueFed – Medical Transport Booking Platform

**RescueFed** is a modern web application that enables patients, hospitals, and healthcare providers to easily book **medical transportation services** — by **air, train, or road** — for emergencies or scheduled transfers.

Built with **Next.js**, **TypeScript**, and **React Context**, the platform demonstrates strong user-centric design, authentication logic, and local data persistence for admin and user views.

---

## 🧭 Features

### 👤 Authentication
- Secure **login and logout system** using React Context for state management.
- **Protected routes** ensure only logged-in users can access the booking dashboard.

### 🚑 Booking System
- Book medical transport via **Air**, **Train**, or **Road**.
- Each booking captures:
  - Transport type  
  - Pickup & destination  
  - Date/time of transport  
  - Optional medical or logistical notes  
- Stored locally using unique keys for each user: `bookings_{user.email}`.

### 📋 Booking History
- Users can view all past and active bookings in their dashboard.
- Requests are sorted by **most recent first** for convenience.

### 🧠 Admin Visibility
- All bookings are also stored globally under `allTransportBookings`, allowing for easy aggregation or admin management.

### ✅ Status Tracking
- Each booking displays a dynamic **status badge**:  
  - 🟡 Pending  
  - 🔵 Accepted  
  - 🟢 Completed  

### 🧭 Responsive UI
- Clean, mobile-first design using **Tailwind CSS** and **Lucide Icons**.
- Each transport option has its own card with visual cues and interactive selection states.

---

## 🧱 Tech Stack

| Category | Tools Used |
|-----------|-------------|
| Framework | **Next.js (App Router)** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** |
| Icons | **Lucide React** |
| Auth | Custom React Context (`useAuth`) |
| Storage | LocalStorage (mock database) |
| Deployment | Ready for **Vercel** deployment |

---

## ⚙️ How It Works

1. **Login/Register:**  
   Users authenticate through the custom `AuthContext`.

2. **Book Transport:**  
   Choose transport type → enter date/time, pickup, destination → submit.

3. **Data Storage:**  
   Booking saved under:
   - `bookings_{user.email}` (personal)
   - `allTransportBookings` (global admin)
   - `userRequests` (user-requests view)

4. **View Requests:**  
   User and admin pages pull data, sort by ID, and render requests dynamically.

---

## 🧩 Folder Structure


