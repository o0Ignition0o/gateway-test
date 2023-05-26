import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@requires", "@external"]
    )

  type Thing @key(fields: "id") {
    id: ID!
    foo: String! @external
    bar: String! @requires(fields: "foo")
  }
`;

const things = [
  {
    id: "12345",
    foo: "hello",
    bar: "bar1",
  },
  {
    id: "12346",
    foo: "world",
    bar: "bar2",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Thing: {
    __resolveReference(thing) {
      return things.find((t) => t.foo == thing.foo);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 8002 },
});

console.log(`🚀  Subgraph B ready at: ${url}`);
