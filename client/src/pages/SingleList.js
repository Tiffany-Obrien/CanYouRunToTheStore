import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Items from '../components/Items';
import ItemForm from '../components/ItemForm';
import NoteForm from '../components/NoteForm';

import { QUERY_SINGLE_LIST } from '../utils/queries';

const SingleList = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { listId } = useParams();
  const { itemId } = useParams();

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
        <div className="my-5">
            <Items items={list.items} />
        </div>
        <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
            <ItemForm listtId={list._id} />
        </div>
        <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
            <NoteForm itemId={item._id} />
        </div>
    </div>
  );
};

export default SingleList;
