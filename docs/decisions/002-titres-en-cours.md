# 002 — Afficher le titre en cours : « titre » ou « plan B » ?

Date : 13 novembre 2026
Décidé par : responsable de la zone C (règle « le responsable de la zone tranche », `docs/equipe.md`)
Statut : en vigueur
Ticket : ELT-10

## Contexte

La règle produit « jamais de faux titre » interdit d'inventer un titre. Avant de construire le lecteur (ELT-28), le tableau du direct (ELT-26) et l'historique (ELT-23), il fallait savoir quelle part des radios envoie réellement l'artiste et le titre en cours.

Source testée : les **métadonnées ICY**, un petit texte `StreamTitle='…'` que le serveur de la radio glisse dans le flux audio à intervalle régulier, quand le client le demande avec l'en-tête `Icy-MetaData: 1`.

## Méthode

- **Échantillon :** 20 stations de l'annuaire Radio Browser (voir la décision 003), la mieux notée par pays et par type, flux HTTPS uniquement. 5 continents, 13 radios musicales et 7 radios de parole.
- **Écoute :** jusqu'au premier titre non vide, ou 45 secondes au maximum.
- **Classement du texte :** « vide » (rien, ou seulement des tirets), « texte libre » (nom de la station, texte sans séparateur), « artiste – titre » (au moins deux parties séparées par ` - ` ou ` / `), puis relecture à la main.
- **Script :** `node scripts/test-metadonnees-icy.js` (Node.js 18 ou plus, aucune dépendance). Il refait le test et imprime le tableau ci-dessous au même format. Chaque lancement peut donner des stations différentes, car les votes évoluent.
- **Origine des mesures :** le test a été mené le 9 novembre 2026 par Gabriel (même méthode, même échantillon), et complété le 10 novembre par un second passage sur 53 radios musicales tirées au hasard, écoutées 3 minutes chacune.

## Résultats (20 stations)

| # | Station | Pays | Continent | Type | Format | ICY | Texte reçu | Catégorie |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | RMC Info Talk Sport | FR | Europe | parole | MP3 | oui | | vide |
| 2 | SWR3 | DE | Europe | musique | MP3 | oui | Tonight / Reamonn | artiste – titre |
| 3 | News Radio UK | GB | Europe | parole | AAC | oui | | vide |
| 4 | LOS40 Classic | ES | Europe | musique | MP3 | oui | Yazoo - Don't go | artiste – titre |
| 5 | NEU RADIO | IT | Europe | musique | MP3 | oui | - Sonny & The Sunsets - Pretend You Love Me | artiste – titre |
| 6 | RTS 92.5 RSI | SN | Afrique | musique | AAC | oui | | vide |
| 7 | METRO FM LAGOS | NG | Afrique | musique | MP3 | oui | | vide |
| 8 | Kaya FM | ZA | Afrique | parole | AAC | oui | | vide |
| 9 | MA:-Hit Radio Maroc | MA | Afrique | musique | MP3 | oui | | vide |
| 10 | Fox News Radio | US | Amérique | parole | AAC+ | oui | | vide |
| 11 | BH FM 102,1 | BR | Amérique | musique | AAC+ | oui | | vide |
| 12 | El Fonógrafo | MX | Amérique | musique | MP3 | oui | OV7 - Mirame A Los Ojos | artiste – titre |
| 13 | CBC Radio 1 Calgary | CA | Amérique | parole | AAC (HLS) | non testable | | — |
| 14 | La 2x4 | AR | Amérique | musique | AAC+ | oui | | vide |
| 15 | Gensokyo Radio | JP | Asie | musique | MP3 | oui | Stack - ENDLESS FANTASY [リマスタリング] | artiste – titre |
| 16 | Bollywood Gaane Purane | IN | Asie | musique | MP3 | oui | Superhit Old Classic Songs of Lata Mangeshkar - Jukebox 4 | **faux positif** (nom de playlist) |
| 17 | 안동MBC FM4U | KR | Asie | musique | AAC (HLS) | non testable | | — |
| 18 | CNN Indonesia | ID | Asie | parole | HLS | non testable | | — |
| 19 | Sky News Australia Radio | AU | Océanie | parole | AAC+ | oui | | vide |
| 20 | Radio Chinese FM90.6 | NZ | Océanie | musique | MP3 | oui | 周传雄 - 青花 | artiste – titre |

