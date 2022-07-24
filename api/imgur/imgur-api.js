const axios = require("axios");
const { IMGUR_ID, IMGUR_SECRET } = require("../../config.json");

/**
 *Returns 100 images from subreddit gallery as promise
 *@param {string} subreddit - the subreddit imgur searches through
 *@param {string} sorting - the sorting method
 *@param {string} time - the time range
 *@param {integer} page - the page number
 */
const searchImgurSubreddit = async (subreddit, sorting, time, page) => {
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
 *Returns the actual images themselves
 *@param {string} subreddit - the subreddit imgur searches through
 *@param {string} sorting - the sorting method
 *@param {string} time - the time range
 *@param {integer} page - the page number
 */
const findImages = async (subreddit, sorting, time, page, numOfImages) => {
  res = await searchImgurSubreddit(subreddit, sorting, time, page);

  const images = res.data.data.map((image) => ({
    link: image.link,
  }));

  queriedImages = []; //this will be our functions return

  //loop in order to fetch random images from request array of images
  for (let i = 0; i < numOfImages; i++) {
    var randomNumber = Math.floor(Math.random() * 101);
    queriedImages.push(images[randomNumber]);
  }

  return queriedImages;
};

module.exports = {
  searchImgurSubreddit,
  findImages,
};
