import { Link } from "react-router-dom";

import "../Styles/Errores.css";

export const NotFound = () => {
  return (
    <div className="error-notfound">
      <img src="/e.404.png" alt="error 404" />
      <Link to={"/"} className="recom recom-notfound">
        Volver a Inicio
      </Link>
    </div>
  );
};
