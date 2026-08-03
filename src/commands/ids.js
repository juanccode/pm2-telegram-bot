const { isAuthorized } = require("../auth");
const { pm2Jlist } = require("../pm2");

module.exports = function registerIdsCommand(bot) {
  bot.onText(/\/ids/, async (msg) => {
    if (!isAuthorized(msg)) {
      bot.sendMessage(
        msg.chat.id,
        "🚫 No estás autorizado para usar este bot.",
      );
      return;
    }

    const procs = await pm2Jlist();
    let text;
    if (!procs) {
      text = "No se pudo leer la lista de procesos.";
    } else if (procs.length === 0) {
      text = "No hay procesos corriendo en pm2.";
    } else {
      text = procs
        .map((p) => `${p.pm_id} - ${p.name} (${p.pm2_env.status})`)
        .join("\n");
    }

    bot.sendMessage(msg.chat.id, `\`\`\`\n${text}\n\`\`\``, {
      parse_mode: "Markdown",
    });
  });
};
