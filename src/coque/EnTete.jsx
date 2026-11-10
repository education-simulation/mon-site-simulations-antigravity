// ============================================================
//  EN-TÊTE DU SITE (moteur, ne pas modifier) — d'après la « Paillasse virtuelle » de Nils Aronssohn.
//  Toujours visible : il se range quand on descend dans la page et revient quand on remonte.
//  Titre (retour à l'accueil) · un menu par niveau, ses simulations rangées par chapitre.
//  Sur écran étroit, les menus se regroupent derrière un bouton « Menu ».
// ============================================================
import { useState, useEffect, useRef } from "react";

export const HAUTEUR_ENTETE = 60;

// menus : [{ id, label, chapitres: [{ nom, sims: [{ id, icone, titre }] }] }]
export function EnTete({ titre, menus, activeId, niveauActif, naviguer }) {
  const [ouvert, setOuvert] = useState(null);        // id du menu déroulé (grand écran) ou 'mobile'
  const [accordeon, setAccordeon] = useState(null);  // niveau déplié dans le menu mobile
  const [large, setLarge] = useState(() => window.innerWidth >= 900);
  const [cache, setCache] = useState(false);
  const ref = useRef(null);
  const dernierY = useRef(0);

  useEffect(() => {
    const defile = () => {
      const y = window.scrollY, dy = y - dernierY.current;
      if (Math.abs(dy) < 8) return;
      dernierY.current = y;
      setCache(dy > 0 && y > HAUTEUR_ENTETE);
    };
    const taille = () => setLarge(window.innerWidth >= 900);
    window.addEventListener("scroll", defile, { passive: true });
    window.addEventListener("resize", taille);
    return () => { window.removeEventListener("scroll", defile); window.removeEventListener("resize", taille); };
  }, []);
  useEffect(() => {
    if (!ouvert) return undefined;
    const dehors = (e) => { if (ref.current && !ref.current.contains(e.target)) setOuvert(null); };
    const echap = (e) => { if (e.key === "Escape") setOuvert(null); };
    document.addEventListener("mousedown", dehors);
    document.addEventListener("keydown", echap);
    return () => { document.removeEventListener("mousedown", dehors); document.removeEventListener("keydown", echap); };
  }, [ouvert]);

  const masque = cache && !ouvert;
  const aller = (id) => { setOuvert(null); naviguer(id); };

  const lienSim = (s) => (
    <button key={s.id} onClick={() => aller(s.id)} aria-current={s.id === activeId ? "page" : undefined}
      style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "7px 10px", border: "none", borderRadius: 8, cursor: "pointer",
        fontSize: 14.5, color: "var(--texte)", background: s.id === activeId ? "var(--accent-clair)" : "transparent", fontWeight: s.id === activeId ? 800 : 600 }}>
      <span aria-hidden="true" style={{ fontSize: 18 }}>{s.icone}</span>
      <span style={{ flex: 1 }}>{s.titre}</span>
      {s.id === activeId && <span aria-hidden="true">●</span>}
    </button>
  );
  const chapitre = (c, k) => (
    <div key={k} style={{ minWidth: 0 }}>
      <div style={{ fontSize: 14.5, fontWeight: 800, background: "var(--accent-clair)", borderLeft: "4px solid var(--accent)", borderRadius: 6, padding: "5px 10px", margin: "6px 0 4px" }}>{c.nom}</div>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 8 }}>
        {c.sims.length ? c.sims.map(lienSim) : <span style={{ padding: "7px 10px", fontSize: 14, color: "var(--texte2)" }}>Bientôt des simulations ici.</span>}
      </div>
    </div>
  );
  const vide = <p style={{ margin: "6px 10px", color: "var(--texte2)" }}>Pas encore de simulation pour ce niveau.</p>;
  const bouton = (actif, deroule) => ({
    display: "inline-flex", alignItems: "center", gap: 5, padding: "8px 12px", border: "none", background: deroule ? "#f1f5f9" : "transparent",
    borderBottom: `4px solid ${actif ? "var(--accent)" : "transparent"}`, borderRadius: "8px 8px 0 0", cursor: "pointer",
    fontSize: 15, fontWeight: actif ? 800 : 700, color: "var(--texte)", whiteSpace: "nowrap", height: HAUTEUR_ENTETE - 8,
  });
  const panneau = { position: "absolute", left: 0, right: 0, top: "100%", background: "white", borderBottom: "1px solid var(--bord)",
    maxHeight: `calc(100vh - ${HAUTEUR_ENTETE}px)`, overflowY: "auto", textAlign: "left" };
  const menuOuvert = menus.find((m) => m.id === ouvert);

  return (
    <header ref={ref} style={{ position: "sticky", top: 0, zIndex: 30, height: HAUTEUR_ENTETE, transform: masque ? "translateY(-110%)" : "none",
      transition: "transform 0.25s ease", background: "white", borderBottom: "1px solid var(--bord)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: "100%", padding: "0 16px", maxWidth: 1280, margin: "0 auto" }}>
        <a href="?" onClick={(e) => { e.preventDefault(); aller(null); }} title="Retour à l'accueil"
          style={{ alignSelf: "center", textDecoration: "none", marginRight: 14, display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true" style={{ flexShrink: 0 }}>
            <rect width="64" height="64" rx="14" fill="var(--accent)" />
            <path d="M26 12h12M28 12v14L16 48a4 4 0 0 0 3.5 6h25a4 4 0 0 0 3.5-6L36 26V12" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M21 42h22" stroke="#f5a31a" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <span style={{ font: "800 20px 'Outfit', sans-serif", color: "var(--accent)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{titre}</span>
        </a>

        {large && <nav aria-label="Niveaux" style={{ display: "flex", alignItems: "flex-end", gap: 2, flex: 1, minWidth: 0 }}>
          {menus.map((m) => (
            <button key={m.id} onClick={() => setOuvert((o) => (o === m.id ? null : m.id))} aria-expanded={ouvert === m.id} style={bouton(niveauActif === m.id, ouvert === m.id)}>
              {m.label}<span aria-hidden="true" style={{ fontSize: 10 }}>{ouvert === m.id ? "▲" : "▼"}</span>
            </button>
          ))}
        </nav>}
        {!large && <span style={{ flex: 1 }} />}
        {!large && (
          <button onClick={() => setOuvert((o) => (o === "mobile" ? null : "mobile"))} aria-expanded={ouvert === "mobile"}
            style={{ alignSelf: "center", padding: "6px 11px", borderRadius: 10, border: "2px solid var(--bord)", background: ouvert === "mobile" ? "#f1f5f9" : "white", cursor: "pointer", fontSize: 15, fontWeight: 700, color: "var(--texte)" }}>
            <span aria-hidden="true">☰</span> Menu
          </button>
        )}
      </div>

      {large && menuOuvert && (
        <div style={panneau} role="region" aria-label={menuOuvert.label}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 16px 18px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px 22px" }}>
            {menuOuvert.chapitres.length ? menuOuvert.chapitres.map(chapitre) : vide}
          </div>
        </div>
      )}

      {!large && ouvert === "mobile" && (
        <div style={panneau} role="region" aria-label="Menu">
          <div style={{ padding: "8px 12px 14px" }}>
            <button onClick={() => aller(null)} style={{ display: "flex", width: "100%", padding: 10, border: "none", background: activeId === null ? "var(--accent-clair)" : "transparent",
              borderRadius: 8, fontSize: 15, fontWeight: 700, color: "var(--texte)", cursor: "pointer", textAlign: "left" }}>🏠 Accueil</button>
            {menus.map((m) => (
              <div key={m.id} style={{ borderTop: "1px solid var(--bord)" }}>
                <button onClick={() => setAccordeon((a) => (a === m.id ? null : m.id))} aria-expanded={accordeon === m.id}
                  style={{ display: "flex", width: "100%", justifyContent: "space-between", padding: "11px 10px", border: "none", background: "transparent", fontSize: 15.5, fontWeight: 800, color: "var(--texte)", cursor: "pointer" }}>
                  {m.label}<span aria-hidden="true">{accordeon === m.id ? "▲" : "▼"}</span>
                </button>
                {accordeon === m.id && <div style={{ paddingBottom: 8 }}>{m.chapitres.length ? m.chapitres.map(chapitre) : vide}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
