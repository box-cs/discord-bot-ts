import { GeneralData, LeetifyLifetimeStats, LeetifyUser } from "./types";
import { LEETIFY_API_TOKEN } from "../../config.json";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${LEETIFY_API_TOKEN}`,
};

const getLeetifyUser = async (steam64Id: string): Promise<LeetifyUser> => {
  const url = "https://api.leetify.com/api/search/users";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ query: steam64Id }),
    headers,
  });
  const data = (await res.json()) as LeetifyUser[];
  return data?.[0];
};

const getGeneralStats = async (leetifyUserId: string): Promise<GeneralData> => {
  const url = `https://api.leetify.com/api/general-data?side=null&roundEconomyType=null&dataSources=faceit&spectatingId=${leetifyUserId}`;
  const res = await fetch(url, {
    method: "GET",
    headers,
  });
  const data = (await res.json()) as { generalData: GeneralData };
  return data.generalData;
};

export const getLeetifyUserLifetimeStats = async (
  steam64Id: string
): Promise<LeetifyLifetimeStats> => {
  const leetifyUser = await getLeetifyUser(steam64Id);
  const userStats = await getGeneralStats(leetifyUser.userId);
  return {
    nickname: leetifyUser.nickname,
    pictureUrl: leetifyUser.pictureUrl,
    adr: userStats.current.gamesTotals.adr,
    hltvRating: userStats.current.gamesTotals.hltvRating,
    kd: userStats.current.gamesTotals.killDeathRatio,
    kpr: userStats.current.gamesTotals.avgKillsPerRound,
    leetifyRating: userStats.current.gamesTotals.leetifyRating,
  };
};
