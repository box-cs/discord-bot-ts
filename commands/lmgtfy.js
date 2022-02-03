const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lmgtfy')
		.setDescription('Let me google that for you')
		.addStringOption(option => option.setName('query').setDescription('Enter a string').setRequired(true)),
	
	async execute(interaction) {
		const query = interaction.options.getString('query');
		await interaction.reply(`http://lmgtfy.com/?q=${query}`);
	},
};