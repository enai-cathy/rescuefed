import { ShieldCheck } from "lucide-react";

export default function AdminHeader({ name }: { name: string }) {
  return (
    <header className="bg-gradient-to-r from-[#7c0000] to-[#a00000] text-white py-6 px-8 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
        <p className="text-sm opacity-90">Welcome back, {name}</p>
      </div>
      <ShieldCheck className="w-8 h-8 text-white opacity-80" />
    </header>
  );
}
