"use client";
import React, { useState } from "react";
import {
  Calendar,
  ChartNoAxesColumn,
  ChartSpline,
  EllipsisVertical,
} from "lucide-react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LiveMonitoringChart = ({ data }) => {
  const [timePeriod, setTimePeriod] = useState("Day");
  const [filter, setFilter] = useState("all"); // State to manage filter selection

  // Ensure data is sorted in ascending order by date
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const dataWithAverage = sortedData.map((entry) => ({
    ...entry,
    audioConfidence: 100,
    averageConfidence: (100 + entry.logoConfidence) / 2,
  }));

  // Filter data based on the selected time period
  const filteredData = dataWithAverage.filter((entry) => {
    const entryDate = new Date(entry.date);
    const now = new Date();

    switch (timePeriod) {
      case "Day":
        return entryDate >= new Date(now.setDate(now.getDate() - 1));
      case "Week":
        return entryDate >= new Date(now.setDate(now.getDate() - 7));
      case "Month":
        return entryDate >= new Date(now.setMonth(now.getMonth() - 1));
      default:
        return true;
    }
  });

  // Get current date in format "MMM DD"
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "20px 10px",
      }}
      className="flex flex-col gap-6 h-96"
    >
      <div className="flex items-center justify-between gap-3 ">
        <div className="flex gap-3 items-center font-bold">
          <button
            onClick={() => setFilter("audio")}
            className={`bg-[#32ADE644] p-2 rounded-3xl w-fit flex items-center ${
              filter === "audio" ? "ring-2 ring-primary" : ""
            }`}
          >
            <span className="bg-[#32ADE6] h-3 w-3 rounded-full"></span>
            <p className="ml-2 mr-4">Audio</p>
            <ChartNoAxesColumn color="#32ADE6" />
          </button>
          <button
            onClick={() => setFilter("logo")}
            className={`bg-[#AF52DE44] p-2 rounded-3xl w-fit flex items-center ${
              filter === "logo" ? "ring-2 ring-primary" : ""
            }`}
          >
            <span className="bg-[#AF52DE] h-3 w-3 rounded-full"></span>
            <p className="ml-2 mr-4">Logo</p>
            <ChartNoAxesColumn color="#AF52DE" />
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`bg-[#34C75944] p-2 rounded-3xl w-fit flex items-center ${
              filter === "all" ? "ring-2 ring-primary" : ""
            }`}
          >
            <span className="bg-[#34C759] h-3 w-3 rounded-full"></span>
            <p className="ml-2 mr-4">All</p>
            <ChartSpline color="#34C759" />
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-6 font-bold text-[#2054DD] bg-[#CFDCFF] w-fit p-2 rounded-3xl">
            <p>{currentDate}</p> <Calendar />
          </div>
          <div className="w-fit border border-gray-300 rounded-3xl p-1 font-medium bg-gray-200 text-[14px]">
            <ul className="flex items-center justify-between">
              {["Day", "Week", "Month"].map((period) => (
                <li
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`rounded-3xl px-3 py-1 cursor-pointer ${
                    timePeriod === period
                      ? "bg-primary text-white font-bold"
                      : ""
                  }`}
                >
                  {period}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-1 rounded-full bg-[#CFDCFF] h-10 w-10 flex items-center justify-center">
            <EllipsisVertical />
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={filteredData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => {
              const date = new Date(tick);
              return `${date.toLocaleTimeString()}`;
            }}
            reversed={false} // Ensure the axis is in ascending order
          />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          {filter === "all" || filter === "audio" ? (
            <Bar
              dataKey="audioConfidence"
              barSize={10}
              fill="#32ADE6"
              name="Audio Confidence"
              radius={[10, 10, 0, 0]}
            />
          ) : null}
          {filter === "all" || filter === "logo" ? (
            <Bar
              dataKey="logoConfidence"
              barSize={10}
              fill="#AF52DE"
              name="Logo Confidence"
              radius={[10, 10, 0, 0]}
            />
          ) : null}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveMonitoringChart;
