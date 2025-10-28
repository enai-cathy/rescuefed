# 🚑 RescueFed – Medical Transport Booking Platform

**RescueFed** is a modern web application that enables patients, hospitals, and healthcare providers to easily book **medical transportation services** — by **air, train, or road** — for emergencies or scheduled transfers.

Built with **Next.js**, **TypeScript**, and **React Context**, the platform demonstrates strong user-centric design, authentication logic, and local data persistence for admin and user views.

---

##  Features

###  Authentication
- Secure **login and logout system** using React Context for state management.
- **Protected routes** ensure only logged-in users can access the booking dashboard.

###  Booking System
- Book medical transport via **Air**, **Train**, or **Road**.
- Each booking captures:
  - Transport type  
  - Pickup & destination  
  - Date/time of transport  
  - Optional medical or logistical notes  
- Stored locally using unique keys for each user: `bookings_{user.email}`.

###  Booking History
- Users can view all past and active bookings in their dashboard.
- Requests are sorted by **most recent first** for convenience.

###  Admin Visibility
- All bookings are also stored globally under `allTransportBookings`, allowing for easy aggregation or admin management.

###  Status Tracking
- Each booking displays a dynamic **status badge**:  
  - 🟡 Pending  
  - 🔵 Accepted  
  - 🟢 Completed  

###  Responsive UI
- Clean, mobile-first design using **Tailwind CSS** and **Lucide Icons**.
- Each transport option has its own card with visual cues and interactive selection states.

---

##  Tech Stack

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

##  How It Works

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

##  Folder Structure
```
src/
│
├── app/
│ ├── page.tsx # Landing page
│ ├── login/ # Login and registration logic
│ ├── transport/ # Booking dashboard
│ ├── admin/ # Admin panel (optional)
│ └── context/
│ └── AuthContext.tsx # Handles auth and global user state
│
├── components/
│ ├── Navbar.tsx
│ └── Footer.tsx
│
└── public/
└── images/
├── hero-1.jpg
└── hero-2.jpg

```
---

## 🚀 Setup & Installation

```bash
# Clone repository
git clone https://github.com/<your-username>/rescuefed.git

# Move into project folder
cd rescuefed

# Install dependencies
npm install

# Start the development server
npm run dev

```
Then open http://localhost:3000
 to view it in your browser.

## Demo Users

You can mock user accounts locally:
```
//lib/users.js
{
  "username": "John Doe",
  "email": "john@example.com"
}
```

Bookings are stored in LocalStorage under this user's unique key.

##  Future Improvements

If given more time and resources, I would:

- Integrate Firebase or Supabase for real authentication and data sync.

- Add a Node.js + Prisma backend with a Postgres database.

- Include real-time ambulance tracking using Mapbox or Google Maps API.

- Implement a booking approval dashboard for admins and hospital staff.

- Launch a React Native mobile version for field responders.

- Add email/SMS notifications for booking status updates.

## Key Learning Highlights

Hands-on experience building end-to-end CRUD functionality in Next.js.

Used React Context API for scalable global state management.

Designed reusable UI components with Tailwind and Lucide icons.

Practiced data synchronization patterns between user and admin views.

## Author

Enaikato Cathy Ige-Edaba

📧 enaicathy@gmail.com

🌐 Portfolio- https://my-portfolio-lovat-ten-17.vercel.app/ or LinkedIn-https://www.linkedin.com/in/enaikato-ige-edaba-5b9538216/

### ⭐ If you found this project interesting, consider starring the repo!
