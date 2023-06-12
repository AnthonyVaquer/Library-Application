const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');


//graphql resolvers, mutations and typedefs
const resolvers = {
  
  // get me query
  Query: {
    me: async (_,__,context) => {
      console.log(context);
      if (!context.userId) {
        throw new Error ("Invalid token.")
      }
        const foundUser = await User.findById(context.userId);
          return foundUser;
    },
  },


  Mutation: {

    // login user mutation
    login: async (parent, {email, password}) => {
      const user = await User.findOne({ $or: [{ email: email }] });
      if (!user) {
        throw new Error ("Email address does not exist.")
      }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new Error ("Wrong password.")
    }
    const token = signToken(user);
    return ({ token, user });
    },

    // add user mutation
    addUser: async (parent, {username, email, password}) => {
      var emailUsed = await User.findOne({email})
      if (emailUsed) {
        throw new Error ("Email is already in use.");
      }
    const user = await User.create({username, email, password});
    const token = signToken(user);
    return { token, user }
    },
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYW50aG9ueSIsImVtYWlsIjoiMTIzQGdtYWlsLmNvbSIsIl9pZCI6IjY0NzUwYWEwNTEyNjhlOWNlZmU5OWFlMCJ9LCJpYXQiOjE2ODUzOTIwMzMsImV4cCI6MTY4NTM5OTIzM30.JsZHTDaq6eh4iLh4RiY3Snn0fl1Q56SDpjRxYSdxBCE
    
// save book mutation
saveBook: async (parent, {authors, description, title, bookId, image, link}, context) => {
      if (!context.userId) {
        throw new Error ("Invalid token.");
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.userId },
        { $addToSet: { savedBooks: {authors, description, title, bookId, image, link} } },
        { new: true, runValidators: true });
        return updatedUser;
    },

    // remove book mutation
    removeBook: async (parent, {bookId}, context) => {
      if (!context.userId) {
        throw new Error ("invalid token")
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.userId },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true });
      return updatedUser;
    }
  }
};

module.exports = resolvers;
