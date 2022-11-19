
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Interaction, InteractionType } = require("discord.js");
const { token } = require("./config.json");
const Events = require("./eventCommands/Events");
const EventFactory = require("./eventCommands/EventFactory");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

EventFactory.makeEvents();
client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

//messageCreate events are handled like this so I can split my messageCreate commands
//into another folder and not share it on github
client.on("messageCreate", async (msg) => {
  try {
    if (!msg.author.bot) {
      Events.handleEvent(msg);
    }
  } catch (err) {
    console.log(err);
  }
});

//handles onInteractionCreate events for commands and button events
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command)
    return console.error(`No command matching ${interaction.commandName} was found.`);

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token);