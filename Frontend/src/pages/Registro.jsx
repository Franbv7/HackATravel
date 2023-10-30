import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUserService } from "../services";

import "../Styles/Registro.css";

export const Register = () => {
  const navigate = useNavigate();

  const [nick, setNick] = useState("");
  const [mail, setEmail] = useState("");
  const [mail2, setEmail2] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();

    if (mail !== mail2) {
      setError("Los correos no coinciden");
      return;
    }

    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (avatar === null) {
      setError("Selecciona un avatar");
      return;
    }

    const data = new FormData(e.target);

    try {
      await registerUserService({
        name: nick,
        mail,
        pwd: pass1,
        avatar: data.get("avatar"),
      });
      setError("");
      setAvatar(null);
      setRegistrationSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <div className="register">
      <section>
        <h1>REGÍSTRATE</h1>
        <form onSubmit={handleForm} autoComplete="off">
          <fieldset>
            <label htmlFor="nick">
              <input
                type="text"
                id="nick"
                name="nick"
                placeholder="Nick"
                value={nick}
                required
                onChange={(e) => setNick(e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="mail">
              <input
                type="email"
                id="mail"
                placeholder="Email"
                name="mail"
                value={mail}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="email2">
              <input
                type="email"
                id="mail2"
                placeholder="Repite tu Email"
                name="mail2"
                value={mail2}
                required
                onChange={(e) => setEmail2(e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="pass1">
              <input
                type="password"
                id="pass1"
                placeholder="Contraseña"
                name="pass1"
                value={pass1}
                required
                onChange={(e) => setPass1(e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="pass2">
              <input
                type="password"
                id="pass2"
                placeholder="Repite tu Contraseña"
                name="pass2"
                value={pass2}
                required
                onChange={(e) => setPass2(e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="avatar">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="input-file"
              />

              <figure className="upload-image">
                <figcaption>Subir Imagen</figcaption>
                {avatar ? (
                  <div className="header-avatar">
                    <img
                      className="header-avatar-image"
                      src={URL.createObjectURL(avatar)}
                    />
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="var(--action)"
                    className="recom"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                )}
              </figure>
            </label>
          </fieldset>

          <button>Aventúrate</button>
          {error ? <p>{JSON.stringify(error)}</p> : null}
          {registrationSuccess && (
            <p className="success-message">Usuario registrado correctamente</p>
          )}
        </form>
      </section>
      <figure className="imagen-equipaje">
        <img className="imagen-equipaje-image" src="/equipaje.jpg" />
      </figure>
    </div>
  );
};
