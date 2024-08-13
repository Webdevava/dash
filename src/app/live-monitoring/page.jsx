// 'use client'
// import { useState } from "react";
// import dynamic from "next/dynamic";
// import DeviceTable from "@/components/DeviceTable";
// import Layout from "@/components/Layout";
// import useSidebarStore from "@/store/useSidebarStore";
// import ChannelCard from "@/components/ChannelCard";

// const Map = dynamic(() => import("@/components/Map"), { ssr: false });

// const dummyDevices = [
//   {
//     id: "1",
//     meterStatus: "Active",
//     meterId: "MTR-001",
//     channelDetection: "NBC-NEWS-ID-045-9035",
//     connectivityStatus: "Connected",
//     householdId: "HHD-001",
//     householdStatus: "Occupied",
//     hardwareVersion: "V1.0",
//     alarmsType: "Critical",
//     network: "Wi-Fi",
//     location: [18.7357, -70.1627], // Santo Domingo
//   },
//   {
//     id: "2",
//     meterStatus: "Offline",
//     meterId: "MTR-002",
//     channelDetection: "AAJ-TAK-NEWS-ID-065-7965",
//     connectivityStatus: "Disconnected",
//     householdId: "HHD-002",
//     householdStatus: "Vacant",
//     hardwareVersion: "V1.1",
//     alarmsType: "Warning",
//     network: "Ethernet",
//     location: [19.4326, -70.5451], // La Vega
//   },
//   {
//     id: "3",
//     meterStatus: "Active",
//     meterId: "MTR-003",
//     channelDetection: "CNN-NEWS-ID-089-4567",
//     connectivityStatus: "Connected",
//     householdId: "HHD-003",
//     householdStatus: "Occupied",
//     hardwareVersion: "V1.2",
//     alarmsType: "None",
//     network: "Wi-Fi",
//     location: [18.4715, -69.9204], // Santiago
//   },
//   {
//     id: "4",
//     meterStatus: "Inactive",
//     meterId: "MTR-004",
//     channelDetection: "BBC-WORLD-ID-123-7890",
//     connectivityStatus: "Disconnected",
//     householdId: "HHD-004",
//     householdStatus: "Occupied",
//     hardwareVersion: "V1.3",
//     alarmsType: "Warning",
//     network: "Ethernet",
//     location: [18.5532, -69.9618], // Puerto Plata
//   },
//   {
//     id: "5",
//     meterStatus: "Active",
//     meterId: "MTR-005",
//     channelDetection: "AL-JAZEERA-ID-345-6789",
//     connectivityStatus: "Connected",
//     householdId: "HHD-005",
//     householdStatus: "Vacant",
//     hardwareVersion: "V1.0",
//     alarmsType: "Critical",
//     network: "Wi-Fi",
//     location: [18.9274, -70.5484], // San Francisco de Macorís
//   },
//   {
//     id: "6",
//     meterStatus: "Offline",
//     meterId: "MTR-006",
//     channelDetection: "FRANCE-24-ID-567-8901",
//     connectivityStatus: "Disconnected",
//     householdId: "HHD-006",
//     householdStatus: "Occupied",
//     hardwareVersion: "V1.1",
//     alarmsType: "Warning",
//     network: "Ethernet",
//     location: [18.8041, -70.2728], // San Juan de la Maguana
//   },
//   {
//     id: "7",
//     meterStatus: "Active",
//     meterId: "MTR-007",
//     channelDetection: "RT-NEWS-ID-678-9012",
//     connectivityStatus: "Connected",
//     householdId: "HHD-007",
//     householdStatus: "Vacant",
//     hardwareVersion: "V1.2",
//     alarmsType: "None",
//     network: "Wi-Fi",
//     location: [18.4526, -69.9759], // La Romana
//   },
//   {
//     id: "8",
//     meterStatus: "Inactive",
//     meterId: "MTR-008",
//     channelDetection: "CNBC-ID-789-0123",
//     connectivityStatus: "Disconnected",
//     householdId: "HHD-008",
//     householdStatus: "Occupied",
//     hardwareVersion: "V1.3",
//     alarmsType: "Warning",
//     network: "Ethernet",
//     location: [18.7774, -70.1565], // Hato Mayor del Rey
//   },
//   {
//     id: "9",
//     meterStatus: "Active",
//     meterId: "MTR-009",
//     channelDetection: "NHK-NEWS-ID-901-2345",
//     connectivityStatus: "Connected",
//     householdId: "HHD-009",
//     householdStatus: "Vacant",
//     hardwareVersion: "V1.0",
//     alarmsType: "Critical",
//     network: "Wi-Fi",
//     location: [18.4715, -70.7118], // Barahona
//   },
//   {
//     id: "10",
//     meterStatus: "Offline",
//     meterId: "MTR-010",
//     channelDetection: "TELESUR-ID-012-3456",
//     connectivityStatus: "Disconnected",
//     householdId: "HHD-010",
//     householdStatus: "Occupied",
//     hardwareVersion: "V1.1",
//     alarmsType: "Warning",
//     network: "Ethernet",
//     location: [19.2416, -70.6745], // Bonao
//   },
// ];




