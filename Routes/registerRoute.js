const express = require("express");
const { register } = require("../Controllers/register");
const { reachOutController } = require("../Controllers/ReachOut");
const router = express.Router();

router.post("/grow-with-us", register);
router.post("/reach-out", reachOutController);

module.exports = router;
