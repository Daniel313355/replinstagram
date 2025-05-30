import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleLike = async (postId, currentLikes) => {
    const postRef = doc(db, "posts", postId);
    try {
      await updateDoc(postRef, { likes: currentLikes + 1 });
    } catch (e) {
      console.error("Error actualizando likes:", e);
    }
  };

  return (
    <div className="feed">
      {posts.map(post => (
        <div key={post.id} className="post">
          {post.mediaBase64 && post.mediaBase64.includes("image") && (
            <img src={post.mediaBase64} alt="Publicación" className="media" />
          )}
          {post.mediaBase64 && post.mediaBase64.includes("video") && (
            <video controls className="media">
              <source src={post.mediaBase64} type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
          )}
          <p>{post.caption}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => handleLike(post.id, post.likes || 0)}>❤️ Like</button>
            <span>{post.likes || 0} Me gusta</span>
          </div>
        </div>
      ))}
    </div>
  );
}
