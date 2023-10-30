import React, { useState } from "react";

export const OrdenarRecomendaciones = ({
  recs,
  setRecomendacionesOrdenadas,
}) => {
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
    <div className="ordenar-recomendaciones">
      {ordenPorVotos ? (
        <button className="recom" onClick={ordenarPorFecha}>
          Ordenar por Fecha
        </button>
      ) : (
        <button className="recom" onClick={ordenarPorVotos}>
          Ordenar por Votos
        </button>
      )}
    </div>
  );
};
