"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  Paintbrush2,
  CirclePlus,
  Pencil,
  Search,
  EyeOff,
  Eye,
  RotateCcw,
  ChevronDown,
  Filter,
} from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import ClipLoader from "react-spinners/ClipLoader"; // Example loading spinner library

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
  const [activeTab, setActiveTab] = useState("User Management");
  const [activeSubTab, setActiveSubTab] = useState("Create User");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false); // New state for loading animation
  const [error, setError] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState("");

  const { toast } = useToast();

  const handleDeleteClick = (userId, username) => {
    setSelectedUserId(userId);
    setSelectedUsername(username);
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage

      const response = await axios.delete(
        `${API_URL}/user/delete-user/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      toast({
        title: "User deleted",
        description: response.data.message,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      setShowDialog(false); // Close the dialog
      // Optionally, refresh the list of users here
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (userId, currentRole) => {
    setSelectedUserId(userId);
    setNewRole(currentRole);
  };

  const handleUpdateRole = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage

      const response = await axios.put(
        `${API_URL}/user/update-role`,
        {
          userId: selectedUserId,
          newRole: newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      toast({
        title: "Role updated",
        description: response.data.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    contact: "",
    company: "",
    department: "",
    designation: "",
    employeeid: "",
  });

  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    fullName: "",
    userName: "",
    emailId: "",
    role: "",
    status: "",
    userType: "",
    contactNo: "",
    company: "",
    department: "",
    designation: "",
    employeeId: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setCreatingUser(true); // Start loading animation
    try {
      await axios.post(`${API_URL}/user/register`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchUsers();
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        contact: "",
        company: "",
        department: "",
        designation: "",
        employeeid: "",
      });
      setActiveSubTab("Search User");
      toast({
        title: "User created",
        description: "The user has been successfully created.",
      });
    } catch (err) {
      setError("Failed to create user");
      toast({
        title: "Error",
        description: err.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setCreatingUser(false); // Stop loading animation
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const filteredParams = Object.entries(searchParams).reduce(
        (acc, [key, value]) => {
          if (value !== "") {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      const response = await axios.get(`${API_URL}/user/search`, {
        params: filteredParams,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchParams({
      searchTerm: "",
      fullName: "",
      userName: "",
      emailId: "",
      role: "",
      status: "",
      userType: "",
      contactNo: "",
      company: "",
      department: "",
      designation: "",
      employeeId: "",
    });
  };

  const setActiveTabWithDefaultSubTab = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "User Management":
        setActiveSubTab("Create User");
        break;
      default:
        setActiveSubTab("");
    }
  };

  const renderUserManagementContent = () => {
    switch (activeSubTab) {
      case "Create User":
        return (
          <div className="overflow-auto bg-white rounded-xl p-4 h-1/2">
            <form onSubmit={handleCreateUser} className="flex flex-col gap-8">
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="username" className="text-xs mb-2">
                    User Name/ID*
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
                    placeholder="Enter User Name"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs mb-2">
                    Email ID*
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label htmlFor="role" className="text-xs mb-2">
                    Role*
                  </label>
                  <select
                    name="role"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Visitor">Visitor</option>
                  </select>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex flex-col relative">
                    <label htmlFor="password" className="text-xs mb-2">
                      Password*
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl pr-10"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-8 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <button className="mt-1 text-primary font-semibold text-sm w-fit">
                    Reset Password
                  </button>
                </div>
                <div className="flex flex-col relative">
                  <label htmlFor="confirmPassword" className="text-xs mb-2">
                    Confirm Password*
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl pr-10"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label htmlFor="contact" className="text-xs mb-2">
                    Contact No.
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
                    placeholder="Enter Contact No."
                    value={formData.contact}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <hr className="border border-gray-200" />

              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label htmlFor="company" className="text-xs mb-2">
                    Company
                  </label>
                  <select
                    name="company"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
                    value={formData.company}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Company</option>
                    <option value="Inditronics">Inditronics</option>
                    <option value="xyz">XYZ</option>
                    <option value="abc">ABC</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="department" className="text-xs mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Department</option>
                    <option value="Development">Development</option>
                    <option value="Sales">Sales</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="designation" className="text-xs mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
                    placeholder="Enter Designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label htmlFor="employeeid" className="text-xs mb-2">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employeeid"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
                    placeholder="Enter Employee ID"
                    value={formData.employeeid}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex gap-4 w-full justify-end">
                <button
                  type="button"
                  className="border bg-white text-gray-800 border-gray-400 px-4 py-2 rounded-3xl text-lg flex gap-2 font-medium"
                  onClick={() =>
                    setFormData({
                      name: "",
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      role: "",
                      contact: "",
                      company: "",
                      department: "",
                      designation: "",
                      employeeid: "",
                    })
                  }
                >
                  <Paintbrush2 className="rotate-180" />
                  Clear Selection
                </button>
                <button
                  type="submit"
                  className="border bg-[#295FC2] text-gray-200 border-gray-400 px-4 py-2 rounded-3xl text-lg flex gap-2 font-medium"
                >
                  {creatingUser ? (
                    <ClipLoader color="#ffffff" size={20} />
                  ) : (
                    <>
                      <CirclePlus />
                      Create User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        );
      case "Search User":
        return (
          <div className="overflow-auto bg-white rounded-xl p-4 h-1/2">
            {/* Search and filter components */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">User Management</h1>
          <div className="flex gap-4">
            <button className="text-primary font-semibold text-sm">
              <Pencil size={16} />
              Edit Profile
            </button>
            <button className="text-primary font-semibold text-sm">
              <Search size={16} />
              Search
            </button>
            <button className="text-primary font-semibold text-sm">
              <CirclePlus size={16} />
              Create User
            </button>
          </div>
        </div>
        {/* Tabs component */}
        {/* Sub-tabs component */}
        {renderUserManagementContent()}
      </div>
    </Layout>
  );
};

export default Page;
