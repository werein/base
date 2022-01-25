// import { User } from ".prisma/client";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as http from "http";
import { join } from "path";
import isTokenValid from "./utils/validate-token";

const schema = loadSchemaSync(join(__dirname, "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

export type Ctx = {
  // currentUser: Promise<User>;
};

const prisma = new PrismaClient();

// async function currentUser(decoded: any) {
//   const user = await prisma.user.findUnique({
//     where: { token: decoded.sub },
//     rejectOnNotFound: false,
//   });

//   if (!user) {
//     return await prisma.user.create({
//       data: { token: decoded.sub, name: decoded.nickname },
//     });
//   }

//   return user;
// }

const resolvers = {
  Query: {
    currentUser: async (_, __, {}: Ctx) => {
      return {
        name: "Jiri",
      };
    },
  },
};

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const app = express();
app.use(express.static("build"));

const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema: schemaWithResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: async ({ context, req }: any) => {
    const token = req.headers.authorization;
    const decoded = await isTokenValid(token);

    return {
      ...context,
      // currentUser: currentUser(decoded),
    };
  },
});

async function main() {
  await prisma.$connect();
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

main();
