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
  { icon: Radio, name: "Live Monitoring of Meters", path: "/live-monitoring" },
  { icon: Gauge, name: "Meter Management", path: "/meter-management" },
  { icon: FileCog, name: "List Management", path: "/list-management" },
  { icon: Users, name: "User Management", path: "/user-management" },
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
      className={`h-screen bg-[#fefefe] text-[#1f1f1f] flex flex-col shadow-xl rounded-3xl p-3 relative ${
        isMobile || isExpanded ? "w-64" : "w-16"
      } transition-all duration-300 ease-in-out`}
      initial={false}
      animate={{ width: isMobile || isExpanded ? 280 : 72 }}
    >
      {!isMobile && (
        <motion.button
          className={`absolute top-20 p-1 rounded-xl bg-[#fefefe] text-black shadow-md ${
            isExpanded ? "-right-4" : "-right-3"
          }`}
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </motion.button>
      )}
      <div className="flex items-center mt-4 mb-8">
        <img
          src="https://static.wixstatic.com/media/abf3bf_155dcf18312d44fbb8c99405fe6446d0~mv2.png/v1/crop/x_164,y_104,w_752,h_769/fill/w_136,h_139,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Untitled%20design%20(8)%20(1).png"
          alt="inditronics"
          className={`${
            isMobile || isExpanded ? "w-12 h-12" : "w-10 h-10"
          } transition-all duration-300`}
        />
        {(isMobile || isExpanded) && (
          <motion.p
            className="text-xl font-bold ml-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Inditronics
          </motion.p>
        )}
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} onClick={isMobile ? onClose : undefined}>
                <motion.div
                  className={`flex items-center hover:bg-accent p-2 rounded-3xl ${
                    pathname === item.path ? "bg-accent font-bold" : ""
                  }`}
                >
                  <item.icon size={30} className="bg-primary p-1 rounded-xl" />
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
            className="fixed inset-y-0 left-0 z-50 w-64 bg-[#fefefe] shadow-lg"
          >
            {sidebarContent}
            <button
              onClick={onClose}
              className="absolute top-0 -right-10 p-2 rounded-full bg-accent text-black"
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
