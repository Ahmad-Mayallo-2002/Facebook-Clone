import { log } from "console";
import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

const { DB_PASSWORD, DB_NAME, DB_USERNAME, DB_PORT } = process.env;

export const dataSource = new DataSource({
  password: `${DB_PASSWORD}`,
  username: `${DB_USERNAME}`,
  database: `${DB_NAME}`,
  port: Number(DB_PORT),
  host: "localhost",
  type: `postgres`,
  synchronize: true,
});

async function connect() {
  try {
    await dataSource.initialize();
    log("Database connection is done");
  } catch (err) {
    log("Error in database connection", err);
  }
}

connect();
