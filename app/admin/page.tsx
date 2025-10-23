"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

type Booking = {
  id: number;
  name: string;
  email: string;
  service: string;
  date: string;
  note: string;
  status: "Pending" | "Accepted" | "Completed";
};

export default function AdminPage() {
 const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) setBookings(JSON.parse(stored));
  }, []);

  const updateStatus = (id: number, newStatus: Booking["status"]) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };
   if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-blue-50 text-gray-600">
        <p>Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">No new service requests.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b) => (
              <li
                key={b.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-red-700">{b.service}</p>
                  <p className="text-sm text-gray-500">📅 {b.date}</p>
                 <p className="text-sm text-gray-500">Requested by: {user.name}</p>
                <p className="text-sm text-gray-500">Email: {user.email}</p>
                  
                  {b.note && (
                    <p className="text-sm text-gray-600 mt-1">Additional Notes: {b.note}</p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
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

                  {b.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(b.id, "Accepted")}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Accept
                    </button>
                  )}

                  {b.status === "Accepted" && (
                    <button
                      onClick={() => updateStatus(b.id, "Completed")}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
