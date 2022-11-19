
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("spam")
		.setDescription("Cute spam")
		.addStringOption((option) =>
			option.setName("input").setDescription("Enter spam").setRequired(true)
		),

	async execute(interaction) {
		const string = interaction.options.getString("input");
		await interaction.channel.send(string);
		await interaction.channel.send("https://images-ext-1.discordapp.net/external/DKCSO7oLvP6AU5C8WEwE-tq10cizVXAsS1AYb-B7dsM/https/media.discordapp.net/attachments/238081145131106305/975830758184869928/pomu.gif");
		await interaction.reply({ content: 'owo' }).then(() => {
			interaction.deleteReply();
		})
	},
};
export { };
