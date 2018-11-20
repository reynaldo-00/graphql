import React from 'react';

const Book = ({book}) => {
    return (
        <div>
            <h2>{book.name}</h2>
            <h2>{book.id}</h2>
        </div>
    );
}

export default Book;

