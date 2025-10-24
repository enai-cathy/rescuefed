import Image from "next/image";
import Link from "next/link";
import Loader from "@/app/components/Loader";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col justify-between bg-gray-50 overflow-hidden">
      <Loader />

      {/* Fullscreen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-image-3.jpg" 
          alt="Rescue Federation background"
          fill
          priority
          className="object-cover object-bottom opacity-90"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Top Text */}
      <div className="z-10 text-center mt-90 px-6">
        <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-md">
          Rescue Federation
        </h1>
        <p className="text-gray-100 text-xl max-w-md mx-auto drop-shadow-sm">
          Quick access to emergency medical services — anytime, anywhere.
        </p>
      </div>

      {/* Overlapping Buttons */}
      <div className="relative z-10 flex gap-4 justify-center mb-16">
        <Link
          href="/register"
          className="bg-red-600 text-white px-8 py-3 rounded-full shadow-md font-semibold hover:bg-red-700 transition"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="bg-white text-red-600 px-8 py-3 rounded-full shadow-md font-semibold hover:bg-gray-300 transition"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
