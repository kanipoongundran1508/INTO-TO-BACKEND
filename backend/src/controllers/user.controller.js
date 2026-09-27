import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // basic validation

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required!!" });
    }

    // check user exists

    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(400).json({ message: "user already exists!" });
    }

    // create user

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User register Successfull",
      user: {
        id: user._id,
        email: user.email,
        usernmae: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Sorry for inconvience, It Internal Error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // check user already exist?

    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    // password should match

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      return res.status(400).json({
        message: "invalid credentials",
      });

    res.status(200).json({
      message: "Login Successfull",

      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user)
      return res.status(404).json({
        message: "user not found",
      });

    res.status(200).json({
      message: "Logout Successfull",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
export { registerUser, loginUser, logoutUser };
