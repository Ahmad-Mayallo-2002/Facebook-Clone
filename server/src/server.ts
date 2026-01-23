import { config } from "dotenv";
import express, { Express } from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import cors from "cors";
import { log } from "console";

async function bootstrap() {
  config();

  const { PORT, SESSION_SECRET, COOKIES_SECRET } = process.env;
  const port: number = +PORT! || 3000;

  const app: Express = express();
  const httpServer = createServer(app);

  const schema = buildSchemaSync({
    resolvers: []
  });

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(
    cors(),
    express.json(),
    bodyParser.json(),
    cookieParser(`${COOKIES_SECRET}`),
    session({
      secret: `${SESSION_SECRET}`,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
      }
    }),
    expressMiddleware(apolloServer),
  );

  httpServer.listen(port, () => log(`http://localhost:${port}`));
}

bootstrap();
