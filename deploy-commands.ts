import {
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js";
import fs from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { env } from "./lib/config";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
const commandFiles: string[] = fs
  .readdirSync("./commands")
  .filter((file: string) => file.endsWith(".ts"));

const discordToken = env.get("DISCORD_TOKEN") as string;
const clientId = env.get("BOT_CLIENT_ID") as string;
const rest = new REST({ version: "9" }).setToken(discordToken);

(async () => {
  for (const file of commandFiles) {
    const command: {
      data: SlashCommandBuilder;
    } = await import(`./commands/${file}`);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    }
  }

  const guildIds = env.get<string[]>("PERSONAL_GUILD_IDS");
  for (const guildId of guildIds) {
    rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      })
      .then(() => console.log("Successfully registered application commands."))
      .catch(console.error);
  }
})();

export {};
