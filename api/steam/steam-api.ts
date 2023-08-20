const { STEAM_API_KEY } = require("../../config.json");
import axios from "axios";

const getResolvedSteamID = async (vanityURL: string) => {
  const query = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${vanityURL}`;
  return axios.get(query);
};
/**
 * @param url steamcommunity profile url
 * @returns resolved steamID
 */
const resolveSteamID = async (url: string) => {
  // https://steamcommunity.com/profiles/{id64}/
  // https://steamcommunity.com/id/{vanityId}/
  const linkType = url.split("/").at(3);
  let id = url.split("/").at(4);

  if (linkType === "id") {
    const res = await getResolvedSteamID(id);
    const { response } = res?.data;
    if (response && response?.success == 1) {
      id = response?.steamid;
    } else {
      throw new Error("Vanity URL could not be resolved!");
    }
  }

  return id;
};

module.exports = {
  resolveSteamID,
};
