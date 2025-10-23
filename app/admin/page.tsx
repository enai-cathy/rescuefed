
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import AdminHeader from "@/app/components/admin/AdminHeader";
import BookingCard from "@/app/components/admin/BookingCard";
import EmptyState from "@/app/components/admin/EmptyState";

export type BookingStatus = "Pending" | "Accepted" | "Completed";

export type Booking = {
  id: number;
  name: string;
  email: string;
  service: string;
  date: string;
  note: string;
  status: BookingStatus;
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Fetch from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) setBookings(JSON.parse(stored));
  }, []);

  // Update booking status
  const updateStatus = (id: number, newStatus: BookingStatus) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2b0000] to-[#3a0000] text-white">
        <p className="text-lg animate-pulse">Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100 py-12 px-6">
      <div className="max-w-5xl mx-auto mt-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-red-100 overflow-hidden">
        <AdminHeader name={user.name || "Admin"} />

        <section className="p-8">
          {bookings.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="space-y-6">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  updateStatus={updateStatus}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

