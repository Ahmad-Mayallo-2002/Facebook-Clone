import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import { log } from "console";
import { Container } from "typedi";
import { UserResolver } from "./resolvers/user.resolver";
import { authChecker } from "./graphql/authChecker/authChecker";
import { RedisStore } from "connect-redis";
import { redisClient } from "./utils/redis";
import { ResolveTime } from "./middlewares/resolveTime.middleware";
import './dataSource';

async function bootstrap() {
  config();

  const { PORT, SESSION_SECRET, COOKIES_SECRET } = process.env;
  const port: number = +PORT! || 3000;

  const app = express();
  const schema = buildSchemaSync({
    resolvers: [UserResolver],
    container: Container,
    authChecker,
    globalMiddlewares: [ResolveTime]
  });

  app.use(bodyParser.json());
  app.use(cors());
  app.use(cookieParser(`${COOKIES_SECRET}`));
  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
        prefix: "sess:",
      }),
      secret: `${SESSION_SECRET}`,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
        session: req.session,
        cookies: req.cookies,
      }),
    }),
  );

  app.listen(port, () => {
    log(`http://localhost:${port}/graphql`);
  });
}

bootstrap();
