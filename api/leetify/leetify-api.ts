import {
  DataSource,
  GameVersion,
  GeneralData,
  LeetifyLifetimeStats,
  LeetifyUser,
} from "./types";
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

const getGeneralStats = async (
  leetifyUserId: string,
  dataSources: DataSource[],
  gameVersions: GameVersion[]
): Promise<GeneralData> => {
  const dataSourcesQuery = dataSources.map((x) => `&dataSources=${x}`).join("");
  const gameVersionsQuery = gameVersions
    .map((x) => `&gameVersions=${x}`)
    .join("");
  const url = `https://api.leetify.com/api/general-data?side=null&roundEconomyType=null${dataSourcesQuery}${gameVersionsQuery}&spectatingId=${leetifyUserId}`;
  const res = await fetch(url, {
    method: "GET",
    headers,
  });
  const data = (await res.json()) as { generalData: GeneralData };
  return data.generalData;
};

export const getLeetifyUserLifetimeStats = async (
  steam64Id: string,
  dataSources: DataSource[],
  gameVersions: GameVersion[]
): Promise<LeetifyLifetimeStats> => {
  const leetifyUser = await getLeetifyUser(steam64Id);
  const userStats = await getGeneralStats(
    leetifyUser.userId,
    dataSources,
    gameVersions
  );
  return {
    nickname: leetifyUser.nickname,
    pictureUrl: leetifyUser.pictureUrl,
    adr: userStats.current.gamesTotals.adr,
    hltvRating: userStats.current.gamesTotals.hltvRating,
    kd: userStats.current.gamesTotals.killDeathRatio,
    kpr: userStats.current.gamesTotals.avgKillsPerRound,
    leetifyRating: userStats.current.gamesTotals.leetifyRating,
    hsKillsPercentage: userStats.current.gamesTotals.hsKillsPercentage,
  };
};
