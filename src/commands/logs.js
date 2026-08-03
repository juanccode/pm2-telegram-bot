const { isAuthorized } = require("../auth");
const { pm2Logs } = require("../pm2");

module.exports = function registerLogsCommand(bot) {
  bot.onText(/\/logs(?:\s+(.+))?/, async (msg, match) => {
    if (!isAuthorized(msg)) {
      bot.sendMessage(
        msg.chat.id,
        "🚫 No estás autorizado para usar este bot.",
      );
      return;
    }

    const target = match[1] ? match[1].trim() : null;

    if (!target) {
      bot.sendMessage(
        msg.chat.id,
        "⚠️ Debes indicar el ID del proceso.\nEjemplo: /logs 4\n\nUsa /ids para ver los procesos disponibles.",
      );
      return;
    }

    const output = await pm2Logs(target);
    const trimmed = output.length > 3500 ? output.slice(-3500) : output;

    bot.sendMessage(msg.chat.id, `\`\`\`\n${trimmed}\n\`\`\``, {
      parse_mode: "Markdown",
    });
  });
};
