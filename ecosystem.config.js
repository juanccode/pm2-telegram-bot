module.exports = {
  apps: [
    {
      name: "pm2-telegram-bot",
      script: "./src/bot.js",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
