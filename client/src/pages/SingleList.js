import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Items from '../components/Items';
import NoteForm from '../components/NoteForm';

import { QUERY_SINGLE_LIST } from '../utils/queries';

const SingleList = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { listId, itemId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_LIST, {
    // pass URL parameter
    variables: { listId: listId, itemId: itemId },
  });

  const list = data?.list || {};
  const item = data?.item || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
            {Auth.loggedIn() ? (
        <>
        <div className="my-5">
            <Items items={list.items} />
        </div>
        <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
            <NoteForm itemId={item._id} />
        
        </div>
        </>
        ) : (
                  <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SingleList;
