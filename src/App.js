import React, { useState } from "react";
import UploadPost from "./UploadPost";
import Feed from "./Feed";
import AuthForm from "./AuthForm";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <h1>Instagram</h1>
      <AuthForm setUser={setUser} />
      {user && (
        <>
          <UploadPost user={user} />
          <Feed />
        </>
      )}
    </div>
  );
}

export default App;
