const faceit = require("../api/faceit/faceit-api");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("elo")
    .setDescription("Fetches FACEIT Elo")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("Enter a faceit username")
        .setRequired(true)
    ),

  async execute(interaction): Promise<void> {
    await interaction.deferReply();
    const username = interaction.options.getString("username");
    try {
      let res = await faceit.searchPlayer(username);
      const player = {
        name: res.data.nickname,
        avatar: res.data?.avatar,
        csgo: {
          level: res.data.games.csgo.skill_level.toString(),
          elo: res.data.games.csgo.faceit_elo.toString(),
        },
      };

      res = await faceit.searchPlayerStats(username);

      const kd = res.data.lifetime["Average K/D Ratio"];
      const recentResults = res.data.lifetime["Recent Results"]
        .map((result: number) => (result == 1 ? "W" : "L"))
        .join(" ");

      const messageEmbed = new EmbedBuilder()
        .setColor("#ff5500")
        .setAuthor({
          name: `${player.name} ${emojifyKD(kd)}`,
          iconURL: `https://beta.leetify.com/assets/images/rank-icons/faceit${player.csgo.level}.png`,
          url: `https://www.faceit.com/en/players/${player.name}`,
        })
        .addFields(
          { name: "Elo", value: player.csgo.elo, inline: false },
          { name: "Recent Results", value: recentResults, inline: false },
        )
        .setThumbnail(player.avatar)
        .setTimestamp();
      await interaction.editReply({ embeds: [messageEmbed] });
    } catch (err) {
      await interaction.editReply("Player not found?");
    }
  },
};

const emojifyKD = (kd: number): string => {
  const emojiResponses = ["🌌", "⚡", "💀"];
  switch (true) {
    case (kd > 1.3):
      return emojiResponses[0];
    case (kd > 1.2):
      return emojiResponses[1];
    default:
      return emojiResponses[2];
  }
};

export { };
