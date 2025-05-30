import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export default function UploadPost() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && (selected.type.includes("image") || selected.type.includes("video"))) {
      setFile(selected);
      setError(null);
    } else {
      setError("Formato no soportado");
      setFile(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Selecciona un archivo");
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await addDoc(collection(db, "posts"), {
          caption,
          mediaBase64: reader.result,
          likes: 0,
          createdAt: serverTimestamp(),
        });
        setCaption("");
        setFile(null);
        setError(null);
      } catch (e) {
        setError("Error subiendo el post");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="upload-post">
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Escribe un caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Subiendo..." : "Subir Post"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
