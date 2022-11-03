import React from 'react';
import {
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ItemProvider } from './utils/GlobalState';

import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import MyLists from './pages/MyLists';
import SingleList from './pages/SingleList';
// import Profile from './pages/Profile';
import Navbar from './components/Navbar';
// import Header from './components/Header';
// import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
  fetchOptions: { credentials: 'include' },
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
  cache: new InMemoryCache({
    addTypename: false
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          {/* <ItemProvider> */}
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
                    path="/lists/:listId"
                    element={<SingleList />}
                  />
                </Routes>
              </div>
            {/* <Footer /> */}
          {/* </ItemProvider> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
