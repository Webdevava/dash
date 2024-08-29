"use client";
import React, { useState, useEffect } from "react";
import {
  FaClock,
  FaBell,
  FaBatteryQuarter,
  FaExclamationTriangle,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useRouter } from "next/navigation";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AlarmCard = ({
  icon: Icon,
  title,
  time,
  ts,
  color,
  deviceId,
  alertName,
  errorCode,
  errorMessage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/live-monitoring/${deviceId}`);
  };

  return (
    <div className="px-2 min-h-24">
      <div
        style={{ backgroundColor: `${color}20` }}
        className="p-2 w-full rounded-lg h-28 flex justify-between items-center relative overflow-hidden transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="flex items-center ">
          <div className="gap-2 flex flex-col h-full">
            <Icon style={{ color: color }} className="text-2xl mb-2" />
            <p className="font-[900] text-sm">{title}</p>
            <p className="text-xs text-gray-800">
              {new Date(ts * 1000).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex h-full">
          <div
            style={{ backgroundColor: color }}
            className="text-[#fefefe] h-fit text-3xl rounded-full p-2"
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m10.827 5.465-.435-2.324m.435 2.324a5.338 5.338 0 0 1 6.033 4.333l.331 1.769c.44 2.345 2.383 2.588 2.6 3.761.11.586.22 1.171-.31 1.271l-12.7 2.377c-.529.099-.639-.488-.749-1.074C5.813 16.73 7.538 15.8 7.1 13.455c-.219-1.169.218 1.162-.33-1.769a5.338 5.338 0 0 1 4.058-6.221Zm-7.046 4.41c.143-1.877.822-3.461 2.086-4.856m2.646 13.633a3.472 3.472 0 0 0 6.728-.777l.09-.5-6.818 1.277Z"
              />
            </svg>
          </div>
        </div>
        {isHovered && (
          <div
            className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white transition-all duration-300 ease-in-out p-2"
            style={{
              transform: isHovered ? "translateY(0)" : "translateY(100%)",
            }}
          >
            <p className="font-bold">Device ID: {deviceId}</p>
            <p className="text-sm">{alertName}</p>
            {errorCode && <p className="text-xs">Error Code: {errorCode}</p>}
            {errorMessage && (
              <p className="text-xs truncate w-full text-center">
                {errorMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


const AlarmDashboard = () => {
  const [filter, setFilter] = useState("all");
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        let url = `${API_URL}/search/alerts`;
        if (filter !== "all") {
          url = `${API_URL}/search/alerts?AlertType=${filter}`;
        }
        const response = await axios.get(url);
        const fetchedAlarms = response.data.map(mapAlarmData);
        setAlarms(fetchedAlarms);
      } catch (error) {
        console.error("Error fetching alarms:", error);
      }
    };

    fetchAlarms();
  }, [filter]);

const mapAlarmData = (alarm) => {
  const alertTypeMap = {
    5: { title: "METER TAMPER", icon: FaClock },
    6: { title: "SOS ALARM", icon: FaBell },
    7: { title: "BATTERY ALARM", icon: FaBatteryQuarter },
    16: { title: "SIM ALERT", icon: FaExclamationTriangle },
    17: { title: "SYSTEM ALARM", icon: FaExclamationTriangle },
  };

  const alertInfo = alertTypeMap[alarm.Type] || {
    title: "UNKNOWN ALARM",
    icon: FaExclamationTriangle,
  };

  const colorMap = {
    generated: "#32ADE6",
    pending: "#FFA500",
    resolved: "#22c55e",
  };

  const alarmColor = colorMap[alarm.AlertType] || "#FF0000";

  return {
    icon: alertInfo.icon,
    title: alertInfo.title,
    time: new Date(alarm.TS).toLocaleString(),
    ts: alarm.TS,
    color: alarmColor,
    status: alarm.AlertType.toLowerCase(),
    deviceId: alarm.DEVICE_ID,
    alertName: alertInfo.title,
    errorCode: alarm.Details?.error_code,
    errorMessage: alarm.Details?.message,
  };
};


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center w-[100%]">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between text-lg mb-4 text-[#1f1f1f] font-semibold px-4">
        <p className="text-xl font-extrabold mb-2 sm:mb-0">All Meter Alarms</p>
        <div className="flex flex-wrap justify-center sm:justify-end text-xs gap-2">
          <div
            className={`flex items-center space-x-2 bg-[#fefefe] rounded-3xl p-2 shadow-md cursor-pointer ${
              filter === "generated" ? "ring-2 ring-[#3e4cc3]" : ""
            }`}
            onClick={() => setFilter("generated")}
          >
            <span className="w-3 h-3 bg-[#32ADE6] rounded-full"></span>
            <span className="text-sm font-semibold">generated</span>
          </div>
          <div
            className={`flex items-center space-x-2 bg-[#fefefe] rounded-3xl p-2 shadow-md cursor-pointer ${
              filter === "pending" ? "ring-2 ring-[#FFB800]" : ""
            }`}
            onClick={() => setFilter("pending")}
          >
            <span className="w-3 h-3 bg-[#FFA500] rounded-full"></span>
            <span className="text-sm font-semibold">pending</span>
          </div>
          <div
            className={`flex items-center space-x-2 bg-[#fefefe] rounded-3xl p-2 shadow-md cursor-pointer ${
              filter === "resolved" ? "ring-2 ring-[#34C759]" : ""
            }`}
            onClick={() => setFilter("resolved")}
          >
            <span className="w-3 h-3 bg-[#22c55e] rounded-full"></span>
            <span className="text-sm font-semibold">resolved</span>
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
      <div className="bg-white rounded-2xl p-2 w-full  min-h-24 ">
        <Slider {...settings}>
          {alarms.map((alarm, index) => (
            <AlarmCard key={index} {...alarm} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AlarmDashboard;
