import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Rec } from "../components/Recomendacion";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";
import { getAllRecsService } from "../services";
import useRecs from "../hooks/useRecs";
import { SearchBarMovil } from "../components/BarraBusquedaMovil";
import { OrdenarRecomendaciones } from "../components/OrdenarRecomendaciones";
import { ScrollToTopButton } from "../components/Scroll";

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const RecSearchPage = () => {
  const { removeRec } = useRecs();
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const initialQuery = new URLSearchParams(location.search).get("query");
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = (searchQuery) => {
    window.location.href = `/busqueda?query=${searchQuery}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllRecsService(query);
        await new Promise((resolve) => setTimeout(resolve, 750));
        setRecs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);
  if (loading) return <Loading />;

  const filteredRecs = recs.filter((rec) => {
    const normalizedQuery = removeAccents(query).toLowerCase();
    const normalizedTitle = removeAccents(rec.titulo).toLowerCase();
    const normalizedCategory = removeAccents(rec.categoria).toLowerCase();
    const normalizedEntradilla = removeAccents(rec.entradilla).toLowerCase();
    const normalizedLugar = removeAccents(rec.lugar).toLowerCase();
    const normalizedTexto = removeAccents(rec.texto).toLowerCase();

    console.log(recs);

    return (
      normalizedTitle.includes(normalizedQuery) ||
      normalizedCategory.includes(normalizedQuery) ||
      normalizedEntradilla.includes(normalizedQuery) ||
      normalizedLugar.includes(normalizedQuery) ||
      normalizedTexto.includes(normalizedQuery)
    );
  });

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <section className="recomendaciones resultados-busqueda">
      <SearchBarMovil
        className="search-bar"
        query={query}
        onSearch={handleSearch}
      />
      <OrdenarRecomendaciones
        recs={filteredRecs}
        setRecomendacionesOrdenadas={setRecs}
      />
      <h1>Recomendaciones</h1>
      <ul className="rec-list">
        {filteredRecs.length === 0 ? (
          <img className="search-error" src="/Search.png" alt="" />
        ) : (
          filteredRecs.map((rec) => (
            <li key={rec.id} className="rec-list-items">
              <Rec rec={rec} removeRec={removeRec} />
            </li>
          ))
        )}
      </ul>
      <ScrollToTopButton />
    </section>
  );
};
