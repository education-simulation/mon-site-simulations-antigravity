// Exemple de simulation : la dilution d'une solution (C₁ × V₁ = C₂ × V₂).
// Sers-t'en de modèle : un fichier par simulation, qui « exporte » un composant React par défaut.
import { useState } from "react";

const carte = { background: "#fff", border: "1px solid #d5dfeb", borderRadius: 22, padding: "20px 22px" };

function Curseur({ libelle, valeur, min, max, pas, unite, onChange }) {
  return (
    <label style={{ display: "block", margin: "14px 0" }}>
      <span style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
        <span>{libelle}</span>
        <span>{valeur.toLocaleString("fr-FR")} {unite}</span>
      </span>
      <input type="range" min={min} max={max} step={pas} value={valeur}
        onChange={(e) => onChange(Number(e.target.value))} style={{ width: "100%" }} />
    </label>
  );
}

export default function Dilution() {
  const [c1, setC1] = useState(0.1);      // mol/L
  const [v1, setV1] = useState(10);       // mL prélevés
  const [v2, setV2] = useState(100);      // mL de la fiole jaugée
  const c2 = v1 <= v2 ? (c1 * v1) / v2 : null;
  const facteur = v1 > 0 ? v2 / v1 : 0;
  // Teinte de la solution fille : plus elle est diluée, plus elle est pâle.
  const intensite = c2 === null ? 0 : Math.min(1, c2 / 0.2);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
      <section style={carte} aria-label="Réglages">
        <h2 style={{ marginTop: 0 }}>Réglages</h2>
        <Curseur libelle="Concentration de la solution mère C₁" valeur={c1} min={0.01} max={0.2} pas={0.01} unite="mol/L" onChange={setC1} />
        <Curseur libelle="Volume prélevé V₁ (pipette)" valeur={v1} min={1} max={50} pas={1} unite="mL" onChange={setV1} />
        <Curseur libelle="Volume de la fiole jaugée V₂" valeur={v2} min={50} max={500} pas={50} unite="mL" onChange={setV2} />
      </section>

      <section style={carte} aria-label="Résultat">
        <h2 style={{ marginTop: 0 }}>Solution fille</h2>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
          <div aria-hidden="true" style={{ width: 90, height: 160, border: "3px solid #334155", borderTop: "none", borderRadius: "0 0 18px 18px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${Math.max(10, (v2 / 500) * 100)}%`, background: `rgba(124, 58, 237, ${0.08 + 0.8 * intensite})`, transition: "all .3s" }} />
          </div>
          <div style={{ fontSize: 18, lineHeight: 1.7 }}>
            {c2 === null
              ? <p style={{ color: "#b91c1c" }}>Impossible : on ne peut pas prélever plus que le volume de la fiole.</p>
              : <>
                  <p style={{ margin: 0 }}>C₂ = C₁ × V₁ / V₂</p>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: 24 }}>C₂ = {c2.toLocaleString("fr-FR", { maximumSignificantDigits: 3 })} mol/L</p>
                  <p style={{ margin: 0 }}>Facteur de dilution : {facteur.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}</p>
                </>}
          </div>
        </div>
      </section>
    </div>
  );
}
