import {
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js";
import fs from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
const { getEnvVar } = require("./lib/helpers");

const clientId = getEnvVar("CLIENT_ID");
const guildIds = getEnvVar("GUILD_IDS");
const token = getEnvVar("DISCORD_TOKEN");

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
const commandFiles: string[] = fs
  .readdirSync("./commands")
  .filter((file: string) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command: { data: SlashCommandBuilder } = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  guildIds.forEach((guildId: string) => {
    rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      })
      .then(() => console.log("Successfully registered application commands."))
      .catch(console.error);
  });
})();

export {};
