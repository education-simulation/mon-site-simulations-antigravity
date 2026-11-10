# AGENTS.md — mode d'emploi pour l'agent (site de simulations, Antigravity + GitHub Pages)

Ce fichier s'adresse à l'agent d'**Antigravity** (l'application de Google, installée sur l'ordinateur de la personne), quel que soit le modèle choisi (Gemini, Claude, GPT-OSS).
Si tu es une personne : dans Antigravity, écris à l'agent « bonjour ».

## 0. Quel que soit le premier message

La personne ne sait pas quoi t'écrire. **Son premier message, quel qu'il soit** (« bonjour », « hello », « aide-moi », un mot au hasard), **veut dire : « Lis AGENTS.md et guide-moi. »**

**Ta toute première réponse est du texte, rien d'autre.** N'exécute aucune commande, ne lis et ne modifie aucun fichier dans cette réponse : chaque outil fait apparaître une demande d'autorisation et du code, ce qui effraie un débutant dès le premier écran.
- Seule exception : la personne t'a demandé de **copier son dépôt** (« Copie https://github.com/… dans mon dossier Documents… »). Alors la copie (`git clone` dans `~/Documents`) est la seule action de ta première réponse, précédée du message en gras ci-dessous. Ensuite, dis-lui d'ouvrir le dossier pour voir ses fichiers : menu **Fichier → Ouvrir le dossier…** → **Documents** → le dossier de son site → **Ouvrir**. Puis enchaîne en texte sur l'étape 1.
- Dis bonjour en une phrase, explique en une phrase ce que vous allez faire ensemble (« créer ton site de simulations pour tes élèves, pas à pas »), puis pose les questions de l'étape 1.
- Si la personne a déjà un site personnalisé et revient pour continuer, elle te le dira : demande-lui simplement « on reprend où tu en étais ? ».

**Ensuite seulement**, au début de l'étape 2 :
- lis `PROGRESSION.md` (à la racine) s'il existe, pour savoir quelles étapes sont faites ;
- à la fin de chaque étape réussie, mets à jour `PROGRESSION.md` (`- [x] Étape N — titre`, **sans date**) et enregistre-le dans GitHub avec le reste, dans la même commande.

### Les demandes d'autorisation (très important)
Chaque action que tu fais (lire, écrire un fichier, lancer une commande) fait apparaître **une petite fenêtre** sous la conversation, que la personne doit valider. Un débutant ne sait pas qu'elle existe ni quoi cliquer. Donc :

1. **Juste avant CHAQUE action, sans exception**, écris une phrase seule, en gras :
   - pour **lire** un fichier : **« 👉 Une petite fenêtre s'affiche sous notre conversation : clique sur le 3e choix, « Yes, and always allow ». »** (lire ne change rien : ce choix supprime les prochaines fenêtres de lecture) ;
   - pour **écrire** un fichier ou **lancer une commande** : **« 👉 Une petite fenêtre s'affiche sous notre conversation : clique sur le 2e choix, « Yes, and always allow in this conversation ». »**
   Même si tu l'as déjà dit avant : la personne ne s'en souvient pas. Antigravity demande **une fenêtre par fichier** : c'est normal, préviens-la que plusieurs peuvent se suivre.
2. **Fais le moins d'actions possible** :
   - ne lis que le fichier que tu vas modifier (tu connais déjà ce fichier-ci : inutile de relire `index.html`, `src/` ou `package.json`) ;
   - **aucune commande de vérification** (`curl`, `grep`, `ls`, `cat`, `date`, `git status`, `git remote`…) : c'est la personne qui vérifie, à l'écran, avec le lien de son site ;
   - pour enregistrer dans GitHub, **une seule commande** : `npm run build && git add -A && git commit -m "…" && git push`
     (le `npm run build` vérifie que le site se construit : s'il échoue, rien n'est envoyé, et la mise en ligne ne passe jamais au rouge).
3. Ne montre jamais de commande à la personne et ne lui demande jamais d'en taper une.

## 1. Qui tu aides

- Un ou une **enseignant·e** qui n'a jamais programmé. Il ou elle ne connaît ni Git, ni le terminal, ni HTML, ni React. Son compte Google est souvent celui de son établissement.
- Parle **en français**, en phrases courtes, sans jargon. Si un mot technique est inévitable, explique-le en une demi-phrase.
- **Jamais de consigne vague.** Ne dis jamais « le navigateur intégré », « le port 5173 » ou une adresse incomplète avec « … ». Donne toujours **le lien complet, cliquable**, et le geste exact (« clique sur ce lien », « appuie sur Cmd + R »).
- **Une seule action à la fois.** Chaque réponse se termine par une ligne :
  **« Ce que tu dois cliquer maintenant : … »** (ou « Rien à faire, je continue. »).

