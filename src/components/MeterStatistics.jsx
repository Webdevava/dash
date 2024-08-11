"use client";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MeterStatistics = () => {
  const [activeButton, setActiveButton] = useState("Installed");
  const [activeMeter, setActiveMeter] = useState("All"); // Default to APM1

  const getRandomValue = () => Math.floor(Math.random() * 301);

  const getRandomArray = (length) => Array.from({ length }, getRandomValue);

  const chartData = {
    Installed: {
      APM1: getRandomArray(6),
      APM2: getRandomArray(6),
      APM3: getRandomArray(6),
    },
    Connected: {
      APM1: getRandomArray(6),
      APM2: getRandomArray(6),
      APM3: getRandomArray(6),
    },
    "EOD Received": {
      APM1: getRandomArray(6),
      APM2: getRandomArray(6),
      APM3: getRandomArray(6),
    },
    "Installed Household": {
      APM1: getRandomArray(6),
      APM2: getRandomArray(6),
      APM3: getRandomArray(6),
    },
  };

  // Function to get data for all meters
  const getAllMetersData = () => {
    return {
      APM1: chartData[activeButton].APM1,
      APM2: chartData[activeButton].APM2,
      APM3: chartData[activeButton].APM3,
    };
  };

  const data = {
    labels: ["29 Jan", "12 Feb", "26 Feb", "11 Mar", "25 Mar", "8 Apr"],
    datasets:
      activeMeter === "All"
        ? [
            {
              label: "APM1",
              data: getAllMetersData().APM1,
              backgroundColor: "#28B7C4",
              barThickness: 8,
            },
            {
              label: "APM2",
              data: getAllMetersData().APM2,
              backgroundColor: "#9F5BC1",
              barThickness: 8,
            },
            {
              label: "APM3",
              data: getAllMetersData().APM3,
              backgroundColor: "#FFA500",
              barThickness: 8,
            },
          ]
        : [
            {
              label: `${activeMeter} Meter`,
              data: chartData[activeButton][activeMeter],
              backgroundColor: {
                APM1: "#28B7C4",
                APM2: "#9F5BC1",
                APM3: "#FFA500",
              }[activeMeter],
              borderRadius: 4,
              barThickness: 8,
            },
          ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ": " + tooltipItem.raw;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
        },
      },
    },
  };

  const buttons = [
    "Installed",
    "Connected",
    "EOD Received",
    "Installed Household",
  ];

  const meterButtons = [
    { id: "All", label: "All Meters", color: "#6C757D" }, // Add All Meters button
    { id: "APM1", label: "Total APM1 Meter", color: "#28B7C4" },
    { id: "APM2", label: "Total APM2 Meter", color: "#9F5BC1" },
    { id: "APM3", label: "Total APM3 Meter", color: "#FFA500" },
  ];

  return (
    <div className="p-6 shadow-md bg-[#fefefe] rounded-3xl w-full h-full lg:h-[28rem]">
      <div className="flex justify-start mb-4 gap-1">
        {meterButtons.map((meter) => (
          <div
            key={meter.id}
            className={`flex text-xs items-center gap-1 rounded-3xl p-2 ${
              activeMeter === meter.id ? "bg-muted" : ""
            }`}
            onClick={() => setActiveMeter(meter.id)}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: meter.color }}
            ></span>
            <span className="text-xs flex flex-col truncate">
              <span className="font-bold">234K+</span>
              {meter.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mb-4 justify-between bg-muted/15 border border-accent p-1 rounded-[500px]">
        {buttons.map((button) => (
          <button
            key={button}
            className={`text-xs px-4 py-1 rounded-[500px] truncate ${
              activeButton === button
                ? "bg-primary text-white"
                : "text-gray-600"
            }`}
            onClick={() => setActiveButton(button)}
          >
            {button}
          </button>
        ))}
      </div>
      <Bar data={data} options={options} height={170} />
    </div>
  );
};

export default MeterStatistics;
