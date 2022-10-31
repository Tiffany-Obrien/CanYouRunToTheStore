const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type List {
        _id: ID
        name: String
    }
    
    type Item {
        _id: ID
        name: String
        price: Float
        list: List
        image: String
    }
    type Pick { 
        _id: ID
        purchaseDate: String
        items: [Item]
    }
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        picks: [Pick]
    }
    type Complete {
        session: ID
    }   
    
    type Auth {
        token: ID
        user: User
    }
    type Query {
        lists: [List]
        items(list: ID): [Item]
        item(_id: ID!): Item
        user: User
        pick(_id: ID!): Pick
        complete(items: [ID]!): Complete
    }
    type Mutation { 
        addUser(firstName: String!, lastName: String!, email: String! password: String!): Auth
        login(email: String!, password: String!): Auth
        addPick(items: [ID]!): Pick
        updateItem(_id: ID!, price: Float!): Item
    }
`
module.exports = typeDefs
