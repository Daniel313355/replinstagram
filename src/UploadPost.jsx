// src/UploadPost.jsx
import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function UploadPost({ user }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor selecciona una imagen o video.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await addDoc(collection(db, "posts"), {
          caption: caption,
          mediaBase64: reader.result,
          userEmail: user.email, // Guarda el email del usuario autenticado
          likes: 0,
          createdAt: serverTimestamp(),
        });

        setCaption("");
        setFile(null);
        alert("¡Publicación subida!");
      } catch (error) {
        console.error("Error al subir el post:", error);
        alert("Hubo un error al subir el post.");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="upload-post">
      <h3>Subir nueva publicación</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Escribe un pie de foto..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handleUpload}>Subir</button>
    </div>
  );
}
