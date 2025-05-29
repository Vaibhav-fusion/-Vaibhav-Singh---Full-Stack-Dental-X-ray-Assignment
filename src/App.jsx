import { useState } from "react";
import Summary from "./components/Summary";
import Upload from "./components/Upload";

export default function App() {
  const [detections, setDetections] = useState([]);
  const [summary, setSummary] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">🦷 Dental X-ray Detector</h1>

      <Upload onDetections={setDetections} />

      {detections.length > 0 && (
        <Summary detections={detections} onSummary={setSummary} summary={summary} />
      )}
    </div>
  );
}
