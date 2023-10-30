const getDB = require("./db");
require("dotenv").config();

async function createDB() {
  let connection;
  const DATABASE = process.env.DATABASE;
  try {
    connection = await getDB();

    // await connection.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE}`);

    await connection.query(`USE ${DATABASE}`);

    console.log("Base de datos creada");

    await connection.query(`
    CREATE TABLE IF NOT EXISTS usuarios(
      id INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(100) NOT NULL UNIQUE,
      contraseña VARCHAR(512) NOT NULL,
      nombre VARCHAR(255),
      avatar VARCHAR(100),
      fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
      active BOOLEAN DEFAULT FALSE,
      role ENUM("admin","normal") DEFAULT "normal" NOT NULL
    );
    `);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS recomendaciones(
        id INT PRIMARY KEY AUTO_INCREMENT,
        titulo VARCHAR(255) NOT NULL,
        categoria VARCHAR (100) NOT NULL,
        lugar VARCHAR(100) NOT NULL,
        entradilla VARCHAR(255) NOT NULL,
        texto VARCHAR(500) NOT NULL,
        foto VARCHAR(100),
        user_id INTEGER NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE
    )
    `);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS votos(
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        recomendacion_id INT NOT NULL,
        votos INT NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE,
        FOREIGN KEY (recomendacion_id) REFERENCES recomendaciones (id) ON DELETE CASCADE
    );
    `);
    await connection.query(`
    CREATE TABLE IF NOT EXISTS comentarios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        recomendacion_id INT NOT NULL,
        comentarios VARCHAR(500) NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE,
        FOREIGN KEY (recomendacion_id) REFERENCES recomendaciones (id) ON DELETE CASCADE
    )
    `);
  } catch (e) {
    console.log("Hubo un error:", e.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = createDB();
