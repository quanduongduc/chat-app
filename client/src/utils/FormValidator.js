export function userNameValidate(userName, type) {
  const message = {
    isValid: true,
    message: "",
  };
  if (!userName) {
    return {
      isValid: false,
      message: "userName is required",
      type,
    };
  }
  const userNameRegex = /^[A-Za-z][\w{5, 29}]*$/i;
  console.log(userNameRegex.test(userName));
  if (!userNameRegex.test(userName)) {
    return {
      isValid: false,
      message: "userName is not valid",
      rules: [
        "Use at least five and maximum 30 characters",
        "First character must not be numeric",
      ],
    };
  }
  return message;
}

export function nickNameValidate(nickName, type) {
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
  return message;
}

export function passwordValidate(password, type) {
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

export function confirmPasswordValidate(password, confirmPassword) {
  if (confirmPassword) {
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
