# 001 — Stack technique

Date : 13 novembre 2026
Décidé par : responsable de la zone A, après avis de l'équipe (règle « le responsable de la zone tranche », `docs/equipe.md`)
Statut : en vigueur
Ticket : ELT-6

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
- L'hébergement reste à décider (ticket de déploiement ELT-18, jalon S1), dans une décision à part.
- Les métadonnées des flux (titre en cours) sont lues par l'API Express, pas par le navigateur (décision 002) : c'est une raison de plus d'avoir un vrai serveur plutôt qu'une application sans back.
- Changer de stack demande une nouvelle décision écrite qui remplace celle-ci.
