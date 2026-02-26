import { config } from "dotenv";
import "reflect-metadata";
import "./bullmq/worker/email.worker";
import { startServer } from "./graphql";
import { connect } from "./dataSource";

config();

async function bootstrap() {
  await connect();
  const port = Number(process.env.PORT) || 3000;
  await startServer(port);
}

bootstrap();
