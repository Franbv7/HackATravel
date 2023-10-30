const jwt = require("jsonwebtoken");
const getDB = require("../database/db");

const authUser = async (req, res, next) => {
  const connect = await getDB();
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Falta cabecera de autenticación" });
    }

    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET_TOKEN);
    } catch {
      throw new error("Token incorrecto", 401);
    }

    req.userId = token.id;
  } catch (error) {
    next(error);
  } finally {
    if (connect) {
      connect.release();
    }
    next();
  }
};

module.exports = {
  authUser,
};
