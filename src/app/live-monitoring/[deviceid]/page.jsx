"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import styled table components
import LiveMonitoringChart from "../../../../indi-dash/src/components/LiveMonitoringChart";

const Page = () => {
  const { deviceid } = useParams();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/search/all?deviceId=${deviceid}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result || []);
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

        {data.length > 0 ? (
          <div className="overflow-auto bg-white rounded-xl border shadow-md max-h-[25vh] mb-10">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="min-w-40 text-sm">Meter ID</TableHead>
                  <TableHead className="min-w-40 text-sm">Latitude</TableHead>
                  <TableHead className="min-w-40 text-sm">Longitude</TableHead>
                  <TableHead className="min-w-40 text-sm">HHID</TableHead>
                  <TableHead className="min-w-40 text-sm">
                    Online Status
                  </TableHead>
                  <TableHead className="min-w-40 text-sm">SIM Type</TableHead>
                  <TableHead className="min-w-40 text-sm">
                    Hardware Version
                  </TableHead>
                  <TableHead className="min-w-40 text-sm">
                    Installation Status
                  </TableHead>
                  <TableHead className="min-w-40 text-sm">Logos</TableHead>
                  <TableHead className="min-w-40 text-sm">
                    Fingerprints
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="p-2 text-sm font-extrabold">
                      {item.DEVICE_ID}
                    </TableCell>
                    <TableCell className="p-2 text-sm">{item.lat}</TableCell>
                    <TableCell className="p-2 text-sm">{item.lon}</TableCell>
                    <TableCell className="p-2 text-sm">{item.hhid}</TableCell>
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
                    <TableCell className="p-2 text-sm">
                      {item.sim === 1
                        ? "Jio"
                        : item.sim === 2
                        ? "Airtel"
                        : "Unknown"}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.hardwareVersion}
                    </TableCell>
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
                      {item.logos.map((logo, idx) => (
                        <div key={idx}>
                          <p>
                            Timestamp:{" "}
                            {new Date(logo.timestamp).toLocaleString()}
                          </p>
                          <p>Channel ID: {logo.channel_id}</p>
                          <p>Accuracy: {logo.accuracy}</p>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.fingerprints.map((fp, idx) => (
                        <div key={idx}>
                          <p>
                            Timestamp: {new Date(fp.timestamp).toLocaleString()}
                          </p>
                          <p>Channel ID: {fp.channel_id}</p>
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-lg">
            No data available for the selected meter ID.
          </p>
        )}
        <div>
          <LiveMonitoringChart />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
