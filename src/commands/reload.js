const { isAuthorized } = require("../auth");
const { pm2Reload } = require("../pm2");
const { SERVER_NAME } = require("../config");

module.exports = function registerReloadCommand(bot) {
  bot.onText(/\/reload(?:\s+(.+))?/, async (msg, match) => {
    if (!isAuthorized(msg)) {
      bot.sendMessage(
        msg.chat.id,
        "🚫 No estás autorizado para usar este bot.",
      );
      return;
    }

    const target = match[1] ? match[1].trim() : null;
    const chatId = msg.chat.id;

    if (!target) {
      bot.sendMessage(
        chatId,
        "⚠️ Debes indicar el ID del proceso.\nEjemplo: /reload 4\n\nUsa /ids para ver los procesos disponibles.",
      );
      return;
    }

    bot.sendMessage(
      chatId,
      `⏳ [${SERVER_NAME}] Ejecutando: pm2 reload ${target} ...`,
    );

    const output = await pm2Reload(target);
    bot.sendMessage(chatId, `\`\`\`\n${output}\n\`\`\``, {
      parse_mode: "Markdown",
    });
  });
};
