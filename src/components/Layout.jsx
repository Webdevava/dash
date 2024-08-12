'use client'
import { useState, useEffect } from "react";
import CustomToast from "./CustomToast";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import MobileMenu from "@/components/MobileMenu";
import Loading from "@/components/Loading"; // Import the Loading component

export default function Layout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading) {
    return <Loading />; // Show loading component during the delay
  }

  return (
      <div className="flex flex-col h-screen overflow-hidden">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <MobileMenu />
            <main className="flex-1 overflow-y-auto overflow-x-hidden mt-20 lg:mt-[4.75rem] p-4">
              <CustomToast />
              {children}
            </main>
          </div>
        </div>
      </div>

  );
}
