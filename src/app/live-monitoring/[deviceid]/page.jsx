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
import LiveMonitoringChart from "@/components/LiveMonitoringChart";

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
          `http://localhost:5000/search/live?deviceId=${deviceid}`
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

  // Sort data by timestamp in descending order and take the last 10 entries
  const sortedData = data
    .filter((item) => item.logo_logo?.ts) // Filter out items without a timestamp
    .sort((a, b) => b.logo_logo.ts - a.logo_logo.ts) // Sort in descending order
    .slice(0, 10); // Take the latest 10 items

  // Prepare data for the chart
  const chartData = sortedData.map((item) => ({
    date: item.logo_logo?.ts
      ? new Date(item.logo_logo.ts * 1000).toLocaleDateString()
      : "N/A",
    audioConfidence: 100,
    logoConfidence: item.logo_logo?.accuracy * 100 || 0,
  }));

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
                  <TableHead className="min-w-40 text-sm">Device ID</TableHead>
                  <TableHead className="min-w-40 text-sm">Audio Logo</TableHead>
                  <TableHead className="min-w-40 text-sm">Channel ID</TableHead>
                  <TableHead className="min-w-40 text-sm">Accuracy</TableHead>
                  <TableHead className="min-w-40 text-sm">Timestamp</TableHead>
                  <TableHead className="min-w-40 text-sm">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="p-2 text-sm font-extrabold">
                      {item.deviceId}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.audio_logo}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.logo_logo?.Channel_ID || "N/A"}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {Math.round(item.logo_logo?.accuracy * 100) || "N/A"}%
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.logo_logo?.ts
                        ? new Date(item.logo_logo.ts * 1000).toLocaleString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.priority}
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
          <LiveMonitoringChart data={chartData} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
