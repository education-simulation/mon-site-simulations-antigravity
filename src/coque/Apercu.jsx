// Bandeau « aperçu » et volet « Les étapes de ton site » (moteur, ne pas modifier).
// Visibles seulement sur l'ordinateur (localhost), pendant que le prof travaille avec Antigravity,
// jamais sur le site publié. Les étapes cochées viennent de PROGRESSION.md, tenu à jour par l'assistant.
import { useEffect, useState } from "react";

const ETAPES = [
  ["Copier le modèle sur l'ordinateur", "L'agent copie le modèle dans le dossier que tu as choisi et vérifie que Node.js est installé (sinon, il te guide pour l'installer). C'est fait si tu lis ce texte."],
  ["Faire connaissance", "L'agent te pose quelques questions, une par une : clique sur la réponse qui te convient."],
  ["Personnaliser le site", "L'agent change le titre, la couleur et les niveaux. Toi : recharge cet onglet (Cmd + R)."],
  ["Mettre en ligne avec Vercel", "La première fois : clique sur le lien donné par l'agent, « Continue with Google » avec ton compte d'établissement, vérifie le code, puis « Confirm »."],
  ["Voir le site en ligne", "Ouvre l'adresse https://nom-de-ton-site.vercel.app donnée par l'agent, aussi sur ton téléphone."],
  ["Créer ta première simulation", "Choisis la classe et l'idée proposées par l'agent. Il remet ensuite le site en ligne."],
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
