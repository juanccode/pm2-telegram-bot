const { exec } = require("child_process");

function runCommand(cmd) {
  return new Promise((resolve) => {
    exec(cmd, { timeout: 20000 }, (error, stdout, stderr) => {
      if (error) {
        resolve(`❌ Error:\n${error.message}`);
        return;
      }
      const output = (
        stdout ||
        stderr ||
        "Comando ejecutado sin salida."
      ).trim();
      resolve(output);
    });
  });
}

async function pm2Reload(target) {
  return runCommand(`pm2 reload ${target}`);
}

async function pm2Status() {
  return runCommand("pm2 list");
}

async function pm2Logs(target, lines = 30) {
  return runCommand(`pm2 logs ${target} --lines ${lines} --nostream`);
}

async function pm2Jlist() {
  const raw = await runCommand("pm2 jlist");
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("pm2 jlist output:", raw);
    return null;
  }
}

module.exports = { runCommand, pm2Reload, pm2Status, pm2Logs, pm2Jlist };
