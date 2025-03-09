import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SiteForm() {
  const [isDragging, setIsDragging] = useState(false); // Track drag-over state
  const [file, setFile] = useState(null); // Store the selected file

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files;
    if (droppedFile) {
      setFile(droppedFile);
      console.log("Dropped file:", droppedFile);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-gray-800 flex items-center justify-center min-h-screen">
      <div className="h-full w-screen bg-slate-950 rounded-lg shadow-2xl p-8 max-w-2xl relative overflow-hidden">
        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-black opacity-20 blur-3xl"></div>

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
              className="w-full px-4 py-3 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder-gray-400"
            />
          </div>

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
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-gray-400 hover:text-white text-center"
              >
                {file ? (
                  <p className="text-sm">Selected file: {file.name}</p>
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
          <button className="w-full bg-cyan-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300">
            Host Website
          </button>
        </div>
      </div>
    </div>
  );
}
