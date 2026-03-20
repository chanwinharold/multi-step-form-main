const db = require("../models/DB");

const handleAddons = async (req, res) => {
    const query = `
        INSERT INTO ChoicesAddons(id_user, id_addon)
        VALUES (?, (SELECT id_addon FROM Addons WHERE title = ?))`;
    try {
        for (let i = 0; i < req.body.addons.length; i++) {
            await db.execute({
                sql: query,
                args: [req.auth.id_user, req.body.addons[i].title]
            });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.addAddon = async (req, res, _) => {
    try {
        let query = `SELECT * FROM ChoicesAddons WHERE id_user = ?`;
        const { rows } = await db.execute({ sql: query, args: [req.auth.id_user] });

        if (rows.length === 0) {
            await handleAddons(req, res);
            res.status(200).json({ message: "Addons added successfully !" });
        } else {
            query = `DELETE FROM ChoicesAddons WHERE id_user = ?`;
            await db.execute({ sql: query, args: [req.auth.id_user] });
            await handleAddons(req, res);
            res.status(200).json({ message: "Addons updated successfully !" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.showAddons = async (req, res, _) => {
    try {
        const { rows: addons } = await db.execute(`SELECT * FROM Addons`);
        const { rows: periods } = await db.execute({
            sql: `SELECT Periods.name FROM Periods INNER JOIN Users USING(id_period) WHERE Users.id_user = ?`,
            args: [req.auth.id_user]
        });
        res.status(200).json([addons, periods[0].name]);
    } catch (error) {
        res.status(500).json({ error });
    }
};