"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import AdminHeader from "@/app/components/admin/AdminHeader";
import EmptyState from "@/app/components/admin/EmptyState";
import { Plane, Train, Truck } from "lucide-react";

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

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<TransportBooking[]>([]);

  //  Load all bookings for admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login");
      return;
    }

    const stored = localStorage.getItem("allTransportBookings");
    if (stored) {
      try {
        const parsed: TransportBooking[] = JSON.parse(stored);
        const sorted = parsed.sort((a, b) => b.id - a.id);
        setBookings(sorted);
      } catch (err) {
        console.error("Error parsing bookings:", err);
      }
    }

    //  Listen for updates from other tabs or user actions
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "allTransportBookings" && e.newValue) {
        const parsed: TransportBooking[] = JSON.parse(e.newValue);
        const sorted = parsed.sort((a, b) => b.id - a.id);
        setBookings(sorted);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [user, router]);

  // // Updates both admin and user localStorage copies
  // const updateStatus = (id: number, newStatus: TransportBooking["status"]) => {
   
  //   // Update in admin view
  //   const updatedBookings = bookings.map((b) =>
  //     b.id === id ? { ...b, status: newStatus } : b
  //   );
  //   const sorted = updatedBookings.sort((a, b) => b.id - a.id);
  //   setBookings(sorted);
  //   localStorage.setItem("allTransportBookings", JSON.stringify(sorted));

  //   // Update user's bookings copy
  //   const userBookings =
  //     JSON.parse(localStorage.getItem("transportBookings") || "[]") || [];
  //   const updatedUserBookings = userBookings.map((b: TransportBooking) =>
  //     b.id === id ? { ...b, status: newStatus } : b
  //   );
  //   localStorage.setItem("transportBookings", JSON.stringify(updatedUserBookings));
  // };

const updateStatus = (id: number, newStatus: TransportBooking["status"]) => {
  const updatedGlobal = bookings.map((b) =>
    b.id === id ? { ...b, status: newStatus } : b
  );
  setBookings(updatedGlobal);
  localStorage.setItem("allTransportBookings", JSON.stringify(updatedGlobal));

  // Find booking’s owner and update their individual storage
  const booking = updatedGlobal.find((b) => b.id === id);
  if (booking) {
    const userKey = `bookings_${booking.email}`;
    const userBookings = JSON.parse(localStorage.getItem(userKey) || "[]");
    const updatedUserBookings = userBookings.map((b: TransportBooking) =>
      b.id === id ? { ...b, status: newStatus } : b
    );
    localStorage.setItem(userKey, JSON.stringify(updatedUserBookings));
  }
};


  const transportIcons: Record<TransportType, any> = {
    Air: Plane,
    Train: Train,
    Road: Truck,
  };

  return (
    <main className="min-h-screen bg-gray-50 py-18 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl border border-gray-100 overflow-hidden">
        <AdminHeader name={user?.username || "Admin"} />

        <section className="p-8">
          {bookings.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="space-y-6">
              {bookings.map((b) => {
                const Icon = transportIcons[b.transportType];
                return (
                  <li
                    key={b.id}
                    className="border border-gray-200 rounded-xl p-4 flex justify-between items-start md:items-center bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-red-50 text-red-500">
                        <Icon size={32} strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {b.transportType} Transport
                        </p>
                        <p className="text-sm text-gray-500">
                          {b.name} ({b.email})
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          📅 {new Date(b.date).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          🚑 {b.pickup} → {b.destination}
                        </p>
                        {b.details && (
                          <p className="text-sm text-gray-600 mt-1">📝 {b.details}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
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
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateStatus(b.id, "Accepted")}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
                          >
                            Accept
                          </button>
                        </div>
                      )}

                      {b.status === "Accepted" && (
                        <button
                          onClick={() => updateStatus(b.id, "Completed")}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
