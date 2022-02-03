# Discord JS Bot

Simple discord JS bot that has onMessageCreate commands and slash commands.

## Features

- Faceit API Calls (Elo graph, Elo)
- Apex API Calls (current map, current item rotation)
- Features an easy way to set up listener events

### Installation

-Set up config.json like this

### config.json

```JSON
{
	"token": "your_token",
	"guildId": ["your_channel's_id", "another_channel's_id"],
	"clientId":"your_bot's_id",
	"APEX_API_KEY":"visit https://api.mozambiquehe.re/",
	"FACEIT_API_KEY":"visit https://developers.faceit.com/",
	"IMGUR_ID" : "visit https://apidocs.imgur.com/",
	"IMGUR_SECRET" : "visit https://apidocs.imgur.com/",
	"WelcomeChannel" : "your_welcome_channel's_id",
	"OWNERID" : "your_own_id"
}

```

-Make a folder called eventCommands in root of project, and a file as "eventCommands.js".

```javascript
class EventCommands {
	//Handing onMessageCreate events
	onMessageCreate = (msg) => {
		//if else chain for commands
		if (msg.content === "!<command>") {
			msg.reply(/*reply to caller*/);
		} else if (msg.content === "!<command2>") {
			msg.reply(/*reply to caller*/);
		}
		//message content parser
		else if (msg.content.toLowerCase().includes("<keyword to look through>")) {
			msg.reply(/*reply to caller*/);
		}
	};
}

module.exports = EventCommands;
```

```bash
npm install
```

### Windows

```batch
::Delays for 15s to allow wifi to connect
timeout /T 15
cls
cd <path-to-bot>
node "deploy-commands.js"
node "bot.js"
```

### Bash

```Bash
cd <path-to-bot>
node deploy-commands.js
node bot.js
```
