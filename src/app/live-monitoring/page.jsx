// src/components/MapComponent.js
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AAJ from "../../../public/AAJ.png";
import NBC from "../../../public/NBC.png";
import Image from "next/image";
import AccuracyCard from "@/components/AccuracyCard";
// import FilterFormWithTable from "@/components/FilterFormWithTable"; // Correct path here
import FilterForm from "@/components/FilterForm";

const MapComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState([]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

const handleSearch = (filteredData) => {
  setData(filteredData);
  setShowFilters(false); // Close the filter dropdown after search
};

  return (
    <Layout>
      <div className="relative h-screen">
        <h1 className="">Live Monitoring of Meter</h1>
        <Map devices={data} />

        <div className="flex items-center justify-center w-full">
          <div
            className={`absolute bottom-0 left-0 right-0 ml-5 rounded-xl bg-white p-4 shadow-md w-[96%] TableRowansition-all duration-300 ease-in-out z-[9] ${"h-3/4"}`}
          >
            <div className="flex items-center justify-start mb-4 gap-4">
              <div className="flex rounded-3xl w-fit bg-accent/70 mr-2">
                <input
                  type="text"
                  placeholder="Search Meter by Serial Range"
                  className="px-4 py-2 text-sm w-72 rounded-l-3xl bg-accent/50"
                />
                <button className="px-4 flex gap-2 text-sm text-white py-3 border rounded-3xl bg-[#2054DD]">
                  <Search /> search
                </button>
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
                            item.meterSuccess ? "bg-green-500" : "bg-gray-500"
                          } text-white`}
                        >
                          {item.meterSuccess ? "Online" : "Offline"}
                        </span>
                      </TableCell>
                      <TableCell className="p-2 text-sm font-extrabold">
                        <Link
                          href={`/live-monitoring/${item.deviceId}`}
                          className="bg-accent min-w-48 rounded-3xl p-1 items-center px-3 pr-5 flex justify-between"
                        >
                          {item.deviceId}
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
                                src={AAJ}
                                className="size-10 rounded-full"
                              />
                              <p className="flex flex-col">
                                <span className=" truncate w-36">
                                  {item.channel_name}
                                </span>
                                <span>{item.channel_id}</span>
                              </p>
                            </div>
                          </DialogTrigger>
                          <DialogContent className=" bg-white p-0">
                            <AccuracyCard
                              logoSrc={AAJ}
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
                            item.installing ? "bg-green-500" : "bg-gray-500"
                          } text-white`}
                        >
                          {item.installing ? "Installed" : "Uninstalled"}
                        </span>
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.hardwareVersion}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.tamperAlarmAlertType || "Pending"}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.sim === 1
                          ? "Jio"
                          : item.sim === 2
                          ? "Airtel"
                          : "Unknown"}
                      </TableCell>

                      <TableCell className="p-2 text-sm">
                        {item.region || "India"}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.lat} / {item.lon}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.radius || "3km"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MapComponent;
