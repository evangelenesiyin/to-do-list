import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import debugLib from "debug";
import sendResponse from "../config/sendResponseHelper.js";

const debug = debugLib("procuratio:controllers:usersCtrl");

export async function create(req, res) {
  try {
    const newUser = await User.create(req.body);
    debug("created new user: %o", req.body);
    const token = createJWT(newUser);
    sendResponse(res, 201, { token });
  } catch (err) {
    debug("Error creating: %o", err);

    let status = 500;
    let message = "Internal Server Error";

    if (err.name === "ValidationError") {
      if (err.errors.password.kind === "minlength") {
        status = 400;
        message = "Password is too short. Please input at least 8 characters";
      }
    }
    if (err.code === 11000 && err.keyValue.username) {
      status = 409;
      message = "Username already exists.";
    } else if (err.code === 11000 && err.keyValue.email) {
      status = 409;
      message = "Email already exists.";
    }

    sendResponse(res, status, null, message);
  }
}

export async function login(req, res) {
  debug("login user body: %o", req.body);
  try {
    const user = await User.findOne({ username: req.body.username });
    debug("user", user);
    if (!user) throw new Error("User does not exist.");
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Incorrect password.");
    const token = createJWT(user);
    sendResponse(res, 200, { token });
  } catch (err) {
    debug("Error logging in: %o", err);
    let status = 401;
    let message = "Unauthorized";

    if (err.message === "User does not exist.") {
      status = 404;
    }
    if (err.message === "Incorrect password.") {
      status = 401;
    }
    sendResponse(res, status, null, message);
  }
}

//* ===== Helper Functions ===== *//

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}
