// "use client";

// import { Booking, BookingStatus } from "@/app/admin/page";
// import StatusBadge from "@/app/components/admin/StatusBadge";

// interface Props {
//   booking: Booking;
//   updateStatus: (id: number, newStatus: BookingStatus) => void;
// }

// export default function BookingCard({ booking, updateStatus }: Props) {
//   return (
//     <li className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
//       <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
//         {/* Booking Info */}
//         <div>
//           <h2 className="text-xl font-semibold text-[#7c0000] mb-1">
//             {booking.service}
//           </h2>
//           <p className="text-sm text-gray-500">📅 {booking.date}</p>
//           <p className="text-sm text-gray-500">
//             Requested by: {booking.name || "Unknown"}
//           </p>
//           <p className="text-sm text-gray-500">Email: {booking.email}</p>
//           {booking.note && (
//             <p className="text-sm text-gray-600 mt-2 italic border-l-2 border-red-300 pl-3">
//               “{booking.note}”
//             </p>
//           )}
//         </div>

//         {/* Status + Actions */}
//         <div className="flex flex-col items-end gap-3">
//           <StatusBadge status={booking.status} />

//           {booking.status === "Pending" && (
//             <button
//               onClick={() => updateStatus(booking.id, "Accepted")}
//               className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#7c0000] text-white hover:bg-[#900000] transition"
//             >
//               Accept Request
//             </button>
//           )}

//           {booking.status === "Accepted" && (
//             <button
//               onClick={() => updateStatus(booking.id, "Completed")}
//               className="px-4 py-2 text-sm font-semibold rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
//             >
//               Mark as Completed
//             </button>
//           )}
//         </div>
//       </div>
//     </li>
//   );
// }
