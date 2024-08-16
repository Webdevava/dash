// src/components/MapComponent.js
"use client";
import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AAJ from "../../../public/AAJ.png";
import NBC from "../../../public/NBC.png";
import Image from "next/image";
import AccuracyCard from "@/components/AccuracyCard";
import FilterForm from "@/components/FilterForm";
import {
  Search,
  Filter,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ListPlus,
  Paintbrush,
  FileInput,
  Paintbrush2,
} from "lucide-react";
import ConfigFilterForm from "@/components/meter-management/ConfigFilterForm";
import ConfigHistoryForm from "@/components/meter-management/ConfigHistoryForm";

const Page = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("Meter Events");
  const [activeSubTab, setActiveSubTab] = useState("Records");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const [showPopover, setShowPopover] = useState(false);

  const handleSearch = (filteredData) => {
    setData(filteredData);
    setShowFilters(false);
  };

  const refreshTable = async () => {
    try {
      // Replace with your API call to fetch data
      const response = await fetch(
        "http://localhost:5000/api/devices/search?deviceIdMin=100001&deviceIdMax=300010"
      );
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

    const fetchData = async (deviceIdMin, deviceIdMax) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/devices/search?deviceIdMin=${deviceIdMin}&deviceIdMax=${deviceIdMax}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


  const handleRowSelect = (id) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(id)) {
        newSelectedRows.delete(id);
      } else {
        newSelectedRows.add(id);
      }
      return newSelectedRows;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((item) => item.meter_id)));
    }
    setSelectAll(!selectAll);
  };

  const setActiveTabWithDefaultSubTab = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "Meter Events":
        setActiveSubTab("Records");
        break;
      case "Config & Update":
        setActiveSubTab("View&Update");
        break;
      case "Meter Release Management":
        setActiveSubTab("Search");
        break;
      default:
        setActiveSubTab("");
    }
  };

  const renderMeterEventsContent = () => {
    switch (activeTab) {
      case "Meter Events":
      case "Config & Update":
      case "Meter Release Management":
        return (
          <div className="overflow-auto bg-white rounded-xl border h-1/2">
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
                  <TableHead className="min-w-40 text-sm">Alarm Type</TableHead>
                  <TableHead className="min-w-40 text-sm">Network</TableHead>
                  <TableHead className="min-w-40 text-sm">Location</TableHead>
                  <TableHead className="min-w-40 text-sm">Lat & Lon</TableHead>
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
                          <span className="flex bg-accent rounded-3xl p-1 gap-2 cursor-pointer">
                            <Image
                              height={40} // Adjust size to match your requirements
                              width={40} // Adjust size to match your requirements
                              alt={item.channel_name || "logo"}
                              src={
                                item.channel_image[3] ||
                                item.channel_image[2] ||
                                item.channel_image[1] ||
                                item.channel_image[0]
                              }
                              className="rounded-full"
                            />
                            <p className="flex flex-col">
                              <span className="truncate w-36">
                                {item.channel_name}
                              </span>
                              <span>{item.channel_id}</span>
                            </p>
                          </span>
                        </DialogTrigger>
                        <DialogContent className="bg-white p-0">
                          <AccuracyCard
                            logoSrc={
                                item.channel_image[3] ||
                                item.channel_image[2] ||
                                item.channel_image[1] ||
                                item.channel_image[0]
                              }
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
                        {item.hh_status ? "Installed" : "Uninstalled"}
                      </span>
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.hw_version}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.alarm_type || "Pending"}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.active_sim === 1
                        ? "Jio"
                        : item.active_sim === 2
                        ? "Airtel"
                        : "Unknown"}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.location || "Dominican Republic"}
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
        );
      default:
        return null;
    }
  };

  const renderConfigUpdatesContent = () => {
    switch (activeTab) {
      case "Meter Events":
      case "Config & Update":
      case "Meter Release Management":
        return (
          <div>
            <div className="flex w-full justify-end gap-4 items-center my-3">
              <button className="flex gap-1 items-center px-6 py-2 text-lg font-semibold border rounded-3xl">
                <ListPlus /> Add to List
              </button>
              <button className="flex gap-1 items-center px-6 py-2 text-lg font-semibold border rounded-3xl">
                <Paintbrush2 className=" rotate-180" />
                Clear Selection
              </button>
              <button className="flex gap-1 items-center bg-[#2054DD] text-white px-6 py-2 text-lg font-semibold border rounded-3xl">
                <FileInput />
                Export
              </button>
            </div>
            <div className="overflow-auto bg-white rounded-xl border h-1/2">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="min-w-40 text-sm">Meter ID</TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Meter Status
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Household ID
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Config Type
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Applied Value
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                     Server Value
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Submitted At
                    </TableHead>
                    <TableHead className="min-w-40 text-sm">
                      Applied At
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
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
                        <span
                          className={`px-2 py-1 rounded-full ${
                            item.meter_status ? "bg-green-500" : "bg-gray-500"
                          } text-white`}
                        >
                          {item.meter_status ? "Online" : "Offline"}
                        </span>
                      </TableCell>
                      <TableCell className="p-2 text-sm">{item.hhid}</TableCell>
                      <TableCell className="p-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full ${
                            item.hh_status ? "bg-green-500" : "bg-gray-500"
                          } text-white`}
                        >
                          {item.hh_status ? "Installed" : "Uninstalled"}
                        </span>
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.hw_version}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.alarm_type || "Pending"}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.active_sim === 1
                          ? "Jio"
                          : item.active_sim === 2
                          ? "Airtel"
                          : "Unknown"}
                      </TableCell>
                      <TableCell className="p-2 text-sm">
                        {item.location || "Dominican Republic"}
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
        );
      default:
        return null;
    }
  };

  const renderMeterReleaseManagementContent = () => {
    switch (activeTab) {
      case "Meter Events":
      case "Config & Update":
      case "Meter Release Management":
        return (
          <div className="overflow-auto bg-white rounded-xl border h-1/2">
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
                  <TableHead className="min-w-40 text-sm">Alarm Type</TableHead>
                  <TableHead className="min-w-40 text-sm">Network</TableHead>
                  <TableHead className="min-w-40 text-sm">Location</TableHead>
                  <TableHead className="min-w-40 text-sm">Lat & Lon</TableHead>
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
                          <span className="flex bg-accent rounded-3xl p-1 gap-2">
                            <Image
                              height={10}
                              width={10}
                              alt={item.channel_name || "logo"}
                              src={item.channel_image[0]}
                              className="size-10 rounded-full"
                            />
                            <p className="flex flex-col">
                              <span className=" truncate w-36">
                                {item.channel_name}
                              </span>
                              <span>{item.channel_id}</span>
                            </p>
                          </span>
                        </DialogTrigger>
                        <DialogContent className=" bg-white p-0">
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
                        {item.hh_status ? "Installed" : "Uninstalled"}
                      </span>
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.hw_version}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.alarm_type || "Pending"}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.active_sim === 1
                        ? "Jio"
                        : item.active_sim === 2
                        ? "Airtel"
                        : "Unknown"}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.location || "Dominican Republic"}
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
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Meter Events":
        return renderMeterEventsContent();
      case "Config & Update":
        return renderConfigUpdatesContent();
      case "Meter Release Management":
        return renderMeterReleaseManagementContent();
      case "Alarms":
        return <div>Alarms Content Here</div>;
      case "Meter Summary":
        return <div>Meter Summary Content Here</div>;
      case "Installation History":
        return <div>Installation History Content Here</div>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="relative h-screen">
        <nav className="w-full border border-gray-300 rounded-3xl p-1 font-medium bg-gray-200 mt-4 text-md">
          <ul className="flex items-center justify-between">
            {[
              "Meter Events",
              "Alarms",
              "Config & Update",
              "Meter Release Management",
              "Meter Summary",
              "Installation History",
            ].map((tab) => (
              <li
                key={tab}
                className={`rounded-3xl px-5 py-2 cursor-pointer ${
                  activeTab === tab ? "bg-primary text-white font-bold" : ""
                }`}
                onClick={() => setActiveTabWithDefaultSubTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-center w-full">
          <div
            className={`mt-5 rounded-xl bg-white p-4 shadow-md w-[96%] transition-all duration-300 ease-in-out z-[9] ${"h-3/4"}`}
          >
            {activeTab === "Meter Events" && (
              <div className="mb-4">
                <nav className="w-full border-b border-gray-300 font-medium text-sm">
                  <ul className="flex items-center justify-start">
                    {["Records", "Plot", "Retrieval Request"].map((subTab) => (
                      <li
                        key={subTab}
                        className={` px-4 py-1 cursor-pointer ${
                          activeSubTab === subTab ? "border-b font-bold " : ""
                        }`}
                        onClick={() => setActiveSubTab(subTab)}
                      >
                        {subTab}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {activeTab === "Config & Update" && (
              <div className="">
                <nav className="w-full border-b border-gray-300 font-medium text-sm">
                  <ul className="flex items-center justify-start">
                    {["View&Update", "History"].map((subTab) => (
                      <li
                        key={subTab}
                        className={` px-4 py-1 cursor-pointer ${
                          activeSubTab === subTab ? "border-b font-bold " : ""
                        }`}
                        onClick={() => setActiveSubTab(subTab)}
                      >
                        {subTab}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {activeTab === "Meter Release Management" && (
              <div className="mb-4">
                <nav className="w-full border-b border-gray-300 font-medium text-sm">
                  <ul className="flex items-center justify-start">
                    {["Search", "History", "Submit Job", "View Job"].map(
                      (subTab) => (
                        <li
                          key={subTab}
                          className={` px-4 py-1 cursor-pointer ${
                            activeSubTab === subTab ? "border-b font-bold " : ""
                          }`}
                          onClick={() => setActiveSubTab(subTab)}
                        >
                          {subTab}
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </div>
            )}

            <div className="flex items-center justify-start p-4 border-b border-gray-300 gap-4">
              <div className="flex rounded-3xl w-fit bg-accent/70 mr-2">
                <input
                  type="text"
                  placeholder="Search Meter by Serial Range"
                  className="px-4 py-2 text-sm w-72 rounded-l-3xl bg-accent/50"
                  onClick={() => setShowPopover(!showPopover)}
                />
                <button
                  onClick={fetchData}
                  className="px-4 flex gap-2 text-sm text-white py-3 border rounded-3xl bg-[#2054DD]"
                >
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
                <button
                  className="p-2 text-gray-600 rounded-full bg-gray-300"
                  onClick={refreshTable}
                >
                  <RotateCcw size={28} />
                </button>
              </div>
            </div>
            {showFilters &&
              (activeTab === "Config & Update" ? (
                activeSubTab === "View&Update" ? (
                  <ConfigFilterForm onSearch={handleSearch} />
                ) : activeSubTab === "History" ? (
                  <ConfigHistoryForm onSearch={handleSearch} />
                ) : null
              ) : (
                <FilterForm onSearch={handleSearch} />
              ))}

            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
