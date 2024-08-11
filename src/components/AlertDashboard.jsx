"use client";
import { BellRing } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  FaClock,
  FaBell,
  FaBatteryQuarter,
  FaMapMarkerAlt,
  FaTv,
  FaCheck,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AlarmCard = ({ icon, title, time, color }) => (
  <div
    style={{ backgroundColor: `${color}20` }}
    className="p-2 w-full lg:w-52 rounded-lg h-28 mx-2  flex justify-between items-"
  >
    <div className="flex items-center space-x-3">
      <div className="gap-2">
        {icon}
        <p className="font-bold">{title}</p>
        <p className="text-sm text-gray-600">{time}</p>
      </div>
    </div>
    <div
      style={{ backgroundColor: color }}
      className="text-[#fefefe] h-fit text-3xl rounded-full p-2"
    >
      <BellRing size={28} className="-rotate-12" />
    </div>
  </div>
);

const AlarmDashboard = () => {
  const [filter, setFilter] = useState("all");
  const [filteredAlarms, setFilteredAlarms] = useState([]);

  const alarms = [
    {
      icon: <FaClock className="text-blue-500 text-2xl" />,
      title: "METER TAMPER",
      time: "63 | 00 | 57",
      color: "#3e4cc3",
      status: "generated",
    },
    {
      icon: <FaBell className="text-blue-500 text-2xl" />,
      title: "SOS",
      time: "63 | 00 | 57",
      color: "#3e4cc3",
      status: "generated",
    },
    {
      icon: <FaBatteryQuarter className="text-yellow-500 text-2xl" />,
      title: "RTC BATTERY LOW",
      time: "63 | 00 | 57",
      color: "#FFA500",
      status: "pending",
    },
    {
      icon: <FaMapMarkerAlt className="text-green-500 text-2xl" />,
      title: "METER LOCATION CHANGE",
      time: "63 | 00 | 57",
      color: "#22c55e",
      status: "resolved",
    },
    {
      icon: <FaTv className="text-yellow-500 text-2xl" />,
      title: "TV OFF EXCEEDED",
      time: "63 | 00 | 57",
      color: "#FFA500",
      status: "pending",
    },
    {
      icon: <FaCheck className="text-blue-500 text-2xl" />,
      title: "TV ON EXCEEDED",
      time: "63 | 00 | 57",
      color: "#3e4cc3",
      status: "generated",
    },
    {
      icon: <FaMapMarkerAlt className="text-green-500 text-2xl" />,
      title: "METER LOCATION CHANGE",
      time: "63 | 00 | 57",
      color: "#22c55e",
      status: "resolved",
    },
    {
      icon: <FaMapMarkerAlt className="text-green-500 text-2xl" />,
      title: "METER LOCATION CHANGE",
      time: "63 | 00 | 57",
      color: "#22c55e",
      status: "resolved",
    },
  ];

  useEffect(() => {
    if (filter === "all") {
      setFilteredAlarms(alarms);
    } else {
      setFilteredAlarms(alarms.filter((alarm) => alarm.status === filter));
    }
  }, [filter]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="max-w-[90vw] w-full flex items-center justify-between text-lg mb-4 text-[#1f1f1f] font-semibold">
        <p className="text-2xl font-bold">All Meter Alarms</p>
        <div className="flex text-xs space-x-4 mb-4">
          <div
            className={`flex items-center space-x-2 bg-[#fefefe] rounded-3xl p-2 shadow-md cursor-pointer ${
              filter === "generated" ? "ring-2 ring-[#3e4cc3]" : ""
            }`}
            onClick={() => setFilter("generated")}
          >
            <span className="w-3 h-3 bg-[#3e4cc3] rounded-full"></span>
            <span className="text-sm font-semibold">Generated</span>
          </div>
          <div
            className={`flex items-center space-x-2 bg-[#fefefe] rounded-3xl p-2 shadow-md cursor-pointer ${
              filter === "pending" ? "ring-2 ring-[#FFA500]" : ""
            }`}
            onClick={() => setFilter("pending")}
          >
            <span className="w-3 h-3 bg-[#FFA500] rounded-full"></span>
            <span className="text-sm font-semibold">Pending</span>
          </div>
          <div
            className={`flex items-center space-x-2 bg-[#fefefe] rounded-3xl p-2 shadow-md cursor-pointer ${
              filter === "resolved" ? "ring-2 ring-[#22c55e]" : ""
            }`}
            onClick={() => setFilter("resolved")}
          >
            <span className="w-3 h-3 bg-[#22c55e] rounded-full"></span>
            <span className="text-sm font-semibold">Resolved</span>
          </div>
          <div
            className={`flex items-center space-x-2 bg-[#fefefe] rounded-3xl p-2 shadow-md cursor-pointer ${
              filter === "all" ? "ring-2 ring-gray-400" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            <span className="text-sm font-semibold">All</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl  p-2 w-full min-w-96 max-w-[75vw]">
        <Slider {...settings}>
          {filteredAlarms.map((alarm, index) => (
            <AlarmCard key={index} {...alarm}/>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AlarmDashboard;
