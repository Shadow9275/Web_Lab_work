const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "efrei",
    database: "my_database",
});
db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err.message);
        return;
    }
    console.log("Connecté à la base de données MySQL");
});

app.post("/add", (req, res) => {
    const { name, email } = req.body;
    const query = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(query, [name, email], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: "Utilisateur ajouté avec succès", id: result.insertId });
    });
});

app.get("/records", (req, res) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(results);
    });
});

app.get("/record/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return;
        }
        res.status(200).json(result[0]);
    });
});

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    db.query(query, [name, email, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return;
        }
        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return;
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
