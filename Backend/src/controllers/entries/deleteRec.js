const getDB = require("../../database/db");

const deleteRec = async (req, res) => {
  const connect = await getDB();
  try {
    const { idRec } = req.params;

    await connect.query(`DELETE FROM votos WHERE recomendacion_id=?`, [idRec]);

    await connect.query(`DELETE FROM recomendaciones WHERE id=?`, [idRec]);

    res.status(200).send({
      status: "OK",
      message: `La recomendación con id: ${idRec} y todos sus elementos fueron eliminados`,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = deleteRec;
