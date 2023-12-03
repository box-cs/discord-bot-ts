import {
  getMatchHistory,
  searchPlayer,
  searchPlayerFromSteamID,
  searchPlayerStats,
} from "api/faceit/faceit-api";
import { FaceitPlayerData } from "api/faceit/types";

const TEST_USER: Pick<
  NonNullable<FaceitPlayerData>,
  "nickname" | "steam_id_64" | "player_id"
> = {
  // https://www.faceit.com/en/players/s1mple
  nickname: "s1mple",
  steam_id_64: "76561198034202275",
  player_id: "ac71ba3c-d3d4-45e7-8be2-26aa3986867d",
};

const searchPlayerAssertions = (player: FaceitPlayerData) => {
  expect(player.nickname).toBe(TEST_USER.nickname);
  expect(player.games.cs2.faceit_elo).toEqual(expect.any(Number));
  expect(player.games.cs2.skill_level).toEqual(expect.any(Number));
  expect(player.games.cs2.game_profile_id).toBeDefined();
  expect(player.games.cs2.skill_level_label).toBeDefined();
};

test("faceit-api - searchPlayer", async () => {
  const player = await searchPlayer(TEST_USER.nickname);
  searchPlayerAssertions(player);
});

test("faceit-api - searchPlayerFromSteamID", async () => {
  const player = await searchPlayerFromSteamID(TEST_USER.steam_id_64);
  searchPlayerAssertions(player);
});

test("faceit-api - searchPlayerStats", async () => {
  const playerStats = await searchPlayerStats(TEST_USER.nickname);
  expect(playerStats).toBeDefined();
});

test("faceit-api - getMatchHistory", async () => {
  const matchHistory = await getMatchHistory(TEST_USER.nickname);
  expect(matchHistory).toBeDefined();
  expect(matchHistory.length).toBeGreaterThan(0);
});
