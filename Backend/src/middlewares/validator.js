const { body } = require("express-validator");

const validator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("El name es requerido")
      .isLength({ max: 15 })
      .withMessage("Como máximo 15 caracteres"),

    body("mail")
      .trim()
      .notEmpty()
      .withMessage("El mail es requerido")
      .isEmail()
      .withMessage("Debe poner un mail válido"),

    body("pwd")
      .trim()
      .notEmpty()
      .withMessage("Contraseña es requerida")
      .isLength({ min: 6 })
      .withMessage("Contraseña inválida: min 6 caracteres"),
  ];
};

module.exports = validator;
