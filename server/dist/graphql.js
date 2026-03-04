"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloServer = exports.schema = void 0;
exports.startServer = startServer;
// graphql.ts
const server_1 = require("@apollo/server");
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const authChecker_1 = require("./graphql/authChecker/authChecker");
const buildSchema_1 = require("./utils/buildSchema");
const app_1 = require("./app");
const express5_1 = require("@as-integrations/express5");
const socket_1 = require("./socket");
const loader_interface_1 = require("./interfaces/loader.interface");
exports.schema = (0, type_graphql_1.buildSchemaSync)({
    resolvers: buildSchema_1.resolvers,
    authChecker: authChecker_1.AuthChecker,
    globalMiddlewares: buildSchema_1.globalMiddlewares,
    container: typedi_1.Container,
    validate: true,
});
exports.apolloServer = new server_1.ApolloServer({
    schema: exports.schema,
    formatError(formattedError) {
        const validationErrors = formattedError?.extensions
            ?.validationErrors;
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
async function startServer(port) {
    await exports.apolloServer.start();
    app_1.app.use("/graphql", (0, express5_1.expressMiddleware)(exports.apolloServer, {
        context: async ({ req, res }) => ({
            req,
            res,
            session: req.session,
            ...loader_interface_1.userLoader,
            ...loader_interface_1.postLoader,
            ...loader_interface_1.commentLoader,
        }),
    }));
    socket_1.httpServer.listen(port, () => {
        console.log(`http://localhost:${port}/graphql`);
    });
}
