import { searchPlayerStats, searchPlayer } from "../api/faceit/faceit-api";
import { extractPlayerData, makeEloEmbed } from "../lib/helpers";
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore type this better
      const player = extractPlayerData(data);
      const playerStats = await searchPlayerStats(username);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore type this better
      const messageEmbed = makeEloEmbed(player, playerStats);
      await interaction.editReply({ embeds: [messageEmbed] });
    } catch {
      await interaction.editReply("Player not found?");
    }
  },
};

export {};
