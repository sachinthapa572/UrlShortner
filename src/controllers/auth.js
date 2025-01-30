import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { expressjwt } from "express-jwt";
import { validateRegisterInput, validateLoginInput } from "../validation/authValidation.js";

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const validationError = validateRegisterInput(req.body);
    if (validationError) return res.status(400).json(validationError);

    const { username, email, password } = req.body;

    //check if user email already exists
    let userExist = await userModel.findOne({ email: email });
    if (userExist) return res.status(400).json("Email already exists");

    //check if username already exists
    let userNameExist = await userModel.findOne({ username: username });
    if (userNameExist) return res.status(400).send("Username already taken");

    //register user
    const user = new userModel(req.body);

    //hash password and save user
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash;
        const userDetails = await user.save();
        return res.json({ ok: true, data: userDetails });
      });
    });
  } catch (err) {
    console.log("userModel registration failed", err);
    return res.status(400).send("Error. Try again later or contact support");
  }
};

const requireSignin = expressjwt({
  secret: JWT_SECRET || "secret",
  algorithms: ["HS256"],
  userProperty: "auth",
  onError: (err, req, res, next) => {
    return res.status(401).send("Unauthorized - Invalid token");
  },
});

const login = async (req, res) => {
  const validationError = validateLoginInput(req.body);
  if (validationError) return res.status(400).send(validationError);

  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email }).populate("last_shortened");
    if (!user) return res.status(400).send("userModel with that email does not exist");

    //match password
    bcrypt.compare(password, user.password, function (err, match) {
      if (!match || err) {
        return res.status(400).send("Password is incorrect");
      }
      console.log("password match", match);
      //Generate jwt signed token and send as reponse to client
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.header("Authorization", `Bearer ${token}`);

      return res.json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          urls: user.urls,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          last_shortened: user.last_shortened,
        },
      });
    });
  } catch (err) {
    console.log("Login Error", err);
    res.status(400).send("Login failed. try again");
  }
};

export { register, login, requireSignin };
