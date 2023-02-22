import { EmbedBuilder } from "discord.js";

const emojifyKD = (kd: number): string => {
  const emojiResponses = ["🌌", "⚡", "💀"];
  switch (true) {
    case kd > 1.3:
      return emojiResponses[0];
    case kd > 1.2:
      return emojiResponses[1];
    default:
      return emojiResponses[2];
  }
};

const extractPlayerData = (data) => {
  return {
    name: data?.nickname,
    avatar: data?.avatar,
    csgo: {
      level: data?.games.csgo.skill_level.toString(),
      elo: data?.games.csgo.faceit_elo.toString(),
    },
  };
};

const buildEloEmbed = (player, playerStats) => {
  const kd = playerStats?.lifetime["Average K/D Ratio"];
  const recentResults = playerStats?.lifetime["Recent Results"]
    .map((result: number) => (result == 1 ? "W" : "L"))
    .join(" ");

  const eloImage = `https://beta.leetify.com/assets/images/rank-icons/faceit${player.csgo.level}.png`;
  const messageEmbed = new EmbedBuilder()
    .setColor("#ff5500")
    .setAuthor({
      name: `${player.name} ${emojifyKD(kd)}`,
      iconURL: eloImage,
      url: `https://www.faceit.com/en/players/${player.name}`,
    })
    .addFields(
      { name: "Elo", value: player?.csgo?.elo, inline: false },
      { name: "Recent Results", value: recentResults, inline: false }
    )
    .setThumbnail(player?.avatar || eloImage)
    .setTimestamp();

  return messageEmbed;
};

module.exports = {
  extractPlayerData,
  buildEloEmbed,
};
