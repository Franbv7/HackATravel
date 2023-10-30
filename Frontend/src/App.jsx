import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./pages/Inicio";
import { Register } from "./pages/Registro";
import { Recomendaciones } from "./pages/Recomendaciones";
import { Post } from "./pages/Recomendar";
import { UserPage } from "./pages/Usuario";
import { RecPage } from "./pages/Recomendacion";
import { RecSearchPage } from "./pages/Busqueda";
import { Footer } from "./components/Footer";
import { NotFound } from "./pages/NotFound";
import { PoliticaPrivacidad } from "./pages/PoliticaPrivacidad";
import { Conocenos } from "./pages/Conocenos";
import { Cookies } from "./pages/Cookies";

import "./App.css";

function App() {
  return (
    <main className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/recomendar" element={<Post />} />
        <Route path="/usuarios/:id/recomendaciones" element={<UserPage />} />
        <Route path="/recomendaciones/:id" element={<RecPage />} />
        <Route path="/busqueda" element={<RecSearchPage />} />
        <Route
          path="/politica-de-privacidad"
          element={<PoliticaPrivacidad />}
        />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
