const { ApolloServer } = require('apollo-server')
const serverProps = require('./library-backend')

const server = new ApolloServer(serverProps);

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});