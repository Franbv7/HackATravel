import { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { ratingService } from "../services";

import "../Styles/Estrellas.css";

export const Rating = ({ initialValue, onRate, recId }) => {
  const [rating, setRating] = useState(initialValue);
  const { token } = useContext(AuthContext);

  const handleRatingChangeLocal = async (newRating) => {
    ratingService(newRating, recId, token, setRating, onRate);
  };

  const handleInputChange = (newRating) => {
    handleRatingChangeLocal(newRating);
    window.location.reload();
  };

  const handleMouseOver = (value) => {
    setRating(value);
  };

  const handleMouseLeave = () => {
    setRating(0);
  };

  return (
    <div className="rating" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((value) => (
        <label key={value} onMouseOver={() => handleMouseOver(value)}>
          <input
            type="radio"
            name="star-radio"
            value={`star-${value}`}
            onChange={() => handleInputChange(value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              pathLength="360"
              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
              fill={value <= rating ? "var(--fill)" : "none"}
            ></path>
          </svg>
        </label>
      ))}
    </div>
  );
};
