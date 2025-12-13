const express = require("express");
const router = express.Router()
const {addPlan} = require("../controllers/plan")

router.post("/plan", addPlan);

module.exports = router;