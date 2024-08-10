"use client";
import { BellDot, Search, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div
      className={`h-fit w-full flex items-center justify-end gap-5 p-4 ${
        isDashboard
          ? "bg-transparent text-[#fefefe]"
          : "bg-[#fefefe] text-[#1f1f1f] border-b border-border"
      }`}
    >
      <div className="flex items-center space-x-4">
        <Search className="h-5 w-5 sm:h-6 sm:w-6" />
        <div className="hidden sm:block">
          <select
            name="Time"
            className="bg-[#fefefe] px-2 py-1 border border-border rounded-md text-black text-sm"
          >
            <option value="IST">IST</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <BellDot className="h-5 w-5 sm:h-6 sm:w-6" />
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="bg-primary w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border"></div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs">Welcome to Inditronics</p>
            </div>
            <ChevronDown className="h-4 w-4" />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
