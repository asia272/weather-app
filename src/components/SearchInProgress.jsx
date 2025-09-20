import React from "react";
import "../styles/SearchInProgress.css";
import loadingIcon from "../assets/images/icon-loading.svg";

export default function SearchInProgress() {
  return (
    <div className="search-in-progress">
      <img src={loadingIcon} alt="Loading..." className="loading-icon" />
      <p className="message">Search in progress</p>
    </div>
  );
}
