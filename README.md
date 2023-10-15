# Discord TS Bot

Simple discord TS bot that has onMessageCreate commands, buttonInteractions commands and slash commands.

## Features
- Features an easy way to set up commands (Slash commands, listener events through onMessageCreate)
- Imgur API Calls (subreddit gallery images)
- Apex API Calls (current map, current item rotation)
- Faceit API Calls (Elo graph, Elo)
- Leetify API Calss (Leetify rating, HLTV 1.0 rating, misc CS2 stats)

### Installation
---
- Set up .env file like this

### .env

```bash
APEX_API_KEY=""
BOT_CLIENT_ID=""
DISCORD_TOKEN=""
DB_USER=""
DB_NAME=""
DB_PASSWORD=""
DB_PORT=0
DB_HOST=""
FACEIT_API_KEY=""
IMGUR_ID=""
IMGUR_SECRET=""
LEETIFY_API_TOKEN=""
OWNER_ID=""
PERSONAL_GUILD_IDS="" # comma separated
STEAM_API_KEY=""
TRACKER_API_KEY=""
WELCOME_CHANNEL=""
```

```bash
npm install
```
### Bash (bot.sh)

```Bash
#!/usr/bin/bash

cd <path-to-bot>
npm start
```
### Installing PosgresSQL (WSL)
```
sudo apt-get install build-essential
sudo apt install postgresql postgresql-contrib #installing postgres
sudo systemctl start postgresql.service 
sudo -i -u postgres # switching to postgres account
```

```sql
CREATE DATABASE db;
\c db;
CREATE USER user with encrypted password 'somepassword';
GRANT ALL PRIVILEGES ON DATABASE db to user;
GRANT CREATE ON SCHEMA public TO user; # might need this
```
### Running as a service on Linux (change what's inside angled brackets, remove angled brackets)

```bash
sudo touch /etc/systemd/system/discordbot.service
```

```
# in the discordbot.service file 
[Unit]
Description=Discord Bot

[Service]
User=root
WorkingDirectory=/some/path/to/discord-bot-ts
ExecStart=/some/path/to/discord-bot-ts/bot.sh
Restart=always
RestartSec=15
TimeoutStartSec=30

[Install]
WantedBy=default.target
```

```bash
systemctl enable discordbot.service
systemctl start discordbot.service
# monitoring
watch -c SYSTEMD_COLORS=1 systemctl status discordbot.service
```
