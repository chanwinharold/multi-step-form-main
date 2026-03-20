const db = require("../models/DB");

exports.getSummary = async (req, res, _) => {
    try {
        const { rows: period } = await db.execute({
            sql: `SELECT Periods.* FROM Periods INNER JOIN Users USING(id_period) WHERE id_user = ?`,
            args: [req.auth.id_user]
        });

        const { rows: plan } = await db.execute({
            sql: `SELECT Plans.* FROM Plans INNER JOIN Users USING(id_plan) WHERE id_user = ?`,
            args: [req.auth.id_user]
        });

        const { rows: addons } = await db.execute({
            sql: `SELECT Addons.* FROM Addons INNER JOIN ChoicesAddons USING(id_addon) WHERE id_user = ?`,
            args: [req.auth.id_user]
        });

        res.json({
            period: { ...period[0] },
            plan: { ...plan[0] },
            addons: [...addons]
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};