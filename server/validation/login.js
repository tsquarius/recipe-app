const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateLoginInput(data) {
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    return { message: "Email is invalid", isValid: false };
  }

  if (Validator.isEmpty(data.email)) {
    return { message: "Email is required", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password is required", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};