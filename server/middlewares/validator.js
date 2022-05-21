const { body, validationResult } = require("express-validator");

const registerValidator = [
  body()
    .custom((value) => {
      const fields = Object.keys(value);
      if (!fields.length) {
        return false;
      }
      fields.forEach((field) => {
        if (
          !body(field).exists({
            checkFalsy: true,
            checkNull: true,
          })
        ) {
          return false;
        }
      });
      return true;
    })
    .withMessage({
      success: false,
      message: "Something is missing, please try again",
    }),

  body("nickName", {
    success: false,
    message: "NickName is not valid",
  })
    .exists()
    .isLength({ min: 5, max: 30 })
    .matches(/^[\w\d]{5,30}$/i),

  body("userName", {
    success: false,
    message: "UserName is not valid",
  })
    .isLength({ min: 5, max: 30 })
    .matches(/^[A-Za-z]\w{5,29}$/i),

  body("password", {
    success: false,
    message: "Password is not valid",
  })
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),

  body("confirmPassword", {
    success: false,
    message: "Password confirmation does not match password",
  }).custom((value, { req }) => {
    if (value !== req.body.password) {
      return false;
    }
    return true;
  }),
];

const loginValidator = [
  body("userName")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage({
      success: false,
      message: "Something is missing, please try again",
    }),
  body("password")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage({
      success: false,
      message: "Something is missing, please try again",
    }),
];

function requestValidator(req, res, next) {
  const errors = validationResult(req).array({ onlyFirstError: true });
  if (errors.length) {
    return res.status(401).json(errors[0].msg);
  }
  next();
}

module.exports = {
  registerValidator,
  loginValidator,
  requestValidator,
};
