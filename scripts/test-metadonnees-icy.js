#!/usr/bin/env node
// Rôle : script d'enquête (hors application) du ticket ELT-10.
// Il choisit 20 stations variées dans l'annuaire Radio Browser (5 continents,
// au moins 4 radios de parole), écoute chacune quelques secondes et regarde si
// le flux envoie l'artiste et le titre dans ses métadonnées ICY.
// Résultat : un tableau Markdown à coller dans docs/decisions/002-titres-en-cours.md.
//
// Usage : node scripts/test-metadonnees-icy.js [secondes d'écoute, 45 par défaut]
// Prérequis : Node.js 18 ou plus, aucune dépendance. À lancer depuis un poste
// (pas depuis un navigateur : les flux n'autorisent pas la lecture des
// métadonnées depuis une page web, voir la décision 002).

const dns = require('node:dns').promises;

const USER_AGENT = 'elsewhere-equipe/0.1 (test ELT-10)';
const LISTEN_SECONDS = Number(process.argv[2]) || 45;

// Échantillon : un pays par ligne, avec le type de radio recherché.
// 5 continents, 6 radios de parole (« parole »), 14 radios musicales.
const SAMPLE = [
  { country: 'FR', continent: 'Europe', kind: 'musique' },
  { country: 'FR', continent: 'Europe', kind: 'parole' },
  { country: 'DE', continent: 'Europe', kind: 'musique' },
  { country: 'GB', continent: 'Europe', kind: 'parole' },
  { country: 'ES', continent: 'Europe', kind: 'musique' },
  { country: 'SN', continent: 'Afrique', kind: 'musique' },
  { country: 'NG', continent: 'Afrique', kind: 'musique' },
  { country: 'ZA', continent: 'Afrique', kind: 'parole' },
  { country: 'MA', continent: 'Afrique', kind: 'musique' },
  { country: 'US', continent: 'Amérique', kind: 'parole' },
  { country: 'BR', continent: 'Amérique', kind: 'musique' },
  { country: 'MX', continent: 'Amérique', kind: 'musique' },
  { country: 'AR', continent: 'Amérique', kind: 'musique' },
  { country: 'JP', continent: 'Asie', kind: 'musique' },
  { country: 'IN', continent: 'Asie', kind: 'musique' },
  { country: 'KR', continent: 'Asie', kind: 'musique' },
  { country: 'ID', continent: 'Asie', kind: 'parole' },
  { country: 'AU', continent: 'Océanie', kind: 'parole' },
  { country: 'NZ', continent: 'Océanie', kind: 'musique' },
  { country: 'AU', continent: 'Océanie', kind: 'musique' },
];

// Mots qui signalent une radio de parole dans les tags libres de Radio Browser.
const TALK_WORDS = ['news', 'talk', 'info', 'sport', 'noticia', 'nachrichten', 'actualit', 'politic'];

/**
 * Trouve les serveurs de l'API Radio Browser, comme le demande sa documentation :
 * ne jamais coder un serveur en dur, car chacun peut disparaître.
 */
async function findApiServers() {
  try {
    const records = await dns.resolveSrv('_api._tcp.radio-browser.info');
    return records.map((r) => `https://${r.name}`).sort(() => Math.random() - 0.5);
  } catch {
    return ['https://de1.api.radio-browser.info', 'https://fi1.api.radio-browser.info'];
  }
}

/** Interroge l'API en essayant les serveurs un par un. */
async function apiGet(servers, path) {
  for (const server of servers) {
    try {
      const res = await fetch(server + path, { headers: { 'User-Agent': USER_AGENT } });
      if (res.ok) return res.json();
    } catch {
      // Serveur injoignable : on passe au suivant.
    }
  }
  throw new Error(`API Radio Browser injoignable pour ${path}`);
}

/** Vrai si les tags de la station évoquent une radio de parole. */
function isTalkStation(station) {
  const tags = (station.tags || '').toLowerCase();
  return TALK_WORDS.some((word) => tags.includes(word));
}

/**
 * Choisit la station la mieux notée d'un pays qui correspond au type demandé,
 * en flux HTTPS, en évitant les stations déjà prises.
 */
async function pickStation(servers, { country, kind }, alreadyPicked) {
  const query = `/json/stations/search?countrycode=${country}&order=votes&reverse=true&limit=100&hidebroken=true&is_https=true`;
  const stations = await apiGet(servers, query);
  return stations.find(
    (s) => !alreadyPicked.has(s.stationuuid) && (kind === 'parole') === isTalkStation(s),
  );
}

