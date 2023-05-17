import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
} from "discord.js";
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lmgtfy")
    .setDescription("Let me google that for you")
    .addStringOption((option: SlashCommandStringOption) =>
      option.setName("query").setDescription("Enter a string").setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const query = interaction.options.getString("query");
    await interaction.editReply(`http://lmgtfy.com/?q=${query}`);
  },
};
export {};
