import { config } from "dotenv";
import "reflect-metadata";
import "./bullmq/worker/email.worker";
import "./bullmq/worker/notification.worker";
import { startServer } from "./graphql";
import { connect } from "./dataSource";

config({ quiet: true });;

async function bootstrap() {
  await connect();
  const port = Number(process.env.PORT) || 3000;
  await startServer(port);
}

bootstrap();
