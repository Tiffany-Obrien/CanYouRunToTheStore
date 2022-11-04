import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Me {
        me {
        username
        email
        password
        lists {
          _id
          listAuthor
          listName
          createdAt
          items {
              _id
              itemText
              itemAuthor
              createdAt
          }
          notes {
            _id
            noteText
            noteAuthor
          }
      }
        }
    }
`;

export const QUERY_USER = gql`
  query user($username: String) {
    user(username: $username) {
      _id
      username
      email
      lists {
        _id
        listText
        listName
        createdAt
      }
    }
  }
`;

export const QUERY_LISTS = gql`
  query getLists {
      lists {
        _id
        createdAt
        listAuthor
        listName
        store
    }
  }
  `;

export const QUERY_SINGLE_LIST = gql`
  query getSingleList($listId: ID!) {
    list(listId: $listId) {
        _id
        createdAt
        listAuthor
        listName
        store
        items {
            _id
            itemText
            createdAt
            }
            notes {
              _id
              noteText
        }
    }
  }
`;