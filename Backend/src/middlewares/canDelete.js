const getDB = require("../database/db");

const canDelete = async (req, res, next) => {
  try {
    const connect = await getDB();

    const { idRec } = req.params;

    const [rec] = await connect.query(
      `SELECT user_id
            FROM recomendaciones
            WHERE id=?`,
      [idRec]
    );

    connect.release();

    if (req.userInfo.id !== rec[0].user_id && req.userInfo.role !== "admin") {
      return res.status(401).json({
        message: "No tiene permisos para eliminar esta recomendación",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = canDelete;
