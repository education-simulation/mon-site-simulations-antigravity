// Moteur du site (ne pas modifier) : React + Vite.
// base « ./ » : le même site marche sur l'ordinateur (aperçu http://localhost:5173/) et sur GitHub Pages
// (https://pseudo.github.io/nom-du-depot/), sans rien régler, quel que soit le nom du dépôt.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  // Aperçu sur http://localhost:5173/ (si ce port est pris, Vite en choisit un autre et l'affiche : « Local: … »).
  server: { port: 5173 },
})
