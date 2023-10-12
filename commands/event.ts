import { EventHandler, Privacy, ResponseType } from "core/eventHandler";
import {
  BaseGuildTextChannel,
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  SlashCommandBuilder,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add an event")
    .setDescription("Cute spam")
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
    const channel = interaction.channel as BaseGuildTextChannel;

    await channel.send(`Use !${keyword} to call the event`);
    EventHandler.addEvent({
      action,
      guildId: interaction.guildId,
      description,
      keywords: [keyword],
      privacy: Privacy.private,
      responseType: ResponseType.reply,
      isAllowedInGuild: (messageGuildId: string) =>
        messageGuildId === interaction.guildId,
    });
  },
};
export {};
