import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { ADD_ITEM_TO_LIST } from '../../utils/mutations';

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


const ItemForm = ({ itemId }) => {
  const [itemText, setItemText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addItemToList, { error }] = useMutation(ADD_ITEM_TO_LIST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addItemToList({
        variables: {
          itemId,
          itemText,
          ItemAuthor: Auth.getProfile().data.username,
        },
      });

      setItemText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'itemText' && value.length <= 280) {
      setItemText(value);
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
                placeholder="Add an item to the list!"
                value={itemText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <Button type="submit">
                Add Item
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

export default ItemForm;
