const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("echo")
		.setDescription("Echoes input")
		.addStringOption((option) =>
			option.setName("input").setDescription("Enter a string").setRequired(true)
		),

	async execute(interaction) {
		await interaction.deferReply();
		await interaction.editReply(interaction.options.getString("input"));
	},
};
export { };