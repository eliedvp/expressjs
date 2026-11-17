# TravelGo CI — site Express + EJS avec heures d'ouverture

Site vitrine d'une agence de voyage fictive (« TravelGo CI ») rendu côté serveur avec Express et EJS.
Un middleware personnalisé limite l'accès au site aux heures d'ouverture de l'agence.
Checkpoint réalisé dans le cadre de la formation développeur Full Stack GoMyCode.

## Fonctionnalités

- Trois pages rendues avec EJS et des partials communs (en-tête, pied de page) : Accueil, Services, Contact
- Middleware `workingHours` : le site n'est accessible que du **lundi au vendredi, de 9h à 17h** (heure locale du serveur) ; en dehors de ces horaires, une page « Agence fermée » est affichée
- Fichiers statiques (CSS, JavaScript) servis par Express
- Interactions côté client : barre de navigation au défilement, formulaires de recherche et de contact (démonstration, sans envoi côté serveur)

## Stack

- Node.js, Express 5
- EJS (moteur de vues)
- HTML, CSS, JavaScript

## Installation et lancement

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm start
```

Le site est disponible sur `http://localhost:3000` (port modifiable avec la variable d'environnement `PORT`).

## Routes

| Méthode | Route       | Page                 |
|---------|-------------|----------------------|
| GET     | `/`         | Accueil              |
| GET     | `/services` | Nos services         |
| GET     | `/contact`  | Contact              |

Hors des heures d'ouverture, chacune de ces routes affiche la page `closed`.

## Tests

```bash
npm test
```

Les tests du middleware d'horaires utilisent le lanceur intégré à Node.js (`node:test`) : horaires limites (8h59, 9h, 16h59, 17h), week-end, appel de `next()` ou rendu de la page `closed`.

## Structure

```
app.js                       # configuration Express et routes
middlewares/workingHours.js  # middleware des heures d'ouverture
views/                       # pages EJS et partials
public/                      # CSS et JavaScript côté client
tests/                       # tests du middleware
```
