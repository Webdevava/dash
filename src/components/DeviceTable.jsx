"use client";
import { Search } from "lucide-react";
import { useState } from "react";

function FilterOptions() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-2">
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Search
      </button>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Serial Number Range
          </label>
          <input
            type="text"
            placeholder="e.g. 112345 or 1-2"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Connectivity Status
          </label>
          <select className="w-full px-3 py-2 border rounded-md">
            <option>Select</option>
            {/* Add options here */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Household ID
          </label>
          <input
            type="text"
            placeholder="e.g. 112345 or 1-2"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Household Status
          </label>
          <select className="w-full px-3 py-2 border rounded-md">
            <option>Select</option>
            {/* Add options here */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hardware Version
          </label>
          <select className="w-full px-3 py-2 border rounded-md">
            <option>Select</option>
            {/* Add options here */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alarm Type
          </label>
          <select className="w-full px-3 py-2 border rounded-md">
            <option>Select</option>
            {/* Add options here */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Network
          </label>
          <input
            type="text"
            placeholder="Enter"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude & Longitude
          </label>
          <input
            type="text"
            placeholder="Enter"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Radius
          </label>
          <input
            type="text"
            placeholder="Enter e.g. 112345"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default function DeviceTable({ devices, onDeviceSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.meterId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || device.meterStatus === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white p-4 rounded-xl w-[95%] shadow-md">
      <div>
        <div className="flex mb-4 items-center">
          <div className="flex rounded-3xl w-fit bg-accent/50 mr-2">
            <input
              type="text"
              placeholder="Search Meter by Serial Range"
              className="px-4 py-2 text-sm w-72 rounded-l-3xl bg-accent/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="px-4 flex gap-2 text-sm text-white py-3 border rounded-3xl bg-[#2054DD]">
              <Search /> search
            </button>
          </div>
          <button
            className="px-4 py-2 text-sm text-white rounded-3xl bg-blue-500 hover:bg-blue-600 flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            Search by Filter
          </button>
        </div>
        {showFilters && <FilterOptions />}
      </div>
      <div className="overflow-x-auto h-96">
        <div className="relative">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meter Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channel Detection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meter ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Connectivity Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Household ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Household Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hardware Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alarms Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Network
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map((device) => (
                <tr key={device.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.meterStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.channelDetection}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.meterId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.connectivityStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.householdId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.householdStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.hardwareVersion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.alarmsType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.network}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.location.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => onDeviceSelect(device)}
                    >
                      View Events
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
