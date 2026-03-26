require("dotenv").config();
const http = require("http");
const app = require("./app");
const db = require("./models/DB")

const PORT = process.env.PORT || 3000;
const server= http.createServer(app);
server.listen(PORT, async () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});