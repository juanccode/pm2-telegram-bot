require("dotenv").config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_USER_IDS = (process.env.ALLOWED_USER_IDS || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);
const SERVER_NAME = process.env.SERVER_NAME || "VPS";

function validateConfig() {
  if (!TOKEN) {
    console.error("Falta TELEGRAM_BOT_TOKEN en el .env");
    process.exit(1);
  }
  if (ALLOWED_USER_IDS.length === 0) {
    console.error("Falta ALLOWED_USER_IDS en el .env (user id de Telegram)");
    process.exit(1);
  }
}

module.exports = {
  TOKEN,
  ALLOWED_USER_IDS,
  SERVER_NAME,
  validateConfig,
};
