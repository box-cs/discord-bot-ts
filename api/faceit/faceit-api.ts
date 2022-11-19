const { FACEIT_API_KEY } = require("../../config.json");
import axios from "axios";
/**
 * Gets FACEIT player data
 * @returns player data
 *@param {string} username
 */
const searchPlayer = async (username: string) => {
  const query = `https://open.faceit.com/data/v4/players?nickname=${username}&game=csgo`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + FACEIT_API_KEY,
    },
  };
  return axios.get(query, options);
};
/**
 * Gets FACEIT player all time stats
 * @param {string} username
 */
const searchPlayerStats = async (username: string) => {
  const res = await searchPlayer(username);
  const query = `https://open.faceit.com/data/v4/players/${res.data.player_id.toString()}/stats/csgo`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + FACEIT_API_KEY,
    },
  };
  return axios.get(query, options);
};
/**
 * Gets FACEIT playerId for a player from username
 * @param {string} username
 * @param {number} numberOfGames number games to fetch (default of 2000)
 * @returns array of matches from now until `numberOfGames` before
 */
const getMatchHistory = async (username: string, numberOfGames: number) => {
  const res = await searchPlayer(username);
  const query = `https://api.faceit.com/stats/api/v1/stats/time/users/${res.data.player_id.toString()}/games/csgo?size=${numberOfGames || 2000}`;

  return axios.get(query);
};

module.exports = {
  searchPlayer,
  searchPlayerStats,
  getMatchHistory,
};
