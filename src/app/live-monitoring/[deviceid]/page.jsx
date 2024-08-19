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
          `http://localhost:5000/search/live?deviceId=${deviceid}` // Ensure this endpoint returns the expected data
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

  // Sort data by timestamp in descending order
  const sortedData = data
    .filter((item) => item.logoResult?.ts) // Filter out items without a timestamp
    .sort((a, b) => b.logoResult.ts - a.logoResult.ts); // Sort in descending order

  // Prepare data for the chart
  const chartData = sortedData.map((item) => ({
    date: item.logoResult?.ts
      ? new Date(item.logoResult.ts * 1000).toLocaleDateString()
      : "N/A",
    audioConfidence: 100,
    logoConfidence: item.logoResult?.accuracy * 100 || 0,
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
                  <TableHead className="min-w-40 text-sm">
                    Channel Detected
                  </TableHead>
                  <TableHead className="min-w-40 text-sm">Audio Logo</TableHead>
                  <TableHead className="min-w-40 text-sm">
                    Channel Name
                  </TableHead>
                  <TableHead className="min-w-40 text-sm">Accuracy</TableHead>
                  <TableHead className="min-w-40 text-sm">Timestamp</TableHead>
                  <TableHead className="min-w-40 text-sm">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="p-2 text-sm font-extrabold">
                      {item.DEVICE_ID}
                    </TableCell>
                    <TableCell className="p-2 text-sm font-extrabold">
                      <div className="bg-gray-300 p-1 rounded-3xl flex items-center gap-2">
                        <img
                          src={item.images[1] || item.images[0]}
                          alt="logo"
                          className="h-10 w-10 rounded-3xl"
                        />
                        <p>
                          {item.accuracyResult.logo_logo ||
                            item.accuracyResult.audio_logo}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.accuracyResult.audio_logo}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.logoResult.channelName || "N/A"}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {Math.round(item.logoResult?.accuracy * 100) || "N/A"}%
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.accuracyResult?.ts}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {item.accuracyResult.priority || "N/A"}
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
