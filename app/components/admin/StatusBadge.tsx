// import { Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
// import { BookingStatus } from "@/app/admin/page";

// export default function StatusBadge({ status }: { status: BookingStatus }) {
//   const styles = {
//     Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
//     Accepted: "bg-blue-100 text-blue-700 border-blue-200",
//     Completed: "bg-green-100 text-green-700 border-green-200",
//   }[status];

//   const icons = {
//     Pending: <Clock className="w-4 h-4 mr-1" />,
//     Accepted: <ShieldCheck className="w-4 h-4 mr-1" />,
//     Completed: <CheckCircle2 className="w-4 h-4 mr-1" />,
//   }[status];

//   return (
//     <span
//       className={`inline-flex items-center text-sm font-semibold px-3 py-1 rounded-full border ${styles}`}
//     >
//       {icons}
//       {status}
//     </span>
//   );
// }
