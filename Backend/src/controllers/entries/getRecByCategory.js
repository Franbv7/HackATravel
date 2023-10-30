const getDB = require("../../database/db");

const getRecomendationByCategory = async (req, res) => {
  const connect = await getDB();
  try {
    const { category } = req.params;

    const [result] = await connect.query(
      `
            SELECT r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, CASE 
              WHEN ROUND(IFNULL(AVG(v.votos), 0), 1) = ROUND(IFNULL(AVG(v.votos), 0), 0) 
              THEN CAST(ROUND(IFNULL(AVG(v.votos), 0), 0) AS UNSIGNED)
              ELSE ROUND(IFNULL(AVG(v.votos), 0), 1)
            END AS promedio_votos,
            (SELECT COUNT(*) FROM comentarios c WHERE c.recomendacion_id = r.id) AS cantidad_comentarios
            FROM recomendaciones r
            LEFT JOIN votos v ON r.id = v.recomendacion_id
            WHERE r.categoria=?
            GROUP BY r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, r.fecha_creacion;`,
      [category]
    );

    if (result.length === 0)
      return res.status(404).json({
        message: "No existe ninguna recomendación para esa categoría",
      });

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

module.exports = getRecomendationByCategory;
