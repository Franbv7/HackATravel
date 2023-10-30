const getDB = require("../database/db");
const jwt = require("jsonwebtoken");

const userLogged = async (req, res, next) => {
  let connect;

  try {
    connect = await getDB();
    const authorization = req.headers["authorization"];

    if (!authorization)
      return res
        .status(401)
        .json({ message: "Falta la cabecera autorización" });

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET_TOKEN);
    } catch (error) {
      return res.status(401).json({ message: "Token no válido" });
    }

    req.userInfo = tokenInfo;
  } catch (error) {
    console.log(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
  next();
};

module.exports = userLogged;
