const { AuthenticationError } = require('apollo-server-express');
const { User, Item, List} = require('../models');
const { signToken } = require('../utils/auth');
//const stripe = require('stripe')('sk_test_51KnWTLJspjbSsWAyeelYzgt21wbCIe7TLNZXztNJajiYsFcJUZ7yBA75WzYJfEVMK5QqgvkgAdAG3NoiEDcDGBFB00s2PZ3R5M')

const resolvers = {
    Query: {
        lists: async (parent, args, context) => {
            if (context.user) {
            const params = username ? { username } : {};
            return List.find(params).sort({ createdAt: -1 });
            }
            throw new AuthenticationError('You need to be logged in!');
            },

        list: async (parent, { _id: listId  }, context) => {
            if(context.user) {
            return List.findOne({ _id: listId });
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        items: async(parent, { listId }, context ) => {
            if(context.user) {
                return List.findOne({ _id: listId})
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('lists');
            }
            throw new AuthenticationError('You need to be logged in!');
            },
    },

    Mutation: {
        addUser: async (parent, args ) => {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
        },

        login: async (parent, { email, password }) => {
            //gets user by email
            const user = await User.findOne({ email });

            //checks to see if user exists
            if (!user) {
                throw new AuthenticationError('Incorrect credentials!')
            }

            //boolean: if password is correct or not
            const correctPassword = await user.isCorrectPassword(password);

            //if false, then throw error
            if (!correctPassword) {
                throw new AuthenticationError('Incorrect credentials!')
            }

            //sign token with user data
            const token = signToken(user)

            //return token and user
            return { token, user };
        },
        addList: async (parent, { listName, listAuthor }, context) => {
            if (context.user) {
                const list = await List.create({ listName, listAuthor});

                await User.findOneAndUpdate(
                    { username: listAuthor },
                    { $push: { lists: list._id } }
                );
                return list;
                }
                throw new AuthenticationError('Please log in to create a list before you run to the store!')
            },
        addItemToList: async (parent, { listId, itemText, listAuthor }, context) => {
            if (context.user) {
            return List.findOneAndUpdate(
                { _id: listId },
                { $push: { items: { itemText, listAuthor } },
                },
                {
                    new: true, 
                    runValidators: true,
                }
            );
            }
                throw new AuthenticationError('Please log in to create a list before you run to the store!')
            },
        addNote: async (parent, {itemId, noteText, listAuthor }, context) => {
            if (context.user) {
                return Item.findOneAndUpdate(
                    { _id: itemId },
                    { $push: { note: {noteText, listAuthor } },
                },
                {
                    new: true,
                    runValidators: true,
                }
                );
            }
                throw new AuthenticationError('Please log in to create a list before you run to the store!')
        },
        updateItem: async (parent, { listId, itemText, listAuthor }, context) => {
            if (context.user) {
            return List.findOneAndUpdate(
                { _id: listId },
                { $push: { items: { itemText, listAuthor } },
                },
                {
                    new: true, 
                    runValidators: true,
                }
            );
            }
                throw new AuthenticationError('Please log in to create a list before you run to the store!')
            },
        updateNote: async (parent, {itemId, noteText, listAuthor }, context) => {
            if (context.user) {
                return Item.findOneAndUpdate(
                    { _id: itemId },
                    { $push: { note: {noteText, listAuthor } },
                },
                {
                    new: true,
                    runValidators: true,
                }
                );
            }
                throw new AuthenticationError('Please log in to create a list before you run to the store!')
        },
        removeItemFromList: async ( parent, {listId, itemId }, context) => {
            if (context.user) {
                return List.findOneAndUpdate(
                    { _id: listId }, 
                    { $pull: {items: { _id: itemId } } },
                    {new: true }
                );
            };
                throw new AuthenticationError('Please log in to create a list before you run to the store!')            
        },
        removeNoteFromItem: async ( parent, { itemId, noteId }) => {
            if (context.user) {
                return Item.findOneAndUpdate(
                    { _id: itemId },
                    { $pull: { notes: { _id: noteId } } },
                    { new: true },
                );
            };
                throw new AuthenticationError('Please log in to create a list before you run to the store!')
        },
        removeList: async ( parent, { listId }) => {
            if (context.user) {
                return List.findOneAndDelete({ _id: listId});
            };
                throw new AuthenticationError('Please log in to create a list before you run to the store!')
        },
        clearList: async ( parent, { listId, itemId }, context) => {
            if (context.user) {
                return Item.updateMany(
                    { _id: listId },
                    { $pullAll: { items: { _id: itemId } } },
                    { new: true }
                );
            };
                throw new AuthenticationError('Please log in to create a list before you run to the store!')            
        },
    },
};

module.exports = resolvers;
