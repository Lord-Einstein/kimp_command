import { runKimp } from "../tui/main.js";
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
