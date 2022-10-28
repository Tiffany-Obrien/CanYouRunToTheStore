import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      lists {
        _id
        createdAt
        store
        items {
            _id
            itemText
            createdAt
            quantity
            notes {
                noteText
            }
        }
      }
    }
  }
`;

export const QUERY_LISTS = gql`
  query getLists {
    lists {
        _id
        createdAt
        store
        items {
            _id
            itemText
            createdAt
            quantity
            notes {
                noteText
            }
      }
    }
  }
`;

export const QUERY_SINGLE_LIST = gql`
  query getSingleList($listtId: ID!) {
    list(listId: $listId) {
        _id
        createdAt
        store
        items {
            _id
            itemText
            createdAt
            quantity
            notes {
            noteText
        }
      }
    }
  }
`;
