const express = require("express");
const router = express.Router();
const {addAddon} = require("../controllers/addon");
const auth = require("../middlewares/auth")

router.post("/addon", auth, addAddon);

module.exports = router;