export type FaceitPlayerData = {
  activated_at: Date;
  avatar: string;
  country: string;
  cover_featured_image: string;
  cover_image: string;
  nickname?: string;
  faceit_url: string;
  friends_ids: string[];
  games: { [key: string]: Game };
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
