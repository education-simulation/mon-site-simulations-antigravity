// Bandeau « aperçu » et volet « Les étapes de ton site » (moteur, ne pas modifier).
// Visibles seulement sur l'ordinateur (localhost), pendant que le prof travaille avec Antigravity,
// jamais sur le site publié. Les étapes cochées viennent de PROGRESSION.md, tenu à jour par l'assistant.
import { useEffect, useState } from "react";

const ETAPES = [
  ["Copier ton site sur l'ordinateur", "Dans Antigravity, tu as demandé à l'agent de copier ton dépôt. C'est fait si tu lis ce texte."],
  ["Faire connaissance", "Écris « bonjour » à l'agent et réponds à ses questions."],
  ["Personnaliser le site", "L'agent change le titre, la couleur et les niveaux. Toi : recharge cet onglet (Cmd + R)."],
  ["Enregistrer dans GitHub", "L'agent s'en charge. La première fois, GitHub peut te demander de te connecter dans ton navigateur : clique « Authorize »."],
  ["Mettre en ligne (une seule fois)", "Sur GitHub, dans ton dépôt : Settings → Pages → Source : « GitHub Actions ». Ne clique sur aucun « Configure ». Le dépôt doit être Public. GitHub peut demander un code sur ton téléphone (application GitHub Mobile)."],
  ["Voir le site en ligne", "Onglet Actions du dépôt : un rond orange tourne pendant 1 à 2 minutes, patiente jusqu'à la coche verte. Puis ouvre https://ton-pseudo.github.io/nom-du-depot/"],
  ["Créer ta première simulation", "Dis à l'agent ce que tu veux que tes élèves manipulent."],
];

export const estApercu = typeof location !== "undefined" && ["localhost", "127.0.0.1"].includes(location.hostname);

export function Apercu() {
  const [faites, setFaites] = useState(new Set());
  const [ouvert, setOuvert] = useState(() => { try { return localStorage.getItem("coque.voletEtapes") === "1"; } catch { return false; } });

  useEffect(() => {
    fetch("PROGRESSION.md", { cache: "no-cache" })
      .then((r) => (r.ok ? r.text() : ""))
      .then((t) => {
        if (!t || /<html/i.test(t)) return;
        const f = new Set([0]); // la copie est forcément faite si l'agent a écrit ce fichier
        t.split("\n").forEach((l) => { const m = l.match(/\[x\]\s*Étape\s*(\d+)/i); if (m) f.add(+m[1]); });
        setFaites(f);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="bandeau-apercu">
        <strong>👀 Ceci est l'aperçu de ton site.</strong> Toi seul le vois, sur ton ordinateur.
        <br />Pour le modifier, <strong>parle à l'agent dans Antigravity</strong>. Ensuite, reviens ici et appuie sur <strong>Cmd + R</strong> (Mac) ou <strong>Ctrl + R</strong> (Windows) pour voir le changement.
      </div>
      <details className="volet-etapes" open={ouvert}
        onToggle={(e) => { const o = e.currentTarget.open; setOuvert(o); try { localStorage.setItem("coque.voletEtapes", o ? "1" : "0"); } catch { /* sans importance */ } }}>
        <summary>📋 Les étapes de ton site (clique pour ouvrir ou fermer)</summary>
        <ol start="0">
          {ETAPES.map(([titre, detail], i) => (
            <li key={i} className={faites.has(i) ? "faite" : ""}>
              <strong>{faites.has(i) ? "✅ " : ""}{titre}</strong><br /><span>{detail}</span>
            </li>
          ))}
        </ol>
      </details>
    </>
  );
}
