import React from 'react';

const Items = ({ items, notes }) => {
  if (!items.length) {
    return <h3>Don't run to the store just yet! You have to add some items first!</h3>;
  }

  return (
    <div>
        <div>
        {items &&
            items.map((item) => (
            <div key={item._id} className="card mb-3">
                <div className="card-body bg-light p-2">
                <p>{items.itemText}</p>
                </div>
            </div>
            ))}
        </div>
        <div>
        {notes &&
            notes.map((note) => (
            <div key={note._id} className="card mb-3">
                <div className="card-body bg-light p-2">
                <p>{note.noteText}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Items;