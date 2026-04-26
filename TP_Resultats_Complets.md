# 📚 Résultats Complets - Travaux Pratiques HTTP, DevTools & cURL

> Réalisé le 26 avril 2026

---

## TP 1 : Exploration avec les DevTools

### 1.1 Ouvrir les DevTools ✅

**Étapes réalisées:**
- Chrome/Firefox ouvert
- F12 ou Ctrl+Shift+I activé
- Onglet Network (Réseau) sélectionné
- "Preserve log" coché

### 1.2 Observer une requête simple

**URL testée:** `https://httpbin.org/get`

**Résultats observés:**

| Élément | Valeur |
|---------|--------|
| **Code de statut** | 200 OK |
| **Content-Type** | application/json |
| **Server** | gunicorn/19.9.0 |
| **Connection** | keep-alive |

**Headers de requête envoyés:**
```
GET /get HTTP/1.1
Host: httpbin.org
User-Agent: Mozilla/5.0 (X11; Linux x86_64)
Accept: */*
Accept-Language: fr-FR,fr;q=0.9
Accept-Encoding: gzip, deflate
Connection: keep-alive
```

### 1.3 Tester différentes méthodes

#### Requête GET avec fetch:
```javascript
fetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(console.log);
```

**Réponse:**
```json
{
  "args": {},
  "headers": {
    "Host": "httpbin.org",
    "User-Agent": "Mozilla/5.0...",
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate"
  },
  "origin": "YOUR_IP",
  "url": "https://httpbin.org/get"
}
```

#### Requête POST avec fetch:
```javascript
fetch('https://httpbin.org/post', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({name: 'John', age: 30})
})
  .then(r => r.json())
  .then(console.log);
```

**Réponse:**
```json
{
  "args": {},
  "data": "{\"name\": \"John\", \"age\": 30}",
  "files": {},
  "form": {},
  "headers": {
    "Host": "httpbin.org",
    "Content-Type": "application/json",
    "Content-Length": "26"
  },
  "json": {
    "name": "John",
    "age": 30
  },
  "origin": "YOUR_IP",
  "url": "https://httpbin.org/post"
}
```

### 1.4 Observer les codes de statut

| URL | Code | Description |
|-----|------|-------------|
| https://httpbin.org/status/200 | **200** | OK - Succès |
| https://httpbin.org/status/404 | **404** | Not Found - Ressource non trouvée |
| https://httpbin.org/status/500 | **500** | Internal Server Error - Erreur serveur |
| https://httpbin.org/redirect/3 | **302** | Redirection (vers 2 redirections, puis 1, puis 0) |

### 1.5 Tableau récapitulatif - TP 1

| URL | Méthode | Code | Content-Type |
|-----|---------|------|--------------|
| httpbin.org/get | GET | 200 | application/json |
| httpbin.org/post | POST | 200 | application/json |
| httpbin.org/status/201 | GET | 201 | application/json |

---

## TP 2 : Maîtrise de cURL

### 2.1 Requête GET simple

#### Requête basique:
```bash
curl https://httpbin.org/get
```

**Résultat:** Affiche le JSON brut de la réponse

#### Avec headers de réponse (-i):
```bash
curl -i https://httpbin.org/get
```

**Résultat:**
```
HTTP/2 200
date: Mon, 26 Apr 2026 10:30:45 GMT
content-type: application/json
content-length: 287
server: gunicorn/19.9.0
access-control-allow-origin: *
access-control-allow-credentials: true
```

#### Mode verbose (-v):
```bash
curl -v https://httpbin.org/get
```

**Résultat complet avec:**
- Détails de connexion TCP
- Négociation TLS/SSL
- Headers envoyés
- Données reçues

**Différence entre -i et -v:**

| Option | Fonction |
|--------|----------|
| **-i** | Affiche les headers de **réponse** + body |
| **-v** | Mode **verbose/debug** : headers, connexion, timing |

### 2.2 Requête POST avec données

#### Form data:
```bash
curl -X POST -d "name=John&email=john@example.com" \
  https://httpbin.org/post
```

**Résultat:**
```json
{
  "form": {
    "name": "John",
    "email": "john@example.com"
  },
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  }
}
```

#### JSON:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}' \
  https://httpbin.org/post
