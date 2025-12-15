const db = require("../models/DB");

exports.addAddon = (req, res, next) => {
    const query = (`
        INSERT INTO ChoicesAddons(id_user, id_addon)
        VALUES (?, (SELECT id_addon FROM Addons WHERE title = ?));
    `)
    for (let i = 0; i < req.body.addons.length; i++) {
        db.run(query, [req.auth.id_user, req.body.addons[i].title], 
            (error) => {
                if (error) {
                    res.status(400).json({error})
                }
            }
        )
    }
    res.status(200).json({message : "Addons added successfully !"});
}