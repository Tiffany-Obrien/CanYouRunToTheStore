import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      lists {
        _id
        createdAt
        listAuthor
        listName
        store
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
        items {
            _id
            itemText
            createdAt
            quantity
            notes {
              _id
              noteText
        }
      }
    }
  }
  `;

export const QUERY_SINGLE_LIST = gql`
  query getSingleList($listId: ID) {
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
            notes {
              _id
              noteText
        }
      }
    }
  }
`;

export const QUERY_ITEMS = gql`
  query getItems($listtId: ID!) {
    items(listId: $listId) {
        items {
            _id
            itemText
            createdAt
            quantity
            notes {
              _id
              noteText
        }
      }
    }
  }
  `;