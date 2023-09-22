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

export type DataSource = "matchmaking"; // | Faceit | cs2 ?

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
