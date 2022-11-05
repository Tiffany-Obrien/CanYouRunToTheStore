import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_LISTS } from '../utils/queries';
import {Title} from './utils/styled.js';
// import Auth from '../utils/auth';

import ListForm from '../components/ListForm/index2';
import MyLists from '../components/MyLists/index';

const Home = ({user}) => {
  const { loading, data } = useQuery(QUERY_LISTS);
  const lists = data?.lists || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ListForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <MyLists
            lists={lists}
            />
          )}
        </div>
      </div>
    </main>
  );
};

function App() {
  return (
    <div className='App'>
      <header>
        <Title> Can You Run To The Store?</Title>
      </header>
    </div>
  )
}


export default Home;