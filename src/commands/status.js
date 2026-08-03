const { isAuthorized } = require("../auth");
const { pm2Status } = require("../pm2");

module.exports = function registerStatusCommand(bot) {
  bot.onText(/\/status/, async (msg) => {
    if (!isAuthorized(msg)) {
      bot.sendMessage(
        msg.chat.id,
        "🚫 No estás autorizado para usar este bot.",
      );
      return;
    }

    const output = await pm2Status();
    bot.sendMessage(msg.chat.id, `\`\`\`\n${output}\n\`\`\``, {
      parse_mode: "Markdown",
    });
  });
};
