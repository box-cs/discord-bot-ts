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
import { makeEloEmbed } from "../lib/helpers";
import { getLeetifyProfileData } from "api/leetify/leetify-api";

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
      const data = await searchPlayerFromSteamID(steamId);
      const skillLevel = (
        await getLeetifyProfileData(data.steam_id_64)
      ).games?.[0].skillLevel.toString();

      const playerStats = await searchPlayerStats(data.nickname);
      const messageEmbed = makeEloEmbed(
        {
          name: data.nickname,
          avatar: data.avatar,
          cs2: {
            skillLevel,
            elo: data.games?.csgo?.faceit_elo.toString(),
            level: data.games?.csgo?.skill_level_label,
          },
        },
        playerStats
      );
      await interaction.editReply({ embeds: [messageEmbed] });
    } catch {
      await interaction.editReply("No FACEIT account found.");
    }
  },
};

export {};
