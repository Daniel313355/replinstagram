// src/Feed.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postData);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Función para manejar el Like
  const handleLike = async (postId, currentLikes) => {
    const postRef = doc(db, "posts", postId);
    try {
      await updateDoc(postRef, {
        likes: currentLikes + 1,
      });
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  return (
    <div className="feed">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <p><strong>{post.userEmail}</strong></p>

          {post.mediaBase64?.startsWith("data:image") ? (
            <img src={post.mediaBase64} alt="post" className="media" />
          ) : post.mediaBase64?.startsWith("data:video") ? (
            <video controls className="media">
              <source src={post.mediaBase64} type="video/mp4" />
              Tu navegador no soporta video.
            </video>
          ) : null}

          <p>{post.caption}</p>

          {/* ❤️ Botón de Like */}
          <button onClick={() => handleLike(post.id, post.likes)}>
            ❤️ Me gusta
          </button>
          <p>{post.likes} Me gusta</p>
        </div>
      ))}
    </div>
  );
}
