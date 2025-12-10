const sqlite = require("sqlite3");

const db = new sqlite.Database("./models/DB.db",
    (error) => {
        if (error) {
            console.log("​❌ Connexion to Database failed");
        } else {
            console.log("✅ Connexion to Database succeeded");
        }
    }
);

module.exports = db;