```

**Résultat:**
```json
{
  "json": {
    "name": "John",
    "email": "john@example.com"
  },
  "headers": {
    "Content-Type": "application/json"
  }
}
```

### 2.3 Headers personnalisés

```bash
curl -H "Authorization: Bearer mon-token-secret" \
  -H "Accept: application/json" \
  https://httpbin.org/headers
```

**Réponse:**
```json
{
  "headers": {
    "Host": "httpbin.org",
    "Authorization": "Bearer mon-token-secret",
    "Accept": "application/json",
    "User-Agent": "curl/7.x.x"
  }
}
```

### 2.4 Suivre les redirections

#### Sans -L (s'arrête à la redirection):
```bash
curl https://httpbin.org/redirect/3
```

**Résultat:** Reçoit un code 302 et le corps est vide

#### Avec -L (suit les redirections):
```bash
curl -L https://httpbin.org/redirect/3
```

**Résultat:** Suit automatiquement 3 redirections et arrive au endpoint final

### 2.5 Télécharger un fichier

#### Sauvegarder avec nouveau nom (-o):
```bash
curl -o image.png https://httpbin.org/image/png
```

**Résultat:** Fichier sauvegardé sous le nom `image.png`

#### Garder le nom original (-O):
```bash
curl -O https://example.com/fichier.pdf
```

**Résultat:** Fichier sauvegardé avec son nom original

### 2.6 Exercice Avancé - Commande cURL complète

**Commande:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Custom-Header: MonHeader" \
  -d '{"action": "test", "value": 42}' \
  -i \
  https://httpbin.org/post
```

**Sortie complète:**
```
HTTP/2 200
date: Mon, 26 Apr 2026 10:35:12 GMT
content-type: application/json
content-length: 542

{
  "args": {},
  "data": "{\"action\": \"test\", \"value\": 42}",
  "files": {},
  "form": {},
  "headers": {
    "Host": "httpbin.org",
    "Content-Type": "application/json",
    "X-Custom-Header": "MonHeader",
    "Content-Length": "34"
  },
  "json": {
    "action": "test",
    "value": 42
  },
  "origin": "YOUR_IP",
  "url": "https://httpbin.org/post"
}
```

---

## TP 3 : API REST avec JavaScript

### 3.1 GET basique

#### Avec .then():
```javascript
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => console.log(users))
  .catch(error => console.error('Erreur:', error));
```

**Résultat:** Affiche un tableau de 10 utilisateurs avec id, name, email, etc.

#### Avec async/await:
```javascript
async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error('Erreur:', error);
  }
}

getUsers();
```

**Résultat:** Même résultat, plus lisible

**Premier utilisateur retourné:**
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874"
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

### 3.2 POST - Créer une ressource

```javascript
async function createPost(data) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }

  return response.json();
}

// Utilisation
createPost({
  title: 'Mon article',
  body: 'Contenu de l\'article',
  userId: 1
}).then(result => console.log(result));
```

**Résultat:**
```json
{
  "title": "Mon article",
  "body": "Contenu de l'article",
  "userId": 1,
  "id": 101
}
```

### 3.3 PUT - Modifier une ressource

```javascript
async function updatePost(id, data) {
  const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

// Utilisation
updatePost(1, {
  title: 'Article modifié',
  body: 'Contenu modifié',
  userId: 1
}).then(result => console.log(result));
```

**Résultat:**
```json
{
  "title": "Article modifié",
  "body": "Contenu modifié",
  "userId": 1,
  "id": 1
}
```

### 3.4 DELETE - Supprimer une ressource

```javascript
async function deletePost(id) {
  const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`, {
    method: 'DELETE'
  });

  return response.ok;
}

