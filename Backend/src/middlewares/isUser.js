const getDB = require("../database/db");
const jwt = require("jsonwebtoken");

const isUser = async (req, res, next) => {
  try {
    const connect = await getDB();
    const authorization = req.headers["authorization"];

    if (!authorization)
      return res.status(401).json({ message: "Debes estar logueado" });

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET_TOKEN);
    } catch (error) {
      return res.status(401).json({ message: "Token no valido" });
    }
    req.userInfo = tokenInfo;

    connect.release();

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = isUser;
