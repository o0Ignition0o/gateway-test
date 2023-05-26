// Main
import { ApolloServer } from "@apollo/server";
import { ApolloGateway } from "@apollo/gateway";
import { readFileSync } from "fs";
import { startStandaloneServer } from "@apollo/server/standalone";

const port = 8000;

const gateway = new ApolloGateway({
  supergraphSdl: readFileSync("./supergraph.graphql").toString(),
});

const server = new ApolloServer({
  gateway,
});

const { url } = await startStandaloneServer(server, { listen: { port } });
console.log(`🚀  Gateway ready at ${url}`);