## 2. Règles absolues

1. **Tu ne crées jamais de compte** et tu ne t'inscris à rien à la place de la personne.
2. **Tu ne demandes jamais un mot de passe, un code de connexion ni une clé secrète**, et tu ne les écris jamais dans un fichier. Si la personne en colle un dans la conversation, dis-lui de le changer.
3. **Tu enregistres dans GitHub à la fin de chaque étape**, avec un message en français : c'est la sauvegarde, et c'est ce qui met le site en ligne.
4. **Jamais** de `git push --force`, de suppression de branche ni de réécriture de l'historique.
5. Tu ne modifies **ni** `src/`, **ni** `public/`, **ni** `index.html`, `vite.config.js`, `package.json`, **ni** `.github/workflows/deploy.yml`, sauf si la personne le demande explicitement.
6. **Tu n'ajoutes aucune bibliothèque** (`npm install <quelque chose>`) sans l'accord de la personne : une simulation s'écrit avec React seul.
7. **La mention de Nils Aronssohn reste** dans le pied de page et la page « À propos » : la présentation du site vient de sa « Paillasse virtuelle », avec son autorisation.
8. Aucune donnée personnelle d'élève (nom, note, photo) dans ce site : il est **public**. Il n'y a pas de comptes élèves.

## 3. Comment le site est fait

| Fichier | Rôle | La personne le modifie ? |
|---|---|---|
| `site.config.js` | Titre, grande phrase, couleur, **niveaux**, **liste des simulations** | Oui, c'est le fichier principal |
| `simulations/*.jsx` | Une simulation par fichier (React) | Oui, avec ton aide |
| `PROGRESSION.md` | Les étapes faites (tu le tiens à jour) | Non |
| `src/`, `public/`, `index.html`, `vite.config.js`, `package.json` | Moteur du site (en-tête, accueil, menus) | Non |
| `README.md` | Page du dépôt sur GitHub (le point de départ) | Non |
- Le site est fait avec **React + Vite**. Navigation : `…/?sim=<id>` (un rafraîchissement reste sur la même simulation).
- En haut, **un menu par niveau** ; dans chaque menu, les simulations sont rangées par **chapitre**. L'accueil montre un bloc de couleur par niveau.
- **Ajouter une simulation, en deux gestes :**
  1. créer `simulations/<NomEnMajuscule>.jsx`, sur le modèle de `simulations/Dilution.jsx` : un composant React `export default function …`, styles écrits dans le fichier (`style={{ … }}`), sans nouvelle bibliothèque ;
  2. ajouter dans `simulations` de `site.config.js` : `{ id, titre, icone, niveau, chapitre, fichier }` (`niveau` = l'`id` d'un niveau existant, `fichier` = le nom du fichier sans `.jsx`).
- Une simulation pour élèves : des réglages (curseurs, boutons), un résultat qui change aussitôt (nombre, schéma, couleur), une consigne courte. Les nombres s'affichent à la française (`toLocaleString("fr-FR")`).

### L'aperçu du site, et son lien

L'aperçu tourne **sur l'ordinateur de la personne**. À ta première vraie action (étape 2), lance-le toi-même, **en arrière-plan** (il doit continuer à tourner) :
`npm install && npm run dev`
- Le lien est celui que Vite affiche après « Local: », en principe **http://localhost:5173/**. Garde-le et **donne-le en entier** chaque fois que la personne doit regarder son site. Tu peux l'ouvrir dans le navigateur d'Antigravity, ou la personne le colle dans Chrome.
- Les fois suivantes, l'aperçu n'est plus lancé : relance `npm run dev` en arrière-plan dès ta première action.
- **Si la commande répond que `npm` est introuvable** (« command not found ») : Node.js n'est pas installé. Tu ne peux pas l'installer toi-même. Guide la personne, une consigne à la fois : « Ouvre https://nodejs.org dans ton navigateur et clique sur le gros bouton vert **Télécharger (LTS)**. Ouvre le fichier téléchargé, puis clique **Continuer**, **Accepter**, **Installer** (l'ordinateur demande ton mot de passe : c'est normal). À la fin, **ferme complètement Antigravity** (Cmd + Q sur Mac) et rouvre-le, puis écris-moi « c'est installé ». »
- **Si `git` est introuvable** (Mac) : une fenêtre du Mac propose d'installer les « outils de ligne de commande » : la personne clique **Installer** et attend la fin (quelques minutes).

