---
name: expliquer-code
description: Expliquer bloc par bloc, en français, un fichier de code Elsewhere (équipe) validé, puis vérifier que le membre sait l'expliquer sans regarder. À utiliser dès qu'un code est validé (tests verts, relecture faite), quand un membre demande d'expliquer un fichier, ou pour une révision avant la soutenance.
---

# Expliquer un code validé, et vérifier qu'il est compris

Objectif : chaque membre sait lire, expliquer et modifier le code qu'il présente au jury. Une explication ne prouve pas la compréhension : chaque explication se termine donc par une vérification sans regarder. C'est la case « Je sais expliquer chaque bloc du diff sans regarder » de la Definition of Done.

Les commentaires du code restent courts (règle de `AGENTS.md`) : l'explication détaillée se fait dans la conversation, pas dans le fichier.

## Quand l'utiliser

- Quand un code est **validé** : il marche, les tests passent, la relecture est faite (avant ou juste après la fusion de la PR).
- Quand un membre demande d'expliquer un fichier précis, y compris le code d'un autre membre.
- Jamais sur du code en cours d'écriture : le signaler et proposer d'y revenir une fois validé.

## Étapes

1. **Lire le fichier tel qu'il est dans le dépôt**, à la version validée. Ne jamais réécrire le code de mémoire.
2. **Situer le fichier** en une phrase : son rôle dans l'architecture (route, contrôleur, service, accès aux données, migration, composant React, configuration), son domaine et le ticket ELT concerné.
3. **Découper en blocs logiques** (imports, une fonction, une route, une requête SQL…).
4. **Expliquer chaque bloc**, titré `Lignes X-Y : <ce que fait le bloc>` :
   - le code exactement comme dans le fichier, avec ses numéros de ligne ;
   - ce que fait chaque ligne ou petit groupe de lignes, avec les vrais termes techniques définis à leur première apparition, et une image simple quand elle aide ;
   - une ligne **« En une phrase »** pour les blocs importants.
5. **Signaler les points sensibles** quand ils apparaissent : asynchrone (`async`, `await`, promesses), sécurité (validation des entrées, droits d'accès, mots de passe hachés, requêtes paramétrées), SQL.
6. **Vérifier la compréhension** (section suivante) avant de considérer la tâche terminée.

## Vérifier la compréhension

Une notion est acquise quand le membre peut la restituer, l'appliquer et la modifier **sans regarder** l'explication. Lui demander de masquer l'explication, puis poser les questions **une par une**, en attendant sa réponse avant de donner la correction.

1. **Prédire** (toujours) : montrer une ou deux lignes et demander ce qu'elles font, ou ce que vaut une variable à un moment précis.
2. **Réexpliquer** (toujours) : demander d'expliquer un bloc avec ses propres mots, comme devant le jury. Relever ce qui est flou ou faux, sans le reformuler à sa place tout de suite : lui laisser une seconde chance.
3. **Modifier** (seulement pour les blocs centraux pour le jury : authentification, droits d'accès, validation, SQL, asynchrone) : proposer un petit changement à écrire lui-même, par exemple « fais en sorte que la route refuse un identifiant négatif ». Relire son code, ne pas l'écrire à sa place, et ne pas le commiter.

Adapter la charge au temps disponible : pour un fichier secondaire, la question 1 suffit.

## Ensuite

- **Réponses justes** : la case de la Definition of Done peut être cochée par le membre.
- **Réponse fausse ou hésitante** : réexpliquer autrement (autre image, autre exemple), puis reposer une question différente. Lister à la fin les notions à revoir, pour que le membre les note où il veut.
- Avant la soutenance, proposer une révision des fichiers que le membre présentera, avec les mêmes questions, sans relire l'explication avant.

## Règles

- Aucun secret dans l'explication : une clé, un mot de passe ou une adresse contenant un jeton est remplacé par `<masqué>`.
- Ne pas expliquer les fichiers générés (`package-lock.json`, `dist/`) ni les configurations triviales, sauf demande.
- Ne jamais cocher la case de la Definition of Done à la place du membre.
