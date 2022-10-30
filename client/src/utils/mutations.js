import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
        username: $username
        email: $email
        password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_LIST = gql`
  mutation addList($items: [ID]!) {
    addList(items: $items) {
        _id
        createdAt
        listAuthor
        name
        store
        items {
            _id
            itemAuthor
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

export const ADD_ITEM_TO_LIST = gql`
  mutation addItemToList($listId: ID!, $itemText: String!) {
    addItemToList(listId: $listId, itemText: $itemText) {
        _id
        createdAt
        listAuthor
        name
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

export const ADD_NOTE = gql`
  mutation addNote($listId: ID!, $itemId: ID!, $noteText: String!) {
    addNote(listId: $listtId, itemId: $itemId, noteText: $noteText) {
        _id
        createdAt
        listAuthor
        name
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

export const UPDATE_ITEM = gql`
  mutation updateItem($listId: ID!, $itemId: ID! $itemText: String!) {
    updateItem(listId: $listId, itemId: $itemId, itemText: $itemText) {
        _id
        createdAt
        listAuthor
        name
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

export const UPDATE_NOTE = gql`
  mutation updateNote($listId: ID!, $itemId: ID!, $noteText: String!) {
    updateNote(listId: $listtId, itemId: $itemId, noteText: $noteText) {
        _id
        createdAt
        listAuthor
        name
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

export const REMOVE_ITEM_FROM_LIST = gql`
  mutation removeItemFromList($listId: ID!, $itemId: ID!) {
    removeItemFromList(listId: $listId, itemId: $itemId) {
        _id
        createdAt
        listAuthor
        name
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

export const REMOVE_NOTE_FROM_ITEM = gql`
  mutation removeNoteFromItem($listId: ID!, $itemId: ID!, $noteId: ID!) {
    removeNoteFromItem(listId: $listtId, itemId: $itemId, $noteId: ID!) {
        _id
        createdAt
        listAuthor
        name
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

export const REMOVE_LIST = gql`
  mutation removeList($listId: ID!) {
    removeList(listId: $listId) {
        _id
        createdAt
        listAuthor
        name
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

// need to figure out how to clear items & notes but not the shell of the list itself 
export const CLEAR_LIST = gql`
  mutation clearList($listId: ID!) {
    clearList(listId: $listId) {
        _id
        createdAt
        listAuthor
        name
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

export const TOGGLE_ITEM = gql`
  mutation toggleItem($listId: ID!, $itemId: ID!) {
    toggleItem(listId: $listId, itemId: $itemId) {
        _id
        createdAt
        listAuthor
        name
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