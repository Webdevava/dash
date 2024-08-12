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

const menuItems = [
  { icon: PanelsTopLeft, name: "My Dashboard", path: "/dashboard" },
  { icon: Package, name: "Assets Management", path: "/assets-management" },
  { icon: Radio, name: "Live Monitoring of Meters", path: "#" },
  { icon: Gauge, name: "Meter Management", path: "#" },
  { icon: FileCog, name: "List Management", path: "#" },
  { icon: Users, name: "User Management", path: "#" },
];

const Sidebar = ({ isMobile, isOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const pathname = usePathname();

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  const sidebarContent = (
    <motion.div
      className={`h-[93vh] bg-[#fefefe] text-[#1f1f1f] flex flex-col shadow-xl  p-3 relative mt-[4.5rem] ${
        isMobile || isExpanded ? "w-64" : "w-16"
      } transition-all duration-300 ease-in-out`}
      initial={false}
      animate={{ width: isMobile || isExpanded ? 280 : 72 }}
    >
      {!isMobile && (
        <motion.button
          className={`absolute top-2 p-1 rounded-xl bg-[#fefefe] text-black shadow-md ${
            isExpanded ? "-right-4" : "-right-3"
          }`}
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
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
                  <item.icon
                    size={30}
                    className={`p-1 rounded-2xl ${
                      pathname === item.path
                        ? "bg-primary text-[#d1d1d1]"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  />
                  {(isMobile || isExpanded) && (
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
