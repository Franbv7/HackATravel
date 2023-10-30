import { useContext } from "react";
import { Link } from "react-router-dom";

import useRecs from "../hooks/useRecs";
import { NewRec } from "../components/NuevaRecomendacion";
import { AuthContext } from "../context/AuthContext";
import { Loading } from "../components/Loading";
import { MensajeError } from "../components/MensajeError";

import "../Styles/Errores.css";

export const Post = () => {
  const { error, loading, addRec } = useRecs();
  const { user } = useContext(AuthContext);

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <>
      {user ? (
        <NewRec addRec={addRec} />
      ) : (
        <div className="error-notfound">
          <img src="/logerror.png" alt="Debes estár logueado" />
          <Link to="/registro">
            <button className="recom">Regístrate</button>
          </Link>
        </div>
      )}
    </>
  );
};