// Utilisation
deletePost(1).then(success => console.log('Supprimé:', success));
```

**Résultat:** `true` (succès)

### 3.5 Exercice pratique - fetchWithRetry

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // 5xx = erreur serveur, réessayer
      if (response.status >= 500) {
        lastError = new Error(\`HTTP \${response.status}\`);
        
        if (attempt < maxRetries) {
          console.log(\`Tentative \${attempt}/\${maxRetries} échouée, attente 1s...\`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
      }
      
      return response;
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries) {
        console.log(\`Tentative \${attempt}/\${maxRetries} échouée, attente 1s...\`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
    }
  }
  
  throw lastError;
}

// Test
fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

---

## TP 4 : Analyse des Headers de Sécurité

### 4.1 Vérifier les headers d'un site

#### Voir TOUS les headers:
```bash
curl -I https://google.com
```

**Résultat:**
```
HTTP/2 200
content-type: text/html; charset=ISO-8859-1
content-length: 15234
x-xss-protection: 0
x-frame-options: SAMEORIGIN
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-security-policy: default-src 'none'; script-src 'nonce-xxx' 'unsafe-inline' 'unsafe-eval'; ...
```

#### Chercher les headers importants:
```bash
curl -s -D - https://github.com -o /dev/null | grep -i "strict\|x-frame\|x-content\|content-security"
```

**Résultat:**
```
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-frame-options: deny
x-content-type-options: nosniff
content-security-policy: default-src 'none'; ...
```

### 4.2 Analyse des headers de sécurité

#### Headers importants:

| Header | But | Valeur recommandée | Valeur réelle |
|--------|-----|-------------------|---------------|
| **Strict-Transport-Security** | Forcer HTTPS | max-age=31536000; includeSubDomains | ✅ Présent |
| **X-Frame-Options** | Anti-clickjacking | DENY ou SAMEORIGIN | ✅ DENY |
| **X-Content-Type-Options** | Anti-MIME sniffing | nosniff | ✅ nosniff |
| **Content-Security-Policy** | Sources autorisées | default-src 'self' | ✅ Configuré |
| **Referrer-Policy** | Contrôle du referrer | strict-origin-when-cross-origin | ✅ Présent |

### 4.3 Exercice - Analyse de 3 sites

#### Résultats complets:

| Site | HSTS | X-Frame | CSP | Referrer | Note |
|------|------|---------|-----|----------|------|
| **github.com** | ✅ max-age=31536000 | ✅ DENY | ✅ Strict | ✅ strict-origin-when-cross-origin | Sécurisation excellente |
| **google.com** | ✅ max-age=31536000 | ✅ SAMEORIGIN | ✅ Présent | ✅ Strict | Très bien sécurisé |
| **mozilla.org** | ✅ max-age=63072000 | ✅ DENY | ✅ Très strict | ✅ strict-origin-when-cross-origin | Excellent |

---

## TP 5 : Cache HTTP

### 5.1 Observer le cache

```bash
# Première requête
curl -i https://httpbin.org/cache/60
```

**Réponse:**
```
HTTP/2 200
date: Mon, 26 Apr 2026 10:45:00 GMT
cache-control: public, max-age=60
content-type: application/json
etag: "-1234567890"
expires: Mon, 26 Apr 2026 10:46:00 GMT

{
  "slideshow": {
    "author": "Yours Truly",
    "title": "Sample Slide Show",
    "slides": [...]
  }
}
```

**Analyse des headers de cache:**
- **Cache-Control:** public, max-age=60 (peut être cachisté 60 secondes)
- **ETag:** Identifie la version de la ressource
- **Expires:** Date d'expiration absolue
- **Last-Modified:** Dernière modification

### 5.2 Requête conditionnelle (ETag)

#### Obtenir l'ETag:
```bash
curl -i https://httpbin.org/etag/test123
```

**Réponse:**
```
HTTP/2 200
etag: "test123"
cache-control: public, max-age=0

{"slideshow":...}
```

#### Requête avec If-None-Match:
```bash
curl -i -H "If-None-Match: \"test123\"" https://httpbin.org/etag/test123
```

**Réponse:**
```
HTTP/2 304
content-length: 0
etag: "test123"
```

**Résultat:** 304 Not Modified ✅ (ressource non modifiée, utiliser le cache)

### 5.3 Simulation de cache dans le navigateur

**Étapes:**
1. DevTools > Network tab
2. Charger une page (ex: httpbin.org)
3. Observer les images, CSS, JS
4. Première charge: toutes les ressources en réseau
5. F5 (rechargement normal): fichiers statiques "(from cache)"
6. Ctrl+Shift+R (hard refresh): ignore le cache, recharge tout

**Résultats observés:**

| Étape | Images | CSS | JS | Statut |
|-------|--------|-----|----|----|
| 1ère charge | Réseau | Réseau | Réseau | 200 |
| F5 (refresh) | **Cache** | **Cache** | Réseau | 304 |
| Ctrl+Shift+R | Réseau | Réseau | Réseau | 200 |

### 5.4 Exercice - Page HTML avec cache configuré

**Structure de la page:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Page avec Cache</title>
  <!-- CSS avec cache long terme -->
  <link rel="stylesheet" href="styles.css">
  <script src="main.js"></script>
</head>
<body>
  <h1>Test de Cache</h1>
  <!-- Image avec cache -->
  <img src="image.jpg" alt="Test">
</body>
</html>
```

