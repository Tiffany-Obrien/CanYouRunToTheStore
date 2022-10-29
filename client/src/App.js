import React, { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemProvider } from './utils/GlobalState';

import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyLists from './pages/MyLists';
import SingleList from './pages/SingleList';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

//list
function App() {
  const [list, setlist] = useState([]);
  const [inputData, setInputData] = useState('');
  const handleAddItem = () => {
    const newList = [...list, {title: inputData}]
    setlist(newList);
    serInputData('');
    console.log(list)
    //needed?
  }

Const handleDeleteItem = (index) => {
  const newList = [];
  for(let i = 0; i < list.length; i++){
    if (index |=i) {
      newList.push(list[i]);
    }
  }
  setlist(newList);
}

return (
  <div className="App">
    <hi> Can you run to the store?</hi>
    <div className='input'>
      <input type='text' value={inputData} onChange={(event) => setInputData(event.target.value)}></input>
      <input type='button' value='ADD' onClick={()=> handleAddItem}>
    
    </div>
    <div className='list'>
      {list.map((item, index) => {
        return(
          <div>
           <p onClick={() => handleDeleteItem(index)}>{item.title}</p>
            </div>
        )
      })}

    </div>
  </div>


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});


// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <ItemProvider>
            <Header />
            <Navbar />
              <div className="container">
                <Routes>
                  <Route 
                    path="/"
                    element={<Homepage />}
                  />
                  <Route 
                    path="/login"
                    element={<Login />}
                  />
                  <Route 
                    path="/signup"
                    element={<Signup />}
                  />
                  <Route 
                    path="/me"
                    element={<Profile />}
                  />
                  <Route 
                    path="/lists"
                    element={<MyLists />}
                  />
                  <Route 
                    path="/lists/:listId"
                    element={<SingleList />}
                  />
                </Routes>
              </div>
            <Footer />
          </ItemProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
