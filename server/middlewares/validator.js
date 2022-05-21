const { body, validationResult } = require("express-validator");

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const userNameRegex = /^[A-Za-z]\w{5,29}$/i;
const nickNameRegex = /^[\w\d]{5,30}$/i;

const registerValidator = [
  body(["nickName", "userName", "password", "confirmPassword"], {
    success: false,
    message: "Something is missing, please try again",
  }).exists({
    checkFalsy: true,
    checkNull: true,
  }),

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
    })
    .matches(userNameRegex)
    .withMessage({
      success: false,
      message: "userName or password is incorrect",
    }),
  body("password")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage({
      success: false,
      message: "Something is missing, please try again",
    })
    .matches(passwordRegex)
    .withMessage({
      success: false,
      message: "userName or password is incorrect",
    }),
];

function requestValidator(req, res, next) {
  console.log(req.body);
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
