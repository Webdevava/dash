"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { format } from "date-fns";

export default function Proximity() {
  const [proximityData, setProximityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    let url = `http://localhost:5000/mqtt/proximity-data?page=${currentPage}&limit=5`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setProximityData(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching proximity data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds
    return () => clearInterval(intervalId);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const chartData = proximityData
    .map((item) => ({
      ...item,
      object_detected: item.object_detected ? 1 : 0,
      formattedTime: format(new Date(item.timestamp), "HH:mm:ss"),
    }))
    .reverse();

  return (
    <Card className="bg-transparent bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50">
      <CardHeader className="px-4 py-2 border-b">
        <CardTitle className="text-lg">Proximity Data</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col w-full items-center justify-evenly gap-4 p-4">
        <Card className="w-full bg-white">
          <CardHeader className="px-4 py-2 border-b">
            <CardTitle className="text-lg">
              Object Detection Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <div className="h-[333px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="formattedTime" />
                  <YAxis ticks={[0, 1]} />
                  <Tooltip
                    content={({ payload, label }) => {
                      if (payload && payload.length) {
                        return (
                          <div className="bg-popover border p-3 rounded-lg">
                            <p>{`Time: ${label}`}</p>
                            <p>{`Object Detected: ${
                              payload[0].value === 1 ? "Yes" : "No"
                            }`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="object_detected" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full bg-white">
          <CardHeader className="flex justify-between items-center flex-row px-4 py-2 border-b">
            <CardTitle className="text-lg">Proximity Data</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={fetchData}>
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Object Detected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proximityData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {format(
                        new Date(data.timestamp),
                        "MMM d, yyyy h:mm:ss a"
                      )}
                    </TableCell>
                    <TableCell>{data.object_detected ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
