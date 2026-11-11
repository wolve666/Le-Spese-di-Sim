# Le Spese di Sim

![Versione](https://img.shields.io/badge/versione-2.2-F2C200) ![Tipo](https://img.shields.io/badge/tipo-PWA-1C1C1C) ![Piattaforma](https://img.shields.io/badge/Android-Chrome-3B8F68) ![Dati](https://img.shields.io/badge/dati-solo%20sul%20telefono-6F6F6A)

Gestionale delle uscite e degli incassi per **fonti**: case, affitti, negozi o qualsiasi altra attività. Ogni fonte ha i suoi incassi, le sue spese, le scadenze da pagare e gli anticipi da recuperare. Funziona come un'app installata sul telefono, anche senza connessione.

**Indirizzo:** `https://<utente>.github.io/<repository>/`

---

## Indice

- [Funzioni](#funzioni)
  - [Fonti di incasso](#fonti-di-incasso)
  - [Scheda della fonte](#scheda-della-fonte)
  - [Anticipi rateizzati](#anticipi-rateizzati)
  - [Scadenze e promemoria](#scadenze-e-promemoria)
  - [Totali](#totali)
  - [Archivio annuale](#archivio-annuale)
  - [Personalizzazione](#personalizzazione)
- [Notifiche: cosa aspettarsi](#notifiche-cosa-aspettarsi)
- [Installazione](#installazione)
- [Aggiornamento](#aggiornamento)
- [Dati e backup](#dati-e-backup)
- [Struttura dei file](#struttura-dei-file)
- [Tecnologie](#tecnologie)
- [Storico delle versioni](#storico-delle-versioni)

---

## Funzioni

### Fonti di incasso

- La schermata iniziale mostra le fonti come **caselle**: solo il nome e un indicatore di stato.
  - 🔴 **rosso**: ci sono pagamenti scaduti o in scadenza ("1 scaduta", "2 in scadenza");
  - 🟢 **verde**: "Tutto ok".
- Ogni fonte ha un nome e un tipo: **casa, affitto, negozio, altro**.
- Casella **Spese generali** per ciò che non appartiene a nessuna fonte, e casella **+ Aggiungi** per crearne di nuove.

### Scheda della fonte

- **Selezione per anno**: incassi, spese e netto dell'anno scelto.
- **Calendario** del mese con i giorni segnati da pallini colorati:

  | Colore | Significato |
  |---|---|
  | Verde | Incassi |
  | Grigio | Spese |
  | Giallo | Scadenze |
  | Rosso | Scadenze già passate |

  Toccando un giorno si vedono solo i suoi movimenti e le sue scadenze; le scadenze ripetute compaiono su tutte le date dell'anno.
- **Storico dell'anno** diviso per mesi, con incassi e spese di ciascun mese.
- **Pagamenti da fare** e **anticipi da recuperare** sempre in evidenza.
- **Voci fisse** (canoni, abbonamenti, rate) da aggiungere al mese con un tocco.

### Anticipi rateizzati

Per le spese pagate in anticipo e restituite a rate. Esempio: il condominio da 1000 € pagato per l'affittuario, che lo rimborsa poco alla volta.

- Si registra con importo anticipato, a carico di chi e rata prevista (facoltativa).
- Barra di recupero con "recuperati X €, mancano Y €".
- **Rimborso ricevuto** propone già l'importo della rata e registra l'incasso.
- A rimborso completato, l'anticipo risulta recuperato.

### Scadenze e promemoria

- Bollette, rate e tasse con importo, data, fonte, categoria e ripetizione (una tantum, mensile, bimestrale, trimestrale, semestrale, annuale).
- Divise in **Scaduti**, **In arrivo** e **Più avanti**.
- **Pagato** registra la spesa e sposta la scadenza al periodo successivo.
- Numero dei pagamenti da fare sulla scheda Scadenze e, dove supportato, sull'icona dell'app.

### Totali

- Filtro per fonte e per periodo (anno selezionato o da sempre).
- Raggruppamento **per fonte** (incassi, spese e netto di ciascuna) o **per categoria**.
- Grafici: spese per categoria, spese per fonte mese per mese, incassi e spese, netto mensile.

### Archivio annuale

- A inizio anno l'app riparte dall'anno nuovo; l'anno concluso viene **archiviato** e resta consultabile con le frecce dell'anno.
- Gli anni archiviati sono in **sola lettura**; per correggere un errore c'è *Sblocca modifiche*.
- Nessun dato viene cancellato.

### Personalizzazione

- **Categorie personalizzate**: si creano al volo con "+ Nuova" da ogni modulo, o si gestiscono in Impostazioni (rinominando una categoria si aggiornano tutti i movimenti).
- **Riquadri spostabili**: tenendo premuto un riquadro si solleva e si trascina dove si preferisce (scheda della fonte, Totali, ordine delle caselle). Ripristinabile da Impostazioni.
- **Tasto indietro** del telefono per tornare dalla scheda di una fonte alle caselle.
- Tema nero, grigio e giallo con decorazioni di monete, banconote e casseforti; animazioni con pioggia di monete e banconote.

---

## Notifiche: cosa aspettarsi

Le notifiche si attivano da *Impostazioni → Promemoria*, scegliendo con quanti giorni di anticipo essere avvisati (c'è anche una notifica di prova).

- La notifica arriva **all'apertura dell'app** o quando torna in primo piano.
- È previsto anche un controllo in background, ma Chrome su Android lo concede solo alle app installate e usate spesso, e decide lui quando eseguirlo.
- Su Android il pallino sull'icona compare quando c'è una notifica attiva dell'app.
- Per avvisi garantiti anche ad app chiusa servirebbe un servizio push esterno (ad esempio Firebase Cloud Messaging).

## Installazione

1. Aprire l'indirizzo dell'app con **Chrome** sul telefono Android.
2. Toccare il pulsante **Installa app** accanto al nome (in alternativa: menu ⋮ di Chrome → *Installa app*).
3. L'app compare tra le applicazioni con la sua icona.

> Consigliato Chrome anziché il browser Samsung, per installazione e notifiche.

## Aggiornamento

1. Scaricare i file aggiornati.
2. Nel repository GitHub, da Chrome: **Add file → Upload files** (se il pulsante non compare, attivare *Sito desktop*).
3. Caricare i file sovrascrivendo i precedenti e confermare con **Commit changes**.
4. Dopo un paio di minuti riaprire l'app e controllare la versione accanto al nome.

## Dati e backup

- Tutti i dati restano **solo sul telefono**: non vengono inviati a nessun server.
- Esportare periodicamente un **backup** (JSON) o un **CSV** per Excel da *Impostazioni → Backup*.
- Il backup si reimporta sullo stesso o su un altro dispositivo.
- Le versioni nuove convertono automaticamente i dati delle precedenti.
- Può stare sullo stesso dominio GitHub di altre app: i dati non si mescolano.

## Struttura dei file

| File | Contenuto |
|---|---|
| `index.html` | L'intera app: interfaccia, stili e logica |
| `manifest.webmanifest` | Nome, colori, icone e scorciatoia alle Scadenze |
| `sw.js` | Service worker: installazione, offline, promemoria in background |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | Icone dell'app |
| `maskable-192.png`, `maskable-512.png` | Icone con margine per le forme rotonde di Android |
| `badge-96.png` | Iconcina monocromatica per la barra delle notifiche |

## Tecnologie

- HTML, CSS e JavaScript in un unico file, senza framework.
- Progressive Web App (manifest, service worker, Notifications API, Badging API, Periodic Background Sync dove disponibile), pubblicata con **GitHub Pages**.
- [Chart.js](https://www.chartjs.org/) per i grafici, font Nunito da Google Fonts.
- Salvataggio con `localStorage` e copia delle scadenze in IndexedDB per i controlli in background.

## Storico delle versioni

| Versione | Novità |
|---|---|
| **2.2** | Riquadri spostabili con pressione lunga e riordino delle caselle delle fonti |
| **2.1** | Selezione per anno, calendario con giorni segnati, storico annuale, archiviazione automatica a fine anno |
| **2.0** | Fonti di incasso al posto delle case, caselle con stato rosso/verde, anticipi rateizzati, categorie personalizzate, rimozione dei risparmi |
| **1.1** | Pulsante di installazione |
| **1.0** | Prima versione: spese per abitazione, scadenze con promemoria, totali e grafici |
