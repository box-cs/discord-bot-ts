import { env } from "../lib/config";
import { Pool } from "pg";

const pool = new Pool({
  user: env.get("DB_USER"),
  database: env.get("DB_NAME"),
  password: env.get("DB_PASSWORD"),
  port: env.get("DB_PORT"),
  host: env.get("DB_HOST"),
});

export const db = {
  query: async (text: string, params: (number | string | string[])[] = []) => {
    return await pool.query({
      text,
      values: params,
    });
  },
};
