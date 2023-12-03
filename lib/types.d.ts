export type MapData = {
  current: {
    map: string;
    remainingTimer: string;
  };
  next: {
    map: string;
  };
};

export type ApexAPIData = {
  battle_royale: MapData;
  ranked: MapData;
};
