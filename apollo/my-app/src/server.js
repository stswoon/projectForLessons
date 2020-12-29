const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
  # this means comments    
  type Book {
    title: String
    author: String
  }
  # The "Query" type is special: it lists all of the available queries that
  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin'
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster'
    }
];

const resolvers = {
    Query: {
        books: () => books,
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});
