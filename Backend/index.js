const server = require("./src/app");

const PORT = process.env.PORT || 3001;

process.on("uncaughtException", function (err) {
  console.log(err);
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
