const db = require("../models/DB");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

exports.createUser = async (req, res, _) => {
    delete req.body.id;
    try {
        if (req.auth) {
            const { rows } = await db.execute({
                sql: `SELECT * FROM Users WHERE id_user = ?`,
                args: [req.auth.id_user]
            });

            if (rows.length === 0) {
                return res.clearCookie('token').status(401).json({ message: "An authentification Error occurred. Please Try again" });
            }

            await db.execute({
                sql: `UPDATE Users SET name = ?, email = ?, tel = ? WHERE id_user = ?`,
                args: [req.body.name, req.body.email, req.body.tel, req.auth.id_user]
            });
            res.status(200).json({ message: "User updated successfully !" });

        } else {
            await db.execute({
                sql: `INSERT INTO Users(name, email, tel, id_plan, id_period) VALUES (?, ?, ?, NULL, NULL)`,
                args: [req.body.name, req.body.email, req.body.tel]
            });

            const { rows } = await db.execute({
                sql: `SELECT id_user FROM Users WHERE email = ?`,
                args: [req.body.email]
            });

            const token = jwt.sign({ id_user: rows[0].id_user }, process.env.MY_SECRET_JWT || "JWT_SECRET_KEY");
            res.status(201).cookie("token", token, { httpOnly: true }).json({ message: "User added successfully !" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};