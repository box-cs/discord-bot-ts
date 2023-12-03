export type FaceitPlayerData = {
  activated_at: Date;
  avatar: string;
  country: string;
  cover_featured_image: string;
  cover_image: string;
  nickname?: string;
  faceit_url: string;
  friends_ids: string[];
  games: Games;
  infractions: string;
  membership_type: string;
  memberships: string[];
  new_steam_id: string;
  platforms: Platforms;
  player_id: string;
  settings: Settings;
  steam_id_64: string;
  steam_nickname: string;
  verified: boolean;
};

export type Games = { [key: string]: Game };
export type Game = {
  faceit_elo: number;
  game_player_id: string;
  game_player_name: string;
  game_profile_id: string;
  region: string;
  regions: unknown;
  skill_level: number;
  skill_level_label: string;
};

export type Platforms = {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
};

export type Settings = {
  language: string;
};

export type FaceitPlayerStats = {
  player_id: string;
  game_id: string;
  lifetime: Lifetime;
  segments?: Segments[] | null;
};

export type Lifetime = {
  "Longest Win Streak": string;
  "Recent Results": string[] | null;
  "Current Win Streak": string;
} & Pick<
  Stats,
  | "Average K/D Ratio"
  | "Matches"
  | "Win Rate %"
  | "Wins"
  | "K/D Ratio"
  | "Average Headshots %"
  | "Total Headshots %"
>;

export type Stats = {
  "Penta Kills": string;
  "Average K/D Ratio": string;
  "Total Headshots %": string;
  "Average Headshots %": string;
  "Average Kills": string;
  "K/R Ratio": string;
  Deaths: string;
  "Average Penta Kills": string;
  Matches: string;
  "Average Assists": string;
  Headshots: string;
  "Average Triple Kills": string;
  "Average Quadro Kills": string;
  "K/D Ratio": string;
  "Headshots per Match": string;
  MVPs: string;
  "Average Deaths": string;
  "Average MVPs": string;
  "Average K/R Ratio": string;
  Assists: string;
  Wins: string;
  Kills: string;
  "Triple Kills": string;
  "Win Rate %": string;
  Rounds: string;
  "Quadro Kills": string;
};

export type Segments = {
  img_regular: string;
  stats: Stats;
  type: string;
  mode: string;
  label: string;
  img_small: string;
};
