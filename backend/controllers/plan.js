const db = require("../models/DB");

exports.addPlan = async (req, res, _) => {
    const query_1 = `
        UPDATE Users
        SET id_plan = (
            SELECT id_plan
            FROM Plans
            WHERE title = ?
        )
        WHERE id_user = ?
    `;
    const query_2 = `
        UPDATE Users
        SET id_period = (
            SELECT id_period
            FROM Periods
            WHERE name = ?
        )
        WHERE id_user = ?
    `;

    try {
        await db.execute({ sql: query_1, args: [req.body.plan_option.title, req.auth.id_user] });
        await db.execute({ sql: query_2, args: [req.body.period_billing, req.auth.id_user] });
        res.status(201).json({ message: "Plan added successfully !" });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.showPlans = async (req, res, _) => {
    try {
        const { rows } = await db.execute(`SELECT * FROM Plans`);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error });
    }
};