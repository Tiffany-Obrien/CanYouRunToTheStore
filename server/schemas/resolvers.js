const { AuthenticationError } = require('apollo-server-express')
const { User, Item, List} = require('../models')
const { signToken } = require('../utils/auth')
//const stripe = require('stripe')('sk_test_51KnWTLJspjbSsWAyeelYzgt21wbCIe7TLNZXztNJajiYsFcJUZ7yBA75WzYJfEVMK5QqgvkgAdAG3NoiEDcDGBFB00s2PZ3R5M')

const resolvers = {
    Query: {
        lists: async () => {
            return await List.find()
        },
        items: async (parent, { list }) => {
            const params = {}
            if (list) {
                params.list = list
            }

            return await Item.find(params).populate('list')
        },
        item: async (parent, { _id }) => {
            return await List.findById(_id).populate('list')
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'pick.items',
                    populate: 'list'
                })

                user.pick.sort((a, b) => b.pickDate - a.pickDate)

                return user
            }

            throw new AuthenticationError('Not logged in')
        },
        /** 
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.shirts',
                    populate: 'category'
                })

                return user.order.id(_id)

            }

            throw new AuthenticationError('Not logged in')
        },
        */

        complete: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin
            const pick = new Pick({ items: args.items })
            const line_items = []

            const { items } = await pick.populate('items').execPopulate()

            for (let i = 0; i < items.length; i++) {
                const list = await stripe.list.create({
                    name: items[i].name,
                    description: items[i].description,
                    images: [`${url}/images/${items[i].image}`]
                })

                const price = await stripe.prices.create({
                    item: item.id,
                    unit_amout: items[i].price * 100,
                    currency: 'usd'
                })

                line_items.push({
                    prices: price.id,
                    quantity: 1
                });
            }
/**
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });
*/
            return { session: session.id };
        }
    },
    Mutation: {
    addUser: async (parent, args) => {
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
        addPick: async (parent, { items }, context) => {
            //checks to see if a user is logged in
            if (context.user) {

                const pick = new Pick({ items });

                await User.findOneAndUpdate(context.user._id,
                    { $push: { picks: pick } });

                return pick;
            }

            //if no user logged in, throw auth error
            throw new AuthenticationError('Not logged in');
        },
        updateItem: async (parent, { _id, price }) => {
            //updates shirt price and returns it
            return await Item.findByIdAndUpdate(_id, { price: price }, { new: true })
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
