"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

import { CheckCircle, Stethoscope, Ambulance, CalendarDays } from "lucide-react";

type Booking = {
  id: number;
  name: string;
  email: string;
  service: string;
  date: string;
  note: string;
  status: "Pending" | "Accepted" | "Completed";
};

const SERVICES = [
   {
    id: 1,
    name: "Book a Doctor",
    description: "Consult with certified medical professionals.",
    icon: Stethoscope,
  },
  {
    id: 2,
    name: "Medical Transport",
    description: "Request safe and fast medical transportation.",
    icon: Ambulance,
  },
  {
    id: 3,
    name: "Routine Check-up",
    description: "Schedule your health check-ups with ease.",
    icon: CalendarDays,
  },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [form, setForm] = useState({ service: "", date: "", note: "" });


  useEffect(() => {
    if (!user) router.push("/login");
    const stored = localStorage.getItem("bookings");
    if (stored) setBookings(JSON.parse(stored));
  }, [user, router]);

  const handleSelectService = (service: string) => {
    setForm({ ...form, service });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.service || !form.date) return alert("Please select a service and date.");
    
    const newBooking: Booking = {
      id: Date.now(),
      name: user?.name || "",
      email: user?.email || "N/A",
      ...form,
      status: "Pending",
    };
    
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setForm({ service: "", date: "", note: "" });
  };


  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-blue-50 text-gray-600">
        <p>Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
       <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden mb-12">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 h-56 md:h-72 bg-cover bg-center" 
            style={{ backgroundImage: "url('/images/hero-2.jpg')" }}
          ></div>

          {/* Right: Welcome Message */}
          <div className="w-full md:w-1/2 p-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, {user.username} 👋
            </h1>
            <p className="text-gray-600 mb-4">
              We're glad to have you here. Book your next medical service in a few clicks.
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={logout}
                className="border border-red-600 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="relative z-10 max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg -mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Book a Service
        </h2>

        {/* Service Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return(
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelectService(s.name)}
              className={`relative border rounded-xl p-4 text-center transition-all ${
                form.service === s.name
                  ? "border-red-600 bg-red-50"
                  : "border-gray-300 hover:border-red-400"
              }`}
            >
               <div
                  className={`flex items-center justify-center rounded-full text-red-500 mb-4 p-4`}
                >
                  <Icon size={40} strokeWidth={1.75}/>
                </div>

               <span className="block text-gray-800 font-semibold mb-1">
                {s.name}
              </span>
               <span className="block text-sm text-gray-500 ">
                {s.description}
              </span>
              {form.service === s.name && (
                <CheckCircle className="absolute top-2 right-2 text-red-600 w-5 h-5" />
              )}
            </button>
          )})}
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
             Select Date and Time
            </label>
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 text-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Note (Optional)
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-300 text-gray-700 focus:ring focus:ring-blue-200 resize-none"
              placeholder="Add any special request..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Confirm Booking
          </button>
        </form>

        {/* Booking History */}
        {bookings.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              My Service Requests
            </h3>
            <ul className="space-y-3">
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-blue-700">{b.service}</p>
                    <p className="text-sm text-gray-500">📅 {b.date}</p>
                    {b.note && (
                      <p className="text-sm text-gray-600 mt-1">📝 {b.note}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end">
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        b.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : b.status === "Accepted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {b.status}
                    </span>
                    
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Logout */}
        {/* <button
          onClick={logout}
          className="mt-8 w-full border border-red-600 text-red-600 py-2 rounded-lg font-medium hover:bg-red-600 hover:text-white transition"
        >
          Logout
        </button> */}
      </section>
    </main>
  );
}
