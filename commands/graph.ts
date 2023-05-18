import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
  SlashCommandBuilder,
  AttachmentBuilder,
  EmbedBuilder,
} from "discord.js";

const faceit = require("../api/faceit/faceit-api");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("graph")
    .setDescription("Last 2000 Matches Graphed From FACEIT")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("username")
        .setDescription("Enter a faceit username")
        .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option.setName("linecolor").setDescription("Line Color (Hex)")
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("graphcolor")
        .setDescription("Graph Background Color (Hex)")
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const username = interaction.options.getString("username");
    const linecolor = interaction.options.getString("linecolor");
    const graphcolor = interaction.options.getString("graphcolor");

    try {
      const matches = await faceit.getMatchHistory(username);
      const elo_history = matches
        .map((match: { elo: string }) => match.elo)
        .filter((elo: string | undefined) => elo !== undefined)
        .reverse();

      const count = elo_history.map((_: string, index: number) => {
        return (index + 1).toString();
      });

      const width = 700;
      const height = 500;
      const backgroundColour = !graphcolor ? "#dadada" : graphcolor;
      const borderColor = !linecolor ? "rgb(75, 192, 192)" : linecolor;

      const chartJSNodeCanvas = new ChartJSNodeCanvas({
        width,
        height,
        backgroundColour,
      });

      const data = {
        labels: count,
        datasets: [
          {
            label: username,
            data: elo_history,

            pointRadius: 0,
            fill: false,
            borderColor: borderColor,
            tension: 0.3,
          },
        ],
      };

      const image = await chartJSNodeCanvas.renderToBuffer(
        MakeGraphConfig(data)
      );
      const attachment = new AttachmentBuilder(image, { name: `graph.png` });

      const embed = new EmbedBuilder()
        .setColor("#ff5500")
        .setImage(`attachment://graph.png`)
        .setAuthor({
          name: `${username}'s elo graph`,
          iconURL:
            "https://corporate.faceit.com/wp-content/themes/app-theme/assets/o/images/ico/ms-tile-image.png",
          url: `https://www.faceit.com/en/players/${username}`,
        });

      await interaction.editReply({ embeds: [embed], files: [attachment] });
    } catch {
      await interaction.editReply("Player not found?");
    }
  },
};
export {};

const MakeGraphConfig = (data: any) => {
  return {
    type: "line",
    data: data,
    options: {
      scales: {
        x: {
          ticks: {
            font: {
              size: 20,
              weight: "bold",
              color: "#FFFFFF",
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: 20,
              weight: "bold",
              color: "#FFFFFF",
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 25,
              weight: "bold",
              color: "#FFFFFF",
            },
          },
        },
      },
      layout: { padding: 30 },
    },
    plugins: [] as any[],
  };
};
