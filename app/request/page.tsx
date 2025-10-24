"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  CheckCircle,
  Plane,
  Train,
  Truck,
  MapPin,
  CalendarDays,
} from "lucide-react";

type TransportType = "Air" | "Train" | "Road";

type TransportBooking = {
  id: number;
  name: string;
  email: string;
  transportType: TransportType;
  date: string;
  pickup: string;
  destination: string;
  details: string;
  status: "Pending" | "Accepted" | "Completed";
};

const TRANSPORT_OPTIONS = [
  {
    id: 1,
    type: "Air" as TransportType,
    description: "Fast and safe medical air transport.",
    icon: Plane,
  },
  {
    id: 2,
    type: "Train" as TransportType,
    description: "Comfortable long-distance medical transfer.",
    icon: Train,
  },
  {
    id: 3,
    type: "Road" as TransportType,
    description: "Reliable ground ambulance services.",
    icon: Truck,
  },
];

export default function MedicalTransportPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState<TransportBooking[]>([]);
  const [form, setForm] = useState({
    transportType: "" as TransportType | "",
    date: "",
    pickup: "",
    destination: "",
    details: "",
  });

  useEffect(() => {
    if (!user){  router.push("/login");return;}


  const userKey = `bookings_${user.email}`;
    const stored = localStorage.getItem(userKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Sort recent first
      const sorted = parsed.sort((a: TransportBooking, b: TransportBooking) => b.id - a.id);
      setBookings(sorted);
    }
  }, [user, router]);

  const handleSelectType = (type: TransportType) => {
    setForm((prev) => ({ ...prev, transportType: type }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.transportType || !form.date || !form.pickup || !form.destination)
      return alert("Please fill in all required fields.");

    const newBooking: TransportBooking = {
      id: Date.now(),
      name: user?.name || "",
      email: user?.email || "N/A",
      transportType: form.transportType as TransportType,
      date: form.date,
      pickup: form.pickup,
      destination: form.destination,
      details: form.details,
      status: "Pending",
    };

  // Store for this specific user
    const userKey = `bookings_${user?.email}`;
    const existingUserBookings = JSON.parse(localStorage.getItem(userKey) || "[]");
    const updatedUserBookings = [...existingUserBookings, newBooking];
    localStorage.setItem(userKey, JSON.stringify(updatedUserBookings));
    setBookings(updatedUserBookings.sort((a, b) => b.id - a.id));

    // Also store globally for admin view
    const existingGlobal = JSON.parse(localStorage.getItem("allTransportBookings") || "[]");
    localStorage.setItem("allTransportBookings", JSON.stringify([...existingGlobal, newBooking]));

    alert("Booking submitted successfully!");
    setForm({ transportType: "", date: "", pickup: "", destination: "", details: "" });
  };

 

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-blue-50 text-gray-600">
        <p>Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden mb-12">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left: Image */}
          <div
            className="w-full md:w-1/2 h-56 md:h-72 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-2.jpg')" }}
          ></div>

          {/* Right: Welcome Message */}
          <div className="w-full md:w-1/2 p-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, {user.username} 👋
            </h1>
            <p className="text-gray-600 mb-4">
              Need medical transport? Book safe and reliable air, train, or road
              transfers easily.
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
          Book Medical Transport
        </h2>

        {/* Transport Type Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {TRANSPORT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = form.transportType === opt.type;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectType(opt.type)}
                className={`relative border rounded-xl p-4 text-center transition-all ${
                  isSelected
                    ? "border-red-600 bg-red-50"
                    : "border-gray-300 hover:border-red-400"
                }`}
              >
                <div
                  className={`flex items-center justify-center rounded-full text-red-500 mb-4 p-4`}
                >
                  <Icon size={40} strokeWidth={1.75} />
                </div>

                <span className="block text-gray-800 font-semibold mb-1">
                  {opt.type} Transport
                </span>
                <span className="block text-sm text-gray-500">
                  {opt.description}
                </span>
                {isSelected && (
                  <CheckCircle className="absolute top-2 right-2 text-red-600 w-5 h-5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date and Time
            </label>
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Pickup Location
            </label>
            <input
              type="text"
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200"
              placeholder="Enter pickup address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200"
              placeholder="Enter destination address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200 resize-none"
              placeholder="Enter any special instructions or patient condition"
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
              My Transport Requests
            </h3>
            <ul className="space-y-3">
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-blue-700">
                      {b.transportType} Transport
                    </p>
                    <p className="text-sm text-gray-500">
                      📅 {new Date(b.date).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      🚑 {b.pickup} → {b.destination}
                    </p>
                    {b.details && (
                      <p className="text-sm text-gray-600 mt-1">
                        📝 {b.details}
                      </p>
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
      </section>
    </main>
  );
}
