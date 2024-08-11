"use client";
import { BellRing } from "lucide-react";
import React from "react";
import {
  FaClock,
  FaBell,
  FaBatteryQuarter,
  FaMapMarkerAlt,
  FaTv,
  FaCheck,
} from "react-icons/fa";

const AlarmCard = ({ icon, title, time, color }) => (
  <div
    style={{ backgroundColor: `${color}20` }} // Using inline styles for background color
    className="p-4 rounded-lg w-full flex justify-between items-center"
  >
    <div className="flex items-center space-x-3">
      <div className="gap-2">
        {icon}
        <p className="font-bold">{title}</p>
        <p className="text-sm text-gray-600">{time}</p>
      </div>
    </div>
    <div
      style={{ backgroundColor: color }} // Using inline styles for background color
      className="text-[#fefefe] text-3xl rounded-full p-2"
    >
      <BellRing size={36} className=" -rotate-12"/>
    </div>
  </div>
);

const AlarmDashboard = () => {
  const alarms = [
    {
      icon: <FaClock className="text-blue-500 text-2xl" />,
      title: "METER TAMPER",
      time: "63 | 00 | 57",
      color: "#3e4cc3",
    },
    {
      icon: <FaBell className="text-blue-500 text-2xl" />,
      title: "SOS",
      time: "63 | 00 | 57",
      color: "#3e4cc3",
    },
    {
      icon: <FaBatteryQuarter className="text-yellow-500 text-2xl" />,
      title: "RTC BATTERY LOW",
      time: "63 | 00 | 57",
      color: "#FFA500",
    },
    {
      icon: <FaMapMarkerAlt className="text-green-500 text-2xl" />,
      title: "METER LOCATION CHANGE",
      time: "63 | 00 | 57",
      color: "#22c55e",
    },
    {
      icon: <FaTv className="text-yellow-500 text-2xl" />,
      title: "TV OFF EXCEEDED",
      time: "63 | 00 | 57",
      color: "#FFA500",
    },
    {
      icon: <FaCheck className="text-blue-500 text-2xl" />,
      title: "TV ON EXCEEDED",
      time: "63 | 00 | 57",
      color: "#3e4cc3",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {alarms.map((alarm, index) => (
        <AlarmCard key={index} {...alarm} />
      ))}
    </div>
  );
};

export default AlarmDashboard;
