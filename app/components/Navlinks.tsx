"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

interface NavLinksProps {
  onClick?: () => void;
}

export default function NavLinks({ onClick }: NavLinksProps) {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0">
      <Link
        href="/dashboard"
        onClick={onClick}
        className="text-gray-700 font-medium hover:text-red-600 transition"
      >
        Book a Service
      </Link>
      <button
        onClick={() => {
          logout();
          if (onClick) onClick();
        }}
        className="text-white bg-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
