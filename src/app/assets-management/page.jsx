"use client";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { Upload, X, CheckCircle } from "lucide-react";

const Page = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles([...e.dataTransfer.files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Layout>
      <nav className="w-full border border-gray-300 rounded-3xl p-1 font-light bg-gray-200 mt-4 text-[14px]">
        <ul className="flex items-center justify-between">
          <li className="bg-primary rounded-3xl px-3 py-1 text-white font-bold">
            File Upload Assets
          </li>
          <li className="rounded-3xl px-3 py-1">HH Info History</li>
          <li className="rounded-3xl px-3 py-1">Meter Info Conflicts</li>
          <li className="rounded-3xl px-3 py-1">Field Status History</li>
          <li className="rounded-3xl px-3 py-1">HH Field Status</li>
          <li className="rounded-3xl px-3 py-1">Inventory</li>
          <li className="rounded-3xl px-3 py-1">Master Data</li>
          <li className="rounded-3xl px-3 py-1">Test History</li>
        </ul>
      </nav>
      <div className="p-6 bg-white rounded-lg shadow-md w-full h-full mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select File type
          </label>
          <select className="mt-1 block w-72 px-3 py-2 text-base bg-accent/15 rounded-3xl border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option>Select</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCx</option>
          </select>
        </div>

        <div
          className="mt-10 w-[60%] flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dotted rounded-lg"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Click to upload/ attach email</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  multiple
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, EML (max 2mb)</p>
          </div>
        </div>

        {files.map((file, index) => (
          <div
            key={index}
            className="mt-4 flex flex-col items-center justify-between p-4 bg-white border border-gray-400 hover:bg-gray-200 rounded-md w-[60%]"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">
                    {file.name.split(".").pop().toUpperCase()}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex gap-2 items-center w-full pl-10">
              <span className="border-t-4 rounded-xl border-green-500 w-full" />{" "}
              <span>100%</span>
            </div>
          </div>
        ))}

        <div className="mt-4 flex justify-start space-x-2">
          <button className="px-10 py-3 border border-gray-300 text-md font-medium rounded-3xl text-gray-700 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Cancel
          </button>
          <button className="px-10 py-3 border border-transparent text-md font-medium rounded-3xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Upload
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
