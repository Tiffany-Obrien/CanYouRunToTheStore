import React, { createContext, useContext } from "react";
import { useItemReducer } from './reducers'

const ListContext = createContext();
const { Provider } = ListContext;

const ItemProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useItemReducer({
    lists: [],
    items: [],
    notes: [],
    listOpen: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useListContext = () => {
  return useContext(ListContext);
};

export { ItemProvider, useListContext };