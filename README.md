# Travaux Pratiques HTTP - DevTools & cURL

**Cours complet sur HTTP, DevTools, cURL, Fetch API, Sécurité et Cache**

---

## Les 5 TP

### **TP 1 - DevTools**
Explorer les requêtes HTTP avec le Network tab, analyser les headers, codes statut, comprendre les réponses

### **TP 2 - cURL**
Tester avec curl en ligne de commande : GET, POST, headers personnalisés, redirections
```bash
curl URL
curl -i URL  # affiche headers
curl -v URL  # verbose
curl -X POST -d "data" URL
```

### **TP 3 - Fetch API JavaScript**
Utiliser fetch() pour GET, POST, PUT, DELETE avec async/await et gestion d'erreurs
- fetchWithRetry() avec retry automatique
- getJSON() et postJSON()
- fetchMultiple() pour récupérer en parallèle

### **TP 4 - Headers Sécurité**
Analyser les headers de sécurité des sites : HSTS, CSP, X-Frame-Options, Referrer-Policy

### **TP 5 - Cache HTTP**
Comprendre Cache-Control, ETag, If-None-Match et tester avec DevTools

---

## Fichiers

| Fichier | Contenu |
|---------|---------|
| **TP_Resultats_Complets.md** | Tous les résultats détaillés et réponses |
| **client-http-minimaliste.html** | Interface graphique pour tester les requêtes HTTP |
| **tp3-fetch-api.js** | Scripts JavaScript avec tous les exercices |
| **run-curl-tests.sh** | Script bash pour tester les commandes cURL |

---

## Tests Rapides

**cURL:**
```bash
bash run-curl-tests.sh
```

**JavaScript (dans la console):**
```javascript
exercice31_async()        // GET
exercice32_POST()         // Créer
exercice33_PUT(1)         // Modifier
exercice34_DELETE(1)      // Supprimer
testFetchWithRetry()      // Avec retry
```

**HTML:**
Ouvrir `client-http-minimaliste.html` dans le navigateur et tester les requêtes

---

## Concepts Clés

| Concept | Description |
|---------|-------------|
| **GET** | Récupérer (idempotent) |
| **POST** | Créer (non-idempotent) |
| **PUT** | Remplacer (idempotent) |
| **DELETE** | Supprimer (idempotent) |
| **2xx** | Succès (200, 201, 204) |
| **3xx** | Redirection (301, 302, 304) |
| **4xx** | Erreur client (400, 401, 404) |
| **5xx** | Erreur serveur (500, 502, 503) |
| **HSTS** | Forcer HTTPS |
| **CSP** | Content Security Policy |
| **Cache-Control** | Gestion du cache |
| **ETag** | Validation de cache |

---

**Date:** 26 avril 2026 | **Statut:** Complet
