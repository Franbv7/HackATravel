const getDB = require("../../database/db");

const voteRec = async (req, res) => {
  const connect = await getDB();
  try {
    const { idRec } = req.params;
    const idUser = req.userInfo.id;
    const { vote } = req.body;

    if (!vote || vote > 5 || vote < 1) {
      return res
        .status(400)
        .json({ message: "Voto no válido, debe ser entre 1 y 5" });
    }

    const [rec] = await connect.query(
      `
                SELECT user_id
                FROM recomendaciones
                WHERE id=?
            `,
      [idRec]
    );

    if (rec[0].user_id === idUser) {
      return res
        .status(403)
        .json({ message: "No puedes votar tu propia entrada" });
    }

    const [existingVote] = await connect.query(
      `
                SELECT id
                FROM votos
                WHERE user_id=? AND recomendacion_id=?
            `,
      [idUser, idRec]
    );

    if (existingVote.length > 0)
      return res
        .status(403)
        .json({ message: "No puedes votar dos veces la misma recomendación" });

    await connect.query(
      `
                INSERT INTO votos (votos, user_id, recomendacion_id)
                VALUES (?,?,?)
            `,
      [vote, idUser, idRec]
    );

    res.status(200).send({
      status: "OK",
      message: "Has votado correctamente",
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = voteRec;
