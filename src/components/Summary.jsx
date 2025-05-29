import { useState } from "react";
import axios from "axios";

export default function Summary({ detections, onSummary, summary }) {
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    setLoading(true);

    const detectionNames = detections.map((d) => d.class).join(", ");
    const prompt = `Explain these dental issues detected in an X-ray: ${detectionNames}. Write in a simple and friendly tone.`;

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          params: { key: import.meta.env.VITE_GEMINI_API_KEY },
        }
      );

      const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary.";
      onSummary(text);
    } catch (err) {
      onSummary("Failed to summarize with Gemini.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">🧠 AI Summary</h2>

      <ul className="list-disc ml-6 mb-4">
        {detections.map((d, i) => (
          <li key={i}>
            {d.class} – Confidence: {(d.confidence * 100).toFixed(1)}%
          </li>
        ))}
      </ul>

      <button
        onClick={handleSummarize}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize with Gemini"}
      </button>

      {summary && <p className="mt-4 whitespace-pre-wrap text-gray-700">{summary}</p>}
    </div>
  );
}
