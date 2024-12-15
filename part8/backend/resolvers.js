const Book = require("./models/book");
const Author = require("./models/author");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const { GraphQLError } = require("graphql");
const author = require("./models/author");

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
  Query: {
    me: async (root, args, { currentUser }) => {
      return currentUser;
    },
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {};
      if (args.genre) {
        filter.genres = args.genre;
      }

      const books = await Book.find(filter).populate("author");

      return books;
    },
    allAuthors: async () => await Author.find({}).populate("books"),
  },
  Mutation: {
    login: async (root, args) => {
      const username = args.username;
      const user = await User.findOne({
        username,
      });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    createUser: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        const newUser = new User({ ...args });
        response = await newUser.save();
        return response;
      } catch (error) {
        throw new GraphQLError("adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const authorToEdit = await Author.findOne({ name: args.name });

      const editedAuthor = {
        born: args.setBornTo,
      };
      const savedAuthor = await Author.findByIdAndUpdate(
        authorToEdit._id.toString(),
        editedAuthor,
        { new: true }
      );
      return savedAuthor;
    },
    addBook: async (root, args) => {
      try {
        const newAuthor = {
          name: args.author,
          born: null,
          books: [],
        };
        let authorId;
        let savedAuthor;
        savedAuthor = await Author.findOne({ name: newAuthor.name });
        if (!savedAuthor) {
          const author = new Author(newAuthor);
          savedAuthor = await author.save();
          authorId = savedAuthor._id;
        } else {
          authorId = savedAuthor._id;
        }

        const newBook = { ...args, author: authorId };
        const book = new Book(newBook);
        const savedBook = await book.save();
        const returnBook = await savedBook.populate("author");

        savedAuthor.books.push(savedBook._id);
        await savedAuthor.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: returnBook });
        return returnBook;
      } catch (error) {
        throw new GraphQLError("adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length;
    },
  },
};
module.exports = resolvers;
