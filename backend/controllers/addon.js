const db = require("../models/DB");

exports.addAddon = (req, res, _) => {
    let query = `SELECT * FROM "ChoicesAddons" WHERE id_user = ?`;
    db.get(query, [req.auth.id_user], (error, result) => {
        if (!result) {
            query = `
                INSERT INTO ChoicesAddons(id_user, id_addon)
                VALUES (?, (SELECT id_addon FROM Addons WHERE title = ?))`;
            for (let i = 0; i < req.body.addons.length; i++) {
                db.run(query, [req.auth.id_user, req.body.addons[i].title], (error) => {
                    if (error) {
                        res.status(400).json({ error });
                    }
                });
            }
            res.status(200).json({ message: "Addons added successfully !" });
        } else {
            query = `DELETE FROM "ChoicesAddons" WHERE id_user = ?`;
            db.run(query, [req.auth.id_user], (error) => {
                if (error) {
                    res.status(400).json({ error });
                }
                query = `
                    INSERT INTO ChoicesAddons(id_user, id_addon)
                    VALUES (?, (SELECT id_addon FROM Addons WHERE title = ?))`;
                for (let i = 0; i < req.body.addons.length; i++) {
                    db.run(
                        query,
                        [req.auth.id_user, req.body.addons[i].title],
                        (error) => {
                            if (error) {
                                res.status(400).json({ error });
                            }
                        }
                    );
                }
                res.status(200).json({ message: "Addons updated successfully !" });
            });
        }
    });
};
