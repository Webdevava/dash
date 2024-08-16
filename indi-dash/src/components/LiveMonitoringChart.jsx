"use client";
import { Calendar, ChartNoAxesColumn, ChartSpline, EllipsisVertical } from "lucide-react";
import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Static data with dates on the X-axis and percentages for audio and logo confidence
const staticData = [
  { date: "1", audioConfidence: 85, logoConfidence: 90 },
  { date: "2", audioConfidence: 78, logoConfidence: 85 },
  { date: "3", audioConfidence: 92, logoConfidence: 88 },
  { date: "4", audioConfidence: 80, logoConfidence: 82 },
  { date: "5", audioConfidence: 75, logoConfidence: 87 },
  { date: "6", audioConfidence: 89, logoConfidence: 90 },
  { date: "7", audioConfidence: 84, logoConfidence: 86 },
  { date: "8", audioConfidence: 77, logoConfidence: 80 },
  { date: "9", audioConfidence: 88, logoConfidence: 91 },
  { date: "10", audioConfidence: 90, logoConfidence: 85 },
];

// Calculate average accuracy for each data point
const processedData = staticData.map((item) => ({
  ...item,
  averageAccuracy: (item.audioConfidence + item.logoConfidence) / 2,
}));

const LiveMonitoringChart = () => {
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
          <div className="bg-[#32ADE644] p-2 rounded-3xl w-fit flex items-center">
            <span className="bg-[#32ADE6] h-3 w-3 rounded-full"></span>
            <p className="ml-2 mr-4">Audio</p>
            <ChartNoAxesColumn color="#32ADE6" />
          </div>
          <div className="bg-[#AF52DE44] p-2 rounded-3xl w-fit flex items-center">
            <span className="bg-[#AF52DE] h-3 w-3 rounded-full"></span>
            <p className="ml-2 mr-4">Logo</p>
            <ChartNoAxesColumn color="#AF52DE" />
          </div>
          <div className="bg-[#34C75944] p-2 rounded-3xl w-fit flex items-center">
            <span className="bg-[#34C759] h-3 w-3 rounded-full"></span>
            <p className="ml-2 mr-4">Accuracy</p>
            <ChartSpline color="#34C759" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-6 font-bold text-[#2054DD] bg-[#CFDCFF] w-fit p-2 rounded-3xl">
            <p>Aug 15</p> <Calendar />
          </div>
          <div className="w-fit border border-gray-300 rounded-3xl p-1 font-medium bg-gray-200 text-[14px]">
            <ul className="flex items-center justify-between">
              <li className="bg-primary rounded-3xl px-3 py-1 text-white font-bold">
                Day
              </li>
              <li className="rounded-3xl px-3 py-1">Week</li>
              <li className="rounded-3xl px-3 py-1">Month</li>
            </ul>
          </div>
          <div className="p-1 rounded-full bg-[#CFDCFF] h-10 w-10 flex items-center justify-center">
            <EllipsisVertical />
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%" className="">
        <ComposedChart
          data={processedData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar
            dataKey="audioConfidence"
            barSize={10}
            fill="#32ADE6"
            name="Audio Confidence"
            radius={[10, 10, 0, 0]} // Rounded corners for the bars
          />
          <Bar
            dataKey="logoConfidence"
            barSize={10}
            fill="#AF52DE"
            name="Logo Confidence"
            radius={[10, 10, 0, 0]} // Rounded corners for the bars
          />
          <Line
            type="monotone"
            dataKey="averageAccuracy"
            stroke="#34C759"
            strokeWidth={4} // Thicker line
            dot={{ stroke: "#34C759", strokeWidth: 12 }} // Style for line dots
            name="Average Accuracy"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveMonitoringChart;
