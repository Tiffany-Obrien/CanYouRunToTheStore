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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_LIST = gql`
  mutation addList($listName: String!) {
    addList(listName: $listName) {
        _id
        createdAt
        listAuthor
        listName
        store
        items {
            _id
            itemAuthor
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

export const ADD_ITEM_TO_LIST = gql`
  mutation addItemToList($listId: ID!, $itemText: String!) {
    addItemToList(listId: $listId, itemText: $itemText) {
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

export const ADD_NOTE = gql`
  mutation addNote($itemId: ID!, $noteText: String!) {
    addNote(itemId: $itemId, noteText: $noteText) {
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

export const UPDATE_ITEM = gql`
  mutation updateItem($itemId: ID! $itemText: String!) {
    updateItem(itemId: $itemId, itemText: $itemText) {
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

export const UPDATE_NOTE = gql`
  mutation updateNote($noteId: ID!, $noteText: String!) {
    updateNote(noteId: $noteId, noteText: $noteText) {
        notes {
          _id
          noteText
        }
      }
    }
`;

export const REMOVE_ITEM_FROM_LIST = gql`
  mutation removeItemFromList($listId: ID!, $itemId: ID!) {
    removeItemFromList(listId: $listId, itemId: $itemId) {
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

export const REMOVE_NOTE_FROM_ITEM = gql`
  mutation removeNoteFromItem($itemId: ID! $noteId: ID!) {
    removeNoteFromItem(itemId: $itemId, noteId: $noteId) {
            notes {
              _id
              noteText
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

// need to figure out how to clear items & notes but not the shell of the list itself 
export const CLEAR_LIST = gql`
  mutation clearList($listId: ID!, $itemId: [ID]!) {
    clearList(listId: $listId, itemId: [$itemId]) {
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
