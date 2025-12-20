const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
      if (req.cookies.token !== undefined) {
        const token = req.cookies.token;
        const userID = jwt.verify(token, process.env.MY_SECRET_JWT);
        req.auth = { id_user: userID };
        next();
      } else {
        req.auth = undefined;
        next();
      }
    } catch (error) {
      res.status(500).json({ error });
    }
}