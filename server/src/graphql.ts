// graphql.ts
import { ApolloServer } from "@apollo/server";
import { buildSchemaSync } from "type-graphql";
import { Container } from "typedi";
import { AuthChecker } from "./graphql/authChecker/authChecker";
import { globalMiddlewares, resolvers } from "./utils/buildSchema";
import { app } from "./app";
import { expressMiddleware } from "@as-integrations/express5";
import { httpServer, io } from "./socket";
import {
  commentLoader,
  postLoader,
  userLoader,
} from "./interfaces/loader.interface";
import { ValidationError } from "class-validator";

export const schema = buildSchemaSync({
  resolvers,
  authChecker: AuthChecker,
  globalMiddlewares,
  container: Container,
  validate: true,
});

export const apolloServer = new ApolloServer({
  schema,
  formatError(formattedError) {
    const validationErrors = formattedError?.extensions
      ?.validationErrors as ValidationError[];
    const errors = validationErrors
      ? validationErrors.map((error) => ({ constraints: error.constraints }))
      : [];
    return {
      message: formattedError.message,
      code: formattedError.extensions?.code,
      validationErrors: errors,
    };
  },
});

export async function startServer(port: number) {
  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({
        req,
        res,
        session: req.session,
        ...userLoader,
        ...postLoader,
        ...commentLoader,
      }),
    }),
  );

  httpServer.listen(port, () => {
    console.log(`http://localhost:${port}/graphql`);
  });
}
