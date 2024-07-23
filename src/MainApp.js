import React, { useState, useRef } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [outputDir, setOutputDir] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      console.log("File extracted:", response.data);
      setOutputDir(response.data.outputDir);
    } catch (error) {
      console.error("Error extracting file:", error);
    }
  };

  const handleExecute = async () => {
    try {
      const response = await axios.post("http://localhost:5000/execute", {
        fileName,
      });
      console.log("Command executed:", response.data);
    } catch (error) {
      console.error("Error executing command:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        File Upload
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            required
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Choose File
          </button>
          {file && (
            <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="file-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New file name
          </label>
          <input
            id="file-name"
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            placeholder="Enter new file name"
            required
            className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          Upload and Extract File
        </button>
      </form>
      {outputDir && (
        <div className="mt-6">
          <button
            onClick={handleExecute}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
          >
            Execute Command on Extracted File
          </button>
        </div>
      )}
    </div>
  );
}
