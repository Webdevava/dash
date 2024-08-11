"use client";
import React from "react";
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
  const data = {
    labels: ["29 Jan", "12 Feb", "26 Feb", "11 Mar", "25 Mar", "8 Apr"],
    datasets: [
      {
        label: "APM1 Meter",
        data: [105, 165, 250, 110, 105, 105],
        backgroundColor: "#28B7C4",
        borderRadius: 4, // Rounded corners for bars
        barThickness: 8, // Thin bars
      },
      {
        label: "APM2 Meter",
        data: [160, 250, 80, 150, 160, 160],
        backgroundColor: "#9F5BC1",
        borderRadius: 4, // Rounded corners for bars
        barThickness: 8, // Thin bars
      },
      {
        label: "APM3 Meter",
        data: [95, 145, 285, 50, 95, 95],
        backgroundColor: "#FFA500",
        borderRadius: 4, // Rounded corners for bars
        barThickness: 8, // Thin bars
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
          display: false, // Hide grid lines on x-axis
        },
        ticks: {
          padding: 10,
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        grid: {
          display: false, // Hide grid lines on y-axis
        },
        ticks: {
          padding: 10,
        },
      },
    },
  };

  return (
    <div className="p-6 shadow-md bg-[#fefefe] rounded-3xl w-full h-[28rem]">
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
      <div className="flex space-x-4 mb-4 bg-muted/15 border border-accent p-1 rounded-[500px]">
        <button className="bg-primary text-xs text-white px-4 rounded-[500px]">
          Installed
        </button>
        <button className="text-gray-600 px-4 py-1 text-xs">Connected</button>
        <button className="text-gray-600 px-4 text-xs">EOD Received</button>
        <button className="text-gray-600 px-4 text-xs">
          Installed Household
        </button>
      </div>
      <Bar data={data} options={options} height={170} />
    </div>
  );
};

export default MeterStatistics;