// // const dummyChannels = [
// //   {
// //     id: "NBC-NEWS-ID-045-9035",
// //     name: "NBC News",
// //     logo: "/images/nbc-logo.png",
// //     audioConfidence: 95,
// //     overallConfidence: 90,
// //     language: "English",
// //     genre: "News",
// //     country: "USA",
// //     viewership: 1500000,
// //   },
// //   {
// //     id: "AAJ-TAK-NEWS-ID-065-7965",
// //     name: "AAJ Tak",
// //     logo: "/images/aaj-tak-logo.png",
// //     audioConfidence: 92,
// //     overallConfidence: 85,
// //     language: "Hindi",
// //     genre: "News",
// //     country: "India",
// //     viewership: 1200000,
// //   },
// //   {
// //     id: "CNN-NEWS-ID-089-4567",
// //     name: "CNN",
// //     logo: "/images/cnn-logo.png",
// //     audioConfidence: 94,
// //     overallConfidence: 88,
// //     language: "English",
// //     genre: "News",
// //     country: "USA",
// //     viewership: 2000000,
// //   },
// //   {
// //     id: "BBC-WORLD-ID-123-7890",
// //     name: "BBC World",
// //     logo: "/images/bbc-logo.png",
// //     audioConfidence: 93,
// //     overallConfidence: 89,
// //     language: "English",
// //     genre: "News",
// //     country: "UK",
// //     viewership: 1800000,
// //   },
// //   {
// //     id: "AL-JAZEERA-ID-345-6789",
// //     name: "Al Jazeera",
// //     logo: "/images/al-jazeera-logo.png",
// //     audioConfidence: 90,
// //     overallConfidence: 87,
// //     language: "Arabic",
// //     genre: "News",
// //     country: "Qatar",
// //     viewership: 1300000,
// //   },
// //   {
// //     id: "FRANCE-24-ID-567-8901",
// //     name: "France 24",
// //     logo: "/images/france24-logo.png",
// //     audioConfidence: 91,
// //     overallConfidence: 84,
// //     language: "French",
// //     genre: "News",
// //     country: "France",
// //     viewership: 1000000,
// //   },
// //   {
// //     id: "RT-NEWS-ID-678-9012",
// //     name: "RT",
// //     logo: "/images/rt-logo.png",
// //     audioConfidence: 89,
// //     overallConfidence: 82,
// //     language: "Russian",
// //     genre: "News",
// //     country: "Russia",
// //     viewership: 800000,
// //   },
// //   {
// //     id: "CNBC-ID-789-0123",
// //     name: "CNBC",
// //     logo: "/images/cnbc-logo.png",
// //     audioConfidence: 96,
// //     overallConfidence: 91,
// //     language: "English",
// //     genre: "Business",
// //     country: "USA",
// //     viewership: 1400000,
// //   },
// //   {
// //     id: "SKY-NEWS-ID-890-1234",
// //     name: "Sky News",
// //     logo: "/images/sky-news-logo.png",
// //     audioConfidence: 88,
// //     overallConfidence: 86,
// //     language: "English",
// //     genre: "News",
// //     country: "UK",
// //     viewership: 1100000,
// //   },
// //   {
// //     id: "NHK-NEWS-ID-901-2345",
// //     name: "NHK World",
// //     logo: "/images/nhk-logo.png",
// //     audioConfidence: 87,
// //     overallConfidence: 80,
// //     language: "Japanese",
// //     genre: "News",
// //     country: "Japan",
// //     viewership: 900000,
// //   },
// //   {
// //     id: "TELESUR-ID-012-3456",
// //     name: "TeleSUR",
// //     logo: "/images/telesur-logo.png",
// //     audioConfidence: 85,
// //     overallConfidence: 78,
// //     language: "Spanish",
// //     genre: "News",
// //     country: "Venezuela",
// //     viewership: 700000,
// //   },
// // ];



// function Page() {
//   const [selectedDevice, setSelectedDevice] = useState(null);
//   const { isSidebarExpanded } = useSidebarStore();

