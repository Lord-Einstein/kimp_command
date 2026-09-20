import { checkbox } from "@inquirer/prompts";

export { runKimp }

async function runKimp() {
  process.stderr.write("\n== PERSONNALISATION DE VOTRE TERMINAL ==\n\n");

  const checkboxOptionChoices = await checkbox ({
    message: "Cochez les options pour constituer la structure de votre prompt :", 

    choices: [
      {
        name: "Nom d'utilisateur",
        value: "user",
        checked: true,
      },

      {
        name: "Nom de la machine hôte",
        value: "host",
        checked: true,
      },

      {
        name: "Phrase personnalisée",
        value: "customText",
        checked: false,
      },

      {
        name: "Répertoire courant",
        value: "dir",
        checked: true,
      },

    ],

  });

  process.stderr.write(`Options choisies : ${checkboxOptionChoices.join(' | ')}\n`);

}