import locationNotFoundIcon from "../assets/images/not-found-location.png";
import "../styles/ErrorMessage.css";


const NotFoundMessage = () => {
    return (
        <div className="error-container not-found-msg">
            <div className="msg">
                <img src={locationNotFoundIcon} alt="location-not-found" />
                <h2>No search result found!</h2>
            </div>

        </div>
    );
};

export default NotFoundMessage;
