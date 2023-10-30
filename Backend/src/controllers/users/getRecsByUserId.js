const getDB = require("../../database/db");

const getRecsByUserId = async (idUser) => {
  const connect = await getDB();
  try {
    const [result] = await connect.query(
      `
          SELECT r.*, u.nombre, u.avatar, 
          CASE 
            WHEN ROUND(IFNULL(AVG(v.votos), 0), 1) = ROUND(IFNULL(AVG(v.votos), 0), 0) 
            THEN CAST(ROUND(IFNULL(AVG(v.votos), 0), 0) AS UNSIGNED)
            ELSE ROUND(IFNULL(AVG(v.votos), 0), 1)
          END AS promedio_votos,
          COUNT(c.comentarios) AS cantidad_comentarios  
          FROM recomendaciones r 
          LEFT JOIN usuarios u ON r.user_id = u.id 
          LEFT JOIN votos v ON r.id = v.recomendacion_id
          LEFT JOIN comentarios c ON r.id = c.recomendacion_id
          WHERE r.user_id = ?
          GROUP BY r.id, r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, r.fecha_creacion, r.user_id, u.nombre, u.avatar
          ORDER BY r.fecha_creacion DESC;
    `,
      [idUser]
    );

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = getRecsByUserId;
