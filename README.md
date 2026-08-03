# 🤖 PM2 Telegram Bot

Bot de Telegram para **monitorear, recargar y consultar logs** de procesos PM2 en tu VPS, directamente desde tu celular.

## ✨ Características

- 📋 **Listar procesos** — Ver todos los procesos PM2 con su ID, nombre y estado
- 🔄 **Reload de procesos** — Ejecutar `pm2 reload` de forma remota
- 📊 **Estado del servidor** — Consultar `pm2 list` en tiempo real
- 📝 **Ver logs** — Consultar las últimas líneas de log de cualquier proceso
- 🔐 **Control de acceso** — Solo usuarios autorizados pueden interactuar con el bot
- 🏷️ **Multi-servidor** — Identifica de qué VPS vienen los mensajes con `SERVER_NAME`

## 📋 Requisitos

- Node.js >= 16
- PM2 instalado globalmente (`npm i -g pm2`)
- Token de bot de Telegram ([@BotFather](https://t.me/BotFather))

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/juanccode/pm2-telegram-bot.git
cd pm2-telegram-bot
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

Editar `.env` con tus valores:

```env
TELEGRAM_BOT_TOKEN=tu_token_de_botfather
ALLOWED_USER_IDS=123456789,987654321
SERVER_NAME=VPS-1
```

| Variable             | Descripción                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `TELEGRAM_BOT_TOKEN` | Token del bot obtenido de [@BotFather](https://t.me/BotFather)                                                   |
| `ALLOWED_USER_IDS`   | IDs de Telegram autorizados, separados por coma. Usa [@userinfobot](https://t.me/userinfobot) para obtener tu ID |
| `SERVER_NAME`        | Nombre identificador del servidor (aparece en los mensajes del bot)                                              |

## 💬 Comandos disponibles

| Comando            | Descripción                                                  |
| ------------------ | ------------------------------------------------------------ |
| `/start` o `/help` | Muestra los comandos disponibles                             |
| `/ids`             | Lista los IDs y nombres de los procesos PM2                  |
| `/reload <id>`     | Ejecuta `pm2 reload` en el proceso indicado (ID obligatorio) |
| `/status`          | Muestra el estado de todos los procesos (`pm2 list`)         |
| `/logs <id>`       | Muestra las últimas líneas de log del proceso (ID obligatorio) |

## 🛠️ Desarrollo

```bash
npm run start:dev
```

Usa `nodemon` para reiniciar automáticamente al detectar cambios.

## 🚀 Despliegue en producción (PM2)

```bash
pm2 start ecosystem.config.js
pm2 save
```

Esto registra el bot como un proceso PM2 con auto-restart.

## 📁 Estructura del proyecto

```
pm2-telegram-bot/
├── src/
│   ├── bot.js          # Punto de entrada, registra comandos
│   ├── config.js       # Carga y valida variables de entorno
│   ├── auth.js         # Middleware de autorización por user ID
│   ├── pm2.js          # Funciones wrapper de PM2 (exec)
│   └── commands/
│       ├── ids.js      # /ids — listar procesos
│       ├── reload.js   # /reload — recargar proceso
│       ├── status.js   # /status — estado de PM2
│       └── logs.js     # /logs — ver logs
├── .env.example        # Plantilla de variables de entorno
├── ecosystem.config.js # Configuración de PM2 para producción
├── package.json
└── LICENSE
```

## 📄 Licencia

[MIT](LICENSE)
