// components/MobileMenu.jsx
"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-16 left-0 p-2 rounded-r-full bg-accent text-black z-50"
      >
        <Menu size={24} />
      </button>
      <Sidebar
        isMobile={true}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default MobileMenu;
