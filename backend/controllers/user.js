const db = require("../models/DB");

exports.createUser = (req, res, next) => {
    delete req.body.id;
    if (req.body) {
        const query = `
            INSERT INTO Users(name, email, tel, id_plan)
            VALUES (?, ?, ?, NULL)
        `;
        db.run(query, [req.body.name, req.body.email, req.body.tel], 
            (error) => {
                if (error) {
                    res.status(400).json({error});
                }
                res.status(201).json({message: "User informations saved successfully !"})
            }
        )
    }
}