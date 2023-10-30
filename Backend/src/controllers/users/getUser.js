const getDB = require("../../database/db");

const getUser = async (req, res) => {
  const connect = await getDB();
  try {
    const { idUser } = req.params;

    const [user] = await connect.query(
      `SELECT fecha_registro, email, nombre, avatar, id FROM usuarios WHERE id=?`,
      [idUser]
    );

    res.status(200).send({
      status: "OK",
      data: user,
      tokenInfo: req.userInfo,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = getUser;
