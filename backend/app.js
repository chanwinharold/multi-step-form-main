const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const planRoutes = require("./routes/plan");
const addonRoutes = require("./routes/addon")

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", userRoutes, planRoutes, addonRoutes);

app.use((_, res) => {
    res.status(404).json({message : "Routes Introuvables !"});
});

module.exports = app;