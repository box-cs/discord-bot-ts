import axios from "axios";
import { FaceitPlayerData, FaceitPlayerStats } from "./types";
import { env } from "../../lib/config";

const FACEIT_API_KEY = env.get("FACEIT_API_KEY");

const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${FACEIT_API_KEY}`,
  },
};

export const searchPlayer = async (
  username: string
): Promise<FaceitPlayerData> => {
  const query = `https://open.faceit.com/data/v4/players?nickname=${username}&game=cs2`;
  return (await axios.get(query, options)).data;
};

export const searchPlayerFromSteamID = async (
  steamID: string
): Promise<FaceitPlayerData> => {
  const query = `https://open.faceit.com/data/v4/players?game=cs2&game_player_id=${steamID}`;
  return (await axios.get(query, options)).data;
};

export const searchPlayerStats = async (
  username: string
): Promise<FaceitPlayerStats> => {
  const player_id = (await searchPlayer(username))?.player_id;
  const query = `https://open.faceit.com/data/v4/players/${player_id}/stats/cs2`;
  return (await axios.get(query, options)).data;
};

export const getMatchHistory = async (username: string) => {
  const playerId = (await searchPlayer(username))?.player_id;
  const query = `https://api.faceit.com/stats/v1/stats/time/users/${playerId}/games/cs2?size=100`;
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
        `https://api.faceit.com/stats/v1/stats/time/users/${playerId}/games/cs2?size=100&page=${page}`,
        playerId,
        page + 1,
        data
      );
    }
  });
  return data;
};
