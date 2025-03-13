import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { host_static_website } from "../Redux/Actions/HostStaticSite";

export default function SiteForm() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]); // Store multiple files
  const [websiteName, setWebsiteName] = useState("");
  const [domainName, setDomainName] = useState("");
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files); // Convert FileList to array
    if (droppedFiles.length > 0) {
      setFiles(droppedFiles);
    }
  };

  const handleSubmit = () => {
    if (files.length === 0 || !websiteName || !domainName) {
      alert("Please fill all fields and upload at least one file.");
      return;
    }
    dispatch(host_static_website({ files, websiteName, domainName }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="h-screen   flex items-center justify-center min-h-screen">
      <div className="h-full w-[80vw] rounded-lg  p-8 max-w-2xl relative overflow-hidden">
        {/* Spotlight effect */}
        <div className="absolute inset-0  opacity-20 blur-3xl"></div>

        {/* Form Container */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Host Your Website
          </h1>

          {/* Website Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Website Name
            </label>
            <input
              type="text"
              placeholder="Enter your website name"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="w-full px-4 py-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder-gray-400"
            />
          </div>

          {/* Domain Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Domain Name
            </label>
            <input
              type="text"
              placeholder="Enter your domain name"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="w-full px-4 py-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder-gray-400"
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Files
            </label>
            <div
              className={`flex items-center justify-center w-full bg-black rounded-lg border-2 border-dashed p-6 ${
                isDragging ? "border-purple-500 bg-gray-900" : "border-gray-700"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="hidden"
                id="file-upload"
                multiple // Allow multiple files
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-gray-400 hover:text-white text-center"
              >
                {files.length > 0 ? (
                  <p className="text-sm">
                    {files.length} file(s) selected
                  </p>
                ) : (
                  <>
                    <p className="text-sm">
                      Drag & drop files or{" "}
                      <span className="text-purple-500 font-medium">
                        browse
                      </span>
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-cyan-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
          >
            Host Website
          </button>
        </div>
      </div>
    </div>
  );
}