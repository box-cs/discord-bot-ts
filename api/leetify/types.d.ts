export type LeetifyLifetimeStats = {
  nickname: string;
  pictureUrl: string;
  adr: number;
  hltvRating: number;
  kd: number;
  kpr: number;
  leetifyRating: number;
  hsKillsPercentage: number;
};

export type GameVersion = "csgo" | "cs2";
export type DataSource = "matchmaking" | "faceit";

export type LeetifyUser = {
  nickname: string;
  pictureUrl: string;
  steam64Id: string;
  userId: string;
};

export type GeneralData = {
  current: GameData;
  previous: GameData;
};

export type GameData = {
  gamesPlayed: number;
  gamesWon: number;
  gamesTied: number;
  gamesLost: number;
  winRate: number;
  gamesTotals: Game;
  games: Game[];
};

export type Game = {
  kills: number;
  deaths: number;
  killDeathRatio: number;
  avgKillsPerRound: number;
  avgDeathsPerRound: number;
  multiKills: MultiKills;
  hsKillsPercentage: number;
  assists: number;
  roundsSurvivedPercentage: number;
  damage: number;
  adr: number;
  hltvRating: number;
  leetifyRating: number;
  personalPerformanceRating: null;
  roundsPlayed: number;
  roundsSurvived: number;
  tradeKillOpportunities: number;
  tradeKillAttempts: number;
  tradeKillsSucceed: number;
  tradeKillAttemptsPercentage: number;
  tradeKillsSuccessPercentage: number;
  tradedDeathOpportunities: number;
  tradedDeathAttempts: number;
  tradedDeathsSucceed: number;
  tradedDeathAttemptsPercentage: number;
  tradedDeathsSuccessPercentage: number;
  tradeKillOpportunitiesPerRound: number;
  tradedDeathsOpportunitiesPerRound: number;
  isCs2: boolean;
  gameId?: string;
  mapName?: string;
  finishedAt?: Date;
  dataSource?: DataSource;
  isWon?: boolean;
};

export type MultiKills = {
  "2": MultiKill;
  "3": MultiKill;
  "4": MultiKill;
  "5": MultiKill;
  all: MultiKill;
};

export type MultiKill = {
  perRoundRatio: number;
  total: number;
};

export type LeetifyProfileData = {
  highlights?: Highlights[] | null;
  personalBests?: PersonalBests[] | null;
  recentGameRatings: RecentGameRatings;
  teammates?: TeammatesEntity[] | null;
  games?: GamesEntity[] | null;
  meta: Meta;
};

export type Highlights = {
  createdAt: string;
  description: string;
  gameId: string;
  id: string;
  isPinned: boolean;
  pendingPro: boolean;
  rankValue?: null;
  roundNumber: number;
  steam64Id: string;
  thumbnailUrl: string;
  url: string;
  username: string;
};

export type PersonalBests = {
  gameId: string;
  skillId: string;
  value: string;
};

export type RecentGameRatings = {
  aim: number;
  positioning: number;
  utility: number;
  gamesPlayed: number;
  clutch: number;
  ctLeetify: number;
  leetify: number;
  opening: number;
  tLeetify: number;
};

export type TeammatesEntity = {
  isCollector: boolean;
  isProPlan: boolean;
  leetifyUserId?: string | null;
  club?: Club | null;
  isBanned: boolean;
  isLeetifyStaff: boolean;
  matchesPlayedTogether: number;
  profileUserLeetifyRating: number;
  rank?: Rank | null;
  steam64Id: string;
  steamAvatarUrl?: string | null;
  steamNickname: string;
  teammateLeetifyRating: number;
  winRateTogether: number;
};

export type Club = {
  name: string;
  tag: string;
};

export type Rank = {
  type?: string | null;
  dataSource: string;
  skillLevel: number;
};

export type GamesEntity = {
  enemyTeamSteam64Ids?: (string | null)[] | null;
  isCompletedLongMatch: boolean;
  ownTeamSteam64Ids?: string[] | null;
  ownTeamTotalLeetifyRatingRounds: { [key: number]: number | null };
  ownTeamTotalLeetifyRatings: { [key: number]: number | null };
  ctLeetifyRating?: number | null;
  ctLeetifyRatingRounds?: number | null;
  dataSource: string;
  elo?: null;
  gameFinishedAt: string;
  gameId: string;
  isCs2: boolean;
  mapName: string;
  matchResult: string;
  rankType?: number | null;
  scores?: number[] | null;
  skillLevel?: number | null;
  tLeetifyRating?: number | null;
  tLeetifyRatingRounds?: number | null;
  deaths?: number | null;
  hasBannedPlayer?: boolean | null;
  kills?: number | null;
  partySize?: number | null;
};

export type Meta = {
  name: string;
  steam64Id: string;
  steamAvatarUrl: string;
  isCollector: boolean;
  isLeetifyStaff: boolean;
  isProPlan: boolean;
  leetifyUserId: string;
  faceitNickname: string;
  platformBans?: null[] | null;
};
