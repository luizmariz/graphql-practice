const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `Behold, the graphql's fury`,
    feed: () => links
  },
  Mutation: {
    createLink: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links[parseInt(args.id.split('-')[1])];
      if (args.url) link.url = args.url;
      if (args.description) link.description = args.description
      return link;
    },
    deleteLink: (parent, args) => {
      delete links[parseInt(args.id.split('-')[1])];
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));