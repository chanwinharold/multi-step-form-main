const jwt = require("jsonwebtoken");
require("dotenv").config({path: "../.env"});

module.exports = (req, res, next) => {
    try {
        if (req.cookies && req.cookies.token) {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, process.env.MY_SECRET_JWT || 'JWT_SECRET_KEY');
            req.auth = { id_user: decodedToken.id_user }; // Attention au nom du champ dans le payload du JWT
            next();
        } else {
            req.auth = null;
            next();
        }
    } catch (error) {
        req.auth = null;
        console.log(error)
        next();
    }
}