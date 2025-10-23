export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-500 text-center py-6  border-t border-gray-200">
      <p className="text-sm">
        Rescue Federation © {new Date().getFullYear()} — All rights reserved.
      </p>
      <div className="flex justify-center mt-2 space-x-4 text-sm">
        <a href="#" className="hover:text-red-600">Privacy Policy</a>
        <a href="#" className="hover:text-red-600">Terms</a>
        <a href="#" className="hover:text-red-600">Support</a>
      </div>
    </footer>
  );
}
