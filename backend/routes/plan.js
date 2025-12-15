const express = require("express");
const router = express.Router()
const {addPlan} = require("../controllers/plan")
const auth = require("../middlewares/auth")

router.post("/plan", auth, addPlan);

module.exports = router;