| | Musique (13) | Parole (7) | Total |
| --- | --- | --- | --- |
| Vrai titre | 6 | 0 | **6 (30 %)** |
| Faux positif | 1 | 0 | 1 |
| Vide après 45 s | 5 | 5 | 10 |
| HLS, non testable | 1 | 2 | 3 |

## Ce qu'on en retient

- **Les radios de parole n'envoient jamais de titre** : il n'y a pas de morceau à annoncer.
- **Pour la musique, environ une station sur deux parmi les mieux notées, et une sur trois au hasard.** Le second passage (53 radios musicales tirées au hasard) donne 15 vrais titres sur 44 stations testables (34 %).
- **Écouter plus longtemps ne sert à rien** : au second passage, presque tous les titres sont arrivés dès la connexion, et les stations vides le sont restées 3 minutes.
- **Une règle automatique simple laisse passer des faux titres** : au second passage, 6 des 21 textes classés « artiste – titre » étaient faux (numéros internes, slogan, nom d'émission, nom de fichier). Appliquée telle quelle, elle afficherait un faux titre presque une fois sur trois.
- **Le navigateur ne peut pas lire les métadonnées ICY lui-même.** Vérifié le 13 novembre sur 8 radios allemandes parmi les plus écoutées : une page web qui demande `Icy-MetaData: 1` est bloquée par le navigateur pour 7 d'entre elles (règle CORS : le serveur de la radio n'autorise pas cet en-tête venant d'un autre site), et la huitième ne renvoie pas de métadonnées. La lecture du titre doit donc se faire côté API Express.

## Options envisagées

- **« Titre »** : afficher le titre seulement quand le flux le donne et qu'il passe une classification stricte et testée ; rien sinon. Avantage : on montre le titre quand il est fiable, sans jamais l'inventer. Inconvénient : demande une règle de classification sérieuse et une lecture côté serveur.
- **« Plan B »** : jamais de titre dans la version de soutenance ; historique uniquement par stations. Avantage : aucun risque de faux titre, moins de code. Inconvénient : perd l'information quand elle existe (environ un tiers des radios musicales).
- Autres sources (API « now playing » propres à chaque radio, reconnaissance audio) : écartées, trop coûteuses avant le gel du 6 décembre, et la reconnaissance audio produirait de faux titres sur la musique locale.

## Décision

**« Titre »** : le titre en cours est affiché uniquement quand le flux l'envoie et qu'il est classé « artiste – titre » par une règle stricte, testée et lue côté API. Sinon, rien : la station, le pays et l'heure locale, sans texte de remplacement.

## Conséquences

- **ELT-23 (historique et passeport)** : l'historique repose sur les **stations écoutées** (moments, pays), pas sur les titres. Il ne dépend donc pas de ce test.
- **ELT-25 (service stations)** et **ELT-26 (tableau du direct)** : la lecture des métadonnées ICY et leur classification se font dans l'API Express, avec des tests unitaires qui reprennent au minimum ces cas réels :

| Texte reçu | Résultat attendu |
| --- | --- |
| `Tonight / Reamonn` | titre |
| `Superhit Old Classic Songs of Lata Mangeshkar - Jukebox 4` | pas un titre (nom de playlist) |
| `23087 - 20956` | pas un titre (parties uniquement numériques) |
| `Radio Plus - Écouté ou pou tendé` | pas un titre (commence par le nom de la station) |
| `GOSPEL - SHOW Bloco3` | pas un titre (mots de programme) |
| `Now On Air:Hozier - Too Sweet` | Hozier – Too Sweet (préfixe retiré) |

- En cas de doute, la règle répond « pas un titre » : mieux vaut ne rien afficher qu'un faux titre.
- **Limites connues** : les flux HLS (environ 1 station sur 7 testée) transportent leurs métadonnées autrement et ne sont pas couverts ; le résultat d'une station peut varier selon l'heure.

## Refaire le test

```bash
node scripts/test-metadonnees-icy.js        # 45 secondes d'écoute au plus
node scripts/test-metadonnees-icy.js 180    # 3 minutes
```
