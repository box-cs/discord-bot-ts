import { Interaction, Message } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { env } from "./lib/config";
import { seed } from "./core/seed"; // Optional way to seed events
import { EventHandler } from "./core/eventHandler";
import { initializeDb } from "./db/seed";

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

(async () => {
  await initializeDb();
  for (const file of commandFiles) {
    const filePath = path.join(pathToCommands, file);
    const command = await import(filePath);
    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
})();

seed.map((event) => EventHandler.addEvent(event)); // Optional way to seed events

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg: Message) => {
  try {
    if (!msg.author.bot) {
      EventHandler.handleEvent(msg);
    }
  } catch (err) {
    console.log(err);
  }
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = commands.get(interaction.commandName) as {
    execute: (interaction: Interaction) => Promise<void>;
  };

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

client.login(env.get("DISCORD_TOKEN"));
