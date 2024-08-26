"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Search, EllipsisVertical } from "lucide-react";
import L from "leaflet";
import axios from "axios";

const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid black;"></div>`,
    iconSize: [15, 15],
    iconAnchor: [7.5, 7.5],
  });
};

const MeterLocationMap = () => {
  const [selectedMeter, setSelectedMeter] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("all");
  const [meterLocations, setMeterLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, [selectedMeter]);

  const fetchLocations = async () => {
    try {
      let endpoint = "https://api.inditronics.com/location/locations";
      if (selectedMeter !== "all") {
        const hardwareVersion = selectedMeter;
        endpoint = `https://api.inditronics.com/location/locations/hardware_version/${hardwareVersion}`;
      }
      const response = await axios.get(endpoint);
      const formattedLocations = response.data.map((location) => ({
        type: `${location.hardware_version}`,
        lat: location.lat,
        lng: location.lon,
        color: getColorForMeterType(`${location.hardware_version}`),
      }));
      setMeterLocations(formattedLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const getColorForMeterType = (type) => {
    switch (type) {
      case "APM1":
        return "#20B2AA";
      case "APM2":
        return "#DDA0DD";
      case "APM3":
        return "#FFA500";
      default:
        return "#000000";
    }
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
    setShowDropdown(false);
  };

  return (
    <div className="p-4 shadow-md bg-[#fefefe] rounded-3xl w-full lg:w-full h-[36rem] lg:h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex flex-grow items-center bg-white shadow-md rounded-3xl">
          <input
            type="text"
            placeholder="Search Meter Location"
            className="w-full p-2 rounded-l-3xl text-sm pl-6"
          />
          <button className="p-2 rounded-r-3xl text-[#2054DD]">
            <Search />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex text-xs space-x-2">
            {["APM1", "APM2", "APM3"].map((meter) => (
              <div
                key={meter}
                className={`flex items-center space-x-1 py-2 px-1 rounded-3xl truncate shadow-md cursor-pointer ${
                  selectedMeter === meter ? "ring-2 ring-offset-2" : ""
                } ${
                  meter === "APM1"
                    ? "bg-[#20B2AA22]"
                    : meter === "APM2"
                    ? "bg-[#DDA0DD22]"
                    : "bg-[#FFA50022]"
                }`}
                onClick={() => {
                  setSelectedMeter(selectedMeter === meter ? "all" : meter);
                }}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    meter === "APM1"
                      ? "bg-[#20B2AA]"
                      : meter === "APM2"
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
              className="flex items-center p-1 rounded-full shadow-md"
            >
              <EllipsisVertical size={20} />
            </button>
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="p-2 space-y-1">
                  {[
                    "Installed APM1",
                    "Connected APM1",
                    "Installed APM2",
                    "Connected APM2",
                    "Installed APM3",
                    "Connected APM3",
                  ].map((option) => (
                    <li
                      key={option}
                      className={`p-2 text-xs cursor-pointer hover:bg-gray-100 flex gap-1 items-center`}
                      style={{
                        color: getColorForMeterType(option.split(" ")[1] + ""),
                      }}
                      onClick={() => handleDropdownOptionClick(option)}
                    >
                      <span className="w-4 h-4">⚙️</span>
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
        center={[18.5526, 73.9485]}
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
