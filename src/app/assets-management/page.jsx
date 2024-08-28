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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Upload,
  X,
  CheckCircle,
} from "lucide-react";
import ConfigFilterForm from "@/components/meter-management/ConfigFilterForm";
import ConfigHistoryForm from "@/components/meter-management/ConfigHistoryForm";

const Page = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("Stock Tracker");
  const [activeSubTab, setActiveSubTab] = useState("Records");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const [showPopover, setShowPopover] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles([...e.dataTransfer.files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSearch = (filteredData) => {
    setData(filteredData);
    setShowFilters(false);
  };

  const refreshTable = async () => {
    try {
      // Replace with your API call to fetch data
      const response = await fetch(
        "https://api.inditronics.com/search/latest?deviceIdMin=100001&deviceIdMax=300010"
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
        `https://api.inditronics.com/search/latest?deviceIdMin=${deviceIdMin}&deviceIdMax=${deviceIdMax}`
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
      setSelectedRows(new Set(data.map((item) => item.DEVICE_ID)));
    }
    setSelectAll(!selectAll);
  };

  const setActiveTabWithDefaultSubTab = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "Stock Tracker":
        setActiveSubTab("Records");
        break;
      default:
        setActiveSubTab("");
    }
  };

  const renderInventoryContent = () => {
    switch (activeTab) {
      case "Stock Tracker":
      case "Master Data":
      case "Conflicts Harmonizer":
        return (
          <div className="overflow-auto bg-white rounded-xl border h-screen">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="min-w-40 text-sm">
                    Meter Status
                  </TableHead>
                  <TableHead className="min-w-40 text-sm">Meter ID</TableHead>
                  
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
                          item.meterSuccess ? "bg-green-500" : "bg-gray-500"
                        } text-white`}
                      >
                        {item.meterSuccess ? "Online" : "Offline"}
                      </span>
                    </TableCell>
                    <TableCell className="p-2 text-sm font-extrabold">
                      <Link
                        href={`/live-monitoring/${item.DEVICE_ID}`}
                        className="bg-accent min-w-48 rounded-3xl p-1 items-center px-3 pr-5 flex justify-between"
                      >
                        {item.DEVICE_ID}
                        <ChevronRight size={18} color="#2054DD" />
                      </Link>
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
                      {item.region}
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

  const renderFileUploadAssetsContent = () => {
    switch (activeTab) {
      case "File Upload Assets":
        return (
          <div className="w-full h-full mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select File type
              </label>
              <select className="mt-1 block w-72 px-3 py-2 text-base bg-accent/15 rounded-3xl border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>Select</option>
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
                <option value="docx">DOCx</option>
              </select>
            </div>

            <div
              className="mt-10 w-[60%] flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dotted rounded-lg"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Click to upload/ attach email</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      multiple
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, EML (max 2mb)</p>
              </div>
            </div>

            {files.map((file, index) => (
              <div
                key={index}
                className="mt-4 flex flex-col items-center justify-between p-4 bg-white border border-gray-400 hover:bg-gray-200 rounded-md w-[60%]"
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">
                        {file.name.split(".").pop().toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex gap-2 items-center w-full pl-10">
                  <span className="border-t-4 rounded-xl border-green-500 w-full" />{" "}
                  <span>100%</span>
                </div>
              </div>
            ))}

            <div className="mt-4 flex justify-start space-x-2">
              <button className="px-10 py-3 border border-gray-300 text-md font-medium rounded-3xl text-gray-700 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Cancel
              </button>
              <button className="px-10 py-3 border border-transparent text-md font-medium rounded-3xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Upload
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMeterReleaseManagementContent = () => {
    switch (activeTab) {
      case "Test Archive":
      case "Config & Update":
      case "Field Activity Ledger":
      case "HH info History":
      case "HH field status":
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
                          item.meterSuccess ? "bg-green-500" : "bg-gray-500"
                        } text-white`}
                      >
                        {item.meterSuccess ? "Online" : "Offline"}
                      </span>
                    </TableCell>
                    <TableCell className="p-2 text-sm font-extrabold">
                      <Link
                        href={`/live-monitoring/${item.DEVICE_ID}`}
                        className="bg-accent min-w-48 rounded-3xl p-1 items-center px-3 pr-5 flex justify-between"
                      >
                        {item.DEVICE_ID}
                        <ChevronRight size={18} color="#2054DD" />
                      </Link>
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
                      {item.hardware_version}
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
                      {item.region}
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
      case "Stock Tracker":
        return renderInventoryContent();
      case "Master Data":
        return renderInventoryContent();
      case "Field Activity Ledger":
        return renderMeterReleaseManagementContent();
      case "Test Archive":
        return renderMeterReleaseManagementContent();
      case "Conflicts Harmonizer":
        return renderInventoryContent();
      case "File Upload Assets":
        return renderFileUploadAssetsContent();
      case "HH info History":
        return renderMeterReleaseManagementContent();
      case "HH field status":
        return renderMeterReleaseManagementContent();
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
              "Stock Tracker",
              "Master Data",
              "Field Activity Ledger",
              "Test Archive",
              "Conflicts Harmoinizer",
              "File Upload Assets",
              "HH info History",
              "HH field status",
            ].map((tab) => (
              <li
                key={tab}
                className={`rounded-3xl px-2 py-2 cursor-pointer ${
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
            {activeTab === "Stock Tracker" && (
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

            {/* {activeTab === "File Upload Assets" && (
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
            )} */}

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

            {activeTab !== "File Upload Assets" && (
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
            )}
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
