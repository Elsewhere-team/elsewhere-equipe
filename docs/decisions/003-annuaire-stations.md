# 003 — Annuaire de stations

Date : 13 novembre 2026
Décidé par : responsable de la zone C (règle « le responsable de la zone tranche », `docs/equipe.md`)
Statut : en vigueur
Ticket : ELT-11

## Contexte

Elsewhere ne diffuse aucun son lui-même : il liste des stations et lit leur flux. Il lui faut un **annuaire**, une base qui donne pour chaque station son nom, son pays et l'adresse de son flux. Ce choix conditionne la couverture du monde, la table `stations` (ELT-16), le service stations (ELT-25) et ce que l'application a le droit de stocker.

## Critères

1. **Couverture** : nombre de pays et de stations, y compris hors Europe et Amérique du Nord.
2. **Accès** : API ouverte ou non, clé obligatoire, quotas.
3. **Droit de réutilisation** : licence des données, droit de les stocker dans notre base.
4. **Champs utiles** : adresse de flux résolue, codec, HLS, pays, coordonnées, indicateur « flux vérifié ».
5. **Pérennité** : service maintenu, risque de fermeture.

## Options envisagées

| Critère | Radio Browser | Shoutcast | TuneIn | Radio Garden | Wikidata |
| --- | --- | --- | --- | --- | --- |
| Couverture | **52 557 stations, 224 pays** (`/json/stats`, 13/11/2026) | non chiffrée | large, non chiffrée | plus de 40 000 stations annoncées | 680 stations, 65 pays ayant une adresse de flux (SPARQL, 11/11/2026) |
| Accès | API ouverte, sans clé, sans quota annoncé | « Developer ID » délivré à la discrétion de Shoutcast | aucune API publique documentée | aucune API publique | point d'accès SPARQL ouvert |
| Réutilisation | pas de licence formelle des données ; la documentation autorise à recopier toutes les données (« mirror all its data ») | **stockage interdit** par la licence de l'API (art. 4.5) | conditions introuvables | conditions introuvables | CC0 (domaine public) |
| Champs utiles | `stationuuid`, `url_resolved`, `codec`, `hls`, `countrycode`, `geo_lat`, `geo_long`, `tags`, `lastcheckok` | non vérifié | non vérifié | non vérifié | flux, pays, ville, logo ; aucun contrôle que le flux marche |
| Pérennité | projet communautaire, plusieurs serveurs miroirs | API sans mise à jour visible depuis 2018 | service commercial | projet à but non lucratif | fondation Wikimedia |

## Décision

**Radio Browser est l'unique annuaire de stations de la version de soutenance.** C'est le seul candidat qui combine une API ouverte sans clé, une couverture mondiale et l'autorisation écrite de recopier ses données. Wikidata, trop pauvre (environ 77 fois moins de stations), reste un complément possible après la soutenance. Shoutcast est exclu par sa licence ; TuneIn et Radio Garden n'offrent pas d'accès documenté, et aspirer leur site est exclu.

## Conditions d'utilisation retenues

Tirées de la documentation officielle de l'API, elles s'imposent au service stations (ELT-25) :

- Envoyer un `User-Agent` qui nomme l'application (`elsewhere-equipe/<version>`).
- Ne jamais coder un serveur en dur : interroger le DNS (`_api._tcp.radio-browser.info`), mélanger la liste, passer au serveur suivant en cas d'échec.
- Appeler `/json/url/{stationuuid}` à chaque lecture lancée : cela compte un « clic » et aide la communauté à classer les stations.
- Identifier une station par `stationuuid` ; utiliser `countrycode` (code ISO à deux lettres), jamais `country` (nom libre).
- Ne stocker que les champs utiles (`stationuuid`, nom, `countrycode`, `url_resolved`, codec, coordonnées).
- Citer Radio Browser avec un lien dans l'application et dans le README.

## Conséquences et risques

- **Flux en panne malgré `hidebroken`** : 1083 stations sont marquées en panne au 13/11/2026, et un flux « vérifié » peut tomber entre deux contrôles. Parade : ne demander que `hidebroken=true`, puis gérer « flux en panne » dans le lecteur (ELT-28) au-delà de quelques secondes sans son.
- **Tirage au sort faussé par le cache** : deux requêtes identiques et simultanées peuvent recevoir la même réponse. Parade : récupérer une liste large et tirer au sort dans l'API Express, jamais avec `order=random`.
- **Tags libres** : aucun champ fiable « musique / parole » ; les tags sont presque tous en anglais ou en espagnol. Les thèmes (ELT-27) reposent sur une liste fermée construite à partir de ces tags, et un thème vide est géré.
- **Contenu mixte** : une page servie en `https` ne peut pas lire un flux en `http`. Sans relais du son, seuls les flux `https` sont lisibles : c'est le filtrage HTTPS d'ELT-25.
- **Droits de diffusion** : choisir l'annuaire ne règle pas les droits de diffusion d'un pays à l'autre. Elsewhere ne relaie jamais le son : le navigateur lit directement le flux officiel de la station. Le projet est non commercial, et une station peut demander son retrait par un contact affiché dans l'application.

## Sources

- Documentation de l'API Radio Browser : https://api.radio-browser.info/
- Statistiques Radio Browser : https://de1.api.radio-browser.info/json/stats
- Licence de l'API Shoutcast : https://www.shoutcast.com/legal/agreements/api
- Radio Garden : https://en.wikipedia.org/wiki/Radio_Garden
- Licence des données Wikidata : https://www.wikidata.org/wiki/Wikidata:Licensing
