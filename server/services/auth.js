const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");
const uuid = require("uuid/v4");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);
    if (!isValid) {
      throw Error(message);
    }

    const { username, email, password } = data;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        username,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();

    const token = jwt.sign({ id: user._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  try {
    const user = await User.findById(data._id);
    if (!user) throw new Error("This user does not exist");

    const token = "";
    return { token, loggedIn: false, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);
    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("This user does not exist");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid password entered");
    }

    const token = jwt.sign({ id: user._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const verifyUser = async data => {
  try {
    const { token } = data;
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;
    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};

const facebookAuth = async data => {
  try {
    const { facebookId, username, email } = data;
    const user = await User.findOne({ facebookId });

    //check if the user has logged in before
    // if not, create a new account
    let token;
    if (!user) {
      const password = uuid();
      const newUser = new User(
        {
          username,
          email,
          facebookId,
          password
        },
        err => {
          if (err) throw err;
        }
      );

      newUser.save();

      token = jwt.sign({ id: newUser._id }, keys.secretOrKey);
      return { token, loggedIn: true, ...newUser._doc, password: null };
    } else {
      token = jwt.sign({ id: user._id }, keys.secretOrKey);
      return { token, loggedIn: true, ...user._doc, password: null };
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { register, logout, login, verifyUser, facebookAuth };
