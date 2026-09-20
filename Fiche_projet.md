# Fiche Projet  — CLI Generator Prompt (`prompt-builder`)

## Objectif

Développer une CLI interactive en Node.js (compilée en binaire autonome) permettant de personnaliser l'invite de commande (`PS1`) d'un terminal (Linux, macOS, WSL) en temps réel, avec application par session, option de sauvegarde permanente sécurisée et réinitialisation.

---

## Fil rouge de développement

```text
[Phase 1 : Context System] ──> [Phase 2 : TUI Engine] ──> [Phase 3 : PS1 Builder] ──> [Phase 4 : Exec/Persist] ──> [Phase 5 : Distribution & Alias]

```

---

### Phase 1 — Détection de l'environnement & Arguments (Socle)

1. **Détection du Shell actif** :

* Inspecter `$SHELL` pour identifier si l'utilisateur est sous **Bash** ou **Zsh**.
* *Rôle* : Conditionner les séquences d'échappement (ex. `\[...\]` en Bash vs `%{...%}` en Zsh).

2. **Identification de l'OS** :

* Détecter Linux, macOS ou WSL pour cibler le bon fichier de configuration utilisateur (`~/.bashrc` ou `~/.zshrc`).

3. **Parseur d'arguments CLI** :

* Traiter les flags directs (`--reset`, `--save`, `--help`) pour bypasser le TUI si demandé.

---

### Phase 2 — Moteur TUI & Personnalisation (Menu Interactif)

1. **Routage d'affichage strict** :
* Rediriger l'intégralité du rendu visuel et des entrées clavier sur `stderr` ou `/dev/tty` afin de préserver la sortie standard (`stdout`) pour le wrapper `eval`.


2. **Sélection des composants du prompt** :

* Activer/désactiver : Utilisateur (`user`), Nom d'hôte (`host`), Répertoire courant (`dir`), Symbole de fin (`❯`, `$`, `⚡`). 

3. **Personnalisation des styles** :    

* Sélection des couleurs (palette ANSI / TrueColor) et attributs (Gras, Normal) par composant. 

4. **Prévisualisation en direct (Live Preview)** :    

* Rendu visuel immédiat de l'invite dans le terminal au fur et à mesure des choix.

---  
  
### Phase 3 — Générateur de Séquences ANSI & Sécurisation Shell 1.

**Assainissement des saisies (Sanitization)** :    * Échapper scrupuleusement tous les caractères spéciaux (`$`, ```, `"`, `\`) pour parer à toute injection dans `eval`.


3. **Formatage des codes ANSI** :
* Traduire la configuration visuelle en codes d'échappement bruts avec délimiteurs de couleur propres au shell détecté.


4. **Fermeture de chaîne (Reset)** :
* Injecter les codes de réinitialisation de couleur à la fin de chaque bloc.


5. **Génération de la commande** :
* Émettre la chaîne nettoyée au format `export PS1="..."` uniquement sur `stdout`.



---

### Phase 4 — Exécution, Persistance & Réinitialisation Sécurisée

1. **Mode Session (Par défaut)** :
* L'outil retourne la commande d'export pour exécution via le wrapper shell.


2. **Mode Sauvegarde Sécurisé (Option Menu ou `--save`)** :
* Création d'un backup du fichier de config (`.bashrc.bak`).
* Écriture atomique via un fichier temporaire pour éviter la corruption en cas de plantage.
* Insérer ou remplacer le bloc dédié délimité par :
```bash
# --- BEGIN MYPROMPT ---
export PS1="..."
# --- END MYPROMPT ---

```




3. **Mode Réinitialisation Smart (Option Menu ou `--reset`)** :
* Supprimer le bloc `# BEGIN MYPROMPT` du fichier de configuration.
* Restituer l'invite par défaut du système (`\u@\h:\w\$ ` sous Bash).



---

### Phase 5 — Packaging, Alias & Distribution (Binaire Autonome)

1. **Compilation** : Empaqueter le script JS et le runtime minimal avec Node.js SEA ou Pkg.
2. **Gestion de l'Alias Shell (Transmission des arguments)** :
* Configurer le wrapper/alias dans la config du shell pour qu'il relaie tous les arguments passés par l'utilisateur (`$@`) à l'exécutable :
```bash
alias prompt='eval "$(mon-prompt "$@")"'

```


* *Utilisation permise* :
* `prompt` : lance le menu TUI interactif.
* `prompt --save` : sauvegarde la configuration actuelle ou lance une sauvegarde directe.
* `prompt --reset` : réinitialise l'invite immédiatement.




3. **Script d'installation (`install.sh`)** :
* Script hébergé sur GitHub téléchargé via `curl | bash`.
* Dépose le binaire dans **`~/.local/bin/`** (sans droits `root`).
* Ajoute automatiquement l'alias dynamique `alias prompt='eval "$(mon-prompt "$@")"'` dans la configuration du shell.