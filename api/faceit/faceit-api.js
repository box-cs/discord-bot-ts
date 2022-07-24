const { FACEIT_API_KEY } = require("../../config.json");
const axios = require("axios");

/**
 *Queries faceit api for a player
 *returns player data, and other junk from faceit
 *@param {string} username
 */
const searchPlayer = async (username) => {
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
 * Queries faceit and returns player's all-time stats in csgo
 * @param {string} username
 */
const searchPlayerStats = async (username) => {
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
 *Finds playerId for a player from username
 *queries v1 api for last 2000 matches
 *returns last 2000 matches and their data
 *@param {string} username
 */
const getMatchHistory = async (username, numberOfGames) => {
	const res = await searchPlayer(username);
	const query = `https://api.faceit.com/stats/api/v1/stats/time/users/${res.data.player_id.toString()}/games/csgo?size=${ numberOfGames || 2000}`;

	return axios.get(query);
};

module.exports = {
	searchPlayer,
	searchPlayerStats,
	getMatchHistory,
};
