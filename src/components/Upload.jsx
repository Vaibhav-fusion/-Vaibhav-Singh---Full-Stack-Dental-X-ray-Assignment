import { useState } from "react";
import axios from "axios";

export default function Upload({ onDetections }) {
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64data = reader.result;
      setLoading(true);
      setProgress(30);

      try {
        const response = await axios({
          method: "POST",
          url: "https://detect.roboflow.com/adr/6",
          params: {
            api_key: import.meta.env.VITE_ROBOFLOW_API_KEY,
            confidence: 30,
            overlap: 50,
          },
          data: {
            image: base64data,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        setProgress(100);
        onDetections(response.data.predictions);
      } catch (err) {
        setError("Failed to get predictions from Roboflow.");
        onDetections([]);
      } finally {
        setLoading(false);
        setTimeout(() => setProgress(0), 1000);
      }
    };
  }

  return (
    <div className="bg-white shadow p-6 rounded mb-6">
      <input
        type="file"
        accept=".dcm,.rvg,image/png,image/jpeg"
        onChange={handleFileChange}
        className="block mb-4"
      />

      {fileName && <p className="text-sm mb-2 text-gray-600">Uploaded: {fileName}</p>}
      {error && <p className="text-red-600">{error}</p>}

      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
