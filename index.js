import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const Posts = [
  {
    id: 1,
    title: "Post 1",
    body: "Body 1",
    comments: ["Comment 1", "Comment 2"],
  },
  {
    id: 2,
    title: "Post 2",
    body: "Body 2",
    comments: ["Comment 3", "Comment 4"],
  },
  {
    id: 3,
    title: "Post 3",
    body: "Body 3",
    comments: ["Comment 5", "Comment 6"],
  },
];

const typeDefs = `#graphql
    
    type Post {
        id: ID!
        title: String!
        body: String!
        comments: [String!]
    }



    type Mutation {
        createPost(title: String!, body: String!, comments: [String!]): Post


    }

    type Query {
        posts: [Post!]!
        greetings(name: String!): String!
        add(a:Int!, b: Int!): Int!
    }
`;

const resolvers = {
  Query: {
    posts: () => Posts,

    greetings(parent, args, ctx, info) {
      console.log(args);
      return `Hello ${args.name}`;
    },

    add: (parent, args) => {
      return args.a + args.b;
    },
  },

  Mutation: {
    createPost: (_, { title, body, comments }) => {
      const newPost = {
        id: Posts.length + 1,
        title,
        body,
        comments,
      };

      Posts.push(newPost);
      return newPost;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀  Server ready at: ${url}`);
