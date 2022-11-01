const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type List {
        _id: ID
        listAuthor: String
        listName: String
        store: String
        lists: [List]!
    }
    
    type Item {
        _id: ID
        itemText: String
        createdAt: String
        notes: [Note]!
    }

    type Note {
        _id: ID
        noteText: String
    }

    type Pick { 
        _id: ID
        purchaseDate: String
        items: [Item]
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        lists: [List]!
    }

    type Complete {
        session: ID
    }   
    
    type Auth {
        token: ID
        user: User
    }
    type Query {
        me(username: String): [List]
        lists(username: String): [List]
        singleList (listId: ID!): List 
        items(list: ID): [Item]
        item(_id: ID!): Item
        user: User
        pick(_id: ID!): Pick
        complete(items: [ID]!): Complete
    }
    type Mutation { 
        addUser(username: String, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addPick(items: [ID]!): Pick
        addList(listName: String!, listAuthor: String!): List
        addItemToList(
            listId: ID!
            itemText: String!
            listAuthor: String!
        ): Item
        addNote(
            itemId: ID!
            noteText: String!
            listAuthor: String!
        ): Item
        updateItem(
            listId: ID!
            itemText: String!
            listAuthor: String!
        ): Item
        updateNote(
            itemId: ID!
            noteText: String!
            listAuthor: String!
        ): Item
        removeItemFromList(
            listId: ID!
            itemText: String!
            listAuthor: String!
        ): Item
        removeNoteFromItem(
            itemId: ID!
            noteText: String!
            listAuthor: String!
        ): Item
        removeList(
            name: String!,
            listAuthor: String!
        ): List
        clearList(
            itemId: [ID]!
            itemText: String!
            listAuthor: String
        ): Item
        toggleItem(
            listId: ID!
            itemText: String!
            listAuthor: String!
        ): Item

    }
`
module.exports = typeDefs;
