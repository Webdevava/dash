'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /dashboard when the component mounts
    router.push("/dashboard");
  }, [router]);

  return (
    <div>
      {/* Optionally, you can display a loading spinner or message here */}
    </div>
  );
};

export default HomePage;
