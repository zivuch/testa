import knex from "knex";
import { config } from "dotenv";

config();

export const db = knex({
  client: "pg",
  connection: {
    host: "ep-winter-shape-a2rbuxds-pooler.eu-central-1.aws.neon.tech",
    password: "npg_0dOxKiJ2qrns",
    user: "neondb_owner",
    database: "neondb",
    port: "5432",
    ssl: { rejectUnauthorized: false },
  },
});