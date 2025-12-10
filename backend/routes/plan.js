const express = require("express");
const router = express.Router()
const {createPlan} = require("../controllers/plan")

router.post("/plan", createPlan);

module.exports = router;