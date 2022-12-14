const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        lists: [List]
    }

    type List {
        _id: ID
        listAuthor: String
        listName: String
        createdAt: String
        store: String
        items: [Item]
        notes: [Note]
    }
    
    type Item {
        _id: ID
        itemText: String
        itemAuthor: String
        createdAt: String
        notes: [Note]
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
        user(username: String!): User
        lists(username: String): [List]
        list(listId: ID!): List
    }

    type Mutation { 
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addList(listName: String!): List
        addItemToList(
            listId: ID
            itemText: String
        ): List
        addNote(
            itemId: ID!
            noteText: String!
        ): Item
        updateItem(
            itemId: ID!
            itemText: String!     
        ): List
        updateNote(
            noteId: ID!
            noteText: String!
        ): Item
        removeItemFromList(
            listId: ID!
            itemId: ID!
        ): List
        removeNoteFromItem(
            itemId: ID!
            noteId: ID!
        ): Item
        removeList(
            listId: ID!
        ): List
        clearList(
            listId: ID!
            itemId: [ID]!
        ): List
        toggleItem(
            itemId: ID!
        ): Item
    }
`;

module.exports = typeDefs;
