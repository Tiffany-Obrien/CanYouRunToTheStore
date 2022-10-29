import React from 'react';
import { Link } from 'react-router-dom';

const Lists = ({ lists, title }) => {
  if (!lists.length) {
    return <h3>✏️ Don't run to the store just yet! You have to make a list first! ✏️</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {lists &&
        lists.map((list) => (
          <div key={list._id} className="card mb-3">
            <div className="card-body bg-light p-2">
              <p>{lists.name}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/lists/${list._id}`}
            >
              It's dangerous to go alone! Take this. 📝
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Lists;
