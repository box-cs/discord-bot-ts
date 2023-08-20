export interface Player {
  nickname: string;
  avatar: string;
}

export interface MapData {
  current: {
    map: string;
    remainingTimer: string;
  };
  next: {
    map: string;
  };
}

export interface ApexAPIData {
  battle_royale: MapData;
  ranked: MapData;
}
