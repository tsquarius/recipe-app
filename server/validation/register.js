const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateRegisterData(data) {
  data.email = validText(data.email) ? data.email : "";
  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    return { message: "Email entered is not valid", isValid: false };
  }

  if (Validator.isEmpty(data.email)) {
    return { message: "Email is required", isValid: false };
  }

  if (Validator.isEmpty(data.username)) {
    return { message: "Username is required", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password is required", isValid: false };
  }

  if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
    return {
      message: "Password length needs to be between 8 and 32 characters",
      isValid: false
    };
  }

  return {
    message: "",
    isValid: true
  };
};
