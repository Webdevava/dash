"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import useStore from "@/store/useDataStore"; // Adjust the import path as needed

const FilterForm = ({ onSearch }) => {
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

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get("https://api.inditronics.com/search/latest", {
        params: filters,
      });
      setSearchResults(response.data); // Save results to Zustand store
      if (onSearch) onSearch(response.data); // Optional: Call onSearch if provided
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSearchResults();
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [filters]); // Dependencies array to trigger useEffect when filters change

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  return (
    <div className="flex flex-col mb-4 bg-white shadow-xl rounded-lg p-3 z-50 fixed w-1/2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Device ID Range
            </label>
            <input
              type="text"
              name="deviceId"
              value={filters.deviceId}
              onChange={handleChange}
              placeholder="e.g. 112345 or 1-2"
              className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Device ID Min
            </label>
            <input
              type="text"
              name="deviceIdMin"
              value={filters.deviceIdMin}
              onChange={handleChange}
              placeholder="e.g. 1000"
              className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Device ID Max
            </label>
            <input
              type="text"
              name="deviceIdMax"
              value={filters.deviceIdMax}
              onChange={handleChange}
              placeholder="e.g. 2000"
              className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Connectivity Status
            </label>
            <select
              name="ipUp"
              value={filters.ipUp}
              onChange={handleChange}
              className="mt-1 block w-full bg-accent/25 rounded-3xl border-0 p-2"
            >
              <option value="">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Installing Status
            </label>
            <select
              name="installing"
              value={filters.installing}
              onChange={handleChange}
              className="mt-1 block w-full bg-accent/25 rounded-3xl border-0 p-2"
            >
              <option value="">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Meter Success
            </label>
            <select
              name="meterSuccess"
              value={filters.meterSuccess}
              onChange={handleChange}
              className="mt-1 block w-full bg-accent/25 rounded-3xl border-0 p-2"
            >
              <option value="">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              name="lat"
              value={filters.lat}
              onChange={handleChange}
              placeholder="e.g. 12.345"
              className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              name="lon"
              value={filters.lon}
              onChange={handleChange}
              placeholder="e.g. 67.890"
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

export default FilterForm;
