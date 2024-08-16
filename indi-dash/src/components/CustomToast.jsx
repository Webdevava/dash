'use client'
import React from "react";
import useToastStore from "../store/useToastStore";
import { BellDot } from "lucide-react";

const CustomToast = () => {
  const toastMessage = useToastStore((state) => state.toastMessage);

  if (!toastMessage) return null;

  return (
      <div className="bg-red-100 border border-red-500  p-4 mb-4 rounded-md flex gap-2">
          <BellDot size={32} className="text-red-500"/>
      {toastMessage}
    </div>
  );
};

export default CustomToast;
