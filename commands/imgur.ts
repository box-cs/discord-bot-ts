import {
  ChatInputCommandInteraction,
  SlashCommandIntegerOption,
  SlashCommandStringOption,
  SlashCommandBuilder,
} from "discord.js";

var imgur = require("../api/imgur/imgur-api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("imgur")
    .setDescription("Fetches image(s) from subreddit galleries")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("subreddit")
        .setDescription("Which Subreddit?")
        .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("sorting")
        .setDescription("Sort by?")
        .addChoices(
          { name: "Time", value: "time" },
          { name: "Top", value: "top" }
        )
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("time")
        .setDescription("Time Range?")
        .addChoices(
          { name: "day", value: "day" },
          { name: "week", value: "week" },
          { name: "month", value: "month" },
          { name: "year", value: "year" },
          { name: "all", value: "all" }
        )
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option.setName("images").setDescription("Enter a number")
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option.setName("page").setDescription("Enter a number")
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    //get user's selections
    const subreddit = interaction.options.getString("subreddit");
    let sorting: string = interaction.options.getString("sorting");
    let time: string = interaction.options.getString("time");
    let page: number = interaction.options.getInteger("page");
    let numberOfImages: number = interaction.options.getInteger("images");

    //sorting out default settings
    sorting = !sorting ? "time" : sorting;
    time = !time ? "week" : time;
    page = !page ? 0 : page;
    numberOfImages = !numberOfImages ? 1 : numberOfImages;
    /*
    Limitations:
      We can't have a short time range and sort by top, top doesn't exist for a short time range
      Therefore if our time range is week or day, and our sorting is top, we change the time range to year
    */
    time =
      (time == "day" || time == "week") && sorting == "top" ? "year" : time;

    try {
      let res = await imgur.findImages(
        subreddit,
        sorting,
        time,
        page,
        numberOfImages
      );

      var message = "";
      //loop through response, find append image link to message string
      res.forEach((image: { link: string }) => (message += `${image.link}\n`));

      await interaction.editReply(`${message}`);
    } catch {
      await interaction.editReply("There was some kind of error. :c");
    }
  },
};
export {};
