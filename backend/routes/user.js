const express = require("express");
const router = express.Router();
const {createUser} = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/", auth, createUser);

module.exports = router;