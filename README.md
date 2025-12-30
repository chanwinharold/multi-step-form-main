# Multi-Step Form Project

Un formulaire multi-étapes moderne et performant avec une architecture découplée : un frontend React réactif et un backend Node.js robuste utilisant SQLite.

## 🚀 Technologies Utilisées

### Frontend
- **React 19** & **Vite** : Interface utilisateur et tooling moderne.
- **Tailwind CSS 4** & **DaisyUI 5** : Système de design utilitaire et composants UI.
- **React Router 7** : Gestion fluide de la navigation entre les étapes.
- **Axios** : Communication avec l'API backend.

### Backend
- **Node.js** & **Express 5** : Serveur d'API.
- **SQLite 3** : Base de données relationnelle légère et efficace (stockée localement dans `/models/DB.db`).
- **JSON Web Token (JWT)** & **Cookie-parser** : Gestion sécurisée de l'authentification.
- **Nodemon** : Environnement de développement avec rechargement automatique.

## 📂 Structure du Projet

```text
multi-step-form-main/
├── backend/
│   ├── controllers/    # Logique métier des routes
│   ├── middlewares/    # Authentification et validation
│   ├── models/         # Configuration SQLite (DB.db)
│   ├── routes/         # Définition des points d'entrée API
│   └── server.js       # Point d'entrée du serveur
├── frontend/
│   ├── src/            # Composants React et hooks
│   └── vite.config.js  # Config avec Proxy vers le backend
└── README.md
```


## 🛠️ Installation et Lancement

### 1. Backend
```shell script
cd backend
npm install
```

Créez un fichier `.env` à la racine du dossier `backend` :
```
PORT=5000
# Ajoutez ici vos secrets (ex: JWT_SECRET)
```

Lancer le serveur :
```shell script
npm start
```


### 2. Frontend
```shell script
cd frontend
npm install
npm run dev
```

*Note : Le frontend est configuré via Vite pour rediriger les appels `/api` vers `http://localhost:5000` automatiquement.*

## 💡 Points Clés du Projet

- **Persistance Locale** : Utilisation de SQLite pour une installation simple sans base de données externe complexe.
- **Proxy de Développement** : Configuration de `vite.config.js` pour éviter les problèmes de CORS pendant le développement.
- **Sécurité** : Implémentation de JWT pour protéger les données du formulaire et les accès utilisateurs.
- **UI/UX** : Design soigné basé sur Tailwind CSS, optimisé pour le passage fluide d'une étape à l'autre.

---
Développé avec ❤️
