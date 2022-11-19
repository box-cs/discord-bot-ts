
const { APEX_API_KEY } = require("../config.json");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apex")
    .setDescription("Fetches Current Map/Crafting Rotation")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("Enter a string")
        .setRequired(true)
        .addChoices(
          { name: 'Map Rotation', value: 'Map' },
          { name: 'Crafting Item Rotation', value: 'Crafting' },
        )
    ),

  async execute(interaction: any) {
    await interaction.deferReply();
    const choice = interaction.options.getString("command");
    const path = `https://api.mozambiquehe.re/${choice == "Map" ? "/maprotation?version=2&auth=" : '/crafting?&auth='}${APEX_API_KEY}`;
    const map_image: { [key: string]: string; } = {
      "World's Edge":
        "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/9/91/Loadingscreen_World%27s_Edge_MU3.png/revision/latest/scale-to-width-down/240?cb=20210804105812",
      "Storm Point":
        "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/b/be/Loadingscreen_Storm_Point.png/revision/latest/scale-to-width-down/240?cb=20211107010914",
      "Olympus":
        "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/e/e1/Loadingscreen_Olympus_MU1.png/revision/latest/scale-to-width-down/240?cb=20210504214336",
      "King's Canyon":
        "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/c/cf/Loadingscreen_Kings_Canyon_MU3.png/revision/latest/scale-to-width-down/240?cb=20210202220042",
    };

    try {
      const res = await axios.get(path);
      const { map, embedMessage } = handleChoice(choice, res?.data);

      const messageEmbed = new EmbedBuilder()
        .setColor("#d2c40f")
        .setURL("https://apexlegendsapi.com")
        .setDescription(embedMessage)
        .setImage(map ? map_image[map] : null)
        .setTimestamp();

      await interaction.editReply({ embeds: [messageEmbed] });
    } catch (err) {
      await interaction.editReply("Some error occurred ):");
    }
  },
};

const handleChoice = (choice: string, data: any): { map: string, embedMessage: string } => {
  if (choice === "Map") {
    const { map, remainingTimer } = data.battle_royale.current;
    return { map, embedMessage: `\`\`\`ansi\n\u001b[1;37mApex Legends Map Rotation\n\u001b[0;34mCurrent Map: \u001b[0;36m${map}\n\u001b[0;34mTime Remaining: \u001b[0;36m${remainingTimer}\`\`\`` };
  }

  let nonUniqueItems: Array<string> = [];
  data.map((i: any) => {
    i.bundleContent.map((i2: any) => {
      nonUniqueItems.push(`\u001b[0;36m${i2.itemType.name.replaceAll("_", " ")}`);
    });
  });
  // create an unique set of crafting items
  let uniqueItems = [...new Set(nonUniqueItems)];
  return { map: "", embedMessage: `\`\`\`ansi\n${uniqueItems.join("\n")}\`\`\`` };
};

export { };
