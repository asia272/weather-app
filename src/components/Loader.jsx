import React from "react";
import "../styles/LoadingUI.css";


export default function LoadingUI() {
  return (
    <div className="loading-card">
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>Loading...</p>
    </div>
  );
}
