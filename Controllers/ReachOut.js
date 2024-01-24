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

module.exports = { reachOutController };
