const GrowWithUs = require("./../Models/Register");

const register = async (req, res) => {
  try {
    const { fullName, email, contactNumber } = req.body;

    // Check for existing email
    const isExisting = await GrowWithUs.findOne({ email: email });
    if (isExisting) {
      console.log("Email already exists:", email);
      return res.status(400).json({
        status: "Failed",
        message: "Email Already Exists!!",
      });
    }

    // Create a new user
    const user = await GrowWithUs.create({
      fullName,
      email,
      contactNumber,
    });

    if (user) {
      console.log("User registered successfully:", user);
      return res.status(201).json({
        status: "Success",
        message: "Registered!!",
        user,
      });
    } else {
      return res.status(500).json({
        status: "Failed",
        message: "Registration failed. Please try again.",
      });
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else if (error.request) {
      alert("No response received. Please try again.");
    } else {
      alert("Error occurred during the request setup. Please try again.");
    }
  }
};

const fetchAllGrowWithUs = async (req, res) => {
  try {
    const data = await GrowWithUs.find();
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAiled",
      message: "Internal Server Error",
    });
  }
};


module.exports = { register,fetchAllGrowWithUs };
