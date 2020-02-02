const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  input UsersWhereInput {
    status: String
  }

  extend type Query {
    me: User
    users(where: UsersWhereInput, take: Int = 5, skip: Int = 0): [User]
  }

  type User @key(fields: "id") {
    id: ID!
    status: String
    name: String
    username: String
  }
`;

const resolvers = {
  Query: {
    me() {
      return users[0];
    },
    users(_, args) {
      console.dir(args);

      return users
        .filter(user => user.status === args.where.status)
        .slice(args.skip, args.take);
    }
  },
  User: {
    __resolveReference(object) {
      return users.find(user => user.id === object.id);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const users = [
  {
    id: "1",
    name: "Ada Lovelace",
    status: 'online',
    birthDate: "1815-12-10",
    username: "@ada"
  },
  {
    id: "2",
    name: "Alan Turing",
    status: 'offline',
    birthDate: "1912-06-23",
    username: "@complete"
  }
];
