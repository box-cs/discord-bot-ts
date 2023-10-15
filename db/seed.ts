import { EventHandler } from "../core/eventHandler";
import { db } from "./database";

const eventsTableSchema = `
  CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    creatorId VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    guildId VARCHAR(255) NOT NULL,
    description TEXT,
    responseType smallint NOT NULL,
    privacy smallint NOT NULL,
    keywords TEXT[]
  );
`;

const getEvents = async () => {
  const res = await db.query(`SELECT * FROM events`, []);
  console.log(res.rows);
  return res.rows;
};

export const initializeDb = async () => {
  const tables = [eventsTableSchema];
  await Promise.all(tables.map(async (table) => db.query(table)));
  const events = await getEvents();
  for (const event of events) {
    EventHandler.addEvent(event);
  }
};
