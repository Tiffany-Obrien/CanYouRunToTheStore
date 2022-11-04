import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ItemForm from '../components/ItemForm';

import { QUERY_SINGLE_LIST } from '../utils/queries';

const SingleList = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { listId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_LIST, {
    // pass URL parameter
    variables: { listId: listId },
  });

  const list = data?.list || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
            {Auth.loggedIn() ? (
        <>
       <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {list.listAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          made this list!
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {list.listName}
        </blockquote>
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <ItemForm listId={list._id} />
      </div>
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
