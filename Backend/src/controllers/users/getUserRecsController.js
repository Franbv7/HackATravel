const getDB = require("../../database/db");
const getRecsByUserId = require("./getRecsByUserId");

const getUserRecsController = async (req, res, next) => {
  const connect = await getDB();

  try {
    const { idUser } = req.params;
    console.log(idUser);

    const user = await getRecsByUserId(idUser);

    res.send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = getUserRecsController;
