const User = require("../Models/User-Model");
const bcrypt = require("bcryptjs");

exports.loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "Invalid Username or Password",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(404).json({
        status: "Failed",
        message: "Invalid Username or Password",
      });
    }

    const token = user.generateToken();

    res.status(200).json({
      status: "Success",
      message: "Login Successful",
      user:user.username,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error!!",
    });
  }
};

exports.registerController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        status: "Failed",
        message: "Username is already taken",
      });
    }

    const newUser = await User.create({
      username,
      password,
    });

    res.status(201).json({
      status: "Success",
      message: "Registration Successful",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};
