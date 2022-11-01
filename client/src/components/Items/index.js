import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import { UPDATE_ITEM, UPDATE_NOTE, REMOVE_ITEM_FROM_LIST, REMOVE_NOTE_FROM_ITEM, } from '../../utils/mutations';
import { QUERY_SINGLE_LIST } from '../../utils/queries';

const Button = styled.button`
  color: #F6AE2D;
  background: #33658A;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em .5em;
  border: 3px solid #86BBD8;
  border-radius: 7px;
`;

const DeleteButton = styled(Button)`
  color: #E5383B;
  background: #660708;
  border-color: #A4161A;
`;

const Items = ({ items, notes }) => {
    
  const [updateItem, { error }] = useMutation(UPDATE_ITEM, {
    update(cache, { data: { updateItem } }) {
      try {
        cache.writeQuery({
          query: QUERY_SINGLE_LIST,
          data: { singleList: updateItem },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleUpdateItem = async (item) => {
    try {
      const { data } = await updateItem({
        variables: { item },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [updateNote, { newError }] = useMutation(UPDATE_NOTE, {
    update(cache, { data: { updateNote } }) {
      try {
        cache.writeQuery({
          query: QUERY_SINGLE_LIST,
          data: { singleList: updateNote },
        });
      } catch (e) {
        console.err(e);
      }
    },
  });

  const handleUpdateNote = async (note) => {
    try {
      const { data } = await updateNote({
        variables: { note },
      });
    } catch (err) {
      console.error(err);
    }
  };
    
  const [removeItemFromList, { newerError }] = useMutation(REMOVE_ITEM_FROM_LIST, {
    update(cache, { data: { removeItemFromList } }) {
      try {
        cache.writeQuery({
          query: QUERY_SINGLE_LIST,
          data: { singleList: removeItemFromList },
        });
      } catch (e) {
        console.err(e);
      }
    },
  });

  const handleRemoveItemFromList = async (item) => {
    try {
      const { data } = await removeItemFromList({
        variables: { item },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [removeNoteFromItem, { otherError }] = useMutation(REMOVE_NOTE_FROM_ITEM, {
    update(cache, { data: { removeNoteFromItem } }) {
      try {
        cache.writeQuery({
          query: QUERY_SINGLE_LIST,
          data: { singleList: removeNoteFromItem },
        });
      } catch (e) {
        console.err(e);
      }
    },
  });

  const handleRemoveNoteFromItem = async (note) => {
    try {
      const { data } = await removeNoteFromItem({
        variables: { note },
      });
    } catch (err) {
      console.error(err);
    }
  };

  
  if (!items.length) {
    return <h3>Don't run to the store just yet! You have to add some items first!</h3>;
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
        {items &&
            items.map((item) => (
            <div key={item._id} className="card mb-3">
                <div className="card-body bg-light p-2">
                <p>{items.itemText}</p>
                </div>
                  <Button 
                  onClick={() => handleUpdateItem(item)}>
                    Edit</Button>
                  <DeleteButton
                  onClick={() => handleRemoveItemFromList(item)}
                  >Delete</DeleteButton>
            </div>
            ))}
        {notes &&
            notes.map((note) => (
            <div key={note._id} className="card mb-3">
                <div className="card-body bg-light p-2">
                <p>{note.noteText}</p>
                </div>
                <Button
                onClick={() => handleUpdateNote(note)}
                >Edit</Button>
                <DeleteButton 
                onClick={() => handleRemoveNoteFromItem(note)}
                >Delete</DeleteButton>
            </div>
            ))}
        </div>
        ) : (
        <p>
          You need to be logged in to edit your lists. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default Items;