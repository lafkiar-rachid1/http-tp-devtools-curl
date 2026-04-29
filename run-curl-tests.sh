#!/bin/bash
#
# TP 2, 4, 5 - Commandes cURL avec résultats
# Script de démonstration de tous les exemples
#

set -e

echo "============================================"
echo "   Travaux Pratiques HTTP - Commandes cURL"
echo "============================================"
echo ""

# ============================================================
# TP 2 - Maîtrise de cURL
# ============================================================

echo "TP 2 - MAITRISE DE cURL"
echo "========================================="
echo ""

# -------- 2.1 Requête GET simple --------
echo "2.1 - Requête GET simple"
echo ""

echo "Requête basique:"
echo 'curl https://httpbin.org/get'
echo ""

echo "Avec headers (-i):"
echo 'curl -i https://httpbin.org/get'
echo ""

echo "Mode verbose (-v):"
echo 'curl -v https://httpbin.org/get'
curl -v https://httpbin.org/get 2>&1 | head -50
echo ""
echo "..."
echo ""

# -------- 2.2 POST avec données --------
echo "2.2 - Requête POST"
echo ""

echo "Form data:"
echo 'curl -X POST -d "name=John&email=john@example.com" https://httpbin.org/post'
curl -X POST -d "name=John&email=john@example.com" https://httpbin.org/post | jq . 2>/dev/null || echo "(jq non disponible)"
echo ""

echo "Avec JSON:"
echo 'curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"John\",\"email\":\"john@example.com\"}" https://httpbin.org/post'
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}' \
  https://httpbin.org/post | head -20
echo ""

# -------- 2.3 Headers personnalisés --------
echo "2.3 - Headers personnalisés"
echo ""

echo 'curl -H "Authorization: Bearer mon-token-secret" -H "Accept: application/json" https://httpbin.org/headers'
curl -H "Authorization: Bearer mon-token-secret" \
  -H "Accept: application/json" \
  https://httpbin.org/headers | head -20
echo ""

# -------- 2.4 Redirections --------
echo "2.4 - Redirections"
echo ""

echo "Sans -L (s'arrête):"
echo 'curl https://httpbin.org/redirect/1'
curl -i https://httpbin.org/redirect/1 2>&1 | head -10
echo ""

echo "Avec -L (suit les redirections):"
echo 'curl -L https://httpbin.org/redirect/1'
curl -L https://httpbin.org/redirect/1 | head -10
echo ""

# -------- 2.5 Télécharger --------
echo "2.5 - Télécharger un fichier"
echo ""

echo "Sauvegarder avec -o:"
echo 'curl -o test.txt https://httpbin.org/get'
curl -o /tmp/test-httpbin.txt https://httpbin.org/get
echo "Fichier sauvegardé: /tmp/test-httpbin.txt"
echo ""

# -------- 2.6 Exercice avancé --------
echo "2.6 - Exercice avancé (POST avec headers et affichage)"
echo ""

echo 'curl -X POST -H "Content-Type: application/json" -H "X-Custom-Header: MonHeader" -d "{\"action\":\"test\",\"value\":42}" -i https://httpbin.org/post'
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Custom-Header: MonHeader" \
  -d '{"action":"test","value":42}' \
  -i https://httpbin.org/post
echo ""

# ============================================================
# TP 4 - Headers de Sécurité
# ============================================================

echo ""
echo "TP 4 - ANALYSE DES HEADERS DE SECURITE"
echo "========================================="
echo ""

echo "Analyser google.com:"
echo 'curl -I https://google.com'
curl -I https://google.com 2>/dev/null | head -15
echo ""

echo "✅ Analyser github.com:"
echo 'curl -I https://github.com'
curl -I https://github.com 2>/dev/null | head -15
echo ""

echo "✅ Chercher headers de sécurité:"
echo 'curl -s -D - https://github.com -o /dev/null | grep -i "strict\|x-frame\|x-content\|content-security"'
curl -s -D - https://github.com -o /dev/null 2>/dev/null | grep -i "strict\|x-frame\|x-content\|content-security" || echo "Pas de résultats"
echo ""

# ============================================================
# TP 5 - Cache HTTP
# ============================================================

echo ""
echo "TP 5 - CACHE HTTP"
echo "========================================="
echo ""

echo "5.1 - Observer le cache (60 secondes)"
echo 'curl -i https://httpbin.org/cache/60'
curl -i https://httpbin.org/cache/60 2>/dev/null | head -20
echo ""

echo "✅ 5.2 - Requête conditionnelle avec ETag"
echo 'curl -i https://httpbin.org/etag/test123'
curl -i https://httpbin.org/etag/test123 2>/dev/null | head -15
echo ""

echo "Avec If-None-Match (devrait retourner 304):"
echo 'curl -i -H "If-None-Match: \"test123\"" https://httpbin.org/etag/test123'
curl -i -H 'If-None-Match: "test123"' https://httpbin.org/etag/test123 2>/dev/null | head -10
echo ""

# ============================================================
# Résumé
# ============================================================

echo ""
echo "============================================"
echo "   Tous les tests de cURL sont termines!"
echo "============================================"
echo ""
echo "Fichiers créés:"
echo "  • /tmp/test-httpbin.txt"
echo ""
