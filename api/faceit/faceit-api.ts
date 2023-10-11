import axios from "axios";
import { FaceitPlayer } from "./types";
import { env } from "../../lib/config";

const FACEIT_API_KEY = env.get("FACEIT_API_KEY");

const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${FACEIT_API_KEY}`,
  },
};

export const searchPlayer = async (username: string): Promise<FaceitPlayer> => {
  const query = `https://open.faceit.com/data/v4/players?nickname=${username}&game=csgo`;
  return axios.get(query, options);
};

export const searchPlayerFromSteamID = async (
  steamID: string
): Promise<FaceitPlayer> => {
  const query = `https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${steamID}`;
  return axios.get(query, options);
};

export const searchPlayerStats = async (username: string) => {
  const player_id = (await searchPlayer(username))?.data?.player_id;
  const query = `https://open.faceit.com/data/v4/players/${player_id}/stats/csgo`;
  return axios.get(query, options);
};

export const getMatchHistory = async (username: string) => {
  const playerId = (await searchPlayer(username))?.data?.player_id;
  const query = `https://api.faceit.com/stats/api/v1/stats/time/users/${playerId}/games/csgo?size=100`;
  return await paginatedRequest(query, playerId, 1);
};

export const paginatedRequest = async (
  query: string,
  playerId: string,
  page: number,
  data: number[] = []
) => {
  await axios.get(query).then((res) => {
    // eslint-disable-next-line prefer-spread
    data.push(...res.data);

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
