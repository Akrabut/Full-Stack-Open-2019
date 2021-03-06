const { gql } = require('apollo-server');

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution']
  },
];

const typeDefs = gql`
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

function countBooks() {
  return books.reduce((bookCount, book) => {
    return bookCount.has(book.author)
      ? bookCount.set(book.author, bookCount.get(book.author) + 1)
      : bookCount.set(book.author, 1);
  }, new Map());
}

function allAuthors() {
  const map = countBooks();
  return authors.map(author => (
    {
      name: author.name,
      born: author.born,
      bookCount: map.get(author.name)
    }
  ));
}

function addAuthor(author, uuid) {
  authors.push({ name: author, id: uuid() })
}

function addBook(root, args) {
  const uuid = require('uuid/v1');
  if (!authors.includes(args.author)) addAuthor(args.author, uuid)
  const book = { ...args, id: uuid() };
  books.push(book);
  return book
}

function editAuthor(root, args) {
  const i = authors.findIndex(author => author.name === args.name);
  if (i === -1) return null;
  authors[i].born = args.setBornTo;
  return authors[i];
}

function allBooks(root, args) {
  let toReturn = books;
  if (args.author) {
    toReturn = toReturn.filter(book => book.author === args.author);
  }
  if (args.genre) {
    toReturn = toReturn.filter(book => book.genres.includes(args.genre));
  }
  return toReturn;
}

const resolvers = {
  Query: {
    hello: () => { return 'world'; },
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: allBooks,
    allAuthors: allAuthors,
  },
  Mutation: {
    addBook: addBook,
    editAuthor: editAuthor,
  }
};

module.exports = { typeDefs, resolvers };