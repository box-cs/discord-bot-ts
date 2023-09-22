import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  SlashCommandBuilder,
} from "discord.js";
import {
  searchPlayerFromSteamID,
  searchPlayerStats,
} from "../api/faceit/faceit-api";
import { resolveSteamID } from "../api/steam/steam-api";
import { extractPlayerData, makeEloEmbed } from "../lib/helpers";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("steam")
    .setDescription("Fetches FACEIT profile from steam URL")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("url")
        .setDescription("Enter a steam URL")
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();
    const url = interaction.options.getString("url");
    try {
      const steamId = await resolveSteamID(url);
      const data = (await searchPlayerFromSteamID(steamId))?.data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore type this better
      const player = extractPlayerData(data);
      const playerStats = (await searchPlayerStats(player.name))?.data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore type this better
      const messageEmbed = makeEloEmbed(player, playerStats);
      await interaction.editReply({ embeds: [messageEmbed] });
    } catch {
      await interaction.editReply("No FACEIT account found.");
    }
  },
};

export {};