//   // Adjust map width based on sidebar state
//   const mapWidth = isSidebarExpanded ? "80%" : "94%";

//   const handleDeviceSelect = (device) => {
//     setSelectedDevice(device);
//   };

//   return (
//     <Layout>
//       <div className="p-2 flex w-full flex-col justify-center">
//         <h1 className="text-xl font-extrabold mb-4">
//           Live Monitoring of Meters
//         </h1>
//         <div className="p-3 bg-white rounded-xl " style={{ width: "100%" }}>
//           <Map devices={dummyDevices} />
//         </div>
//         <div
//           className="flex items-center justify-center transition-all duration-1000 fixed w-[80%] bottom-0 right-3 z-[9999999]"
//           style={{ width:  mapWidth  }}
//         >
//           <DeviceTable
//             devices={dummyDevices}
//             onDeviceSelect={handleDeviceSelect}
//           />
//         </div>
//         {/* {selectedDevice && (
//           <div className="mt-8">
//             <h2 className="text-2xl font-bold mb-4">Channels Detected for {selectedDevice.id}</h2>
//             <div className="grid grid-cols-2 gap-4">
//               {dummyChannels.map((channel) => (
//                 <ChannelCard key={channel.id} channel={channel} />
//               ))}
//             </div>
//           </div>
//         )} */}
//       </div>
//     </Layout>
//   );
// }

// export default Page;





"use client";
import { useState, useEffect } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Filter,
  Search,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AAJ from "../../../public/AAJ.png"
import NBC from "../../../public/NBC.png";
import Image from "next/image";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), { ssr: false });


const MapComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Layout>
      <div className="relative h-screen">
        <h1 className="">Live Monitoring of Meter</h1>
<Map/>

        <div className="flex items-center justify-center w-full">
          <div
            className={`absolute bottom-0 left-0 right-0 ml-5 rounded-xl bg-white p-4 shadow-md w-[96%] transition-all duration-300 ease-in-out z-[9] ${
              isExpanded ? "h-0 overflow-hidden" : "h-3/4"
            }`}
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
                  className="flex items-center  text-sm space-x-1 px-4 py-3 bg-accent  rounded-3xl"
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
            {showFilters && <FilterForm />}

            <div className="overflow-x-auto h-full">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 ">
                    <th className="border p-1 min-w-40 text-sm">
                      Meter Status
                    </th>
                    <th className="border p-1 min-w-40 text-sm">
                      Channel detection
                    </th>
                    <th className="border p-1 min-w-40 text-sm">Meter ID</th>
                    <th className="border p-1 min-w-40 text-sm">
                      Connectivity Status
                    </th>
                    <th className="border p-1 min-w-40 text-sm">
                      Household ID
                    </th>
                    <th className="border p-1 min-w-40 text-sm">
                      Household Status
                    </th>
                    <th className="border p-1 min-w-40 text-sm">
                      Hardware Version
                    </th>
                    <th className="border p-1 min-w-40 text-sm">Alarm Type</th>
                    <th className="border p-1 min-w-40 text-sm">Network</th>
                    <th className="border p-1 min-w-40 text-sm">Location</th>
                    <th className="border p-1 min-w-40 text-sm">Lat & Lon</th>
                    <th className="border p-1 min-w-40 text-sm">Radius</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 text-sm">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="border p-2 text-sm">
                      <Dialog className="z-[99999]">
                        <DialogTrigger asChild>
                          <span className="flex bg-gray-300 rounded-3xl p-1 gap-2">
                            <Image
                              height={10}
                              width={10}
                              alt="NBC"
                              src={NBC}
                              className="size-10 rounded-full bg-blue-400"
                            />
                            <span className="flex flex-col">
                              <span className="">NBC NEWS</span>{" "}
                              <span className="text-xs font-bold">
                                ID-047-7956
                              </span>
                            </span>
                          </span>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] z-[99999]">
                          <AccuracyCard
                            name={"NBC NEWS"}
                            id={"ID-065-7956"}
                            src={NBC}
                          />
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="border p-2 text-sm">M No. 112345 or 1-2</td>
                    <td className="border p-2 text-sm">123456709</td>
                    <td className="border p-2 text-sm">123456709</td>
                    <td className="border p-2 text-sm">123456709</td>
                    <td className="border p-2 text-sm">123456709</td>
                    <td className="border p-2 text-sm">RTC BATTERY LOW</td>
                    <td className="border p-2 text-sm">RTC BATTERY LOW</td>
                    <td className="border p-2 text-sm">RTC BATTERY LOW</td>
                    <td className="border p-2 text-sm">RTC BATTERY LOW</td>
                    <td className="border p-2 text-sm">RTC BATTERY LOW</td>
                  </tr>

                  <tr>
                    <td className="border p-2 text-sm">
                      <span className="bg-gray-500 text-white px-2 py-1 rounded-full">
                        Offline
                      </span>
                    </td>
                    <td className="border p-2 text-sm">
                      <Dialog className="z-[99999]">
                        <DialogTrigger asChild>
                          <span className="flex bg-gray-300 rounded-3xl p-1 gap-2">
                            <Image
                              height={10}
                              width={10}
                              src={AAJ}
                              alt="AAJ"
                              className="size-10 rounded-full bg-red-400"
                            />

                            <span className="flex flex-col">
                              <span className="">AAJ TAK</span>{" "}
                              <span className="text-xs font-bold">
                                ID-065-7956
                              </span>
                            </span>
                          </span>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] z-[99999]">
                          <AccuracyCard
                            name={"AAJ TAK"}
                            id={"ID-065-7956"}
                            src={AAJ}
                          />
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="border p-2 text-sm">M No. 112345 or 1-2</td>
                    <td className="border p-2 text-sm">123456709</td>
                    <td className="border p-2 text-sm">123456709</td>
                    <td className="border p-2 text-sm">123456709</td>
                    <td className="border p-2 text-sm">123456709</td>
                    <td className="border p-2 text-sm">RTC BATTERY LOW</td>
                    <td className="border p-2 text-sm">RTC BATTERY LOW</td>
                    <td className="border p-2 text-sm">RTC BATTERY LOW</td>
                    <td className="border p-2 text-sm">RTC BATTERY LOW</td>
                    <td className="border p-2 text-sm">RTC BATTERY LOW</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isExpanded && (
          <button
            className="absolute top-4 right-4 bg-white p-2 rounded shadow z-50"
            onClick={toggleExpand}
          >
            Collapse
          </button>
        )}
      </div>
    </Layout>
  );
};

