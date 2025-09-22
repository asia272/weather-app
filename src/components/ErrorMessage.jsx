import React from "react";
import "../styles/ErrorMessage.css";
import erroImg from "../assets/images/icon-error.svg";
import retryIcon from "../assets/images/icon-retry.svg";

function ErrorMessage({ message, onRetry }) {
  return (
    <section className="error-container" role="alert">
      <article className="error-message">
        <figure className="error-icon">
          <img src={erroImg} alt="Error icon" />
        </figure>

        <header>
          <h2>Something went wrong</h2>
        </header>

        <p>
          {message ||
            "We couldn’t connect to the server (API error). Please try again in a few moments."}
        </p>

        <button className="retry-btn" onClick={onRetry}>
          <img src={retryIcon} alt="Retry icon" />
          Retry
        </button>
      </article>
    </section>
  );
}

export default ErrorMessage;
