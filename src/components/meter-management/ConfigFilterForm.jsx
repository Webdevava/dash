"use client";
import React, { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import useStore from "@/store/useDataStore"; // Adjust the import path as needed

const ConfigFilterForm = ({ onSearch }) => {
  const [deviceId, setDeviceId] = useState(""); // State for device ID

  const setSearchResults = useStore((state) => state.setSearchResults);

  const handleChange = (e) => {
    setDeviceId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = "https://api.inditronics.com/search/config"
// All devices

      const response = await axios.get(endpoint);
      setSearchResults(response.data); // Save results to Zustand store
      if (onSearch) onSearch(response.data); // Optional: Call onSearch if provided
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col mb-4 bg-white shadow-xl rounded-lg p-3 z-50 fixed w-1/2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Device ID
            </label>
            <input
              type="text"
              name="deviceId"
              value={deviceId}
              onChange={handleChange}
              placeholder="Enter Device ID (leave empty to get all)"
              className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-full flex items-center justify-center gap-2 px-4 py-2"
          >
            <Search size={16} /> Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfigFilterForm;