const AccuracyCard = ({name, id, src}) => {
  return (
    <div className="p-4 max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image
            height={10}
            width={10}
            src={src}
            alt="NBC Logo"
            className="w-8 h-8 mr-2"
          />
          <div>
            <h2 className="font-bold">{name}</h2>
            <p className="text-sm text-gray-600">{id}</p>
          </div>
        </div>
      </div>

      <div className="flex  items-center  gap-4">
        <div className="mb-4">
          <div className="relative">
            <svg className="w-24 h-24" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E6E6E6"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeDasharray="97, 100"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-bold">97%</div>
              <div className="text-sm text-gray-500">Accuracy</div>
            </div>
          </div>
        </div>

        <div className="space-y-2 w-full">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Audio</span>
              <span>98%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 rounded-full h-2"
                style={{ width: "98%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Logo</span>
              <span>97%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 rounded-full h-2"
                style={{ width: "97%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterForm = () => {
  return (
    <div className="flex flex-col mb-4 bg-white shadow-xl rounded-lg right-10 p-3 fixed">
      <div className="flex items-center gap-3 justify-between mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Serial Number Range
          </label>
          <input
            type="text"
            placeholder="e.g. 112345 or 1-2"
            className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Connectivity Status
          </label>
          <select className="mt-1 flex bg-accent/25 rounded-3xl border-0 w-56 p-2">
            <option>Select</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Household ID
          </label>
          <input
            type="text"
            placeholder="e.g. 112345 or 1-2"
            className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 justify-between mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Household Status
          </label>
          <select className="mt-1 flex bg-accent/25 rounded-3xl border-0 w-56 p-2">
            <option className="">Select</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hardware Version
          </label>
          <select className="mt-1 flex bg-accent/25 rounded-3xl border-0 w-56 p-2">
            <option>Select</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Alarm Type
          </label>
          <select className="mt-1 flex bg-accent/25 rounded-3xl border-0 w-56 p-2">
            <option>Select</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 justify-between mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Network
          </label>
          <input
            type="text"
            placeholder="e.g. 112345 or 1-2"
            className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            placeholder="e.g. 112345 or 1-2"
            className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lat & Lon
          </label>
          <input
            type="text"
            placeholder="e.g. 112345 or 1-2"
            className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 justify-between mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Radius
          </label>
          <input
            type="text"
            placeholder="e.g. 112345 or 1-2"
            className="mt-1 block w-full border-0 bg-accent/25 rounded-3xl p-2"
          />
        </div>
      </div>

      <div className="flex items-center justify-end w-full">
        <button className="bg-blue-600 text-white p-2 rounded-full mt-4 flex items-center justify-center gap-2 px-4 py-2">
          <Search size={16} /> Search
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
