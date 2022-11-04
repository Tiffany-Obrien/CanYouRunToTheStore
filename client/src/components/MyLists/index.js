import React from 'react';
import { Link } from 'react-router-dom';

// import Auth from '../../utils/auth';

const myLists = ({ 
  lists, 
  title,
  showTitle = true,
  showUsername = false, 
}) => {
  return (
    <div>
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
              <p>{list.listName}</p> 📝
            </Link>
          </div>
        ))}
    </div>
  );
};

export default myLists;
