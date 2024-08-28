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
import { ChevronDown, User, Lock, Code, AlertCircle } from "lucide-react";
import indiLogo from "../../public/logo.svg";
import useUserStore from "../store/useUserStore"; // Import the Zustand store
const API_URL = process.env.NEXT_PUBLIC_API_URL;


const Login = () => {
  const [role, setRole] = useState("Admin");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser); // Get the setUser function from the store

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making request

    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usernameOrEmail, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        // Fetch user details after login
        const userDetailsResponse = await fetch(`${API_URL}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`, // Send token in authorization header
          },
        });

        if (userDetailsResponse.ok) {
          const userDetails = await userDetailsResponse.json();
          setUser(userDetails); // Save user details to Zustand store
          router.push("/dashboard");
        } else {
          setError("Failed to fetch user details.");
        }
      } else {
        setError(data.error); // Show error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#6b43a0] flex items-center justify-center flex-col">
      <img
        src="https://s3-alpha-sig.figma.com/img/d622/0841/ea94935802d687a59cf0ce996f66ac64?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p6WJ-ZeJRAVIP5l1EXzLl5zWiaMgfcvv--kTA3kdzbaf8ZS69bmneZX41OByLu-dQMuT6EhHHUzeaT7rB8JaZcTEqK7aIohBvpMr0DFDdaqVhEmuIjQKpDTyZPwa5-BQPdTWZZmMB7lMAovWU3hQ0m8UvAIiGfiI5u7oGaff0-lwZc6aP0LJhe1OL9irjeqqrme3zoIXhaHT87yvD5GiXEx6aPbPdaOui2E2ElssSQHjdMhVMLO3YFwh~V7eEVLMkBHS3EIRXhN5e9cokYngxJRZBq8ydllk70n8OPCUpBO52FZBp~b77ZsXF~-CMjgFz4D16BnaESZqOFQ~o~9hJA__"
        className="fixed h-[100vh] w-[100vw] scale-105 mix-blend-multiply"
      />
      <div className="bg-white p-8 py-10 rounded-3xl shadow-lg w-96 scale-125 relative">
        <div className="flex items-center justify-center mb-6">
          <Image src={indiLogo} alt="inditronics" width={185} />
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-light">Login</h1>
          <div className="relative">
            <label className="block text-[10px] font-light text-[#0B1C66]">
              Select Role
            </label>
            <div className="relative">
              <button
                className="w-32 flex justify-between text-start text-xs py-2 pl-5 pr-3 rounded-3xl bg-[#CFDCFF] text-[#0B1C66] font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                {role}
                <ChevronDown size={16} className="ml-2" />
              </button>
              {dropdownVisible && (
                <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {[
                    {
                      name: "Admin",
                      icon: <User size={16} className="mr-2" />,
                    },
                    {
                      name: "Executive",
                      icon: <Lock size={16} className="mr-2" />,
                    },
                    {
                      name: "Developer",
                      icon: <Code size={16} className="mr-2" />,
                    },
                  ].map(({ name, icon }) => (
                    <div
                      key={name}
                      className="w-32 flex items-center px-3 py-2 text-xs hover:bg-[#CFDCFF] cursor-pointer"
                      onClick={() => {
                        setRole(name);
                        setDropdownVisible(false);
                      }}
                    >
                      {icon}
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-5 relative text-sm">
            <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              name="usernameOrEmail"
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="usernameOrEmail or Email"
              className="w-full text-xs font-light p-2 py-3 pl-10 bg-accent/30 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="relative text-sm">
            <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              name="password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full text-xs font-light p-2 py-3 pl-10 rounded-3xl bg-accent/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
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
          {error && (
            <div className="flex items-center text-red-500 text-sm mt-2">
              <AlertCircle className="mr-2" />
              {error}
            </div>
          )}
          <div className="text-right mb-6">
            <a
              href="#"
              className="text-[10px] -mr-2 font-bold text-blue-500 hover:text-blue-700 transition duration-300"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#2054DD] text-white mt-2 px-16 py-2 font-semibold rounded-3xl"
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