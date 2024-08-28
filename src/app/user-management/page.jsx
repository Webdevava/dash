"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Paintbrush2, CirclePlus, Pencil, Search, EyeOff, Eye, RotateCcw, ChevronDown, Filter } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
  const [activeTab, setActiveTab] = useState("User Management");
  const [activeSubTab, setActiveSubTab] = useState("Create User");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [users, setUsers] = useState([]);
   const [creatingUser, setCreatingUser] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const [newRole, setNewRole] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState("");

  // const { toast } = useToast();

  const handleDeleteClick = (userId, username) => {
    setSelectedUserId(userId);
    setSelectedUsername(username);
  };

 const handleDeleteUser = async () => {
   try {
     const token = localStorage.getItem("token");

     const response = await axios.delete(
       `${API_URL}/user/delete-user/${selectedUserId}`,
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );

     toast({
       title: "User deleted",
       description: response.data.message,
       action: <ToastAction altText="Undo">Undo</ToastAction>,
     });
     fetchUsers(); // Refresh the user list after deletion
     setSelectedUserId(null);
     setSelectedUsername(null);
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
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/user/update-role`,
      {
        userId: selectedUserId,
        newRole: newRole,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(response.data.message);
    fetchUsers(); // Refresh the user list after updating the role
    setSelectedUserId(null);
    setNewRole("");
  } catch (error) {
    toast.error(error.response?.data?.error || "An error occurred");
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

  // const handleDeleteUser = async (userId) => {
  //   try {
  //     await axios.delete(`${API_URL}/user/${userId}`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     });
  //     fetchUsers();
  //   } catch (err) {
  //     setError("Failed to delete user");
  //   }
  // };

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
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 mt-4 items-center">
              <div className="relative bg-blue-100 rounded-3xl flex w-fit">
                <input
                  type="text"
                  placeholder="Search User by User Name/ID"
                  className="w-72 bg-blue-100 text-sm px-4 py-3 rounded-full"
                  value={searchParams.searchTerm}
                  onChange={(e) =>
                    handleSearchInputChange({
                      target: { name: "searchTerm", value: e.target.value },
                    })
                  }
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white rounded-3xl flex items-center px-2"
                >
                  <Search size={16} />
                  Search
                </button>
              </div>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="bg-blue-100 flex p-3 rounded-3xl gap-2 text-blue-800"
              >
                <Filter size={20} />
                Search by Filter
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    showFilter ? "rotate-180" : ""
                  }`}
                />
              </button>
              <button
                onClick={handleClear}
                className="bg-gray-200 p-3 rounded-full"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            {showFilter && (
              <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow bg-red mt-16 ml-64 fixed">
                <input
                  className="bg-gray-100 px-3 py-2 rounded-full"
                  placeholder="Enter Name"
                  name="fullName"
                  value={searchParams.fullName}
                  onChange={handleSearchInputChange}
                />
                <input
                  className="bg-gray-100 px-3 py-2 rounded-full"
                  placeholder="Enter User Name"
                  name="userName"
                  value={searchParams.userName}
                  onChange={handleSearchInputChange}
                />
                <input
                  className="bg-gray-100 px-3 py-2 rounded-full"
                  placeholder="Enter Email ID"
                  name="emailId"
                  type="email"
                  value={searchParams.emailId}
                  onChange={handleSearchInputChange}
                />
                <div className="flex flex-col">
                  <label className="text-xs mb-2">Role</label>
                  <select
                    name="role"
                    className="bg-gray-100 px-3 py-2 rounded-full"
                    value={searchParams.role}
                    onChange={handleSearchInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Visitor">Visitor</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs mb-2">Contact No.</label>
                  <input
                    className="bg-gray-100 px-3 py-2 rounded-full"
                    placeholder="Enter contact no"
                    name="contactNo"
                    type="tel"
                    value={searchParams.contactNo}
                    onChange={handleSearchInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs mb-2">Company</label>
                  <select
                    name="company"
                    className="bg-gray-100 px-3 py-2 rounded-full"
                    value={searchParams.company}
                    onChange={handleSearchInputChange}
                  >
                    <option value="">Select Company</option>
                    <option value="company1">Company 1</option>
                    <option value="company2">Company 2</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs mb-2">Department</label>
                  <select
                    name="department"
                    className="bg-gray-100 px-3 py-2 rounded-full"
                    value={searchParams.department}
                    onChange={handleSearchInputChange}
                  >
                    <option value="">Select</option>
                    <option value="dept1">Department 1</option>
                    <option value="dept2">Department 2</option>
                  </select>
                </div>
                <input
                  className="bg-gray-100 px-3 py-2 rounded-full"
                  placeholder="Enter Designation"
                  name="designation"
                  value={searchParams.designation}
                  onChange={handleSearchInputChange}
                />
                <input
                  className="bg-gray-100 px-3 py-2 rounded-full"
                  placeholder="Enter Employee ID"
                  name="employeeId"
                  value={searchParams.employeeId}
                  onChange={handleSearchInputChange}
                />
                <div className="col-span-3 flex justify-end gap-4 mt-4">
                  <button
                    onClick={handleClear}
                    className="border border-gray-300 px-4 py-2 rounded-full"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full"
                  >
                    Search
                  </button>
                </div>
              </div>
            )}

            {/* Search results table */}
            <div className="border rounded-xl p-4 mt-4">
              <h3 className="font-semibold mb-4">Search Results</h3>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Username</th>
                      <th className="p-2 text-left">Email</th>
                      <th className="p-2 text-left">Role</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.username}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.role}</td>
                        <td className="p-2">
                          {/* Edit Role Button */}
                          <Dialog>
                            <DialogTrigger>
                              <button
                                onClick={() =>
                                  handleEditClick(user._id, user.role)
                                }
                                className="text-blue-600 hover:underline mr-2"
                              >
                                Edit
                              </button>
                            </DialogTrigger>
                            <DialogContent className="bg-white px-6 py-4">
                              <div className="flex flex-col gap-3">
                                <h1 className="text-xl font-bold mb-1">
                                  Edit User Role
                                </h1>
                                <div className="p-2 flex flex-col gap-3">
                                  <label className="text-sm font-medium">
                                    Role:
                                  </label>
                                  <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="bg-gray-100 px-3 py-2 rounded-xl"
                                  >
                                    <option value="Admin">Admin</option>
                                    <option value="Moderator">Moderator</option>
                                    <option value="Visitor">Visitor</option>
                                  </select>
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose>
                                  <button className="border text-lg text-[#2054DD] px-6 py-2 rounded-3xl">
                                    Cancel
                                  </button>
                                </DialogClose>
                                <DialogClose>
                                  <button
                                    onClick={handleUpdateRole}
                                    className="border text-white text-lg bg-[#2054DD] px-6 py-2 rounded-3xl"
                                  >
                                    Update
                                  </button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Delete User Button */}
                          <Dialog>
                            <DialogTrigger>
                              <button
                                className="text-red-600 hover:underline"
                                onClick={() =>
                                  handleDeleteClick(user._id, user.username)
                                }
                              >
                                Delete
                              </button>
                            </DialogTrigger>
                            <DialogContent className="bg-white px-6 py-4">
                              <div className="flex flex-col gap-3">
                                <h1 className="text-xl font-bold mb-1">
                                  Confirm Deletion
                                </h1>
                                <p>
                                  Are you sure you want to delete{" "}
                                  {user.username}?
                                </p>
                              </div>
                              <DialogFooter>
                                <DialogClose>
                                  <button className="border text-lg text-[#2054DD] px-6 py-2 rounded-3xl">
                                    Cancel
                                  </button>
                                </DialogClose>
                                <DialogClose>
                                  <button
                                    onClick={handleDeleteUser}
                                    className="border text-white text-lg bg-red-600 px-6 py-2 rounded-3xl"
                                  >
                                    Delete
                                  </button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderRoleManagementContent = () => {
    switch (activeTab) {
      case "Role management":
        return (
          <div className="flex p-4 ">
            <div className="flex flex-col">
              <label htmlFor="role" className="text-xs mb-2">
                Role*
              </label>
              <select
                name="role"
                className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Visitor">Visitor</option>
              </select>
            </div>
            <div className="flex w-full justify-end gap-4 items-center my-3">
              <button className="flex text-gray-700 gap-2 items-center px-4 py-2 text-lg font-medium border rounded-3xl">
                <Pencil />
                Edit
              </button>
              <button className="flex gap-2 items-center bg-[#2054DD] text-white px-4 py-2 text-lg font-medium border rounded-3xl">
                <CirclePlus />
                Create New
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "User Management":
        return renderUserManagementContent();
      case "Role management":
        return renderRoleManagementContent();
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="relative h-screen">
        <nav className="w-fit border border-gray-300 rounded-3xl p-1 font-medium bg-gray-200 mt-4 text-md">
          <ul className="flex items-center justify-between">
            {["User Management", "Role management"].map((tab) => (
              <li
                key={tab}
                className={`rounded-3xl px-5 py-2 cursor-pointer ${
                  activeTab === tab ? "bg-primary text-white font-bold" : ""
                }`}
                onClick={() => setActiveTabWithDefaultSubTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-center w-full">
          <div
            className={`mt-5 rounded-xl min-h-96 bg-white p-4 shadow-md w-[96%] transition-all duration-300 ease-in-out z-[9] ${"h-3/4"}`}
          >
            {activeTab === "User Management" && (
              <div className="">
                <nav className="w-full border-b border-gray-300 font-medium text-sm">
                  <ul className="flex items-center justify-start">
                    {["Create User", "Search User"].map((subTab) => (
                      <li
                        key={subTab}
                        className={` px-4 py-1 cursor-pointer ${
                          activeSubTab === subTab ? "border-b font-bold " : ""
                        }`}
                        onClick={() => setActiveSubTab(subTab)}
                      >
                        {subTab}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;