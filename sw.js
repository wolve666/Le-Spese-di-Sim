const CACHE = "spese-sim-v2.1";
const CORE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "badge-96.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("spese-sim-") && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html")))
  );
});

/* Promemoria in background (dove il telefono lo consente) */
function readSnap(){
  return new Promise(res => {
    const r = indexedDB.open("lss", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("kv");
    r.onsuccess = () => { const g = r.result.transaction("kv").objectStore("kv").get("snap"); g.onsuccess = () => res(g.result || null); g.onerror = () => res(null); };
    r.onerror = () => res(null);
  });
}
const pad = n => String(n).padStart(2, "0");
const today = () => { const d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
const diff = iso => Math.round((new Date(iso + "T12:00:00") - new Date(today() + "T12:00:00")) / 86400000);
const eur = n => new Intl.NumberFormat("it-IT", {style: "currency", currency: "EUR"}).format(n);
async function checkDue(){
  const s = await readSnap(); if (!s) return;
  const due = s.list.filter(x => diff(x.scadenza) <= s.giorni).sort((a, b) => a.scadenza.localeCompare(b.scadenza));
  try { if (self.navigator.setAppBadge) due.length ? self.navigator.setAppBadge(due.length) : self.navigator.clearAppBadge(); } catch (e) {}
  if (!s.attive || !due.length) return;
  const late = due.filter(x => diff(x.scadenza) < 0).length;
  const title = late ? `${late} ${late === 1 ? "pagamento scaduto" : "pagamenti scaduti"}` : `${due.length} ${due.length === 1 ? "pagamento in arrivo" : "pagamenti in arrivo"}`;
  const body = due.slice(0, 4).map(x => { const d = diff(x.scadenza); return `${x.nome} ${eur(x.importo)} · ${d < 0 ? "scaduta" : d === 0 ? "oggi" : d === 1 ? "domani" : "tra " + d + " giorni"}`; }).join("\n");
  return self.registration.showNotification(title, {body, tag: "scadenze", icon: "icon-192.png", badge: "badge-96.png", data: {url: "./#scadenze"}});
}
self.addEventListener("periodicsync", e => { if (e.tag === "lss-scadenze") e.waitUntil(checkDue()); });
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "./", self.registration.scope).href;
  e.waitUntil(clients.matchAll({type: "window", includeUncontrolled: true}).then(list => {
    for (const c of list) { if (c.url.startsWith(self.registration.scope)) { c.focus(); return c.navigate ? c.navigate(url) : null; } }
    return clients.openWindow(url);
  }));
});
