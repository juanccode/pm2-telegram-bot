const { ALLOWED_USER_IDS } = require("./config");

function isAuthorized(msg) {
  return ALLOWED_USER_IDS.includes(String(msg.from.id));
}

module.exports = { isAuthorized };
