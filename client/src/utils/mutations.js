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

// on second thought I think this needs to be an action/reducer situation 
// export const ADD_ITEM = gql`
//   mutation addItem($items: [ID]!) {
//     addItem(items: $items) {
//       createdAt
//       items {
//         _id
//         itemText
//         createdAt
//         quantity
//         notes {
//           noteText
//         }
//       }
//     }
//   }
// `;

export const ADD_NOTE = gql`
  mutation addNote($listId: ID!, $noteText: String!) {
    addNote(listId: $listtId, noteText: $noteText) {
      _id
      itemText
      createdAt
      notes {
        _id
        noteText
      }
    }
  }
`;