/**
 * Range le texte reçu dans une des trois catégories du ticket.
 * Volontairement simple : c'est une première lecture, relue à la main ensuite.
 */
function classify(text) {
  const clean = (text || '').trim();
  if (!clean || /^[-\s]*$/.test(clean)) return 'vide';
  const parts = clean.split(/ - | \/ | – /).filter((p) => p.trim());
  return parts.length >= 2 ? 'artiste – titre' : 'texte libre';
}

/**
 * Écoute un flux et renvoie le premier StreamTitle non vide.
 * Le flux ICY alterne : <metaint> octets d'audio, 1 octet de longueur (× 16),
 * puis le bloc de métadonnées. On lit ce rythme sans jamais garder l'audio.
 */
async function readIcyTitle(url, seconds) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), seconds * 1000);
  const result = { icy: 'non', text: '' };
  try {
    const res = await fetch(url, {
      headers: { 'Icy-MetaData': '1', 'User-Agent': USER_AGENT },
      signal: controller.signal,
    });
    const metaint = Number(res.headers.get('icy-metaint'));
    if (!metaint) return result;
    result.icy = 'oui';

    let audioLeft = metaint;
    let metaLeft = -1; // -1 : on attend l'octet de longueur
    let meta = [];
    for await (const chunk of res.body) {
      for (let i = 0; i < chunk.length; ) {
        if (audioLeft > 0) {
          const skip = Math.min(audioLeft, chunk.length - i);
          audioLeft -= skip;
          i += skip;
        } else if (metaLeft === -1) {
          metaLeft = chunk[i++] * 16;
          meta = [];
          if (metaLeft === 0) { audioLeft = metaint; metaLeft = -1; }
        } else {
          const take = Math.min(metaLeft, chunk.length - i);
          meta.push(chunk.subarray(i, i + take));
          metaLeft -= take;
          i += take;
          if (metaLeft === 0) {
            const block = Buffer.concat(meta).toString('utf8');
            const match = block.match(/StreamTitle='(.*?)';/);
            const title = match ? match[1].trim() : '';
            if (classify(title) !== 'vide') {
              result.text = title;
              return result;
            }
            audioLeft = metaint;
            metaLeft = -1;
          }
        }
      }
    }
  } catch (error) {
    if (error.name !== 'AbortError') result.icy = 'non testable';
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
  return result;
}

/** Format lisible : codec, et « HLS » quand le flux est découpé en segments. */
function formatOf(station) {
  return station.hls ? `${station.codec || '?'} (HLS)` : station.codec || '?';
}

async function main() {
  const servers = await findApiServers();
  const picked = new Set();
  const rows = [];

  for (const wanted of SAMPLE) {
    const station = await pickStation(servers, wanted, picked);
    if (!station) {
      rows.push({ ...wanted, name: '(aucune station trouvée)' });
      continue;
    }
    picked.add(station.stationuuid);
    rows.push({ ...wanted, station, name: station.name.trim() });
  }

  // Les 20 stations sont écoutées en même temps pour que le test dure moins d'une minute.
  await Promise.all(
    rows.map(async (row) => {
      if (!row.station) return;
      row.result = row.station.hls
        ? { icy: 'non testable', text: '' }
        : await readIcyTitle(row.station.url_resolved, LISTEN_SECONDS);
    }),
  );

  console.log(`Test du ${new Date().toISOString().slice(0, 10)}, écoute de ${LISTEN_SECONDS} s au plus par station.\n`);
  console.log('| # | Station | Pays | Continent | Type | Format | ICY | Texte reçu | Catégorie |');
  console.log('| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  rows.forEach((row, index) => {
    const r = row.result || { icy: '—', text: '' };
    const category = r.icy === 'oui' ? classify(r.text) : '—';
    const text = r.text.replace(/\|/g, '/');
    const format = row.station ? formatOf(row.station) : '—';
    console.log(`| ${index + 1} | ${row.name} | ${row.country} | ${row.continent} | ${row.kind} | ${format} | ${r.icy} | ${text} | ${category} |`);
  });
}

// Exporté pour pouvoir tester la classification sans réseau.
module.exports = { classify, isTalkStation };

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
