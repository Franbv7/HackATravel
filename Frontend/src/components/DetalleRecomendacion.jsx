import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import { deleteRecService, deleteCommentService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { Rating } from "./Valorar";
import { FormatoFecha } from "./FormatoFecha";
import { NewComment } from "./NuevoComentario";
import { EliminarComentario } from "./EliminarComentario";

import "../Styles/Recomendacion.css";
import "../Styles/DetalleRecomendacion.css";

export const RecDetalle = ({ rec, addComment, deleteComment, removeRec }) => {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(rec.userRating || 1);
  const [userVoted, setUserVoted] = useState(false);
  const [comments, setComments] = useState(rec.comentarios || []);

  useEffect(() => {
    if (user && rec.votos) {
      const userVotedRec = rec.votos.find(
        (voto) => voto.id_usuario === user.id
      );
      setUserVoted(!!userVotedRec);
    }
  }, [user, rec.votos]);

  const handleUserRating = (newRating) => {
    setUserRating(newRating);
  };

  if (!rec) {
    return null;
  }

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

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId, token);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <article className="recomendacion rec-detalle">
        <h2>{rec.recomendacion.titulo}</h2>
        {rec.recomendacion.foto ? (
          <img
            className="rec-detalle-foto"
            src={`${baseURL}/uploads/recPhoto/${rec.recomendacion.foto}`}
            alt={rec.recomendacion.titulo}
          />
        ) : null}
        <h3>{rec.recomendacion.entradilla}</h3>
        <p className="recDetalle-texto">{rec.recomendacion.texto}</p>

        <div className="rec-detalle-info">
          <div className="rec-detalle-avatar-user">
            {rec.recomendacion.avatar ? (
              <>
                <Link
                  to={`/usuarios/${rec.recomendacion.user_id}/recomendaciones`}
                >
                  <img
                    className="user-avatar"
                    src={`${baseURL}/uploads/avatarUser/${rec.recomendacion.avatar}`}
                    alt={rec.recomendacion.nombre}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`/usuarios/${rec.recomendacion.user_id}/recomendaciones`}
                >
                  <img
                    className="user-avatar"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Avatar"
                  />
                </Link>
              </>
            )}
            <p>
              <Link
                to={`/usuarios/${rec.recomendacion.user_id}/recomendaciones`}
              >
                {rec.recomendacion.nombre}
              </Link>{" "}
            </p>
          </div>

          {!userVoted && user && user.id !== rec.recomendacion.user_id && (
            <Rating
              initialValue={userRating}
              onRate={handleUserRating}
              recId={rec.recomendacion.id}
            />
          )}

          <p>
            {rec.recomendacion.promedio_votos === "0.00"
              ? "Esta recomendación aún no tiene votos"
              : `${rec.recomendacion.promedio_votos}/5 (${
                  rec.recomendacion.cantidad_votos
                } ${
                  rec.recomendacion.cantidad_votos === 1
                    ? "valoración"
                    : "valoraciones"
                })`}
          </p>
        </div>
        <div className="detalle-fecha">
          <p>{FormatoFecha(rec.recomendacion.fecha_creacion)}</p>
          {user && user.id === rec.recomendacion.user_id ? (
            <section>
              <button
                className="btn-eliminar btn-eliminar-user"
                onClick={() => {
                  if (window.confirm("¿Estás seguro?"))
                    deleteRec(rec.recomendacion.id);
                }}
              >
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
      <section className="comentarios">
        {token ? (
          <NewComment id={rec.recomendacion.id} addComment={addComment} />
        ) : null}
        <p>
          Esta recomendación tiene {rec.recomendacion.cantidad_comentarios}{" "}
          comentario
          {rec.recomendacion.cantidad_comentarios === 1 ? "" : "s"}
          {":"}
        </p>

        {rec.comentarios && rec.comentarios.length > 0 && (
          <div>
            {rec.comentarios.map((comentario) => (
              <article key={comentario.id} className="comentario">
                <div className="avatar-nombre">
                  {" "}
                  {comentario.avatar_usuario ? (
                    <Link
                      to={`/usuarios/${comentario.id_usuario}/recomendaciones`}
                    >
                      <img
                        className="user-avatar"
                        src={`${baseURL}/uploads/avatarUser/${comentario.avatar_usuario}`}
                        alt={comentario.nombre_usuario}
                      />
                    </Link>
                  ) : (
                    <Link
                      to={`/usuarios/${comentario.id_usuario}/recomendaciones`}
                    >
                      <img
                        className="user-avatar"
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="Avatar"
                      />
                    </Link>
                  )}{" "}
                  <div className="comentario-nombre">
                    <p>{comentario.nombre_usuario}</p>
                    <p>{comentario.comentario}</p>
                  </div>
                </div>
                <div className="tiempo-borrar">
                  <p>{FormatoFecha(comentario.fecha_creacion)}</p>
                  {rec.recomendacion?.user_id === user?.id ||
                  comentario?.id_usuario === user?.id ? (
                    <EliminarComentario
                      commentId={comentario.id}
                      recId={rec.recomendacion.id}
                      commentOwnerId={comentario.id_usuario}
                      recOwnerId={rec.recomendacion.user_id}
                      deleteComment={deleteComment}
                      setComments={setComments}
                    />
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
};
