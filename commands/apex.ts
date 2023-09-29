import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { APEX_API_KEY } from "../config.json";
import { handleChoice, map_images } from "../lib/helpers";
import axios from "axios";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apex")
    .setDescription("Fetches Current Map/Crafting Rotation")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("command")
        .setDescription("Enter a string")
        .addChoices(
          { name: "Map Rotation", value: "Map" },
          { name: "Crafting Item Rotation", value: "Crafting" }
        )
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const choice = interaction.options.getString("command");
    const path = `https://api.mozambiquehe.re/${
      choice === "Map" ? "/maprotation?version=2&auth=" : "/crafting?&auth="
    }${APEX_API_KEY}`;

    try {
      const res = await axios.get(path);
      const { map, embedMessage } = handleChoice(choice, res?.data);

      const messageEmbed: EmbedBuilder = new EmbedBuilder()
        .setColor("#d2c40f")
        .setURL("https://apexlegendsapi.com")
        .setDescription(embedMessage)
        .setImage(map && map_images[map])
        .setTimestamp();

      await interaction.editReply({ embeds: [messageEmbed] });
    } catch {
      await interaction.editReply("Some error occurred ):");
    }
  },
};

export {};
