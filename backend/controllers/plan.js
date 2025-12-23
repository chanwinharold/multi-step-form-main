const db = require("../models/DB");

exports.addPlan = (req, res, _) => {
    const query_1 = `
        UPDATE Users
        SET id_plan = (
            SELECT id_plan
            FROM Plans
            WHERE title = ?
        )
        WHERE id_user = ?
    `;
    const query_2 = (`
        UPDATE Users
        SET id_period = (
            SELECT id_period
            FROM Periods
            WHERE name = ?
        )
        WHERE id_user = ?
    `)

    db.run(query_1, [req.body.plan_option.title, req.auth.id_user], 
        (error) => {
            if (error) res.status(400).json({error});
            db.run(query_2, [req.body.period_billing, req.auth.id_user],
                (error) => {
                  if (error) res.status(400).json({ error });
                  res.status(201).json({message : "Plan added successfully !"});
                }
            );
        }
    );
};


exports.showPlans = (req, res, _) => {
    const query = `SELECT * FROM Plans`;
    db.all(query, (error, result) => {
        if (error) res.status(500).json({ error });
        res.status(200).json(result);
    })
}