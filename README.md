# Discord TS Bot

Simple discord TS bot that has onMessageCreate commands, buttonInteractions commands and slash commands.

## Features
- Features an easy way to set up commands (Slash commands, listener events through onMessageCreate)
- Imgur API Calls (subreddit gallery images)
- Apex API Calls (current map, current item rotation)
- Faceit API Calls (Elo graph, Elo)
- Leetifi API Calss (Leetify rating, HLTV 1.0 rating, misc CS2 stats)

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
```
[Unit]
Description=<yourbotname> discord bot

[Service]
# delay service start until PC is connected to wifi/ethernet
# alternatively, use network-online.target
# ExecStartPre=/bin/sleep 15
User=<yourusername>
WorkingDirectory=<path/to/code>
Type=forking
ExecStart=<path/to/code>/bot.sh
Restart=always
RestartSec=15

[Install]
WantedBy=default.target
```
