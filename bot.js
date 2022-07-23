const fs = require("fs");
const { Client, Collection, GatewayIntentBits, InteractionType } = require("discord.js");
const { token } = require("./config.json");
const EventCommands = require("./eventCommands/eventCommands");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});


//messageCreate events are handled like this so I can split my messageCreate commands
//into another folder and not share it on github
client.on("messageCreate", async (msg) => {
  try {
    if (!msg.author.bot)
      EventCommands.onMessageCreate(msg);
  } catch (err) {
    console.log(err);
  }
});

//handles onInteractionCreate events for commands and button events
client.on("interactionCreate", async (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      await interaction.editReply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
  /*else if (interaction.type == InteractionType.MessageComponent) {
    Switch on the component type -> target specific component interactions, ie: a button
    listen.onInteractionCreateButton(interaction, client);
  }*/
  else return;
});

client.login(token);