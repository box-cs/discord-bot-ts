import { Interaction, Message } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { CommandHandler } from "./core/Events"; // Optional
import { EventFactory } from "./core/EventFactory";
import { env } from "./lib/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = new Collection();
const pathToCommands = path.join(__dirname, "commands");
const commandFiles: string[] = fs
  .readdirSync(pathToCommands)
  .filter((file: string) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(pathToCommands, file);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

EventFactory.makeEvents();
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
  const command = commands.get(interaction.commandName);
  if (!command)
    return console.error(
      `No command matching ${interaction.commandName} was found.`
    );

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await command.execute(interaction);
  } catch (error) {
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(env.get("DISCORD_TOKEN") as string);
