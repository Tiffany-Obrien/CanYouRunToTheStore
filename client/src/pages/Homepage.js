import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import List from '../components/List';
import ListForm from '../components/ItemForm';
import Auth from '../utils/auth';

import { QUERY_LISTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_LISTS);
  const lists = data?.lists || [];

  return (
    <main>
        {Auth.loggedIn() ? (
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
            <List
              lists={lists}
              title="Where I need to run to:"
            />
          )}
        </div>
      </div>
        ) : ( 
            <h3>
                Login to see your lists! Please{' '}
                <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
            </h3>
        )}
    </main>
  );
};

export default Home;