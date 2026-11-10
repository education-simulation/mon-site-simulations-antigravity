// ============================================================
//  site.config.js — LE FICHIER PRINCIPAL DE TON SITE
// ============================================================
//  - Le titre, la couleur, les niveaux et le menu viennent tous d'ici.
//  - Une simulation = un fichier dans le dossier simulations/
//    + une ligne dans la liste « simulations » ci-dessous.
//  - Ton assistant s'en occupe : dis-lui simplement ce que tu veux.
// ============================================================

export default {
  // Nom du site (en haut à gauche et dans l'onglet du navigateur).
  titre: "Mon labo virtuel",

  // Grande phrase de la page d'accueil. Le morceau entre [crochets] est surligné.
  accroche: "Manipuler, se tromper, [recommencer.]",

  // Petit texte de présentation, sous la grande phrase.
  presentation: "Des simulations de sciences pour mes élèves : on change les réglages, on observe, on comprend.",

  auteur: "Prénom Nom",
  etablissement: "Mon lycée",

  // Couleur principale (titre, boutons, menu actif). Code couleur au format #RRGGBB.
  couleur: "#0b4f94",

  // Les niveaux : un menu en haut du site et un bloc de couleur sur l'accueil pour chacun.
  //   id        : abréviation courte (affichée en gros sur l'accueil)
  //   nom       : nom complet
  //   fond      : couleur du bloc ; texte : couleur des écritures sur ce bloc
  //   chapitres : (facultatif) les chapitres ou modules du menu, dans l'ordre, même encore vides
  niveaux: [
    { id: "BTS", nom: "BTS Métiers de la chimie", fond: "#5b4bdb", texte: "#ffffff",
      chapitres: ["Analyse", "Synthèse", "Formulation", "Projet", "Communication"] },
  ],

  // Les simulations. Chacune :
  //   id       : son adresse (lettres minuscules, chiffres et tirets) → …/?sim=dilution
  //   titre    : son nom dans le menu
  //   icone    : un émoji
  //   niveau   : l'id d'un des niveaux ci-dessus
  //   chapitre : le chapitre (ou module) où la ranger dans le menu de ce niveau
  //   fichier  : le nom du fichier dans simulations/ (sans « .jsx »)
  simulations: [
    { id: "dilution", titre: "Dilution d'une solution", icone: "🧪", niveau: "BTS", chapitre: "Analyse", fichier: "Dilution" },
  ],
};
