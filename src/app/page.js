"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import indiLogo from "../../public/indiLogo.png";

const Login = () => {
  const [role, setRole] = useState("Admin");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-indigo-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-96 scale-125 relative">
        <div className="flex items-center justify-center mb-6">
          <Image src={indiLogo} alt="inditronics" width={200} />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Login</h1>

          <div className="relative">
            <label className="block text-[10px] font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <div className="relative">
              <button
                className="w-24 p-2 rounded-3xl bg-accent text-blue-800 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                {role}
              </button>
              {dropdownVisible && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {["Admin", "Executive", "Developer"].map((item) => (
                    <div
                      key={item}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setRole(item);
                        setDropdownVisible(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4 relative text-sm">
            <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 pl-10 bg-accent/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-2 relative text-sm">
            <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 pl-10 rounded-2xl bg-accent/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <AiFillEyeInvisible className="text-gray-500" />
              ) : (
                <AiFillEye className="text-gray-500" />
              )}
            </span>
          </div>
          <div className="text-right mb-6">
            <a
              href="#"
              className="text-xs text-blue-500 hover:text-blue-700 transition duration-300"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 text-white px-16 py-2 rounded-3xl w-fit hover:bg-blue-900 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
