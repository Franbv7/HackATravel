const express = require("express");
const morgan = require("morgan");
const createDB = require("./database/index");
const fileupload = require("express-fileupload");
const path = require("path");
const createStaticDir = require("../src/service/createStaticDir");
const cors = require("cors");
import { PORT } from "../index.js";

const userRouter = require("../src/router/userRouter");
const entriesRouter = require("../src/router/entriesRouter");

const server = express();

server.use(cors());

server.use(express.json());
server.use(morgan("dev"));
server.use(fileupload());

const staticDir = path.join(__dirname, "uploads");

server.use("/uploads", express.static(staticDir));

createStaticDir(staticDir);

server.get("/", (req, res) => {
  res.send("<h3>Hello World</h3>");
});

server.use(userRouter);
server.use(entriesRouter);

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

server.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
