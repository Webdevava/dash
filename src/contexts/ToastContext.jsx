'use client'
import React, { createContext, useState, useContext } from "react";


const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000); // Hide after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ toastMessage, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};
