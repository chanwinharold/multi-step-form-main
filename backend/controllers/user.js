const db = require("../models/DB");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: "../.env"});

exports.createUser = (req, res, next) => {
  delete req.body.id;
  let query = `
            INSERT INTO Users(name, email, tel, id_plan, id_period)
            VALUES (?, ?, ?, NULL, NULL)
        `;
  db.run(query, [req.body.name, req.body.email, req.body.tel], (error) => {
    if (error) {
      res.status(400).json({ error });
    }

    query = `SELECT id_user FROM Users WHERE email = ?`
    db.get(query, [req.body.email], 
      (error, result) => {
        if (error) {
          res.status(400).json({ error });
        }
        const token = jwt.sign(result.id_user, process.env.MY_SECRET_JWT);
        res.status(201).cookie("token", token, {httpOnly: true}).json({message : "User added successfully !"});
      }
    )
  });
};
