# 001 — Stack technique

Date : à compléter lors de la réunion de lancement
Décidé par : l'équipe
Statut : proposée (passe à « En vigueur » une fois validée)

## Contexte

Il faut une stack commune avant d'initialiser le projet (jalon S1 Socle). Les quatre membres doivent pouvoir la lire et la relire, et le jury doit voir le travail réalisé côté serveur.

## Options envisagées

- Node.js + Express, React + Vite, PostgreSQL chez Supabase : un seul langage (JavaScript) du serveur à l'interface ; l'authentification, les droits et la validation sont codés dans Express, donc visibles et testables.
- Utiliser aussi l'authentification et les règles d'accès intégrées de Supabase : plus rapide, mais ce travail serait fait par Supabase et non par l'équipe, donc invisible pour le jury.

## Décision

- API : Node.js + Express, en couches : routes → contrôleurs → services → accès aux données.
- Interface : React + Vite.
- Base : PostgreSQL chez Supabase, utilisé comme base uniquement.

## Conséquences

- L'authentification, les règles d'accès et la validation sont codées dans Express.
- Le code est rangé par domaine, avec les couches séparées à l'intérieur de chaque domaine (voir `AGENTS.md`).
- L'hébergement reste à décider (ticket de déploiement, jalon S1).
