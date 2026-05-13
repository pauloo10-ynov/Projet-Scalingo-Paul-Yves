// ============================================================
//  script.js — Logique frontend de la TODO App
//  Tout se passe ici : vérif API, affichage, ajout, suppression
// ============================================================

// ------------------------------------------------------------------
// 1. STOCKAGE LOCAL DES TÂCHES
//    Simple tableau JS en mémoire.
//    (Pas de base de données pour l'instant — c'est l'objectif suivant !)
// ------------------------------------------------------------------
let tasks = [];   // ex: [{ id: 1, text: "Faire les courses" }, ...]
let nextId = 1;   // compteur pour donner un id unique à chaque tâche


// ------------------------------------------------------------------
// 2. VÉRIFIER QUE L'API EST ACCESSIBLE
//    On appelle GET /api/health et on regarde si ça répond bien.
//    fetch() renvoie une Promise — on utilise async/await pour la lisibilité.
// ------------------------------------------------------------------
async function checkApiHealth() {
    try {
        const response = await fetch('/api/health');

        // Si le serveur répond avec un code HTTP OK (200-299)
        if (response.ok) {
            const data = await response.json();
            // data ressemble à : { status: "UP", timestamp: "..." }
            displayStatus(true, `API OK — ${data.status}`);
        } else {
            // Le serveur répond mais avec une erreur (ex: 500)
            displayStatus(false, `Erreur HTTP ${response.status}`);
        }
    } catch (error) {
        // Le serveur ne répond pas du tout (éteint, réseau coupé…)
        displayStatus(false, 'API inaccessible');
    }
}


// ------------------------------------------------------------------
// 3. AFFICHER LE STATUT DE CONNEXION
//    On met à jour le badge dans le header avec le bon texte et couleur.
//    @param {boolean} isConnected  — true = connecté, false = déconnecté
//    @param {string}  message      — texte à afficher dans le badge
// ------------------------------------------------------------------
function displayStatus(isConnected, message) {
    const statusEl = document.getElementById('api-status');

    // On retire les classes précédentes pour repartir proprement
    statusEl.classList.remove('connected', 'disconnected');

    if (isConnected) {
        statusEl.textContent = '✅ ' + message;
        statusEl.classList.add('connected');
    } else {
        statusEl.textContent = '❌ ' + message;
        statusEl.classList.add('disconnected');
    }
}


// ------------------------------------------------------------------
// 4. AJOUTER UNE TÂCHE (en local, pas encore en base de données)
//    On lit la valeur de l'input, on crée un objet tâche, on l'ajoute
//    au tableau tasks[], puis on re-affiche toute la liste.
// ------------------------------------------------------------------
function addTask() {
    const input = document.getElementById('task-input');
    const text = input.value.trim(); // .trim() supprime les espaces inutiles

    // Vérification : on n'ajoute pas une tâche vide
    if (text === '') {
        input.focus();  // remet le curseur dans le champ
        return;         // on arrête la fonction ici
    }

    // Création de l'objet tâche
    const newTask = {
        id:   nextId++,   // id unique, puis on incrémente pour la prochaine
        text: text
    };

    // Ajout au tableau
    tasks.push(newTask);

    // Vider le champ de saisie
    input.value = '';
    input.focus();

    // Mettre à jour l'affichage
    renderTasks();
}


// ------------------------------------------------------------------
// 5. SUPPRIMER UNE TÂCHE
//    On filtre le tableau pour garder toutes les tâches SAUF celle
//    dont l'id correspond. Puis on re-affiche.
//    @param {number} taskId — l'id de la tâche à supprimer
// ------------------------------------------------------------------
function deleteTask(taskId) {
    // filter() renvoie un NOUVEAU tableau sans la tâche ciblée
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}


// ------------------------------------------------------------------
// 6. AFFICHER LES TÂCHES DANS LE DOM
//    On vide le <ul> et on reconstruit tout à partir du tableau tasks[].
//    C'est la "source de vérité" : le DOM reflète toujours tasks[].
// ------------------------------------------------------------------
function renderTasks() {
    const list      = document.getElementById('task-list');
    const countEl   = document.getElementById('task-count');

    // Mise à jour du compteur dans le titre
    countEl.textContent = `(${tasks.length})`;

    // Cas vide : on affiche le message placeholder
    if (tasks.length === 0) {
        list.innerHTML = '<li class="empty-message">Aucune tâche pour l\'instant 🎉</li>';
        return;
    }

    // Construire le HTML de chaque tâche et les injecter d'un coup
    // map() transforme chaque tâche en string HTML, join('') les fusionne
    list.innerHTML = tasks.map(task => `
        <li class="task-item" data-id="${task.id}">
            <span class="task-text">${escapeHtml(task.text)}</span>
            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
                title="Supprimer cette tâche"
            >✕</button>
        </li>
    `).join('');
}


// ------------------------------------------------------------------
// 7. UTILITAIRE : ÉCHAPPER LE HTML
//    Sécurité basique : on empêche l'injection de HTML malveillant
//    si quelqu'un tape du code dans le champ de saisie.
//    Ex: "<script>alert('XSS')</script>" devient du texte inoffensif.
// ------------------------------------------------------------------
function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}


// ------------------------------------------------------------------
// 8. ÉCOUTEURS D'ÉVÉNEMENTS
//    On regroupe tous les "addEventListener" ici, pour garder le code
//    organisé. On les branche une fois que le DOM est chargé.
// ------------------------------------------------------------------

// Clic sur le bouton "+ Ajouter"
document.getElementById('add-btn').addEventListener('click', addTask);

// Appui sur Entrée dans le champ texte (UX plus fluide)
document.getElementById('task-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});


// ------------------------------------------------------------------
// 9. INITIALISATION
//    Ce code s'exécute une seule fois au chargement de la page.
// ------------------------------------------------------------------
checkApiHealth();   // On vérifie l'API dès le départ
renderTasks();      // On affiche la liste (vide au départ)