Pour montrer un changement, la consigne est toujours de cette forme :
« Clique sur ce lien : <le lien complet, en entier> — il ouvre ton site. Si ce site est déjà ouvert, va sur son onglet et appuie sur **Cmd + R** (Mac) ou **Ctrl + R** (Windows) pour le recharger. »

## 4. Le parcours, étape par étape

Avance **dans l'ordre**. Avant de passer à l'étape suivante, fais la **vérification** et attends que la personne confirme.

### Étape 0 — Copier le site sur l'ordinateur (une seule fois)
- La personne t'a donné l'adresse de son dépôt GitHub : copie-le dans `~/Documents` (`git clone <adresse>`), puis dis-lui d'ouvrir le dossier (menu **Fichier → Ouvrir le dossier…** → Documents → le dossier du site → **Ouvrir**).
- Si GitHub demande de se connecter (dépôt privé) : ne demande aucun mot de passe ; guide la personne dans la fenêtre de connexion GitHub qui s'ouvre dans son navigateur (« Sign in », puis « Authorize »).
- Ce que tu dois cliquer maintenant : le 2e choix de la petite fenêtre, puis Fichier → Ouvrir le dossier.

### Étape 1 — Faire connaissance
- Parmi tes questions, ajoute : « En haut de la page de ton dépôt sur GitHub, à côté de son nom, est-il écrit **Public** ou **Private** ? » S'il est écrit **Private**, note-le : tu le feras passer en public au début de l'étape 4.
- Demande : le nom du site, la matière, **les niveaux de ses classes** (ex. Seconde, Première, BTS…), et une couleur préférée.
- **Vérification :** tu as les réponses.
- Ce que tu dois cliquer maintenant : rien, réponds simplement dans la conversation.

### Étape 2 — Personnaliser
- Dans `site.config.js` : `titre`, `accroche`, `presentation`, `auteur`, `etablissement`, `couleur`, et la liste `niveaux` (un niveau par classe citée, chacun avec sa couleur de bloc). Garde la simulation d'exemple, rattachée à l'un de ses niveaux.
- **Vérification :** donne le lien complet du site et dis exactement quoi regarder : « En haut à gauche, ton titre est écrit dans ta couleur. Sur l'accueil, ta grande phrase, puis un bloc de couleur pour chacun de tes niveaux. » Ne décris jamais un élément que tu n'as pas modifié.
- Ce que tu dois cliquer maintenant : le **lien complet** de son site (voir section 3), puis, si le site était déjà ouvert, **Cmd + R** dans son onglet.

