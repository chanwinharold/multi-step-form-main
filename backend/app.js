const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const planRoutes = require("./routes/plan");
const addonRoutes = require("./routes/addon");
const summaryRoutes = require("./routes/summary");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes, planRoutes, addonRoutes, summaryRoutes);

// Redirection avant le 404
app.use((req, res) => {
    res.redirect(`/api/user`);
});

app.use((_, res) => {
    res.status(404).json({message : "Routes Introuvables !"});
});

module.exports = app;