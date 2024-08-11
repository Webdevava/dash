'use client'
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Dot, Search } from "lucide-react";

const MeterLocationMap = () => {
  return (
    <div className="p-6 shadow-md bg-[#fefefe] rounded-3xl w-full h-[28rem]">
      <div className="flex items-center gap-2">
        <div className="mb-4 flex items-center shadow-md rounded-3xl ">
          <input
            type="text"
            placeholder="Search Meter Location"
            className="w-full p-2 border border-r-0  rounded-l-3xl"
          />
          <button className=" border border-border border-l-0 p-2 rounded-r-3xl">
            <Search />
          </button>
        </div>
        <div className="flex text-xs space-x-4 mb-4">
          <div className="flex text-xs items-center space-x-2 bg-[#20b2ab22] rounded-3xl p-2 shadow-md">
            <span className="w-3 h-3 bg-[#20B2AA] rounded-full"></span>
            <span className="text-xs font-semibold">APM1</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#DDA0DD22] rounded-3xl p-2 shadow-md">
            <span className="w-3 h-3 bg-[#DDA0DD] rounded-full"></span>
            <span className="text-xs font-semibold">APM2</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#FFA50022] rounded-3xl p-2 shadow-md">
            <span className="w-3 h-3 bg-[#FFA500] rounded-full"></span>
            <span className="text-xs font-semibold">APM3</span>
          </div>
        </div>
      </div>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "340px", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Add markers here */}
      </MapContainer>
    </div>
  );
};

export default MeterLocationMap;
