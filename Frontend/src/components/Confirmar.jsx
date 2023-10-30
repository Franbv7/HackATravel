import { useState, useEffect, useRef } from "react";

import "../Styles/PopUp.css";

export const Confirmar = ({ onClose, onConfirm }) => {
  const popupRef = useRef(null);

  const [error, setError] = useState("");

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="popup">
      <div className="popup-content-confirm" ref={popupRef}>
        <button className="close-button" onClick={onClose}>
          X
        </button>

        <h2>¿Estás segur@?</h2>

        <div className="button-container">
          <button
            className="recom"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Si
          </button>
          {error ? <p>{error}</p> : null}

          <button className="recom" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
