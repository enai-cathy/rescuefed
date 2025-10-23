"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000); // remove after 2s
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="loader-container fixed inset-0 z-50 flex items-center justify-center bg-white animate-fadeOut">
      {/* Expanding Cross */}
      <div className="relative w-16 h-16">
        {/* Horizontal bar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-600 h-2 w-16 rounded-full animate-expandCross" />
        </div>
        {/* Vertical bar */}
        <div className="absolute inset-0 flex items-center justify-center rotate-90">
          <div className="bg-red-600 h-2 w-16 rounded-full animate-expandCross" />
        </div>
      </div>

      <style jsx>{`
        @keyframes expandCross {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
        
          100% {
            transform: scale(15);
            opacity: 0;
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-expandCross {
          animation: expandCross 1.6s ease-in-out forwards;
        }

        .animate-fadeOut {
          animation: fadeOut 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
