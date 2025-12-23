const express = require("express");
const router = express.Router();
const {addAddon, showAddons} = require("../controllers/addon");
const auth = require("../middlewares/auth")

router.post("/addon", auth, addAddon);
router.get("/addon", auth, showAddons);

module.exports = router;