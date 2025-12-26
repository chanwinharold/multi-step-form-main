const express = require('express');
const router = express.Router();
const {getSummary} = require("../controllers/summary")
const auth = require("../middlewares/auth")

router.get('/summary', auth, getSummary)

module.exports = router;