const getDB = require("../database/db");

const recExists = async (req, res, next) => {
  try {
    const connect = await getDB();

    const { idRec } = req.params;

    const [rec] = await connect.query(
      `
                SELECT id
                FROM recomendaciones
                WHERE id=?
            
            `,
      [idRec]
    );

    connect.release();

    if (rec.length === 0)
      return res.status(404).json({ message: "No existe esa recomendación" });

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = recExists;
