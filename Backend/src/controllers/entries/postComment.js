const getDB = require("../../database/db");

const postComment = async (req, res) => {
  const connect = await getDB();
  try {
    const { idRec } = req.params;
    const idUser = req.userInfo.id;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "El comentario es obligatorio" });
    }

    await connect.query(
      `
                INSERT INTO comentarios (comentarios, user_id, recomendacion_id)
                VALUES (?,?,?)
            `,
      [comment, idUser, idRec]
    );

    res.status(200).send({
      status: "OK",
      message: "Comentario registrado",
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = postComment;
