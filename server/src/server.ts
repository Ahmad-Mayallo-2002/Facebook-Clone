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
import { authChecker } from "./graphql/authChecker/authChecker";
import { join } from "path";
import { globalMiddlewares, resolvers } from "./utils/buildSchema";
import { connect } from "./dataSource";
import './bullmq/worker/email.worker'
import { ValidationError } from "class-validator";
import { sessionStore } from "./redis/session.redis";
import { graphqlUploadExpress } from 'graphql-upload-ts';
import Container from "typedi";

async function bootstrap() {
  config();

  const { PORT, SESSION_SECRET, COOKIES_SECRET } = process.env;
  const port: number = +PORT! || 3000;

  await connect();

  const app = express();
  const schema = buildSchemaSync({
    resolvers,
    authChecker,
    globalMiddlewares,
    container: Container,
    validate: true,
  });

  app.use(express.static(join(__dirname, "./public")));
  app.use(graphqlUploadExpress({ maxFileSize: 1000_000_000, maxFiles: 20 }))
  app.use(bodyParser.json());
  app.use(cors());
  app.use(cookieParser(`${COOKIES_SECRET}`));
  app.use(
    session({
      store: sessionStore,
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
    formatError(formattedError, error) {
      const validationErrors = formattedError?.extensions?.validationErrors as ValidationError[];
      const errors = (validationErrors) ? validationErrors.map(error => ({ constraints: error.constraints })) : []
      return {
        message: formattedError.message,
        code: formattedError.extensions?.code,
        validationErrors: errors
      };
    },
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
