import axios from "axios";
import { env } from "../../lib/config";

const IMGUR_ID = env.get<string>("IMGUR_ID");
/**
 * Returns 100 images from subreddit gallery as promise
 * @param {string} subreddit - the subreddit imgur searches through
 * @param {string} sorting - the sorting method
 * @param {string} time - the time range
 * @param {number} page - the page number
 */
export const searchImgurSubreddit = async (
  subreddit: string,
  sorting: string,
  time: string,
  page: number
) => {
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
export const findImages = async (
  subreddit: string,
  sorting: string,
  time: string,
  page: number,
  numOfImages: number
) => {
  const res = await searchImgurSubreddit(subreddit, sorting, time, page);

  const images: { link: string }[] = res.data.data.map(
    (image: { link: string }) => ({
      link: image.link,
    })
  );

  const queriedImages = [];
  for (let i = 0; i < numOfImages; i++) {
    const randomNumber = Math.floor(Math.random() * 101);
    queriedImages.push(images[randomNumber]);
  }

  return queriedImages;
};
