"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import LiveMonitoringChart from "@/components/LiveMonitoringChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import styled table components
import { ChevronRight, Link } from "lucide-react";
import Image from "next/image";

const Page = () => {
  const { deviceid } = useParams();
  const router = useRouter(); // Initialize the router
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/devices/${deviceid}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deviceid]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <Layout>
      <div className="relative h-screen flex flex-col p-4">
        <div className="flex w-full justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Meter No. {deviceid} History</h1>

          <button
            onClick={() => router.back()}
            className="px-8 py-2 bg-white text-blue-600 hover:text-white text-lg border border-blue-500 hover:bg-blue-600 transition-colors rounded-3xl"
          >
            Back
          </button>
        </div>

        {data && data.length > 0 ? (
          <div className="overflow-auto bg-white rounded-xl border shadow-md max-h-[25vh] mb-10">
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
                      {item.meter_id}
                    </TableCell>
                    <TableCell className="p-2 text-xs font-extrabold">
                      <div className="flex bg-accent rounded-3xl p-1 gap-2">
                        <Image
                          height={10}
                          width={10}
                          alt={item.channel_name || "logo"}
                          src={item.channel_image[0]}
                          className="size-10 rounded-full"
                        />
                        <p className="flex flex-col">
                          <span className=" truncate w-36">{item.channel_name}</span>
                          <span>{item.channel_id}</span>
                        </p>
                      </div>
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
        ) : (
          <p className="text-center text-lg mt-4">
            No data available for this device ID.
          </p>
        )}

        <LiveMonitoringChart />
      </div>
    </Layout>
  );
};

export default Page;
