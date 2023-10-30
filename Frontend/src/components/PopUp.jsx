import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";

import { logInUserService } from "../services";
import { AuthContext } from "../context/AuthContext";

import "../Styles/PopUp.css";

export const PopUp = ({ onClose }) => {
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

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

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const data = await logInUserService({ mail, pwd: pass });
      login(data);

      onClose();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="popup">
      <div className="popup-content" ref={popupRef}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <form onSubmit={handleForm}>
          <h2>Bienvenido</h2>
          <fieldset>
            <input
              placeholder="Email"
              type="email"
              id="mail"
              name="mail"
              value={mail}
              required
              onChange={(e) => setMail(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Contraseña"
              type="password"
              id="pass1"
              name="pass1"
              value={pass}
              required
              onChange={(e) => setPass(e.target.value)}
            />
          </fieldset>

          <div className="button-container">
            <button className="recom">Ingresar</button>
            {error ? <p>{error}</p> : null}
            <Link to={"/registro"}>
              <button className="recom" onClick={onClose}>
                Registrarse
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
