'use client'
import React from "react";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-[75vh]">
      <div className="bg-card p-4 border border-border rounded-2xl">
        {" "}
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/60 transition-colors"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
