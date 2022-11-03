const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        lists: [List]!
    }

    type List {
        _id: ID
        listAuthor: String
        listName: String
        createdAt: String
        store: String
        items: [Item]!
    }
    
    type Item {
        _id: ID
        itemText: String
        itemAuthor: String
        createdAt: String
        notes: Note!
    }

    type Note {
        _id: ID
        noteText: String
        noteAuthor: String
    }  
    
    type Auth {
        token: ID
        user: User
    }
    
    type Query {
        me: User
        lists: [List]
        list(listId: ID!): List
        items(listId: ID!): [Item]
    }

    type Mutation { 
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
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
`;

module.exports = typeDefs;
