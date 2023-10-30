import "../Styles/Footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <Link to={"/"}>
        <p>©️HACK A TRAVEL</p>
      </Link>
      <Link to={"/politica-de-privacidad"}>
        <p>Política de privacidad</p>
      </Link>
      <Link to={"/conocenos"}>
        <p>Conócenos</p>
      </Link>
      <Link to={"/cookies"}>
        <p>Cookies</p>
      </Link>
    </footer>
  );
};
