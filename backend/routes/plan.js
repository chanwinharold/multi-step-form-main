const express = require("express");
const router = express.Router()
const {addPlan, showPlans} = require("../controllers/plan")
const auth = require("../middlewares/auth")

router.post("/plan", auth, addPlan);
router.get("/plan", showPlans);

module.exports = router;