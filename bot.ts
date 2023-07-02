import { Interaction, Message } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { token } from "./config.json";
import { CommandHandler } from "./eventCommands/Events"; // Optional
import { EventFactory } from "./eventCommands/EventFactory"; // Optional

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// @ts-ignore
client.commands = new Collection();
const pathToCommands = path.join(__dirname, "commands");
const commandFiles: string[] = fs
  .readdirSync(pathToCommands)
  .filter((file: string) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(pathToCommands, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    // @ts-ignore
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

EventFactory.makeEvents(); // Optional
client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

// messageCreate events are handled like this so I can split my messageCreate commands
// into another folder and not share it on github
client.on("messageCreate", async (msg: Message) => {
  try {
    if (!msg.author.bot) {
      CommandHandler.handleCommand(msg); // Optional
    }
  } catch (err) {
    console.log(err);
  }
});

// handles onInteractionCreate events for commands and button events
client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const client = interaction.client;
  // @ts-ignore
  const command = client.commands.get(interaction.commandName);
  if (!command)
    return console.error(
      `No command matching ${interaction.commandName} was found.`
    );

  try {
    await command.execute(interaction);
  } catch (error) {
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(token);
