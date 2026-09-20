import os from 'node:os';
export {displayUserEnvInfos}

function detectShell() {
  const shellType = process.env.SHELL || "";

  if (shellType.endsWith('bash')) return "bash";
  if (shellType.endsWith('zsh')) return "zsh";
  return "unknown";
}

function displayUserEnvInfos() {
    const USER_OS = os.platform();
    const USER_SHELL = detectShell();
    console.log(`Ce user est sur ${USER_SHELL} (${USER_OS})`);
}
