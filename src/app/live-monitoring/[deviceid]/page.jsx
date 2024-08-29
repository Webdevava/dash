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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
          `${API_URL}/search/live?deviceId=${deviceid}`
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
  const audioResults = data.afpResults || [];
  const sortedLogoData = logoResults
    .filter((item) => item.accuracy)
    .sort((a, b) => b.ts - a.ts);

  const chartData = sortedLogoData.map((item) => ({
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

        <div className="flex w-full gap-6">
          {logoResults.length > 0 && (
          <div className="w-full">
            <h2 className="text-lg font-bold mb-2">Logo Results</h2>
            
              <div className="overflow-auto bg-white rounded-xl border  w-full shadow-md max-h-[25vh] mb-10">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="min-w-40 text-sm">
                        Device ID
                      </TableHead>
                      <TableHead className="min-w-40 text-sm">Logo</TableHead>
                      <TableHead className="min-w-40 text-sm">
                        Timestamp
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLogoData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="p-2 text-sm font-extrabold">
                          {item.device_id || "N/A"}
                        </TableCell>
                        <TableCell className="p-2 text-sm">
                          <div className="bg-gray-300 p-1 rounded-3xl flex items-center gap-2">
                            <img
                              src={
                                item.images?.[0]?.images?.[0] ||
                                "https://via.placeholder.com/150"
                              }
                              alt="logo"
                              className="h-10 w-10 rounded-3xl"
                            />
                            <p>{item.Channel_ID || "N/A"}</p>
                          </div>
                        </TableCell>
                        <TableCell className="p-2 text-sm">
                          {item.ts
                            ? new Date(item.ts * 1000).toLocaleString()
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
          </div>
            )}

            {audioResults.length > 0 && (
          <div className="w-full">
            <h2 className="text-lg font-bold mb-2">Audio Results</h2>
              <div className="overflow-auto bg-white rounded-xl border w-full shadow-md max-h-[25vh] mb-10">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="min-w-40 text-sm">
                        Device ID
                      </TableHead>
                      <TableHead className="min-w-40 text-sm">Audio</TableHead>
                      <TableHead className="min-w-40 text-sm">
                        Timestamp
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {audioResults.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="p-2 text-sm font-extrabold">
                          {item.device_id || "N/A"}
                        </TableCell>
                        <TableCell className="p-2 text-sm">
                          <div className="bg-gray-300 p-1 rounded-3xl flex items-center gap-2">
                            <img
                              src={
                                item.images?.[0]?.images?.[0] ||
                                "https://via.placeholder.com/150"
                              }
                              alt="audio"
                              className="h-10 w-10 rounded-3xl"
                            />
                            <p>{item.Channel_ID || "N/A"}</p>
                          </div>
                        </TableCell>
                        <TableCell className="p-2 text-sm">
                          {item.time
                            ? new Date(item.time * 1000).toLocaleString()
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
          </div>
            )}
        </div>

        <div>
          <LiveMonitoringChart data={chartData} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
