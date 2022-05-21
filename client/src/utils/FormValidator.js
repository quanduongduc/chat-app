export function userNameValidate(userName) {
  const message = {
    isValid: true,
    message: "",
  };
  if (!userName) {
    return {
      isValid: false,
      message: "userName is required",
    };
  }
  const userNameRegex = /^[A-Za-z]\w{5,29}$/i;
  if (!userNameRegex.test(userName)) {
    return {
      isValid: false,
      message: "userName is not valid",
      rules: [
        "Use at least 6 and maximum 30 characters",
        "First character must not be numeric",
      ],
    };
  }
  return message;
}

export function nickNameValidate(nickName) {
  const message = {
    isValid: true,
    message: "",
  };
  if (!nickName) {
    return {
      isValid: false,
      message: "NickName is required",
    };
  }
  const nickNameRegex = /^[\w\d]{5,30}$/i;
  if (!nickNameRegex.test(nickName)) {
    return {
      isValid: false,
      message: "NickName is not valid",
      rules: [
        "Use at least 5 and maximum 30 characters",
        "Special characters are not allowed",
      ],
    };
  }
  return message;
}

export function passwordValidate(password) {
  const message = {
    isValid: true,
    message: "",
  };
  if (!password) {
    return {
      isValid: false,
      message: "Password is required",
    };
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message: "password is not valid",
      rules: [
        "Use at least eight characters",
        "Use at least one number",
        "Use both lower and uppercase letters",
      ],
    };
  }
  return message;
}

export function confirmPasswordValidate(confirmPassword, password) {
  if (!confirmPassword) {
    return { isValid: false, message: "Password confirmation is required" };
  }
  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: "Passwords do not match",
    };
  } else {
    return {
      isValid: true,
    };
  }
}
