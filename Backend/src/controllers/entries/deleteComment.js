const getDB = require("../../database/db");

const deleteComment = async (req, res) => {
  const connect = await getDB();
  try {
    const { idComment } = req.body;

    await connect.query(`DELETE FROM comentarios WHERE id=?`, [idComment]);

    res.status(200).send({
      status: "OK",
      message: `El comentario fue eliminado`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Error",
      message: "Hubo un error al eliminar el comentario",
    });
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = deleteComment;
