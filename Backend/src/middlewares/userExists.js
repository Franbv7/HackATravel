const getDB = require("../database/db");

const userExists = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const connect = await getDB();

    const [user] = await connect.query(
      `
                SELECT id
                FROM usuarios
                WHERE id=?
            `,
      [idUser]
    );

    if (user.length === 0) {
      res.status(404).json({ message: "No existe el usuario" });
    }

    connect.release();

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = userExists;
