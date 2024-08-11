"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import indiLogo from "../../public/indiLogo.png";
import Image from "next/image";

const Login = () => {
  const [role, setRole] = useState("Admin");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-indigo-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-96">
        <div className="flex items-center justify-center mb-6">
          <Image src={indiLogo} alt="inditronics" width={120} />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Login</h1>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <select
              className="w-full p-2 border rounded-2xl bg-blue-50 text-blue-800 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option className="bg-white hover:bg-blue-100">Admin</option>
              <option className="bg-white hover:bg-blue-100">Executive</option>
              <option className="bg-white hover:bg-blue-100">Developer</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 bg-accent/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-2 relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2  rounded-2xl bg-accent/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {/* You can add an eye icon here for password visibility toggle */}
            </span>
          </div>
          <div className="text-right mb-6">
            <a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-700 transition duration-300"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 text-white px-8 py-2 rounded-3xl w-fit hover:bg-blue-900 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