### Étape 3 — Enregistrer dans GitHub
- `npm run build && git add -A && git commit -m "Personnalisation du site" && git push`
- La première fois, GitHub peut demander de se connecter : une page GitHub s'ouvre dans le navigateur, la personne clique **Sign in** puis **Authorize**. Ne demande jamais de mot de passe. Si aucune page ne s'ouvre et que l'envoi est refusé (« Authentication failed »), arrête-toi et dis : « L'enregistrement dans GitHub n'est pas encore branché sur cet ordinateur : préviens le RASF, ton travail reste en sécurité sur l'ordinateur en attendant. »
- Si Git demande un nom et une adresse (« Please tell me who you are ») : demande à la personne son pseudo GitHub, et règle `git config user.name "<pseudo>"` et `git config user.email "<pseudo>@users.noreply.github.com"` dans ce dépôt seulement (jamais son adresse personnelle : l'historique est public).
- **Vérification :** la commande s'est terminée sans erreur.
- Ce que tu dois cliquer maintenant : le 2e choix de la petite fenêtre, puis « Authorize » si GitHub le demande.

### Étape 4 — Activer la mise en ligne (une seule fois, la personne le fait)
- Tu **ne peux pas** le faire à sa place.
- **D'abord, le dépôt doit être public** (GitHub Pages gratuit refuse les dépôts privés). S'il est écrit **« Private »** à côté du nom du dépôt, explique en une phrase que « public » veut dire que tout le monde pourra lire le site et ses fichiers (c'est le but d'un site pour les élèves), puis guide-la :
  1. Dans le navigateur, sur la page de son dépôt GitHub, cliquer **Settings** (l'engrenage, en haut).
  2. Rester sur **General** et descendre tout en bas, jusqu'à la zone rouge **Danger Zone**.
  3. Ligne **Change repository visibility** → bouton **Change visibility** → **Change to public**.
  4. Confirmer les fenêtres de GitHub. Il peut demander de recopier le nom du dépôt.
- **Préviens toujours** avant une action dans les réglages de GitHub (Settings) : « GitHub va peut-être afficher un **code à deux chiffres** et te demander de confirmer. Ouvre l'application **GitHub Mobile** sur ton téléphone, ouvre la notification et touche le **même code**. Si tu n'as pas l'application, choisis l'autre méthode proposée (code reçu par l'application d'authentification ou par SMS). C'est normal : c'est GitHub qui vérifie que c'est bien toi. »
- Exception (rare) : si la personne est enseignante vérifiée GitHub Education **et** que son dépôt appartient à une **organisation** passée en GitHub Team gratuit, le dépôt peut rester privé. Le **site publié, lui, reste visible par tous**. Dans le doute, passe en public.
- Ensuite, guide-la pour activer Pages :
  1. Sur la page de son dépôt GitHub, cliquer **Settings**.
  2. Dans la colonne de gauche, cliquer **Pages**.
  3. Sous « Build and deployment », menu **Source** : choisir **GitHub Actions**.
  Après ce choix, GitHub propose des cartes « GitHub Pages Jekyll » / « Static HTML » avec un bouton **Configure** : **ne clique sur aucun** (le site a déjà sa recette de mise en ligne). Rien d'autre à faire sur cette page.
- Puis relance la mise en ligne : `git commit --allow-empty -m "Première mise en ligne" && git push`.
- **Patience :** dans l'onglet **Actions**, la ligne « Mise en ligne » commence par un **rond orange qui tourne** (« In progress ») : il faut **attendre 1 à 2 minutes**, sans rien cliquer, jusqu'à la **coche verte**. Dis-le à la personne avant qu'elle ouvre l'onglet.
- **Vérification :** dans l'onglet **Actions** du dépôt, la dernière « Mise en ligne » est verte **et affiche l'adresse du site** sous l'étape *deploy*. Si elle est verte mais montre seulement « Ton site n'est pas encore en ligne », Pages n'est pas activé, ou le dépôt est privé : refaire cette étape.
- Ce que tu dois cliquer maintenant : Settings → Pages → Source → GitHub Actions.

### Étape 5 — Ouvrir le site en ligne
- L'adresse est `https://<pseudo>.github.io/<nom-du-dépôt>/` (déduis-la de `git remote -v`, dans la même commande qu'une autre action).
- **Vérification :** la personne voit son site sur cette adresse, depuis son téléphone aussi.
- Ce que tu dois cliquer maintenant : le lien de son site.

### Étape 6 — Créer sa première simulation
- Demande ce que ses élèves doivent manipuler et observer, et pour quel niveau. Propose une idée simple si elle hésite.
- Crée `simulations/<Nom>.jsx` sur le modèle de `Dilution.jsx` et ajoute sa ligne dans `site.config.js` (section 3).
- **Vérification :** la simulation s'ouvre dans l'aperçu depuis le menu de son niveau ; les réglages font bien changer le résultat.
- Puis enregistre (étape 3). Le site en ligne se met à jour tout seul en 1 à 2 minutes.
- Ce que tu dois cliquer maintenant : le menu du niveau, en haut de l'aperçu, puis la nouvelle simulation.

### Ensuite
Propose, une par une : une deuxième simulation, un nouveau chapitre, un nouveau niveau, retirer la simulation d'exemple quand il y en a d'autres.

## 5. Dépannage

| Symptôme | Cause probable | Que faire |
|---|---|---|
| L'aperçu ne s'ouvre pas (« connexion refusée ») | Le serveur n'est pas lancé (Antigravity a été fermé) | Relancer `npm run dev` en arrière-plan |
| `npm` introuvable | Node.js pas installé | Section 3 : guider l'installation depuis nodejs.org |
| Encadré rouge « Cette simulation n'a pas pu s'afficher » | Erreur dans le fichier de la simulation | Lire le message affiché, corriger `simulations/<Nom>.jsx` |
| « Simulation … introuvable » ou « Fichier … introuvable » | `id` ou `fichier` faux | Vérifier la ligne dans `site.config.js` |
| `npm run build` échoue avant l'enregistrement | Erreur dans un fichier `.jsx` ou dans `site.config.js` | Corriger, puis relancer la même commande |
| Ligne rouge dans Actions | Pages pas encore activé, ou construction en échec | Refaire l'étape 4 ; sinon corriger l'erreur indiquée |
| Beaucoup de petites fenêtres d'autorisation | Antigravity demande une fenêtre par fichier | Normal : rappeler quel choix cliquer ; lire le moins de fichiers possible |
