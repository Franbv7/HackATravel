import React, { useState } from "react";
import { Rec } from "./Recomendacion";
import "../Styles/ListaRecomendacion.css";

export const RecList = ({ recs, removeRec }) => {
  const [recomendacionesOrdenadas, setRecomendacionesOrdenadas] =
    useState(recs);
  const [ordenPorVotos, setOrdenPorVotos] = useState(false);

  const ordenarPorVotos = () => {
    const ordenado = [...recs].sort(
      (a, b) => b.promedio_votos - a.promedio_votos
    );
    setRecomendacionesOrdenadas(ordenado);
    setOrdenPorVotos(true);
  };

  const ordenarPorFecha = () => {
    const ordenado = [...recs].sort(
      (a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
    );
    setRecomendacionesOrdenadas(ordenado);
    setOrdenPorVotos(false);
  };

  return (
    <div className="recomendaciones">
      <h1 className="rec-list-title">Experiencias compartidas.</h1>
      {ordenPorVotos ? (
        <button className="recom" onClick={ordenarPorFecha}>
          Ordenar por Fecha
        </button>
      ) : (
        <button className="recom" onClick={ordenarPorVotos}>
          Ordenar por Votos
        </button>
      )}
      {recomendacionesOrdenadas.length ? (
        <ul className="rec-list">
          {recomendacionesOrdenadas.map((rec) => {
            return (
              <li className="rec-list-items" key={rec.id}>
                <Rec rec={rec} removeRec={removeRec} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h1 className="rec-list-title">
          Todavía no tenemos ninguna recomendación, ¿Quieres ser el primero?
        </h1>
      )}
    </div>
  );
};
