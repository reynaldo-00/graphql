import React from 'react';

const Book = ({book, clicked }) => {
    return (
        <div 
            onClick={e => clicked(e, book.id)}
            style={{'cursor': 'pointer', 'userSelect': 'none'}}
        >
            <h2>{book.name}</h2>
            <h2>{book.id}</h2>
        </div>
    );
}

export default Book;

