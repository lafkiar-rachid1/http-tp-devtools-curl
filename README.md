# 📚 Travaux Pratiques HTTP - DevTools & cURL

> **Cours complet**: Exploration HTTP, DevTools, cURL, Fetch API, Sécurité, Cache  
> **Date**: 26 avril 2026  
> **Statut**: ✅ Complet et fonctionnel

---

## 📖 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Fichiers du projet](#fichiers-du-projet)
3. [Installation & Utilisation](#installation--utilisation)
4. [TP Détaillés](#tp-détaillés)
5. [Résultats](#résultats)
6. [Ressources](#ressources)

---

## 🎯 Vue d'ensemble

Ce projet contient une série complète de travaux pratiques (TP) sur les protocoles HTTP, les outils de développement web et les APIs REST.

**Sujets couverts:**
- ✅ **TP 1**: Exploration avec les DevTools (Network, Headers, Codes statut)
- ✅ **TP 2**: Maîtrise de cURL (GET, POST, Headers, Redirections)
- ✅ **TP 3**: API REST avec JavaScript (Fetch, async/await, CRUD)
- ✅ **TP 4**: Analyse des Headers de Sécurité (HSTS, CSP, CORS)
- ✅ **TP 5**: Cache HTTP (Cache-Control, ETag, Conditionnelles)

---

## 📁 Fichiers du projet

```
http-tp-devtools-curl/
├── README.md                          # 👈 Vous êtes ici
├── TP_Resultats_Complets.md          # 📋 Tous les résultats et réponses
├── client-http-minimaliste.html       # 🌐 Client HTTP interactif (TP 1 Ex)
├── tp3-fetch-api.js                   # 📜 Scripts Fetch avancés (TP 3)
├── run-curl-tests.sh                  # 🔨 Script pour exécuter les tests cURL
└── .git/                              # 📦 Dépôt Git
```

### Descriptions détaillées:

| Fichier | Description | Contenu |
|---------|-------------|---------|
| **TP_Resultats_Complets.md** | Tous les résultats et réponses | Questions, codes, résultats, tableaux |
| **client-http-minimaliste.html** | Client HTTP dans le navigateur | Interface pour tester requêtes HTTP |
| **tp3-fetch-api.js** | Scripts JavaScript avancés | Exercices TP 3, fetchWithRetry, etc |
| **run-curl-tests.sh** | Script bash de tests cURL | Automatise tous les tests cURL |

---

## 🚀 Installation & Utilisation

### Prérequis

- **cURL** installé (vérifier: `curl --version`)
- Un **navigateur web** (Chrome/Firefox/Safari)
- **Node.js** optionnel (pour certains scripts)
- **Git** pour cloner le repo

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/lafkiar-rachid1/http-tp-devtools-curl.git
cd http-tp-devtools-curl
```

### 2️⃣ Ouvrir le fichier de résultats

Consulter tous les résultats et réponses:
```bash
# Avec votre éditeur préféré
code TP_Resultats_Complets.md
cat TP_Resultats_Complets.md
```

### 3️⃣ Utiliser le client HTTP interactif

Ouvrir dans un navigateur:
```bash
# Linux/macOS
open client-http-minimaliste.html

# Ou depuis votre éditeur (VS Code)
# Clic droit → Open with Live Server
```

### 4️⃣ Exécuter les tests cURL

```bash
# Rendre exécutable
chmod +x run-curl-tests.sh

# Exécuter
./run-curl-tests.sh

# Ou directement avec bash
bash run-curl-tests.sh
```

### 5️⃣ Utiliser les scripts JavaScript

Dans la **console du navigateur**:

```javascript
// Charger le fichier
// <script src="tp3-fetch-api.js"></script>

// Exécuter les exercices
exercice31_async();           // GET avec async/await
exercice32_POST();             // Créer un post
exercice33_PUT(1);             // Modifier un post
exercice34_DELETE(1);          // Supprimer un post
testFetchWithRetry();          // Test avec retry
getJSON('https://...');       // Utilitaire GET
postJSON('https://...', {...}); // Utilitaire POST
```

---

## 📚 TP Détaillés

### TP 1: Exploration avec les DevTools

**Objectifs:**
- Analyser requêtes/réponses HTTP
- Comprendre les headers
- Observer les codes de statut

**Points clés couverts:**
- ✅ Ouvrir DevTools (F12)
- ✅ Onglet Network pour voir requêtes
- ✅ Observer headers, body, statut
- ✅ "Preserve log" pour garder historique
- ✅ Tester avec fetch() dans Console

**Résultats:** Voir [TP_Resultats_Complets.md](TP_Resultats_Complets.md#tp-1--exploration-avec-les-devtools)

---

### TP 2: Maîtrise de cURL

**Objectifs:**
- Utiliser cURL en ligne de commande
- Comprendre les options principales
- Tester différentes méthodes HTTP

**Commandes essentielles:**

| Commande | Usage |
|----------|-------|
| `curl URL` | GET basique |
| `curl -i URL` | Afficher headers |
| `curl -v URL` | Verbose (debug) |
| `curl -X POST -d "data" URL` | POST form |
| `curl -X POST -H "Content-Type: application/json" -d '{"json":"data"}' URL` | POST JSON |
| `curl -H "Header: value" URL` | Ajouter header |
| `curl -L URL` | Suivre redirections |
| `curl -o file.txt URL` | Sauvegarder fichier |

**Script pour tester:** `./run-curl-tests.sh`

**Résultats:** Voir [TP_Resultats_Complets.md](TP_Resultats_Complets.md#tp-2--maîtrise-de-curl)

---

### TP 3: API REST avec JavaScript

**Objectifs:**
- Utiliser l'API Fetch
- Gérer promesses et async/await
- Traiter erreurs HTTP

**Patterns couverts:**

```javascript
// GET - Récupérer
const data = await fetch(url).then(r => r.json());

// POST - Créer
fetch(url, { method: 'POST', body: JSON.stringify(data) });

// PUT - Modifier
fetch(url, { method: 'PUT', body: JSON.stringify(data) });

// DELETE - Supprimer
fetch(url, { method: 'DELETE' });

// Avec gestion d'erreur
if (!response.ok) throw new Error(`HTTP ${response.status}`);

// Avec retry automatique
await fetchWithRetry(url, options, 3);
```

**Client interactif:** [client-http-minimaliste.html](client-http-minimaliste.html)

**Scripts:** [tp3-fetch-api.js](tp3-fetch-api.js)

**Résultats:** Voir [TP_Resultats_Complets.md](TP_Resultats_Complets.md#tp-3--api-rest-avec-javascript)

---

### TP 4: Analyse des Headers de Sécurité

**Objectifs:**
- Comprendre headers de sécurité
- Analyser configuration d'un site
- Identifier améliorations possibles

**Headers importants:**

| Header | Rôle | Exemple |
|--------|------|---------|
| **HSTS** | Forcer HTTPS | `max-age=31536000; includeSubDomains` |
| **X-Frame-Options** | Anti-clickjacking | `DENY` ou `SAMEORIGIN` |
| **X-Content-Type-Options** | Anti-MIME sniffing | `nosniff` |
| **CSP** | Sources autorisées | `default-src 'self'` |
| **Referrer-Policy** | Contrôle referrer | `strict-origin-when-cross-origin` |

**Vérifier un site:**
```bash
curl -I https://github.com | grep -i "strict\|x-frame\|x-content\|csp"
```

**Résultats:** Voir [TP_Resultats_Complets.md](TP_Resultats_Complets.md#tp-4--analyse-des-headers-de-sécurité)

---

### TP 5: Cache HTTP

**Objectifs:**
- Comprendre le fonctionnement du cache
- Observer headers de cache
- Tester validation avec ETag

**Headers de cache:**

```
Cache-Control: public, max-age=3600     # Cache 1 heure
Cache-Control: no-cache                 # Revalider avant d'utiliser
Cache-Control: no-store                 # Ne pas cacher du tout
ETag: "w/\"56d-Z2K1S+..."              # Identifiant de version
If-None-Match: "w/\"56d-..."           # Vérifier si modifié
```

**Tester le cache:**
```javascript
// DevTools → Network tab
// Charger page
// F5 (refresh) → voir "(from cache)"
// Ctrl+Shift+R (hard refresh) → ignore cache
```

**Résultats:** Voir [TP_Resultats_Complets.md](TP_Resultats_Complets.md#tp-5--cache-http)

---

## 📊 Résultats

### Questions Théoriques Répondues ✅

1. **Différence entre -i et -v en cURL**
   - `-i`: Affiche les headers de réponse + body
   - `-v`: Mode verbose complet avec connexion, TLS, timing

2. **Différence entre no-cache et no-store**
   - `no-cache`: Peut être en cache mais revalider avant utilisation
   - `no-store`: Ne jamais cacher (données sensibles)

3. **Pourquoi POST n'est pas idempotent**
   - GET: 10x = même résultat
   - POST: 10x = 10 ressources créées (différent à chaque fois)

4. **À quoi sert le header Origin**
   - Indique l'origine (protocole + domaine + port)
   - Utilisé par serveur pour CORS

5. **Pourquoi HttpOnly sur cookies de session**
   - Protection contre XSS (JavaScript malveillant ne peut pas y accéder)
   - Aussi: `Secure` (HTTPS seulement) et `SameSite` (protection CSRF)

### Tableaux Remplis ✅

- ✅ Codes statut HTTP (200, 404, 500, redirections)
- ✅ Requêtes HTTP (GET, POST, PUT, DELETE)
- ✅ Headers importants (Authorization, Content-Type, Cache-Control)
- ✅ Headers de sécurité (GitHub, Google, Mozilla)
- ✅ Cache pour fichiers statiques vs dynamiques

### Scripts Créés ✅

- ✅ Client HTTP minimaliste (interface graphique)
- ✅ fetchWithRetry() avec backoff exponentiel
- ✅ Utilitaires getJSON() et postJSON()
- ✅ Récupération parallèle avec fetchMultiple()
- ✅ Script bash pour tous les tests cURL

---

## 🔗 Ressources

### Documentations officielles

- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [MDN - HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [cURL Documentation](https://curl.se/docs/)
- [HTTP.cat - Codes visuels](https://http.cat/)

### Services de test

- [httpbin.org](https://httpbin.org/) - Test HTTP
- [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/) - Fake API REST
- [securityheaders.com](https://securityheaders.com/) - Analyser sécurité
- [csp-evaluator.withgoogle.com](https://csp-evaluator.withgoogle.com/) - Analyser CSP

### Outils

- **DevTools built-in** - Chrome, Firefox, Safari
- **cURL** - Line command HTTP client
- **Postman** - GUI pour APIs REST
- **Insomnia** - Alternative à Postman
- **httpie** - cURL simplifié

---

## 📝 Concepts Clés

### HTTP Verbes (Méthodes)

| Verbe | Utilité | Idempotent |
|-------|---------|-----------|
| **GET** | Récupérer | ✅ Oui |
| **POST** | Créer | ❌ Non |
| **PUT** | Remplacer | ✅ Oui |
| **PATCH** | Modifier partiellement | ❌ Non |
| **DELETE** | Supprimer | ✅ Oui |
| **HEAD** | Comme GET sans body | ✅ Oui |
| **OPTIONS** | Dire ce qui est possible | ✅ Oui |

### Codes de Statut HTTP

```
1xx Informatif (100 Continue, 101 Switching Protocols)
2xx Succès (200 OK, 201 Created, 204 No Content, 304 Not Modified)
3xx Redirection (301 Moved, 302 Found, 304 Not Modified)
4xx Erreur Client (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
5xx Erreur Serveur (500 Internal Error, 502 Bad Gateway, 503 Service Unavailable)
```

### Sécurité HTTP

- **HTTPS**: Chiffrement TLS/SSL
- **HSTS**: Forcer HTTPS à l'avenir
- **CSP**: Content Security Policy
- **CORS**: Cross-Origin Resource Sharing
- **SameSite**: Protection CSRF sur cookies

---

## ✅ Checklist de Complétion

- [x] TP 1 - DevTools explorés
- [x] TP 2 - Commandees cURL testées
- [x] TP 3 - Scripts Fetch créés
- [x] TP 4 - Headers de sécurité analysés
- [x] TP 5 - Cache HTTP compris
- [x] Exercice 1 - Client HTTP créé
- [x] Exercice 2 - Questions théoriques répondues
- [x] Exercice avancé - fetchWithRetry implémenté
- [x] Tous les résultats documentés
- [x] Scripts exécutables fournis
- [x] Déposé sur GitHub

---

## 👨‍💻 Auteur

**Assistant GitHub Copilot**  
Utilisant Claude Haiku 4.5

---

## 📄 Licence

Ce projet est à usage éducatif.

---

## 🚀 Prochaines étapes

Pour aller plus loin:

1. **GraphQL** au lieu de REST
2. **WebSockets** pour communication temps réel
3. **Authentification JWT** avec tokens
4. **Tests API** avec Jest/Mocha
5. **Monitoring** et **Analytics** HTTP
6. **Performance** (compression, HTTP/2, HTTP/3)

---

**Dernière mise à jour:** 26 avril 2026  
**Statut:** ✅ Complet et testé