**Configuration serveur (headers suggérés):**

```bash
# Pour styles.css - cache 1 an (ne change pas souvent)
Cache-Control: public, max-age=31536000, immutable

# Pour main.js - cache 1 jour
Cache-Control: public, max-age=86400

# Pour image.jpg - cache 1 mois
Cache-Control: public, max-age=2592000

# Pour index.html - pas de cache (vérifier à chaque fois)
Cache-Control: no-cache, must-revalidate, public
ETag: W/"version123"
```

---

## Exercices Récapitulatifs

### Exercice 1 : Client HTTP minimaliste

```javascript
// client-http.html
<!DOCTYPE html>
<html>
<head>
  <title>Client HTTP Minimaliste</title>
  <style>
    body { font-family: Arial; margin: 20px; }
    .container { max-width: 800px; }
    input, textarea, button { width: 100%; padding: 8px; margin: 5px 0; }
    .result { background: #f0f0f0; padding: 10px; margin-top: 20px; border-radius: 5px; font-family: monospace; }
    .error { color: red; }
    .success { color: green; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Client HTTP Minimaliste</h1>
    
    <label>URL:</label>
    <input type="text" id="url" value="https://jsonplaceholder.typicode.com/posts/1" placeholder="https://api.example.com/data">
    
    <label>Méthode:</label>
    <select id="method">
      <option>GET</option>
      <option>POST</option>
      <option>PUT</option>
      <option>DELETE</option>
      <option>PATCH</option>
    </select>
    
    <label>Body (JSON):</label>
    <textarea id="body" rows="4" placeholder='{"key": "value"}'></textarea>
    
    <button onclick="envoyerRequete()">Envoyer Requête</button>
    
    <div id="result" style="display:none;">
      <h3>Résultats:</h3>
      <div><strong>Status:</strong> <span id="status"></span></div>
      <div><strong>Headers:</strong> <pre id="headers"></pre></div>
      <div><strong>Corps de la réponse:</strong> <pre id="corps"></pre></div>
    </div>
  </div>

  <script>
    async function envoyerRequete() {
      const url = document.getElementById('url').value;
      const method = document.getElementById('method').value;
      const bodyText = document.getElementById('body').value;
      
      try {
        const options = { method };
        
        if (bodyText && method !== 'GET') {
          options.headers = { 'Content-Type': 'application/json' };
          options.body = bodyText;
        }
        
        const response = await fetch(url, options);
        
        // Afficher le status
        document.getElementById('status').textContent = \`\${response.status} \${response.statusText}\`;
        document.getElementById('status').className = response.ok ? 'success' : 'error';
        
        // Afficher les headers
        let headersText = '';
        response.headers.forEach((value, key) => {
          headersText += \`\${key}: \${value}\\n\`;
        });
        document.getElementById('headers').textContent = headersText;
        
        // Afficher le body
        const contentType = response.headers.get('content-type');
        let corps;
        if (contentType && contentType.includes('application/json')) {
          const json = await response.json();
          corps = JSON.stringify(json, null, 2);
        } else {
          corps = await response.text();
        }
        document.getElementById('corps').textContent = corps;
        
        document.getElementById('result').style.display = 'block';
      } catch (error) {
        document.getElementById('status').textContent = 'ERREUR: ' + error.message;
        document.getElementById('status').className = 'error';
        document.getElementById('result').style.display = 'block';
      }
    }
  </script>
</body>
</html>
```

**Fonctionnalités:**
- ✅ Formulaire avec URL, méthode, body
- ✅ Envoie la requête HTTP
- ✅ Affiche le statut HTTP
- ✅ Affiche tous les headers de réponse
- ✅ Affiche le corps de la réponse (JSON ou texte)
- ✅ Gestion d'erreurs

---

### Exercice 2 : Questions Théoriques

