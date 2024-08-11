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

  console.log(chartData);


  // const chartData = {
  //   Installed: {
  //     APM1: [105, 165, 250, 110, 105, 105],
  //     APM2: [160, 250, 80, 150, 160, 160],
  //     APM3: [95, 145, 285, 50, 95, 95],
  //   },
  //   Connected: {
  //     APM1: [90, 140, 220, 100, 95, 100],
  //     APM2: [140, 230, 70, 130, 150, 150],
  //     APM3: [85, 130, 260, 45, 90, 90],
  //   },
  //   "EOD Received": {
  //     APM1: [80, 130, 200, 90, 85, 90],
  //     APM2: [130, 210, 60, 120, 140, 140],
  //     APM3: [75, 120, 240, 40, 80, 80],
  //   },
  //   "Installed Household": {
  //     APM1: [100, 155, 240, 105, 100, 100],
  //     APM2: [150, 240, 75, 140, 155, 155],
  //     APM3: [90, 140, 275, 48, 90, 90],
  //   },
  // };

  const data = {
    labels: ["29 Jan", "12 Feb", "26 Feb", "11 Mar", "25 Mar", "8 Apr"],
    datasets: [
      {
        label: "APM1 Meter",
        data: chartData[activeButton].APM1,
        backgroundColor: "#28B7C4",
        borderRadius: 4,
        barThickness: 8,
      },
      {
        label: "APM2 Meter",
        data: chartData[activeButton].APM2,
        backgroundColor: "#9F5BC1",
        borderRadius: 4,
        barThickness: 8,
      },
      {
        label: "APM3 Meter",
        data: chartData[activeButton].APM3,
        backgroundColor: "#FFA500",
        borderRadius: 4,
        barThickness: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "false",
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

  return (
    <div className="p-6 shadow-md bg-[#fefefe] rounded-3xl w-full h-full lg:h-[28rem]">
      <div className="flex justify-between mb-4 gap-1">
        <div className="flex text-xs items-center space-x-2 bg-[#20b2ab22] rounded-3xl p-2">
          <span className="w-3 h-3 bg-[#28B7C4] rounded-full"></span>
          <span className="text-xs flex flex-col">
            <span className="font-bold">234K+</span>Total APM1 Meter
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-[#DDA0DD22] rounded-3xl p-2">
          <span className="w-3 h-3 bg-[#9F5BC1] rounded-full"></span>
          <span className="text-xs flex flex-col">
            <span className="font-bold">434K+</span> Total APM2 Meter
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-[#FFA50022] rounded-3xl p-2">
          <span className="w-3 h-3 bg-[#FFA500] rounded-full"></span>
          <span className="text-xs flex flex-col">
            <span className="font-bold">540K+</span> Total APM3 Meter
          </span>
        </div>
      </div>
      <div className="flex space-x-4 mb-4 justify-between bg-muted/15 border border-accent p-1 rounded-[500px]">
        {buttons.map((button) => (
          <button
            key={button}
            className={`text-xs px-4 py-1 rounded-[500px] ${
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
