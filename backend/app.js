const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
const planRoutes = require("./routes/plan");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", planRoutes);

app.use((_, res) => {
    res.status(404).json({message : "Routes Introuvables !"});
});

module.exports = app;