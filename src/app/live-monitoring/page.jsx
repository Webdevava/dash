"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link"; // Import Link component
const Map = dynamic(() => import("@/components/Map"), { ssr: false });
import "leaflet/dist/leaflet.css";
import {
  Filter,
  Search,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import AccuracyCard from "@/components/AccuracyCard";
import FilterForm from "@/components/FilterForm";

const MapComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // For the search dropdown
  const [data, setData] = useState([]);
  const [searchRange, setSearchRange] = useState(""); // To hold the selected search range

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearch = (filteredData) => {
    setData(filteredData);
    setShowFilters(false); // Close the filter dropdown after search
  };

  // Function to handle search button click
  const handleSearchButtonClick = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown visibility
  };

  // Function to handle range selection
  const handleRangeSelect = async (min, max) => {
    setShowDropdown(false); // Close dropdown after selection
    const response = await axios.get(
      `http://localhost:5000/api/devices/search?deviceIdMin=${min}&deviceIdMax=${max}`
    );
    setData(response.data); // Set the fetched data to the table
  };

  return (
    <Layout>
      <div className="relative h-screen">
        <h1 className="">Live Monitoring of Meter</h1>
        <Map />

        <div className="flex items-center justify-center w-full">
          <div
            className={`absolute bottom-0 left-0 right-0 ml-5 rounded-xl bg-white p-4 shadow-md w-[96%] transition-all duration-300 ease-in-out z-[9] h-3/4`}
          >
            <div className="flex items-center justify-start mb-4 gap-4">
              <div className="flex rounded-3xl w-fit bg-accent/70 mr-2 relative">
                <input
                  type="text"
                  placeholder="Search Meter by Serial Range"
                  className="px-4 py-2 text-sm w-72 rounded-l-3xl bg-accent/50"
                  value={searchRange}
                  readOnly // Make the input field readonly to only accept dropdown selections
                />
                <button
                  className="px-4 flex gap-2 text-sm text-white py-3 border rounded-3xl bg-[#2054DD]"
                  onClick={handleSearchButtonClick} // Show dropdown on button click
                >
                  <Search /> Search
                </button>

                {showDropdown && (
                  <div className="absolute left-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                    <button
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => handleRangeSelect(100001, 100010)}
                    >
                      100001-100010
                    </button>
                    <button
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => handleRangeSelect(200001, 200010)}
                    >
                      200001-200010
                    </button>
                    <button
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => handleRangeSelect(300001, 300010)}
                    >
                      300001-300010
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-sm space-x-1 px-4 py-3 bg-accent rounded-3xl"
                >
                  <Filter size={20} className="text-[#2054dd]" />
                  <span>Search by Filter</span>
                  {showFilters ? <ChevronUp /> : <ChevronDown />}
                </button>
                <button className="p-2 text-gray-600 rounded-full bg-gray-300">
                  <RotateCcw size={28} />
                </button>
              </div>
            </div>
            {showFilters && <FilterForm onSearch={handleSearch} />}

            <div className="overflow-y-auto bg-white rounded-xl border max-h-96">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="min-w-40 text-sm">
                      Meter Status
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">Meter ID</TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Channel Detection
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Connectivity Status
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Household ID
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Household Status
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Hardware Version
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Alarm Type
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">Network</TableHead>
                    <TableHead className="min-w-40 text-sm">Location</TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Lat & Lon
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">Radius</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="p-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full ${
                            item.meter_status ? "bg-green-500" : "bg-gray-500"
                          } text-white`}
                        >
                          {item.meter_status ? "Online" : "Offline"}
                        </span>
                      </TableCell>
                      <TableCell className="p-2 text-sm font-extrabold">
                        <Link
                          href={`/live-monitoring/${item.meter_id}`}
                          className="bg-accent min-w-48 rounded-3xl p-1 items-center px-3 pr-5 flex justify-between"
                        >
                          {item.meter_id}
                          <ChevronRight size={18} color="#2054DD" />
                        </Link>
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        <Dialog className="z-[99999] bg-white p-0">
                          <DialogTrigger asChild>
                            <div className="flex bg-accent rounded-3xl p-1 gap-2 text-xs font-extrabold">
                              <Image
                                height={10}
                                width={10}
                                alt={item.channel_name || "logo"}
                                src={item.channel_image[0]}
                                className="size-10 rounded-full"
                              />
                              <p className="flex flex-col">
                                <span className="truncate w-36">
                                  {item.channel_name}
                                </span>
                                <span>{item.channel_id}</span>
                              </p>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="bg-white p-0">
                            <AccuracyCard
                              logoSrc={item.channel_image[0]}
                              name={item.channel_name}
                              id={item.channel_id}
                              accuracy={78}
                              audioMatching={86}
                              logoDetection={75}
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full ${
                            item.connectivity_status
                              ? "bg-green-500"
                              : "bg-gray-500"
                          } text-white`}
                        >
                          {item.connectivity_status
                            ? "Connected"
                            : "Disconnected"}
                        </span>
                      </TableCell>
                      <TableCell className="p-2 text-sm">{item.hhid}</TableCell>
                      <TableCell className="p-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full ${
                            item.hh_status ? "bg-green-500" : "bg-gray-500"
                          } text-white`}
                        >
                          {item.hh_status ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.hardware_version}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.alarm_type}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.network}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.location}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.lat_lon}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.radius}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <button
              onClick={toggleExpand}
              className="absolute bottom-0 left-0 right-0 flex justify-center py-2"
            >
              {isExpanded ? <ChevronDown /> : <ChevronUp />}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MapComponent;
  