const faceit = require("../api/faceit/faceit-api");
const steam = require("../api/steam/steam-api");
const { SlashCommandBuilder } = require("@discordjs/builders");
const helpers = require("../lib/helpers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("steam")
    .setDescription("Fetches FACEIT profile from steam URL")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("Enter a steam URL")
        .setRequired(true)
    ),

  async execute(interaction): Promise<void> {
    await interaction.deferReply();
    const url = interaction.options.getString("url");
    try {
      const steamId = await steam.resolveSteamID(url);
      const data = (await faceit.searchPlayerFromSteamID(steamId))?.data;
      const player = helpers.extractPlayerData(data);
      const playerStats = (await faceit.searchPlayerStats(player.name))?.data;
      const messageEmbed = helpers.buildEloEmbed(player, playerStats);
      await interaction.editReply({ embeds: [messageEmbed] });
    } catch (_) {
      await interaction.editReply("No FACEIT account found.");
    }
  },
};

export {};
