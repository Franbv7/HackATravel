import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { sendRecService } from "../services";

import "../Styles/NuevaRecomendacion.css";

export const NewRec = ({ addRec }) => {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData(e.target);
      const rec = await sendRecService({ data, token });

      addRec(rec);

      e.target.reset();
      setImage(null);
      navigate("/recomendaciones");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mispost">
      <section>
        <h1>Cuéntanos tu experiencia.</h1>
        <form className="new-post" autoComplete="off" onSubmit={handleForm}>
          <fieldset>
            <label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Título"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              <input
                type="text"
                name="intro"
                id="intro"
                placeholder="Entradilla"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              <input
                type="text"
                name="place"
                id="place"
                placeholder="Lugar"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Categoría"
                required
              ></input>
            </label>
          </fieldset>
          <fieldset>
            <label>
              <textarea
                className="inputText"
                type="text"
                name="text"
                id="text"
                placeholder="Describe aquí tu experiencia"
                required
              ></textarea>
            </label>
          </fieldset>
          <fieldset>
            <label>
              <input
                type="file"
                name="photo"
                accept="image/"
                onChange={(e) => setImage(e.target.files[0])}
                className="input-file"
              />

              <figure className="upload-image">
                <figcaption>Subir Imagen</figcaption>
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
              </figure>
            </label>
          </fieldset>
          <button>Subir Recomendación</button>
          {error ? <p>{error}</p> : null}
          {loading ? <p>Añadiendo recomendación...</p> : null}
        </form>
      </section>
      <section>
        {image ? (
          <figure className="preview-image">
            <img
              src={URL.createObjectURL(image)}
              className="preview"
              alt="Preview"
            />
          </figure>
        ) : (
          <figure className="preview-image">
            <img src="/equipaje.jpg" />
          </figure>
        )}
      </section>
    </div>
  );
};
