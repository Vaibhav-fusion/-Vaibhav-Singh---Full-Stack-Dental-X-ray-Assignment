import { useState } from "react";

export default function Upload() {
  const [fileName, setFileName] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    //handling image thingy 
    const allowedPreviewTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedPreviewTypes.includes(file.type)) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    } else {
      setImageSrc(null); 
    }
  }

  return (
    <div className="w-full max-w-md">
      <input
        type="file"
        accept=".dcm,.rvg,image/png,image/jpeg"
        onChange={handleFileChange}
        className="mb-4"
      />

      {fileName && <p className="mb-2 text-gray-700">Uploaded: {fileName}</p>}

      {imageSrc ? (
        <img src={imageSrc} alt="Preview" className="border rounded max-w-full" />
      ) : (
        fileName && (
          <div className="border rounded p-8 text-center text-gray-500 bg-gray-100">
            No preview available for this file type.
          </div>
        )
      )}
    </div>
  );
}
