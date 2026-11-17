// Ouvert du lundi au vendredi, de 9h à 17h (heure locale du serveur)
const isWorkingTime = (date) => {
  const day = date.getDay(); // 0 = dimanche, 6 = samedi
  const hour = date.getHours();

  return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
};

// === Middleware pour vérifier les heures de travail ===
// `now` est injectable pour pouvoir tester le middleware à une date donnée.
const workingHours = (now = () => new Date()) => (req, res, next) => {
  if (isWorkingTime(now())) {
    next();
  } else {
    res.render("closed");
  }
};

module.exports = { isWorkingTime, workingHours };