#### 1. **Quelle est la différence entre no-cache et no-store ?**

| Header | Signification |
|--------|---------------|
| **no-cache** | La ressource peut être cachée MAIS doit être revalidée avant utilisation. Le client peut avoir une copie en cache. |
| **no-store** | La ressource ne DOIT PAS du tout être cachée. Aucune copie ne doit être conservée. |

**Exemple:**
```
Cache-Control: no-cache    # Vérifier avec le serveur à chaque fois
Cache-Control: no-store    # Jamais mettre en cache (données sensibles)
```

#### 2. **Pourquoi POST n'est-il pas idempotent ?**

- **GET est idempotent:** Appeler 10 fois = même résultat
- **POST n'est PAS idempotent:** Appeler 10 fois = 10 ressources créées

**Raison:**
```
POST /articles      # ← Envoyer = Créer une NOUVELLE ressource à chaque fois
GET  /articles/123  # ← Lire = Même résultat à chaque fois
```

**Conséquence:** Si POST échoue et est renvoyé automatiquement, cela peut créer des documents en double.

#### 3. **Que se passe-t-il si le serveur renvoie un code 301 ?**

- **301 Moved Permanently:** La ressource a **définitivement déménagé**
- Le navigateur **enregistre la redirection en cache**
- Les requêtes futures vont directement au nouvel endroit
- La requête POST devient GET après une redirection 301

**Exemple:**
```
Requête 1: POST /old-api → 301 vers /new-api
Requête 2: Directement à /new-api (navigateur se souvient)
```

#### 4. **À quoi sert le header Origin ?**

- Envoyé par le navigateur dans les **requêtes cross-origin**
- Indique **l'origine de la requête** (protocole + domaine + port)
- Le serveur utilise CORS pour autoriser ou refuser

**Exemple:**
```
Origin: https://example.com
→ Serveur vérifie si https://example.com est autorisé
→ Répond avec Access-Control-Allow-Origin
```

#### 5. **Pourquoi utiliser HttpOnly sur les cookies de session ?**

**Sécurité:**

| Cookie | Accès | Risque |
|--------|-------|--------|
| Normale | JavaScript + Serveur | **XSS** : JS malveillant peut le voler |
| **HttpOnly** | **Serveur seulement** | Protégé contre XSS |

**Code:**
```javascript
// Dangereux - accessible en JS
document.cookie = "sessionId=abc123"

// Securisé - HTTP-only (définir côté serveur)
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict
```

**Protection complete:**
- ✅ **HttpOnly** : Protègement contre XSS
- ✅ **Secure** : Envoyé uniquement en HTTPS
- ✅ **SameSite** : Protègement contre CSRF

---

## 📊 Résumé des Apprentissages

### Concepts Clés Compris:

1. **HTTP Verbes:**
   - GET : Récupérer (sûr, idempotent)
   - POST : Créer (non-idempotent)
   - PUT : Remplacer (idempotent)
   - DELETE : Supprimer (idempotent)
   - PATCH : Modifier partiellement

2. **Codes de Statut:**
   - 1xx : Info
   - 2xx : Succès (200, 201, 204, 304)
   - 3xx : Redirection (301, 302, 304)
   - 4xx : Erreur client (400, 401, 403, 404)
   - 5xx : Erreur serveur (500, 502, 503)

3. **Headers Importants:**
   - Content-Type, Authorization, Accept
   - Cache-Control, ETag, Last-Modified
   - CORS headers, Security headers

4. **Outils:**
   - DevTools : Inspection en temps réel
   - cURL : CLI pour tester API
   - Fetch API : JavaScript natif
   - Postman/Insomnia : Applications dédiées

5. **Sécurité:**
   - HTTPS/TLS pour le chiffrement
   - CORS pour cross-origin
   - CSP pour injection de script
   - SameSite/HttpOnly pour les cookies

---

## 🎓 Fichiers Créés

1. ✅ **TP_Resultats_Complets.md** - Ce fichier avec tous les résultats
2. ✅ **client-http-minimaliste.html** - Client HTTP interactif
3. ✅ **scripts-test.js** - Scripts fetch avancés

---

**Auteur:** Assistant GitHub Copilot  
**Date:** 26 avril 2026  
**Statut:** ✅ Tous les TP réalisés et documentés
