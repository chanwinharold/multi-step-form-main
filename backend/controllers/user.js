const db = require("../models/DB");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

exports.createUser = (req, res, _) => {
    delete req.body.id;
    if (req.auth) {
        let query = `SELECT * FROM Users WHERE id_user = ?`;
        db.get(query, [req.auth.id_user], (error, result) => {
            if (error) {
                res.status(400).json({ error });
            }
            if (result) {
                query = `UPDATE Users SET name = ?, email = ?, tel = ? WHERE id_user = ?`;
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
            } else {
                res.clearCookie('token').status(401).json({message : "An authentification Error occurred. Please Try again"});
            }
        });
    } else {
        let query = `INSERT INTO Users(name, email, tel, id_plan, id_period) VALUES (?, ?, ?, NULL, NULL)`;
        db.run(query, [req.body.name, req.body.email, req.body.tel], (error) => {
            if (error) {
                res.status(400).json({ error });
            }
            query = `SELECT id_user FROM Users WHERE email = ?`;
            db.get(query, [req.body.email], (error, result) => {
                if (error) {
                    res.status(400).json({ error });
                }
                const token = jwt.sign({id_user: result.id_user}, process.env.MY_SECRET_JWT || "JWT_SECRET_KEY");
                res.status(201).cookie("token", token, { httpOnly: true }).json({ message: "User added successfully !" });
            });
        });
    }
};
