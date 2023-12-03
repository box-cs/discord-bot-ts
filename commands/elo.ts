import { getLeetifyProfileData } from "..api/leetify/leetify-api";
import { searchPlayerStats, searchPlayer } from "../api/faceit/faceit-api";
import { makeEloEmbed } from "../lib/helpers";
import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  SlashCommandBuilder,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("elo")
    .setDescription("Fetches FACEIT Elo")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("username")
        .setDescription("Enter a faceit username")
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();
    const username = interaction.options.getString("username");
    try {
      const data = await searchPlayer(username);
      const skillLevel = (
        await getLeetifyProfileData(data.steam_id_64)
      ).games?.[0].skillLevel.toString();

      const playerStats = await searchPlayerStats(username);
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
      await interaction.editReply("Player not found?");
    }
  },
};

export {};
