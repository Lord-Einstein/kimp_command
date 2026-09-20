import { runKimp } from "../tui/app.js";
import { displayHelp } from "./help.js";

export {argumentManager}

const PASSED_ARG = process.argv[2] || "";

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
      process.stderr.write("Option de sauvegarde directe demandée.\n");
      break;

    case '--reset':
    case '-r':
      process.stderr.write("Option de réinitialisation demandée\n");
      break;

    default:
      process.stderr.write(`La commande kimp ne prend pas cet argument : '${PASSED_ARG}'\n`);
      process.stderr.write("Tapez 'kimp --help' pour obtenir de l'aide.\n");
      break;
  }
}
