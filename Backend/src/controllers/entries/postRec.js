const getDB = require("../../database/db");
const savePhoto = require("../../service/savePhoto");

const postRecomendation = async (req, res) => {
  const connect = await getDB();
  try {
    const { title, category, place, intro, text } = req.body;
    const { id } = req.userInfo;

    if (!title || !category || !place || !intro || !text) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    let photoName = null;
    if (!req.files || !req.files.photo) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    photoName = await savePhoto(req.files.photo, "/recPhoto");
    if (!photoName) {
      return res.status(400).json({ message: "Error al guardar la foto" });
    }

    const [result] = await connect.query(
      `INSERT INTO recomendaciones (titulo, categoria, lugar, entradilla, texto, foto, user_id)
      VALUES (?,?,?,?,?,?,?)`,
      [title, category, place, intro, text, photoName, id]
    );

    res.status(200).send({
      status: "OK",
      message: "Recomendación creada correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la recomendación" });
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = postRecomendation;
