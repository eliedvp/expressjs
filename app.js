const path = require("path");
const express = require("express");
const { workingHours } = require("./middlewares/workingHours");

const app = express();
const PORT = process.env.PORT || 3000;

// === Configuration du moteur de vues ===
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// === Middleware pour fichiers statiques ===
app.use(express.static(path.join(__dirname, "public")));

// === Middleware pour vérifier les heures de travail ===
app.use(workingHours());

// === Routes ===
app.get("/", (req, res) => res.render("home"));
app.get("/services", (req, res) => res.render("services"));
app.get("/contact", (req, res) => res.render("contact"));

module.exports = app;

// === Démarrage du serveur (uniquement en exécution directe) ===
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Connecté sur http://localhost:${PORT}`);
  });
}
