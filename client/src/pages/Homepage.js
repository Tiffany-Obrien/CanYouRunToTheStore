import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import ListForm from '../components/ListForm/index2';
import MyLists from '../components/MyLists/index';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const lists = data?.lists || [];

  return (
    <main>
      {Auth.loggedIn() ? (
        <>
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
              Lists={lists}
              title="Better run to the store...!"
            />
          )}
        </div>
      </div>
      </>
            ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </main>
  );
};

export default Home;