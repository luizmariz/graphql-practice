const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => `Behold, the graphql's fury`,
    feed: (parent, args, context, info) => context.prisma.links()
  },
  Mutation: {
    createLink: (parent, args, context) =>
      context.prisma.createLink({
        url: args.url,
        description: args.description
      }),
    updateLink: (parent, args, context) =>
      context.prisma.updateLink({
        data: {
          url: args.url,
          description: args.description
        },
        where: {
          id: args.id
        }
      }),
    deleteLink: (parent, args, context) =>
      context.prisma.deleteLink({
        id: args.id
      })
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));