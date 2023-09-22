export type FaceitPlayer = {
  activated_at: Date;
  avatar: string;
  country: string;
  cover_featured_image: string;
  cover_image: string;
  data?: {
    player_id: string;
  };
  faceit_url: string;
  friends_ids: string[];
  games: Games;
  infractions: string;
  membership_type: string;
  memberships: string[];
  new_steam_id: string;
  nickname: string;
  platforms: Platforms;
  player_id: string;
  settings: Settings;
  steam_id_64: string;
  steam_nickname: string;
  verified: boolean;
};

export type Games = {
  additionalProp1: AdditionalProp;
  additionalProp2: AdditionalProp;
  additionalProp3: AdditionalProp;
};

export type AdditionalProp = {
  faceit_elo: number;
  game_player_id: string;
  game_player_name: string;
  game_profile_id: string;
  region: string;
  regions: string;
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
