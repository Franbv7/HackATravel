import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { deleteRecService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { FormatoFecha } from "./FormatoFecha";
import { Confirmar } from "./Confirmar";

import "../Styles/Recomendacion.css";

export const Rec = ({ rec, removeRec }) => {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  if (!rec) {
    return null;
  }

  const handleConfirmDelete = (id) => {
    deleteRec(id);
    toggleConfirmPopup();
  };

  const deleteRec = async (id) => {
    try {
      await deleteRecService({ id, token });

      if (removeRec) {
        removeRec(id);
      } else {
        navigate("/recomendaciones");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleConfirmPopup = () => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  };

  return (
    <article className="recomendacion">
      <Link to={`/recomendaciones/${rec.id}`} className="recomendacion-link">
        <h2>{rec.titulo}</h2>
        {rec.foto ? (
          <img
            className="recomendacion-img"
            src={`${baseURL}/uploads/recPhoto/${rec.foto}`}
            alt={rec.titulo}
          />
        ) : null}
        <p className="entradilla-rec">{rec.entradilla}</p>
        <p>
          {rec.promedio_votos === "0.00"
            ? "Esta recomendación aún no tiene votos"
            : `${rec.promedio_votos}`}
          {"/5"}
        </p>
        <p>
          {rec.cantidad_comentarios === 0
            ? null
            : `${rec.cantidad_comentarios} comentario${
                rec.cantidad_comentarios === 1 ? "" : "s"
              }`}
        </p>
      </Link>
      <div className="recomendacion-info">
        <div>
          {rec.avatar ? (
            <div className="user-avatar">
              <img
                className="user-avatar-image"
                src={`${baseURL}/uploads/avatarUser/${rec.avatar}`}
                alt={rec.nombre}
              />
            </div>
          ) : (
            <img
              className="user-avatar "
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Avatar"
            />
          )}
          <Link
            className="avatar-rec"
            to={`/usuarios/${rec.user_id}/recomendaciones`}
          >
            {rec.nombre}
          </Link>
        </div>
        <p>{FormatoFecha(rec.fecha_creacion)}</p>
        {user && user.id === rec.user_id ? (
          <section>
            <button className="btn-eliminar" onClick={toggleConfirmPopup}>
              {isConfirmPopupOpen && (
                <Confirmar
                  onClose={toggleConfirmPopup}
                  onConfirm={() => handleConfirmDelete(rec.id)}
                />
              )}
              <figure>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </figure>
            </button>
            {error ? <p>{JSON.stringify(error)}</p> : null}
          </section>
        ) : null}
      </div>
    </article>
  );
};
