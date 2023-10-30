const express = require("express");

const router = express.Router();

const userLogged = require("../middlewares/userLogged");

const { createUser, loginUser, updateUser } = require("../controllers/users");
const getUser = require("../controllers/users/getUser");
const isUser = require("../middlewares/isUser");
const userExists = require("../middlewares/userExists");
const { authUser } = require("../middlewares/auth");
const getMeController = require("../controllers/users/getMe");
const getUserRecsController = require("../controllers/users/getUserRecsController");

router.post("/registro", createUser);
router.post("/usuarios/login", loginUser);
router.get("/usuarios/:idUser/recs", isUser, userExists, getUserRecsController);
router.get("/usuarios", authUser, getMeController);
router.get("/usuarios/:idUser", isUser, userExists, getUser);

router.put("/usuarios/:idUser", userLogged, updateUser);

module.exports = router;
