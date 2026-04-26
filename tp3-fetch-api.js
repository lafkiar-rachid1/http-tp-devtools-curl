/**
 * TP 3 - Scripts avancés Fetch API
 * Tous les exercices et solutions
 */

// =====================================================================
// TP 3.1 - GET basique avec .then()
// =====================================================================

const exercice31_then = () => {
  console.log('=== TP 3.1 - GET avec .then() ===');
  
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      console.log('Utilisateurs reçus:', users.length);
      console.log('Premier utilisateur:', users[0]);
    })
    .catch(error => console.error('Erreur:', error));
};

// =====================================================================
// TP 3.1 - GET basique avec async/await
// =====================================================================

const exercice31_async = async () => {
  console.log('=== TP 3.1 - GET avec async/await ===');
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    console.log('Utilisateurs reçus:', users.length);
    console.log('Premier utilisateur:', users[0]);
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// =====================================================================
// TP 3.2 - POST - Créer une ressource
// =====================================================================

const exercice32_POST = async (data = null) => {
  console.log('=== TP 3.2 - POST - Créer une ressource ===');
  
  const postData = data || {
    title: 'Mon article',
    body: 'Contenu de l\'article',
    userId: 1
  };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Post créé avec succès:', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de la création:', error);
  }
};

// =====================================================================
// TP 3.3 - PUT - Modifier une ressource
// =====================================================================

const exercice33_PUT = async (postId = 1, data = null) => {
  console.log(`=== TP 3.3 - PUT - Modifier le post ${postId} ===`);
  
  const updateData = data || {
    title: 'Article modifié',
    body: 'Contenu modifié avec succès',
    userId: 1,
    id: postId
  };

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(updateData)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log('Post modifié:', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de la modification:', error);
  }
};

// =====================================================================
// TP 3.4 - DELETE - Supprimer une ressource
// =====================================================================

const exercice34_DELETE = async (postId = 1) => {
  console.log(`=== TP 3.4 - DELETE - Supprimer le post ${postId} ===`);
  
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // JSONPlaceholder retourne un objet vide
    const result = await response.json();
    console.log('Post supprimé avec succès');
    return response.ok;
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
  }
};

// =====================================================================
// TP 3.5 - EXERCICE PRATIQUE: fetchWithRetry
// =====================================================================

/**
 * Effectue une requête HTTP avec retry automatique pour erreurs 5xx
 * 
 * @param {string} url - L'URL à requêter
 * @param {object} options - Options fetch (method, headers, body, etc.)
 * @param {number} maxRetries - Nombre maximal de tentatives
 * @returns {Promise<Response>} La réponse HTTP
 */
const fetchWithRetry = async (url, options = {}, maxRetries = 3) => {
  console.log(`🔄 fetchWithRetry: ${url} (max ${maxRetries} tentatives)`);
  
  let lastError = null;
  let delayMs = 1000; // 1 seconde entre chaque tentative

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`   Tentative ${attempt}/${maxRetries}...`);
      
      const response = await fetch(url, options);

      // Si erreur serveur (5xx), réessayer
      if (response.status >= 500 && response.status < 600) {
        lastError = new Error(`HTTP ${response.status}: Erreur serveur`);
        
        if (attempt < maxRetries) {
          console.log(`   ❌ Erreur ${response.status}, attente ${delayMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          delayMs *= 1.5; // Backoff exponentiel
          continue;
        }
      }

      // Sinon, retourner la réponse (même si 4xx)
      console.log(`   ✅ Réponse reçue: ${response.status}`);
      return response;

    } catch (error) {
      // Erreur réseau
      lastError = error;

      if (attempt < maxRetries) {
        console.log(`   ❌ Erreur réseau, attente ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        delayMs *= 1.5;
        continue;
      }
    }
  }

  // Toutes les tentatives ont échoué
  console.error('❌ Échec après ' + maxRetries + ' tentatives');
  throw lastError || new Error('Impossible de contacter le serveur');
};

// Test de fetchWithRetry
const testFetchWithRetry = async () => {
  console.log('=== Test fetchWithRetry ===');
  
  try {
    const response = await fetchWithRetry(
      'https://jsonplaceholder.typicode.com/posts/1',
      { method: 'GET' },
      3
    );
    
    const data = await response.json();
    console.log('✅ Succès:', data);
  } catch (error) {
    console.error('❌ Erreur finale:', error.message);
  }
};

// =====================================================================
// BONUS - Fonctions utilitaires
// =====================================================================

/**
 * Récupère plusieurs ressources en parallèle
 */
const fetchMultiple = async (urls) => {
  console.log(`📦 Récupération de ${urls.length} ressources...`);
  
  try {
    const promises = urls.map(url =>
      fetch(url).then(r => r.ok ? r.json() : Promise.reject(`${url} - ${r.status}`))
    );
    
    const results = await Promise.all(promises);
    console.log('✅ Toutes les ressources chargées');
    return results;
  } catch (error) {
    console.error('❌ Erreur:', error);
    throw error;
  }
};

// Test:
// fetchMultiple([
//   'https://jsonplaceholder.typicode.com/posts/1',
//   'https://jsonplaceholder.typicode.com/users/1',
//   'https://jsonplaceholder.typicode.com/comments/1'
// ]).then(console.log);

/**
 * Récupère des données avec timeout
 */
const fetchWithTimeout = async (url, timeout = 5000) => {
  console.log(`⏱️ Fetch avec timeout de ${timeout}ms: ${url}`);
  
  try {
    const response = await Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout écoulé')), timeout)
      )
    ]);
    
    return response;
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    throw error;
  }
};

/**
 * GET avec gestion d'erreur avancée
 */
const getJSON = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      // Parser l'erreur si possible
      let errorMsg = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.message || errorMsg;
      } catch {}
      
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ GET échoué:', error);
    throw error;
  }
};

/**
 * POST avec gestion d'erreur avancée
 */
const postJSON = async (url, data, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data),
      ...options
    });

    if (!response.ok) {
      let errorMsg = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.message || errorMsg;
      } catch {}
      
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ POST échoué:', error);
    throw error;
  }
};

// =====================================================================
// TESTS - Appeler les fonctions pour tester
// =====================================================================

// Décommenter les lignes ci-dessous pour tester dans la console:

// exercice31_then();
// exercice31_async();
// exercice32_POST();
// exercice33_PUT(1);
// exercice34_DELETE(1);
// testFetchWithRetry();

// =====================================================================
// Export pour utilisation externe
// =====================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    exercice31_then,
    exercice31_async,
    exercice32_POST,
    exercice33_PUT,
    exercice34_DELETE,
    fetchWithRetry,
    testFetchWithRetry,
    fetchMultiple,
    fetchWithTimeout,
    getJSON,
    postJSON
  };
}
