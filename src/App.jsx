import React from "react";
import Upload from "./components/Upload";

function App() {
  return (
    <div className="min-h-screen flex">
      <div className="w-2/3 bg-gray-50 border-r border-gray-300 p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Dental X-ray Viewer</h2>
        <Upload/>
      </div>

      <div className="w-1/3 bg-white p-6">
        <h2 className="text-xl font-semibold mb-4">Diagnostic Report</h2>
      </div>
    </div>
  );
}

export default App;
