const express = require("express");
const app = express();
const PORT = 3000;

// === Configuration du moteur de vues ===
app.set("view engine", "ejs");

// === Middleware pour fichiers statiques ===
app.use(express.static("public"));

// === Middleware pour vérifier les heures de travail ===
const workingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay(); // 0 = dimanche, 6 = samedi
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.render("closed");
  }
};

app.use(workingHours);

// === Routes ===
app.get("/", (req, res) => res.render("home"));
app.get("/services", (req, res) => res.render("services"));
app.get("/contact", (req, res) => res.render("contact"));

// === Démarrage du serveur ===
app.listen(PORT, () => {
  console.log(`Connecté sur http://localhost:${PORT}`);
});
