# TODO App 📝

Une application de gestion de tâches (TODO) développée dans le cadre du projet Scalingo.  
Elle permet d'ajouter et de supprimer des tâches via une interface web simple, avec une API Express en backend.

---

## 👨‍💻 Développeurs

- **Paul-Elie**
- **Yves**

---

## 🛠️ Stack technique

| Couche | Technologie |
|--------|-------------|
| Backend | Node.js + Express |
| Frontend | HTML / CSS / JavaScript vanilla |
| Déploiement | Scalingo |
| Versionning | Git + GitHub |

---

## 🚀 Installation et lancement en local

### Prérequis
- Node.js installé sur votre machine
- Git

### Étapes

```bash
# 1. Cloner le projet
git clone https://github.com/pauloo10-ynov/todo-app-scalingo.git
cd todo-app-scalingo

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur en mode développement
npm run dev
```

L'application est accessible sur : [http://localhost:3000](http://localhost:3000)

---

## 🌍 Déploiements

| Environnement | URL |
|---------------|-----|
| Staging | https://todo-app-paul-yves-staging.osc-fr1.scalingo.io |
| Production | https://todo-app-paul-yves-prod.osc-fr1.scalingo.io |

---

## 📡 Endpoints API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/` | Statut du serveur |
| GET | `/api/health` | Santé de l'API |
| GET | `/api/tasks` | Liste des tâches |

---

## 🔧 Commandes principales

```bash
# Lancer en développement (avec rechargement automatique)
npm run dev

# Déployer sur staging
git push staging Paul-Elie:main

# Déployer sur production
git push production Paul-Elie:main

# Voir les logs staging
scalingo --app todo-app-paul-yves-staging logs -f

# Voir les logs production
scalingo --app todo-app-paul-yves-prod logs -f
```

---

> 💡 *"Un README c'est pour les autres — ou pour vous dans 3 mois."*