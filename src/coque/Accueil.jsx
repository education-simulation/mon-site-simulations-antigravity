// PAGE D'ACCUEIL (moteur, ne pas modifier) — d'après la « Paillasse virtuelle » de Nils Aronssohn.
// Grande phrase, présentation, puis un bloc de couleur par niveau avec ses chapitres.
// Les textes et les couleurs se changent dans site.config.js.

// « Manipuler, [recommencer.] » → le morceau entre crochets est surligné.
function Accroche({ texte }) {
  return texte.split(/(\[[^\]]*\])/).map((m, i) => (m.startsWith("[") ? <mark key={i}>{m.slice(1, -1)}</mark> : m));
}

export function Accueil({ site, menus, naviguer }) {
  const total = site.simulations.length;
  return (
    <div className="ab">
      <section className="ab-hero" aria-label="Présentation">
        <span className="ab-etiquette">{site.titre}</span>
        <h1><Accroche texte={site.accroche || site.titre} /></h1>
        {site.presentation && <p className="ab-lead">{site.presentation}</p>}
      </section>

      <div className="ab-titre-section">
        <h2>Les simulations, par niveau</h2>
        <span>{total} simulation{total > 1 ? "s" : ""}</span>
      </div>
      <div className="ab-bento">
        {menus.map((m, i) => {
          const nb = m.chapitres.reduce((t, c) => t + c.sims.length, 0);
          const large = (i % 4 === 0 || i % 4 === 3) ? 5 : 7;    // blocs alternés, comme une mosaïque
          return (
            <section key={m.id} className="ab-niv" aria-label={m.label}
              style={{ "--ab-fond": m.fond || "#2563eb", "--ab-ink": m.texte || "#ffffff", gridColumn: `span ${menus.length === 1 ? 12 : large}` }}>
              <span className="ab-abbr" aria-hidden="true">{m.id}</span>
              <h3>{m.label}</h3>
              <p className="ab-nb">{nb} simulation{nb > 1 ? "s" : ""} · {m.chapitres.length} chapitre{m.chapitres.length > 1 ? "s" : ""}</p>
              <ul className="ab-puces">
                {m.chapitres.flatMap((c) => c.sims).map((s) => (
                  <li key={s.id}><button type="button" onClick={() => naviguer(s.id)}>{s.icone} {s.titre}</button></li>
                ))}
                {m.chapitres.filter((c) => !c.sims.length).map((c) => (
                  <li key={c.nom}><span className="ab-puce-vide">{c.nom} · bientôt</span></li>
                ))}
              </ul>
            </section>
          );
        })}
        <section className="ab-carte" aria-label="Auteur">
          <h3>{site.auteur}</h3>
          <p>{site.etablissement}</p>
        </section>
      </div>
    </div>
  );
}
