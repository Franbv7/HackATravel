const getDB = require("../../database/db");
const savePhoto = require("../../service/savePhoto");

const updateUser = async (req, res) => {
  const connect = await getDB();
  try {
    const { idUser } = req.params;
    const { nuevoNombre } = req.body;

    if (req.userInfo.id !== parseInt(idUser) && req.userInfo.role !== "admin") {
      return res
        .status(401)
        .send("No tiene permisos para modificar este usuario");
    }

    // Actualizar el nombre de usuario en la base de datos
    await connect.query(
      `UPDATE usuarios
       SET nombre=?
       WHERE id=?`,
      [nuevoNombre, idUser]
    );

    if (req.files && req.files.avatar) {
      const userAvatar = await savePhoto(req.files.avatar, "/avatarUser");

      await connect.query(
        `UPDATE usuarios
         SET avatar=?
         WHERE id=?`,
        [userAvatar, idUser]
      );
    }

    res.status(200).send({
      status: "OK",
      message: "Usuario modificado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Error",
      message: "Error al modificar el usuario",
    });
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = updateUser;
