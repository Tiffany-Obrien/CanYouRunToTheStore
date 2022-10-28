import { useReducer } from 'react';
import {
    ADD_ITEM_TO_LIST,
    ADD_MULTIPLE_TO_LIST,
    ADD_NOTE,
    UPDATE_LIST, // not sure if we need it but I'll keep it just in case 
    UPDATE_ITEM,
    UPDATE_ITEM_QUANTITY,
    UPDATE_NOTE,
    REMOVE_ITEM_FROM_LIST,
    REMOVE_NOTE_FROM_ITEM,
    REMOVE_LIST,
    CLEAR_LIST,
    TOGGLE_LIST,
    TOGGLE_ITEM,
} from './actions';

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_LIST:
      return {
        ...state,
        listOpen: true,
        list: [...state.list, action.item],
      };

    case ADD_MULTIPLE_TO_LIST:
      return {
        ...state,
        list: [...state.list, ...action.items],
      };

    case ADD_NOTE:
      return {
        ...state,
        itemOpen: true,
        item: [...state.item, action.note],
      };
    
    case UPDATE_LIST:
        return {
            ...state,
            items: [...action.items],
        };

    case UPDATE_ITEM:
      return {
        ...state,
        item: [...action.item],
      };

    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        listOpen: true,
        list: state.list.map((item) => {
          if (action._id === item._id) {
            item.purchaseQuantity = action.purchaseQuantity;
          }
          return item;
        }),
      };

    case UPDATE_NOTE:
      return {
        ...state,
       note: [...action.note],
      };

    case REMOVE_ITEM_FROM_LIST:
      let newState = state.list.filter((item) => {
        return item._id !== action._id;
      });

      return {
        ...state,
        listOpen: newState.length > 0,
        list: newState,
      };

    case REMOVE_NOTE_FROM_ITEM:
      let newItemState = state.item.filter((note) => {
        return note._id !== action._id;
      });

      return {
        ...state,
        itemOpen: newItemState.length > 0,
        item: newItemState,
      };

    // this one I am especially sure is not correct but who knows
    case REMOVE_LIST:
      return {
        ...state,
        listOpen: false,
      };

    case CLEAR_LIST:
      return {
        ...state,
        listOpen: false,
        list: [],
      };

    case TOGGLE_LIST:
      return {
        ...state,
        listOpen: !state.listOpen,
      };

    case TOGGLE_ITEM:
      return {
        ...state,
        itemOpen: !state.itemOpen,
      };
    
    default:
      return state;
  }
};

export function useItemReducer(initialState) {
  return useReducer(reducer, initialState);
}
