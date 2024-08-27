"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Paintbrush2, CirclePlus, Pencil, Search, EyeOff, Eye, RotateCcw, ChevronDown, Filter } from "lucide-react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("User Management");
  const [activeSubTab, setActiveSubTab] = useState("Create User");
    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  
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

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setSearchParams((prev) => ({ ...prev, [name]: value }));
   };

   const handleSearch = () => {
     // Implement your search logic here
     console.log("Searching with params:", searchParams);
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
            <form action="" className="flex flex-col gap-8">
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
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-8 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <button className=" mt-1 text-primary font-semibold text-sm w-fit">Reset Password</button>
                </div>
                <div className="flex flex-col relative">
                  <label htmlFor="conpass" className="text-xs mb-2">
                    Confirm Password*
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="conpass"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl pr-10"
                    placeholder="Confirm Password"
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
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label htmlFor="Employee" className="text-xs mb-2">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="Employee"
                    className="bg-accent/25 text-sm w-72 px-4 py-2 rounded-3xl"
                    placeholder="Enter Employee ID"
                  />
                </div>
              </div>

              <div className="flex gap-4 w-full justify-end">
                <button className="border bg-white text-gray-800 border-gray-400 px-4 py-2 rounded-3xl text-lg flex gap-2 font-medium">
                  <Paintbrush2 className=" rotate-180" />
                  Clear Selection
                </button>
                <button className="border bg-[#295FC2] text-gray-200 border-gray-400 px-4 py-2 rounded-3xl text-lg flex gap-2 font-medium">
                  <CirclePlus />
                  Create
                </button>
              </div>
            </form>
          </div>
        );
      case "Search User":
        return (
          <div className="overflow-auto bg-white rounded-xl p-4 h-full">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className=" relative bg-blue-100 rounded-3xl flex w-fit">
                  <input
                    type="text"
                    placeholder="Search User by User Name/ID"
                    className="w-72 bg-blue-100 text-sm px-4 py-3 rounded-full"
                    value={searchParams.searchTerm}
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: "searchTerm", value: e.target.value },
                      })
                    }
                  />
                  <button
                    className=" flex items-center text-sm gap-2 bg-blue-600 text-white px-4 rounded-full"
                    onClick={handleSearch}
                  >
                    <Search size={16} />
                    Search
                  </button>
                </div>
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-3 rounded-full flex items-center gap-2"
                  onClick={() => setShowFilter(!showFilter)}
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
                <button className="bg-gray-200 p-3 rounded-full">
                  <RotateCcw size={20} />
                </button>
              </div>

              {showFilter && (
                <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow fixed right-10 mt-12">
                  <div className="flex flex-col">
                    <label className="text-xs mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter Name"
                      className="bg-gray-100 px-3 py-2 rounded-full"
                      value={searchParams.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-2">User Name/ID</label>
                    <input
                      type="text"
                      name="userName"
                      placeholder="Enter User Name"
                      className="bg-gray-100 px-3 py-2 rounded-full"
                      value={searchParams.userName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-2">Email ID</label>
                    <input
                      type="email"
                      name="emailId"
                      placeholder="Enter Email ID"
                      className="bg-gray-100 px-3 py-2 rounded-full"
                      value={searchParams.emailId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-2">Role</label>
                    <select
                      name="role"
                      className="bg-gray-100 px-3 py-2 rounded-full"
                      value={searchParams.role}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-2">Status</label>
                    <select
                      name="status"
                      className="bg-gray-100 px-3 py-2 rounded-full"
                      value={searchParams.status}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-2">User type</label>
                    <select
                      name="userType"
                      className="bg-gray-100 px-3 py-2 rounded-full"
                      value={searchParams.userType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select User type</option>
                      <option value="internal">Internal</option>
                      <option value="external">External</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-2">Contact No.</label>
                    <input
                      type="tel"
                      name="contactNo"
                      placeholder="Enter contact no"
                      className="bg-gray-100 px-3 py-2 rounded-full"
                      value={searchParams.contactNo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-2">Company</label>
                    <select
                      name="company"
                      className="bg-gray-100 px-3 py-2 rounded-full"
                      value={searchParams.company}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="dept1">Department 1</option>
                      <option value="dept2">Department 2</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-2">Designation</label>
                    <input
                      type="text"
                      name="designation"
                      placeholder="Enter Designation"
                      className="bg-gray-100 px-3 py-2 rounded-full"
                      value={searchParams.designation}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-2">Employee ID</label>
                    <input
                      type="text"
                      name="employeeId"
                      placeholder="Enter Employee ID"
                      className="bg-gray-100 px-3 py-2 rounded-full"
                      value={searchParams.employeeId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-3 flex justify-end gap-4 mt-4">
                    <button
                      className="px-6 py-2 border border-gray-300 rounded-full"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                    <button
                      className="px-6 py-2 bg-blue-600 text-white rounded-full"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              )}

              {/* Search results table */}
              <div className="border rounded-xl p-4 mt-4">
                <h3 className="font-semibold mb-4">Search Results</h3>
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
                    <tr>
                      <td className="p-2">John Doe</td>
                      <td className="p-2">johndoe</td>
                      <td className="p-2">john@example.com</td>
                      <td className="p-2">Admin</td>
                      <td className="p-2">
                        <button className="text-blue-600 hover:underline mr-2">
                          Edit
                        </button>
                        <button className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
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
