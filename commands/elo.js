const { FACEIT_API_KEY } = require("../config.json");
const faceit = require("../helpers/faceit/faceit-api");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

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

	async execute(interaction) {
		await interaction.deferReply();
		const username = interaction.options.getString("username");
		try {
			let res = await faceit.searchPlayer(username);

			const playerData = {
				name: res.data.nickname.toString(),
				avatar: res.data.avatar.toString(),
				csgo: {
					level: res.data.games.csgo.skill_level.toString(),
					elo: res.data.games.csgo.faceit_elo.toString(),
				},
			};

			embedMessage = `${playerData.name}\n**Elo**: ${playerData.csgo.elo}`;

			const messageEmbed = new MessageEmbed()
				.setColor("#ff5500")
				.setAuthor({
					name: `${playerData.name}`,
					iconURL: `https://beta.leetify.com/assets/images/rank-icons/faceit${playerData.csgo.level}.png`,
					url: `https://www.faceit.com/en/players/${playerData.name}`,
				})
				.setDescription(embedMessage)
				.setThumbnail(playerData.avatar);

			await interaction.editReply({ embeds: [messageEmbed] });
		} catch (err) {
			await interaction.editReply("Player not found?");
		}
	},
};
