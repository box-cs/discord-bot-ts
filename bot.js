const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");
const EventCommands = require("./eventCommands/eventCommands");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
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

const listen = new EventCommands();

//messageCreate events are handled like this so I can split my messageCreate commands
//into another folder and not share it on github
client.on("messageCreate", async (msg) => {
  if (!msg.author.bot)
    //if the message author is not a bot
    listen.onMessageCreate(msg);
});

//handles onInteractionCreate events for commands an button events
client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()){
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
  else if (interaction.isButton()){
    listen.onInteractionCreateButton(interaction, client);
  }
  else return;

});

client.login(token);
