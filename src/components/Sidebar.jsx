// components/Sidebar.jsx
"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileCog,
  Gauge,
  Package,
  PanelsTopLeft,
  Radio,
  Users,
  X,
} from "lucide-react";
import useSidebarStore from "../store/useSidebarStore";

const AssetManagementIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 21"
    fill="none"
    className={className}
  >
    <path
      d="M10.8381 11.475V10.2H9.56309V11.475H1.91309V15.3H3.18809V12.75H9.56309V15.3H10.8381V12.75H17.2131V15.3H18.4881V11.475H10.8381Z"
      fill="currentColor"
    />
    <path
      d="M2.5502 20.4C2.04297 20.4 1.55652 20.1985 1.19785 19.8398C0.83919 19.4812 0.637695 18.9947 0.637695 18.4875C0.637695 17.9803 0.83919 17.4938 1.19785 17.1352C1.55652 16.7765 2.04297 16.575 2.5502 16.575C3.05742 16.575 3.54387 16.7765 3.90254 17.1352C4.2612 17.4938 4.46269 17.9803 4.46269 18.4875C4.46269 18.9947 4.2612 19.4812 3.90254 19.8398C3.54387 20.1985 3.05742 20.4 2.5502 20.4ZM2.5502 17.85C2.38112 17.85 2.21897 17.9172 2.09941 18.0367C1.97986 18.1563 1.9127 18.3184 1.9127 18.4875C1.9127 18.6566 1.97986 18.8187 2.09941 18.9383C2.21897 19.0578 2.38112 19.125 2.5502 19.125C2.71927 19.125 2.88142 19.0578 3.00098 18.9383C3.12053 18.8187 3.1877 18.6566 3.1877 18.4875C3.1877 18.3184 3.12053 18.1563 3.00098 18.0367C2.88142 17.9172 2.71927 17.85 2.5502 17.85ZM10.2002 20.4C9.69297 20.4 9.20652 20.1985 8.84785 19.8398C8.48919 19.4812 8.28769 18.9947 8.28769 18.4875C8.28769 17.9803 8.48919 17.4938 8.84785 17.1352C9.20652 16.7765 9.69297 16.575 10.2002 16.575C10.7074 16.575 11.1939 16.7765 11.5525 17.1352C11.9112 17.4938 12.1127 17.9803 12.1127 18.4875C12.1127 18.9947 11.9112 19.4812 11.5525 19.8398C11.1939 20.1985 10.7074 20.4 10.2002 20.4ZM10.2002 17.85C10.0311 17.85 9.86897 17.9172 9.74941 18.0367C9.62986 18.1563 9.56269 18.3184 9.56269 18.4875C9.56269 18.6566 9.62986 18.8187 9.74941 18.9383C9.86897 19.0578 10.0311 19.125 10.2002 19.125C10.3693 19.125 10.5314 19.0578 10.651 18.9383C10.7705 18.8187 10.8377 18.6566 10.8377 18.4875C10.8377 18.3184 10.7705 18.1563 10.651 18.0367C10.5314 17.9172 10.3693 17.85 10.2002 17.85ZM17.8502 20.4C17.343 20.4 16.8565 20.1985 16.4979 19.8398C16.1392 19.4812 15.9377 18.9947 15.9377 18.4875C15.9377 17.9803 16.1392 17.4938 16.4979 17.1352C16.8565 16.7765 17.343 16.575 17.8502 16.575C18.3574 16.575 18.8439 16.7765 19.2025 17.1352C19.5612 17.4938 19.7627 17.9803 19.7627 18.4875C19.7627 18.9947 19.5612 19.4812 19.2025 19.8398C18.8439 20.1985 18.3574 20.4 17.8502 20.4ZM17.8502 17.85C17.6811 17.85 17.519 17.9172 17.3994 18.0367C17.2799 18.1563 17.2127 18.3184 17.2127 18.4875C17.2127 18.6566 17.2799 18.8187 17.3994 18.9383C17.519 19.0578 17.6811 19.125 17.8502 19.125C18.0193 19.125 18.1814 19.0578 18.301 18.9383C18.4205 18.8187 18.4877 18.6566 18.4877 18.4875C18.4877 18.3184 18.4205 18.1563 18.301 18.0367C18.1814 17.9172 18.0193 17.85 17.8502 17.85ZM14.6627 5.1V3.825H13.3239C13.2414 3.42685 13.0834 3.04816 12.8586 2.70937L13.8084 1.7595L12.9032 0.85425L11.9533 1.80412C11.6145 1.57926 11.2358 1.4213 10.8377 1.33875V0H9.56269V1.33875C9.16454 1.4213 8.78586 1.57926 8.44707 1.80412L7.49719 0.85425L6.59194 1.7595L7.54182 2.70937C7.31696 3.04816 7.15899 3.42685 7.07644 3.825H5.73769V5.1H7.07644C7.15899 5.49815 7.31696 5.87684 7.54182 6.21562L6.59194 7.1655L7.49082 8.06437L8.44069 7.1145C8.78092 7.34236 9.16186 7.50253 9.56269 7.58625V8.925H10.8377V7.58625C11.2358 7.5037 11.6145 7.34574 11.9533 7.12087L12.9032 8.07075L13.8021 7.17187L12.8586 6.21562C13.0834 5.87684 13.2414 5.49815 13.3239 5.1H14.6627ZM10.2002 6.375C9.94904 6.375 9.70035 6.32553 9.46831 6.22942C9.23628 6.13331 9.02544 5.99243 8.84785 5.81484C8.67026 5.63725 8.52939 5.42642 8.43327 5.19438C8.33716 4.96235 8.28769 4.71365 8.28769 4.4625C8.28769 4.21135 8.33716 3.96265 8.43327 3.73062C8.52939 3.49858 8.67026 3.28775 8.84785 3.11016C9.02544 2.93257 9.23628 2.79169 9.46831 2.69558C9.70035 2.59947 9.94904 2.55 10.2002 2.55C10.7074 2.55 11.1939 2.75149 11.5525 3.11016C11.9112 3.46882 12.1127 3.95527 12.1127 4.4625C12.1127 4.96973 11.9112 5.45618 11.5525 5.81484C11.1939 6.17351 10.7074 6.375 10.2002 6.375Z"
      fill="currentColor"
    />
    <path
      d="M10.2003 5.09998C10.0313 5.09998 9.8691 5.03282 9.74955 4.91327C9.62999 4.79371 9.56283 4.63156 9.56283 4.46249C9.55979 4.42004 9.55979 4.37743 9.56283 4.33499C9.57031 4.29518 9.58318 4.25657 9.60108 4.22023C9.61457 4.17942 9.6339 4.14077 9.65845 4.10549C9.68241 4.0724 9.70793 4.04049 9.73495 4.00986C9.79441 3.95035 9.86624 3.90465 9.94533 3.87599C10.0614 3.82717 10.1894 3.81383 10.313 3.83765C10.4367 3.86148 10.5506 3.9214 10.6402 4.00986L10.7167 4.10549C10.7406 4.14117 10.7599 4.17972 10.7741 4.22023C10.8018 4.25453 10.8233 4.29335 10.8378 4.33499C10.8411 4.37742 10.8411 4.42005 10.8378 4.46249C10.8378 4.63156 10.7707 4.79371 10.6511 4.91327C10.5316 5.03282 10.3694 5.09998 10.2003 5.09998Z"
      fill="currentColor"
    />
  </svg>
);

