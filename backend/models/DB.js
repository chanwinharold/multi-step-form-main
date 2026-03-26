const { createClient } = require("@libsql/client");

const db = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_TOKEN
});

const testConnection = async () => {
    try {
        await db.execute("SELECT 1");
        console.log("✅ Base de données connectée");
    } catch (error) {
        console.error("❌ Erreur de connexion à la base de données :", error.message);
        process.exit(1); // Arrête le serveur si la DB est inaccessible
    }
};

testConnection();

module.exports = db;