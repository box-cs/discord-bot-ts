import dotenv from "dotenv";
dotenv.config();

const config: Record<string, string> = {
  APEX_API_KEY: process.env.APEX_API_KEY,
  BOT_CLIENT_ID: process.env.BOT_CLIENT_ID,
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  FACEIT_API_KEY: process.env.FACEIT_API_KEY,
  IMGUR_ID: process.env.IMGUR_ID,
  IMGUR_SECRET: process.env.IMGUR_SECRET,
  LEETIFY_API_TOKEN: process.env.LEETIFY_API_TOKEN,
  OWNER_ID: process.env.OWNER_ID,
  PERSONAL_GUILD_IDS: process.env.PERSONAL_GUILD_IDS,
  STEAM_API_KEY: process.env.STEAM_API_KEY,
  TRACKER_API_KEY: process.env.TRACKER_API_KEY,
  WELCOME_CHANNEL: process.env.WELCOME_CHANNEL,
};

export const env = {
  get: (key: string): string | string[] => {
    const envVar = config[key];
    if (!envVar) throw new Error(`Missing environment variable ${key}`);
    if (envVar.includes(",")) return envVar.split(",");
    return envVar;
  },
};
