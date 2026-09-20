import { select, checkbox } from '@inquirer/prompts';
import boxen from 'boxen';
import pc from 'picocolors';

export { runKimp };

function displayBanner() {
  console.clear();
  const bannerText = `${pc.dim('Générez un prompt de terminal qui vous fait kiffer !')}`;
  
  const boxedBanner = boxen(bannerText, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'cyan',
    title: `${pc.bold(pc.white("--💙 KIFF MY PROMPT 💙--"))}`,
    titleAlignment: 'center'
  });

  process.stderr.write(boxedBanner + '\n');
}

async function runKimp() {
  displayBanner();

  try {
    const mainMenuChoice = await select({
      message: 'Que souhaitez-vous faire ?\n',
      choices: [
        { name: '🟢 START.', value: 'start' },
        { name: '🔴 QUIT.', value: 'quit' }
      ]
    });

    if (mainMenuChoice === 'quit') {
      console.clear();
      process.stderr.write(pc.yellow('\nMerci d\'avoir utilisé KIMP... à bientôt 🧡 ! \n\n'));
      return;
    }

    displayBanner();

    const selectedBlocks = await checkbox({
      message: 'Sélectionnez les éléments à inclure dans votre prompt :\n',
      choices: [
        { name: 'Nom d\'utilisateur', value: 'user', checked: true },
        { name: 'Nom de la machine (Host)', value: 'host', checked: true },
        { name: 'Répertoire courant', value: 'dir', checked: true },
        { name: 'Texte / Phrase personnalisée', value: 'customText', checked: false }
      ]
    });

    displayBanner();
    
    process.stderr.write(`\n${pc.green('✔')} Blocs enregistrés : ${selectedBlocks.join(' | ')}\n`);

  } catch (error) {
    if (error.name === 'ExitPromptError') {
      process.stderr.write(pc.dim('\nRetour au menu d\'accueil...\n'));
      await new Promise((resolve) => setTimeout(resolve, 600));
      await runKimp();
      return;
    }
    throw error;
  }
}