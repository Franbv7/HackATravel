import { Link } from "react-router-dom";

import "../Styles/Errores.css";

export const MensajeError = ({ message }) => {
  return (
    <section className="error-notfound">
      <h1>{message}</h1>
      <img src="/errores.png" alt="Hubo un error" />
      <Link className="recom" to={"/"}>
        Volver a Inicio
      </Link>
    </section>
  );
};
