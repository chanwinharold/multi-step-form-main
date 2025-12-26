const db = require("../models/DB");

exports.getSummary = (req, res, _) => {
    let query = `SELECT Periods.* FROM Periods INNER JOIN Users USING(id_period) WHERE id_user = ?`
    let summary = {}

    db.get(query, [req.auth.id_user], (error, result) => {
        if (error) res.status(500).json({ error });
        summary = {period : {...result}}

        query = `SELECT Plans.* FROM Plans INNER JOIN Users USING(id_plan) WHERE id_user = ?`
        db.get(query, [req.auth.id_user], (error, result) => {
            if (error) res.status(500).json({ error });
            summary = {...summary, plan : {...result}}

            query = `SELECT Addons.* FROM Addons INNER JOIN ChoicesAddons USING(id_addon) WHERE id_user = ?`
            db.all(query, [req.auth.id_user], (error, result) => {
                if (error) res.status(500).json({ error });
                summary = {...summary, addons : [...result]}
                res.json(summary);
            })
        })
    })
}