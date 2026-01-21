const express = require('express');
const cors = require('cors');

const app = express();

// --- NOUVEAU : Stockage des tâches en mémoire ---
const tasks = []; 

// Middlewares
app.use(cors());
app.use(express.json());

// --- INDICE 1 : Servir les fichiers du dossier 'public' ---
// Cela permet d'afficher ton index.html quand on va sur http://localhost:3000
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Serveur opérationnel !" });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: "UP", 
        timestamp: new Date().toISOString() 
    });
});

// Route pour voir les tâches (optionnel mais utile)
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Gestion 404
app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

module.exports = app;