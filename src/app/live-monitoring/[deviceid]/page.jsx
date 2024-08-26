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
} from "@/components/ui/table";
import LiveMonitoringChart from "@/components/LiveMonitoringChart";

const Page = () => {
  const { deviceid } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.inditronics.com/search/live?deviceId=${deviceid}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (result.logoResults && Array.isArray(result.logoResults)) {
          setData(result);
        } else {
          console.error("Data is not in the expected format:", result);
          setError("Unexpected data format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Fetch data on initial render

    const intervalId = setInterval(fetchData, 5000); // Set up interval to fetch data every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [deviceid]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  const logoResults = data.logoResults || [];
  const sortedData = logoResults
    .filter((item) => item.accuracy)
    .sort((a, b) => b.ts - a.ts);

  const chartData = sortedData.map((item) => ({
    date: item.ts ? new Date(item.ts * 1000).toLocaleString() : "N/A",
    logoConfidence: item.accuracy * 100,
    audioConfidence: 100,
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

        {logoResults.length > 0 ? (
          <div className="overflow-auto bg-white rounded-xl border shadow-md max-h-[25vh] mb-10">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="min-w-40 text-sm">Device ID</TableHead>
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
                      {data.DEVICE_ID}
                    </TableCell>
                    <TableCell className="p-2 text-sm font-extrabold">
                      <div className="bg-gray-300 p-1 rounded-3xl flex items-center gap-2">
                        <img
                          src={
                            data.images[0][0] ||
                            "https://via.placeholder.com/150"
                          } // Fallback image
                          alt="logo"
                          className="h-10 w-10 rounded-3xl"
                        />
                        <p>{data.accuracyResults[0].Channel_ID}</p>
                      </div>
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {Math.round(item.accuracy * 100) || "N/A"}%
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {new Date(item.ts * 1000).toLocaleString()}
                    </TableCell>

                    <TableCell className="p-2 text-sm">
                      {data.accuracyResults[0]?.Priority || "None"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-lg">
            No logo results available for the selected meter ID.
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
