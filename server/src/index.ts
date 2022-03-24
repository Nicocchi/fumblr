require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from 'express';
import http from 'http';
import { DatabaseInit } from "orm";
import { typeDefs, resolvers } from "interface";
import { AuthScope } from "services";

(async function () {
    await DatabaseInit();
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: async ({ req }) => ({
            auth: await AuthScope(req.headers.authorization || ""),
        }),
        debug: <string>process.env.TS_NODE_DEV === "true",
    });

    await server.start();
    server.applyMiddleware({ app, cors: {
        credentials: true,
        origin: true
      }, });
    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: async ({ req }) => ({
//         auth: await AuthScope(req.headers.authorization || ""),
//     }),
//     debug: <string>process.env.TS_NODE_DEV === "true",
// });

// // Initialize the server
// (async function () {
//     try {
//         await DatabaseInit();
//         const { url } = await server.listen();

//         console.log(`🚀  Server ready at ${url}`);
//     } catch (err) {
//         console.log("Server failed to launch", err);
//     }
// })();