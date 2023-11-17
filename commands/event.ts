import { EventHandler, Privacy, ResponseType } from "../core/eventHandler";
import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  SlashCommandBuilder,
} from "discord.js";
import { db } from "../db/database";

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
    try {
      if (action !== "DELETE") {
        await db.query(
          `INSERT INTO events ("creatorId", "action", "guildId", "description", "keywords", "responseType", "privacy") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            interaction.user.id,
            action,
            interaction.guildId,
            description,
            [`!${keyword}`],
            ResponseType.send,
            Privacy.private,
          ]
        );
        const event = EventHandler.makeEvent(
          [`!${keyword}`],
          action,
          ResponseType.send,
          description,
          Privacy.private,
          interaction.guildId
        );
        EventHandler.addEvent(event);
        await interaction.reply(`Use !${keyword} to call the event`);
      } else {
        await db.query(
          `DELETE FROM events WHERE "keywords" = $1 AND "creatorId" = $2`,
          [[`!${keyword}`], interaction.user.id]
        );
        await interaction.reply(`!${keyword} event successfully deleted`);
      }
    } catch (err) {
      console.log(err);
      await interaction.reply(`Something went wrong`);
    }
  },
};

export {};
