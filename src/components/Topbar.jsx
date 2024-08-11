"use client";
import { BellDot, Search, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import indiLogo from "../../public/indiLogo.png";
import indiaFlag from "../../public/india.webp"; // Add your India flag image
import usaFlag from "../../public/usa.jpeg"; // Add your USA flag image

const Topbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("India");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex border-b border-gray-300 fixed w-full p-3 justify-between h-fit z-50 bg-[#fefefe] text-[#1f1f1f] shadow-sm">
      <Image src={indiLogo} alt="inditronics" width={160} />

      <div className="flex items-center gap-8">
        <div className="flex items-center space-x-4 gap-4">
          <BellDot className="h-5 w-5 sm:h-6 sm:w-6" />
          <Search className="h-5 w-5 sm:h-6 sm:w-6" />
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-accent px-2 py-1  rounded-3xl text-black text-sm"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <Image
                  src={selectedCountry === "India" ? indiaFlag : usaFlag}
                  alt={selectedCountry}
                  width={24}
                  height={24}
                  className="rounded-full h-[24px]"
                />
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-24 bg-white border border-gray-300 rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={() => handleCountrySelect("India")}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Image
                    src={indiaFlag}
                    alt="India Flag"
                    width={24}
                    height={24}
                    className="rounded-full mr-2 h-[24px]"
                  />
                  India
                </button>
                <button
                  onClick={() => handleCountrySelect("USA")}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Image
                    src={usaFlag}
                    alt="USA Flag"
                    width={24}
                    height={16}
                    className="rounded-full mr-2 h-[24px]"
                  />
                  USA
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                className="bg-primary w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border"
                src="https://captiontools.com/wp-content/uploads/2017/03/testy3-1.png"
                alt="Profile"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold w-full text-start">
                  Hi, John Doe
                </p>
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
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
