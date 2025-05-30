import React from "react";
import UploadPost from "./UploadPost";
import Feed from "./Feed";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Instagram Clone</h1>
      <UploadPost />
      <Feed />
    </div>
  );
}

export default App;
