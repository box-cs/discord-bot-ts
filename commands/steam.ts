import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  SlashCommandBuilder,
} from "discord.js";
const faceit = require("../api/faceit/faceit-api");
const steam = require("../api/steam/steam-api");
const helpers = require("../lib/helpers");

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
      const steamId = await steam.resolveSteamID(url);
      const data = (await faceit.searchPlayerFromSteamID(steamId))?.data;
      const player = helpers.extractPlayerData(data);
      const playerStats = (await faceit.searchPlayerStats(player.name))?.data;
      const messageEmbed = helpers.buildEloEmbed(player, playerStats);
      await interaction.editReply({ embeds: [messageEmbed] });
    } catch {
      await interaction.editReply("No FACEIT account found.");
    }
  },
};

export {};
