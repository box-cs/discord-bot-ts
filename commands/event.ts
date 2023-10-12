import { EventHandler, Privacy, ResponseType } from "../core/eventHandler";
import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  SlashCommandBuilder,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("event")
    .setDescription("Adds a bot event which can be called with !keyword")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("keyword")
        .setDescription("Enter the event keyword")
        .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("action")
        .setDescription("Enter the event action")
        .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("description")
        .setDescription("Enter the event description")
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const keyword = interaction.options.getString("keyword");
    const action = interaction.options.getString("action");
    const description = interaction.options.getString("description");
    const event = EventHandler.makeEvent(
      [`!${keyword}`],
      action,
      ResponseType.reply,
      description,
      Privacy.private,
      interaction.guildId
    );
    EventHandler.addEvent(event);

    await interaction.reply(`Use !${keyword} to call the event`);
  },
};

export {};
