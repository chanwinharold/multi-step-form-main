const db = require("../models/DB");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

exports.createUser = (req, res, next) => {
  delete req.body.id;
  if (!req.auth) {
    let query = `
		INSERT INTO Users(name, email, tel, id_plan, id_period)
		VALUES (?, ?, ?, NULL, NULL)`;
    db.run(query, [req.body.name, req.body.email, req.body.tel], (error) => {
      if (error) {
        res.status(400).json({ error });
      }

      query = `SELECT id_user FROM Users WHERE email = ?`;
      db.get(query, [req.body.email], (error, result) => {
        if (error) {
          res.status(400).json({ error });
        }
        const token = jwt.sign(result.id_user, process.env.MY_SECRET_JWT);
        res
          .status(201)
          .cookie("token", token, { httpOnly: true })
          .json({ message: "User added successfully !" });
      });
    });
  } else {
    let query = `SELECT * FROM Users WHERE id_user = ?`;
    db.get(query, [req.auth.id_user], (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      if (!result) {
        res.status(401).json({ message: "Authentification Issue !" });
      } else {
        query = `
				UPDATE Users SET name = ?, email = ?, tel = ? WHERE id_user = ?
			`;
        db.run(
          query,
          [req.body.name, req.body.email, req.body.tel, req.auth.id_user],
          (error) => {
            if (error) {
              res.status(400).json({ error });
            }
            res.status(200).json({message : "User updated successfully !"})
          }
        );
      }
    });
  }
};
