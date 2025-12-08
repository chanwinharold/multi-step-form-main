const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors);
app.use(express.json());

app.use((req, res, _) => {
    res.end("Application en cours !");
})

module.exports = app;