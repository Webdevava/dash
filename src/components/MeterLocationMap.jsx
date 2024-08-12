"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Search, Menu, Gauge, Ellipsis, EllipsisVertical } from "lucide-react";
import L from "leaflet";

// Define custom icons for each meter type with larger size
const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid black;"></div>`, // Added border for visibility
    iconSize: [15, 15],
    iconAnchor: [7.5, 7.5],
  });
};

const MeterLocationMap = () => {
  const [selectedMeter, setSelectedMeter] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("all");

  // Sample data for meter locations in the Dominican Republic with additional markers
  const meterLocations = [
    { type: "APM1 M", lat: 18.7357, lng: -70.1627, color: "#20B2AA" },
    { type: "APM1 M", lat: 18.5001, lng: -69.9886, color: "#20B2AA" },
    { type: "APM1 M", lat: 18.46, lng: -69.927, color: "#20B2AA" },
    { type: "APM1 M", lat: 18.71, lng: -70.175, color: "#20B2AA" },
    { type: "APM1 M", lat: 18.85, lng: -70.3, color: "#20B2AA" },
    { type: "APM1 M", lat: 18.3, lng: -69.85, color: "#20B2AA" },
    { type: "APM2 M", lat: 19.0661, lng: -70.5906, color: "#DDA0DD" },
    { type: "APM2 M", lat: 18.4718, lng: -69.8923, color: "#DDA0DD" },
    { type: "APM2 M", lat: 19.5, lng: -70.6, color: "#DDA0DD" },
    { type: "APM2 M", lat: 18.7, lng: -69.85, color: "#DDA0DD" },
    { type: "APM2 M", lat: 19.2, lng: -70.2, color: "#DDA0DD" },
    { type: "APM2 M", lat: 18.8, lng: -69.95, color: "#DDA0DD" },
    { type: "APM3 M", lat: 18.7357, lng: -69.3346, color: "#FFA500" },
    { type: "APM3 M", lat: 19.2265, lng: -69.5908, color: "#FFA500" },
    { type: "APM3 M", lat: 18.65, lng: -69.3, color: "#FFA500" },
    { type: "APM3 M", lat: 19.0, lng: -69.5, color: "#FFA500" },
    { type: "APM3 M", lat: 18.8, lng: -69.7, color: "#FFA500" },
    { type: "APM3 M", lat: 18.9, lng: -69.6, color: "#FFA500" },
  ];

    const dropdownColors = {
      "Installed APM1 M": "#20B2AA",
      "Connected APM1 M": "#20B2AA",
      "Installed APM2 M": "#DDA0DD",
      "Connected APM2 M": "#DDA0DD",
      "Installed APM3 M": "#FFA500",
      "Connected APM3 M": "#FFA500",
    };

  const filteredLocations = meterLocations.filter((location) => {
    return (
      (selectedMeter === "all" || location.type === selectedMeter) &&
      (selectedDropdown === "all" ||
        location.type.includes(selectedDropdown.split(" ")[1]))
    );
  });

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownOptionClick = (option) => {
    setSelectedDropdown(option);
    setShowDropdown(false); // Close dropdown after selecting an option
  };

  return (
    <div className="p-4 shadow-md bg-[#fefefe] rounded-3xl w-auto lg:w-full h-96 lg:h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex flex-grow items-center bg-white shadow-md rounded-3xl">
          <input
            type="text"
            placeholder="Search Meter Location"
            className="w-full p-2  rounded-l-3xl text-sm pl-6"
          />
          <button className=" p-2 rounded-r-3xl text-[#2054DD]">
            <Search />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex text-xs space-x-2">
            {["APM1 M", "APM2 M", "APM3 M"].map((meter) => (
              <div
                key={meter}
                className={`flex items-center space-x-1 py-2 px-1 rounded-3xl truncate shadow-md cursor-pointer ${
                  selectedMeter === meter ? "ring-2 ring-offset-2" : ""
                } ${
                  meter === "APM1 M"
                    ? "bg-[#20B2AA22]"
                    : meter === "APM2 M"
                    ? "bg-[#DDA0DD22]"
                    : "bg-[#FFA50022]"
                }`}
                onClick={() =>
                  setSelectedMeter(selectedMeter === meter ? "all" : meter)
                }
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    meter === "APM1 M"
                      ? "bg-[#20B2AA]"
                      : meter === "APM2 M"
                      ? "bg-[#DDA0DD]"
                      : "bg-[#FFA500]"
                  }`}
                ></span>
                <span className="text-[10px] font-semibold">{meter}</span>
              </div>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={handleDropdownClick}
              className="flex items-center p-1  rounded-full shadow-md"
            >
              <EllipsisVertical size={20} />
            </button>
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="p-2 space-y-1">
                  {[
                    "Installed APM1 M",
                    "Connected APM1 M",
                    "Installed APM2 M",
                    "Connected APM2 M",
                    "Installed APM3 M",
                    "Connected APM3 M",
                  ].map((option) => (
                    <li
                      key={option}
                      className={`p-2 text-xs cursor-pointer hover:bg-gray-100 flex gap-1 items-center`}
                      style={{ color: dropdownColors[option] }}
                      onClick={() => handleDropdownOptionClick(option)}
                    >
                      <Gauge size={20} />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <MapContainer
        center={[18.7357, -70.1627]} // Centered on Dominican Republic
        zoom={7}
        style={{
          height: "87%",
          width: "100%",
          zIndex: 1,
          borderRadius: "20px",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredLocations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(location.color)}
          >
            <Popup>
              {location.type} Meter <br /> Lat: {location.lat}, Lng:{" "}
              {location.lng}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MeterLocationMap;
