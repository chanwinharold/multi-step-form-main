const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.token
    const userID = jwt.verify(token, process.env.MY_SECRET_JWT)
    req.auth = {id_user : userID};
    next()
}