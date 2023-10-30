const getDB = require("../../database/db");

const getRecomendationById = async (req, res) => {
  const connect = await getDB();
  try {
    const { idRec } = req.params;

    const [recomendationResult] = await connect.query(
      `
      SELECT
            r.id,
            r.titulo,
            r.categoria,
            r.lugar,
            r.entradilla,
            r.texto,
            r.foto,
            r.fecha_creacion,
            r.user_id,
            u.nombre,
            u.avatar,
            CASE 
              WHEN ROUND(IFNULL(AVG(v.votos), 0), 1) = ROUND(IFNULL(AVG(v.votos), 0), 0) 
              THEN CAST(ROUND(IFNULL(AVG(v.votos), 0), 0) AS UNSIGNED)
              ELSE ROUND(IFNULL(AVG(v.votos), 0), 1)
            END AS promedio_votos,
            COUNT(v.votos) AS cantidad_votos,
            (SELECT COUNT(*) FROM comentarios c WHERE c.recomendacion_id = r.id) AS cantidad_comentarios
    FROM recomendaciones r
    LEFT JOIN votos v ON r.id = v.recomendacion_id
    LEFT JOIN usuarios u ON r.user_id = u.id
    WHERE r.id = ?
    GROUP BY r.id, r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, r.fecha_creacion, r.user_id;
      `,
      [idRec]
    );

    const [commentsResult] = await connect.query(
      `
      SELECT
        u.nombre AS nombre_usuario,
        u.avatar AS avatar_usuario,
        u.id AS id_usuario,
        c.comentarios AS comentario,
        c.fecha_creacion,
        c.id
      FROM comentarios c
      LEFT JOIN usuarios u ON c.user_id = u.id
      WHERE c.recomendacion_id = ?
      ORDER BY c.fecha_creacion DESC;
      `,
      [idRec]
    );

    const [votesResult] = await connect.query(
      `
      SELECT
        u.nombre AS nombre_usuario,
        u.id AS id_usuario,
        v.votos AS voto
      FROM votos v
      LEFT JOIN usuarios u ON v.user_id = u.id
      WHERE v.recomendacion_id = ?;
      `,
      [idRec]
    );

    const responseData = {
      status: "OK",
      data: {
        recomendacion: recomendationResult[0],
        comentarios: commentsResult,
        votos: votesResult,
      },
    };

    res.status(200).send(responseData);
  } catch (error) {
    console.log(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = getRecomendationById;
