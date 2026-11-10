// ============================================================
//  MOTEUR DU SITE (ne pas modifier) — d'après la « Paillasse virtuelle » de Nils Aronssohn.
//  Lit site.config.js, construit les menus par niveau et chapitre, affiche la simulation demandée.
//  L'adresse d'une simulation est de la forme  …/?sim=identifiant  : un rafraîchissement
//  (Cmd + R / F5) ramène toujours sur la même page.
// ============================================================
import { lazy, useEffect, useMemo, useState } from "react";
import SITE from "../site.config.js";
import { EnTete } from "./coque/EnTete";
import { Accueil } from "./coque/Accueil";
import { PiedDePage, APropos } from "./coque/PiedDePage";
import { Apercu, estApercu } from "./coque/Apercu";
import { EnChargement } from "./coque/chargement";

// Chaque fichier du dossier simulations/ est chargé seulement quand on ouvre sa simulation.
const FICHIERS = import.meta.glob("../simulations/*.jsx");
const composants = {};
function composant(fichier) {
  const chemin = `../simulations/${String(fichier).replace(/\.jsx$/, "")}.jsx`;
  if (!FICHIERS[chemin]) return null;
  return (composants[chemin] ||= lazy(FICHIERS[chemin]));
}

// Menus : un par niveau, ses simulations regroupées par chapitre (dans l'ordre de site.config.js).
function construireMenus(site) {
  return (site.niveaux || []).map((n) => {
    // Chapitres déclarés dans le niveau (même vides), puis ceux des simulations.
    const chapitres = (n.chapitres || []).map((nom) => ({ nom, sims: [] }));
    site.simulations.filter((s) => s.niveau === n.id).forEach((s) => {
      const nom = s.chapitre || "Simulations";
      let c = chapitres.find((x) => x.nom === nom);
      if (!c) chapitres.push((c = { nom, sims: [] }));
      c.sims.push(s);
    });
    return { id: n.id, label: n.nom || n.id, fond: n.fond, texte: n.texte, chapitres };
  });
}

const lireId = () => new URLSearchParams(window.location.search).get("sim");

export default function App() {
  const menus = useMemo(() => construireMenus(SITE), []);
  const [activeId, setActiveId] = useState(lireId);
  const [copie, setCopie] = useState(false);
  const sim = SITE.simulations.find((s) => s.id === activeId);

  useEffect(() => { document.documentElement.style.setProperty("--accent", SITE.couleur || "#0b4f94"); }, []);
  useEffect(() => {
    const retour = () => setActiveId(lireId());
    window.addEventListener("popstate", retour);
    return () => window.removeEventListener("popstate", retour);
  }, []);
  useEffect(() => {
    document.title = sim ? `${sim.titre} — ${SITE.titre}` : activeId === "a-propos" ? `À propos — ${SITE.titre}` : SITE.titre;
    window.scrollTo(0, 0);
  }, [activeId, sim]);

  function naviguer(id) {
    const u = new URL(window.location.href);
    if (id) u.searchParams.set("sim", id); else u.searchParams.delete("sim");
    window.history.pushState(null, "", u.toString());
    setActiveId(id || null);
  }
  function partager() {
    navigator.clipboard?.writeText(window.location.href).then(() => { setCopie(true); setTimeout(() => setCopie(false), 2000); });
  }

  const Composant = sim && composant(sim.fichier);
  let titre = null, contenu;
  if (!activeId) contenu = <Accueil site={SITE} menus={menus} naviguer={naviguer} />;
  else if (activeId === "a-propos") { titre = "À propos"; contenu = <APropos site={SITE} />; }
  else if (!sim) contenu = <p className="erreur">Simulation « {activeId} » introuvable. Vérifie son <code>id</code> dans site.config.js.</p>;
  else if (!Composant) { titre = sim.titre; contenu = <p className="erreur">Fichier <code>simulations/{sim.fichier}.jsx</code> introuvable. Vérifie la ligne <code>fichier</code> de cette simulation dans site.config.js.</p>; }
  else { titre = sim.titre; contenu = <EnChargement key={sim.id}><Composant /></EnChargement>; }

  return (
    <div className="racine">
      {estApercu && <Apercu />}
      <EnTete titre={SITE.titre} menus={menus} activeId={activeId} niveauActif={sim?.niveau} naviguer={naviguer} />
      <main className="principal">
        {titre && (
          <div className="barre-titre">
            {sim && <span className="icone-sim" aria-hidden="true">{sim.icone}</span>}
            <h1>{titre}</h1>
            {sim && <button className="bouton-pilule" onClick={partager} style={copie ? { background: "#2a9d8f", color: "#fff" } : null}>{copie ? "✓ Lien copié !" : "🔗 Partager"}</button>}
          </div>
        )}
        <div className="zone-sim">{contenu}</div>
        <PiedDePage site={SITE} naviguer={naviguer} />
      </main>
    </div>
  );
}
