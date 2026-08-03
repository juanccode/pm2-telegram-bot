const TelegramBot = require("node-telegram-bot-api");
const { TOKEN, SERVER_NAME, validateConfig } = require("./config");
const { isAuthorized } = require("./auth");

const registerIdsCommand = require("./commands/ids");
const registerReloadCommand = require("./commands/reload");
const registerStatusCommand = require("./commands/status");
const registerLogsCommand = require("./commands/logs");

validateConfig();

const bot = new TelegramBot(TOKEN, { polling: true });

registerIdsCommand(bot);
registerReloadCommand(bot);
registerStatusCommand(bot);
registerLogsCommand(bot);

bot.onText(/\/start|\/help/, (msg) => {
  if (!isAuthorized(msg)) {
    bot.sendMessage(msg.chat.id, "🚫 No estás autorizado para usar este bot.");
    return;
  }
  bot.sendMessage(
    msg.chat.id,
    `Servidor: ${SERVER_NAME}\n\n` +
      "Comandos disponibles:\n" +
      "/ids - lista los ids y nombres de los procesos pm2\n" +
      "/reload [id] - pm2 reload (default id 0)\n" +
      "/status - pm2 list\n" +
      "/logs [id] - últimas líneas de log (default id 0)",
  );
});

console.log(`Bot corriendo en ${SERVER_NAME}...`);
