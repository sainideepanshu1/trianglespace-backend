const express = require("express");
const { register, fetchAllGrowWithUs } = require("../Controllers/register");
const {
  reachOutController,
  fetchAllReachOuts,
} = require("../Controllers/ReachOut");
const authenticateToken = require("../Middleware/tokenValidation");
const router = express.Router();

router.post("/grow-with-us", register);
router.get("/grow-with-us/getAll", authenticateToken, fetchAllGrowWithUs);
router.post("/reach-out", reachOutController);
router.get("/reach-out/getAll", authenticateToken, fetchAllReachOuts);

module.exports = router;
