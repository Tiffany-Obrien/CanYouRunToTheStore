import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const myLists = ({ 
  lists, 
  title,
  showTitle = true,
  showUsername = false, 
}) => {
  if (!lists) {
    return <h3>✏️ Don't run to the store just yet! You have to make a list first! ✏️</h3>;
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
      <h3>{title}</h3>
      {lists &&
        lists.map((list) => (
          <div key={list._id} className="card mb-3">
            <div className="card-body bg-light p-2">
              <p>{lists.listName}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/lists/${list._id}`}
            >
              It's dangerous to go alone! Take this. 📝
            </Link>
          </div>
        ))}
        </>
        ) : (
                <h3>
                Login to see your lists! Please{' '}
                <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
            </h3>
        )}
    </div>
  );
};

export default myLists;
