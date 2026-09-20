export {displayHelp}

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