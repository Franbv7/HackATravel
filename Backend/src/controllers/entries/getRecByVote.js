const getDB = require("../../database/db");

const getRecByVote = async (req, res) => {
  const connect = await getDB();
  try {
    const [result] = await connect.query(
      `SELECT
    r.titulo,
    r.categoria,
    r.lugar,
    r.entradilla,
    r.texto,
    r.foto,
    CASE 
      WHEN ROUND(IFNULL(AVG(v.votos), 0), 1) = ROUND(IFNULL(AVG(v.votos), 0), 0) 
      THEN CAST(ROUND(IFNULL(AVG(v.votos), 0), 0) AS UNSIGNED)
      ELSE ROUND(IFNULL(AVG(v.votos), 0), 1)
    END AS promedio_votos,
    (SELECT COUNT(*) FROM comentarios c WHERE c.recomendacion_id = r.id) AS cantidad_comentarios
    FROM recomendaciones r
    LEFT JOIN votos v ON r.id = v.recomendacion_id
    GROUP BY r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto
    ORDER BY promedio_votos DESC;
            `
    );

    res.status(200).send({
      status: "OK",
      data: result,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = getRecByVote;
