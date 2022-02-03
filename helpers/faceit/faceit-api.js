const { FACEIT_API_KEY } = require('../../config.json');
const axios = require('axios');
/*
Queries faceit api for a player, returns promise
when resolved this promise contains player data, and other junk from faceit
*/
const searchPlayer = async (username) => {
	const query = `https://open.faceit.com/data/v4/players?nickname=${username}&game=csgo`;

	const options = {
	headers: {
		"Content-Type" : "application/json",
		Authorization: "Bearer " + FACEIT_API_KEY
		}
	};
	return axios.get(query, options)
}

/*
Finds user name for a player,
queries v1 api for last 2000 matches
returns promise that contains 2000 matches and their data
*/
const getMatchHistory = async (username) => {

	let res = await searchPlayer(username);
	const query = `https://api.faceit.com/stats/api/v1/stats/time/users/${res.data.player_id.toString()}/games/csgo?size=2000`;
	
	return axios.get(query)

}

module.exports = {
	searchPlayer,
	getMatchHistory
}
