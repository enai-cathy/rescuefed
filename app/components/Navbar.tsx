// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import NavLinks from "./Navlinks";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   const closeMenu = () => setMenuOpen(false);

//   return (
//     <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-50">
//       {/* Logo */}
//       <Link href="/" className="text-2xl font-bold text-red-600 tracking-wide">
//         Rescue<span className="text-gray-800">Federation</span>
//       </Link>

//       {/* Desktop Links */}
//       <div className="hidden md:flex">
//         <NavLinks />
//       </div>

//       {/* Mobile Hamburger */}
//       <button
//         onClick={toggleMenu}
//         className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
//       >
//         {menuOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 flex flex-col items-start space-y-4 md:hidden z-40">
//           <NavLinks onClick={closeMenu} />
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

   // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 // Role-based navigation
  const navItems =
    user?.role === "admin"
      ? [
          { name: "Dashboard", href: "/admin" },
          { name: "Requests", href: "/admin/requests" },
        ]
      : user
      ? [
          { name: "Book Service", href: "/request" },
          { name: "My Requests", href: "/requests" },
        ]
      : [
          { name: "Login", href: "/login" },
          { name: "Register", href: "/register" },
        ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[#7A0C1020]"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2 group">
           <div className="relative rounded-full bg-white w-8 h-8">
            <Image
              src="/images/logo.png" 
              alt="Rescue Federation Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 font-medium hover:text-[#7A0C10] transition-colors"
            >
              {item.name}
            </Link>
          ))}
          {user && (
            <button
              onClick={logout}
              className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7A0C10] to-[#B52B32] text-white font-semibold hover:shadow-md transition-all"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-[#7A0C10] focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-[#7A0C1020] shadow-inner">
          <div className="px-6 py-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 font-medium hover:text-[#7A0C10] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7A0C10] to-[#B52B32] text-white font-semibold hover:shadow-md transition-all"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
