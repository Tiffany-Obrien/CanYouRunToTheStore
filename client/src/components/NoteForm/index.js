import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { ADD_NOTE } from '../../utils/mutations';
import { QUERY_SINGLE_LIST } from '../../utils/queries';

import Auth from '../../utils/auth';

// styled components button
const Button = styled.button`
  color: #F6AE2D;
  background: #33658A;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em .5em;
  border: 3px solid #86BBD8;
  border-radius: 7px;
`;


const NoteForm = () => {
  const [noteText, setNoteText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addNote, { error }] = useMutation(ADD_NOTE, {
    update(cache, { data: { addNote } }) {
      try {
        const { notes } = cache.readQuery({ query: QUERY_SINGLE_LIST });

        cache.writeQuery({
          query: QUERY_SINGLE_LIST,
          data: { notes: [addNote, ...notes] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addNote({
        variables: {
          noteText,
        },
      });

      setNoteText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'noteText' && value.length <= 280) {
      setNoteText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="noteText"
                placeholder="Add a note about this item!"
                value={noteText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <Button type="submit">
                Add Note
              </Button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add a note to one of your items. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default NoteForm;
