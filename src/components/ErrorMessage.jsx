import React from "react";
import "../styles/ErrorMessage.css";
import erroImg from "../assets/images/icon-error.svg"

function ErrorMessage({ message, onRetry }) {
    return (
        <section className="error-container">
            <div className="error-message ">
                <div className="error-icon">
                    <img src={erroImg} alt="error-icon" />
                </div>
                <h2>Something went wrong</h2>
                <p>{message || "We couldn’t connect to the server (API error). Please try again in a few moments."}</p>
                <button className="retry-btn" onClick={onRetry}>
                    Retry
                </button>
            </div>
        </section>

    );
}

export default ErrorMessage;