const menuItems = [
  { icon: PanelsTopLeft, name: "My Dashboard", path: "/dashboard" },
  {
    icon: AssetManagementIcon,
    name: "Assets Management",
    path: "/assets-management",
  },
  { icon: Radio, name: "Live Data Stream", path: "/live-monitoring" },
  { icon: Gauge, name: "Meter Control Suite", path: "/meter-management" },
  // { icon: FileCog, name: "List Management", path: "#" },
  { icon: Users, name: "Access Manager", path: "/user-management" },
];

const Sidebar = ({ isMobile, isOpen, onClose }) => {
  const [sidebarState, setSidebarState] = useSidebarStore((state) => [
    state.isSidebarExpanded,
    state.setSidebarExpanded,
  ]);
  const pathname = usePathname();

  const toggleSidebar = () => {
    if (!isMobile) {
      setSidebarState(!sidebarState);
    }
  };

  const sidebarContent = (
    <motion.div
      className={`h-[93vh] bg-[#fefefe] text-[#1f1f1f] flex flex-col shadow-xl p-3 relative mt-[4.5rem] ${
        isMobile || sidebarState ? "w-64" : "w-16"
      } transition-all duration-300 ease-in-out`}
      initial={false}
      animate={{ width: isMobile || sidebarState ? 280 : 72 }}
    >
      {!isMobile && (
        <motion.button
          className={`absolute top-2 p-1 rounded-xl bg-[#fefefe] text-black shadow-md ${
            sidebarState ? "-right-4" : "-right-3"
          }`}
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {sidebarState ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </motion.button>
      )}
      <nav className="flex-1 pt-4">
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} onClick={isMobile ? onClose : undefined}>
                <motion.div
                  className={`flex items-center hover:bg-accent p-2 rounded-3xl ${
                    pathname === item.path ? "bg-accent font-bold" : ""
                  }`}
                >
                  <div
                    className={`p-1 rounded-2xl ${
                      pathname === item.path
                        ? "bg-primary text-[#d1d1d1]"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {typeof item.icon === "function" ? (
                      <item.icon size={20} />
                    ) : (
                      <item.icon className="w-[20px] h-[20px]" />
                    )}
                  </div>
                  {(isMobile || sidebarState) && (
                    <motion.span
                      className="ml-4 truncate"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64"
          >
            {sidebarContent}
            <button
              onClick={onClose}
              className="absolute top-16 -right-16 p-2 rounded-full bg-white text-black"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return sidebarContent;
};

export default Sidebar;
