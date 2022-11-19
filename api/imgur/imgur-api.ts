const { IMGUR_ID, IMGUR_SECRET } = require("../../config.json");
import axios from "axios";
/**
 * Returns 100 images from subreddit gallery as promise
 * @param {string} subreddit - the subreddit imgur searches through
 * @param {string} sorting - the sorting method
 * @param {string} time - the time range
 * @param {number} page - the page number
 */
const searchImgurSubreddit = async (subreddit: string, sorting: string, time: string, page: number) => {
  const query = `https://api.imgur.com/3/gallery/r/${subreddit}/${sorting}/${time}/${page}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Client-ID ${IMGUR_ID}`,
    },
  };

  return axios.get(query, options);
};

/**
 * Returns the actual images themselves
 * @param {string} subreddit - subreddit to search 
 * @param {string} sorting - the sorting method
 * @param {string} time - the time range
 * @param {number} page - the page number
 */
const findImages = async (subreddit: string, sorting: string, time: string, page: number, numOfImages: number) => {
  let res = await searchImgurSubreddit(subreddit, sorting, time, page);

  const images: Array<string> = res.data.data.map((image) => ({
    link: image.link,
  }));

  let queriedImages: Array<string> = []; //this will be our functions return

  // loop in order to fetch random images from request array of images
  for (let i = 0; i < numOfImages; i++) {
    let randomNumber: number = Math.floor(Math.random() * 101);
    queriedImages.push(images[randomNumber]);
  }

  return queriedImages;
};

module.exports = {
  searchImgurSubreddit,
  findImages,
};
