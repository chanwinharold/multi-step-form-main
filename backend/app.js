const express = require("express");
const cors = require("cors");
const sqlite = require("sqlite3");

const app = express();


app.use(cors());
app.use(express.json());

app.use((req, res) => {
    res.json({message : "Application en cours !"});
});

module.exports = app;