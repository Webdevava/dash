"use client";
import React, { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import useStore from "@/store/useDataStore"; // Adjust the import path as needed

const ConfigHistoryForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    deviceId: "",
    deviceIdMin: "",
    deviceIdMax: "",
    ipUp: "",
    lat: "",
    lon: "",
    installing: "",
    meterSuccess: "",
  });

  const setSearchResults = useStore((state) => state.setSearchResults);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:5000/api/devices/search",
        {
          params: filters,
        }
      );
      setSearchResults(response.data); // Save results to Zustand store
      if (onSearch) onSearch(response.data); // Optional: Call onSearch if provided
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col mb-4 bg-white shadow-xl rounded-lg p-3 z-50 slide-out-to-left-1/3 fixed w-1/2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Meter ID
            </label>
            <input
              type="text"
              name="deviceId"
              value={filters.deviceId}
              onChange={handleChange}
              placeholder="e.g. 100001"
              className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Congiguration Type
            </label>
            <input
              type="text"
              name="deviceId"
              value={filters.deviceId}
              onChange={handleChange}
              placeholder="e.g. 100001"
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

export default ConfigHistoryForm;
