const { FACEIT_API_KEY } = require("../../config.json");
import axios from "axios";

/**
 * Authorization headers
 */
const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + FACEIT_API_KEY,
  },
};
/**
 * Gets FACEIT player data from username
 * @returns player data
 * @param {string} username
 */
const searchPlayer = async (username: string) => {
  const query = `https://open.faceit.com/data/v4/players?nickname=${username}&game=csgo`;
  return axios.get(query, options);
};
/**
 * Gets FACEIT player data from steamID
 * @returns player data
 * @param {string} steamID
 */
const searchPlayerFromSteamID = async (steamID: string) => {
  const query = `https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${steamID}`;
  return axios.get(query, options);
};
/**
 * Gets FACEIT player all time stats
 * @param {string} username
 */
const searchPlayerStats = async (username: string) => {
  const player_id = (await searchPlayer(username))?.data?.player_id;
  const query = `https://open.faceit.com/data/v4/players/${player_id}/stats/csgo`;

  return axios.get(query, options);
};

const paginatedRequest = async (
  query: string,
  playerId: string,
  page: number,
  data: number[] = []
) => {
  await axios.get(query).then((res) => {
    data.push.apply(data, res?.data);

    if (res?.data && res.data?.length != 0) {
      return paginatedRequest(
        `https://api.faceit.com/stats/api/v1/stats/time/users/${playerId}/games/csgo?size=100&page=${page}`,
        playerId,
        page + 1,
        data
      );
    }
  });
  return data;
};
/**
 * Gets FACEIT playerId for a player from username
 * @param {string} username
 * @returns array of matches
 */
const getMatchHistory = async (username: string) => {
  const playerId = (await searchPlayer(username))?.data?.player_id;
  const query = `https://api.faceit.com/stats/api/v1/stats/time/users/${playerId}/games/csgo?size=100`;

  return await paginatedRequest(query, playerId, 1);
};

module.exports = {
  searchPlayer,
  searchPlayerFromSteamID,
  searchPlayerStats,
  getMatchHistory,
};
