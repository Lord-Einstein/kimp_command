#!/usr/bin/env node

import os from 'node:os';

const PASSED_ARG = process.argv[2] || "";

function displayHelp() {
  console.log(`
    Kimp vous permet de personnaliser votre invite de prompt pour un visuel en CLI toujours plus kiffant !
    Usage: kimp [option]

    Options:
    --help, -h    Afficher l'aide
    --save, -s    Sauvegarder la configuration
    --reset, -r   Réinitialiser le prompt
  `);
}

function runKimp() {
  console.log("Lancement du TUI...");
}

function argumentManager() {
  if (PASSED_ARG === "") {
    runKimp();
    return;
  }

  switch (PASSED_ARG) {
    case '--help':
    case '-h':
      displayHelp();
      break;

    case '--save':
    case '-s':
      console.log("Option de sauvegarde directe demandée");
      break;

    case '--reset':
    case '-r':
      console.log("Option de réinitialisation demandée");
      break;

    default:
      console.log(`La commande kimp ne prend pas cet argument : '${PASSED_ARG}'`);
      console.log("Tapez 'kimp --help' pour obtenir de l'aide.");
      break;
  }
}

function detectShell() {
  const shellType = process.env.SHELL || "";

  if (shellType.endsWith('bash')) return "bash";
  if (shellType.endsWith('zsh')) return "zsh";
  return "unknown";
}

const USER_OS = os.platform();
const USER_SHELL = detectShell();

console.log(`Ce user est sur ${USER_SHELL} (${USER_OS})`);
argumentManager();