const reachOut = require("./../Models/ReachOut");

const reachOutController = async (req, res) => {
  const { fullName, email, contactNumber, services, message } = req.body;

  const newMessage = await reachOut.create({
    fullName,
    email,
    contactNumber,
    services,
    message,
  });
  if (newMessage) {
    res.status(201).json({
      status: "Success",
      message: newMessage,
    });
  }
};

const fetchAllReachOuts = async (req, res) => {
  try {
    const data = await reachOut.find();
    res.status(200).json({
      status: "Success",
      message: "Internal Server Error",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAiled",
      message: "Internal Server Error",
    });
  }
};

module.exports = { reachOutController, fetchAllReachOuts };
