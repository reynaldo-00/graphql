import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../Queries/queries';
import Book from './Book';


class BookList extends Component {

    displayBooks = () => {
        return this.props.data.loading
            ? <h1>Loading books...</h1>
            : this.props.data.books.map(book => {
                return (
                    <Book key={book.id} book={book}/>
                );
            })
    }

    render() {
        console.log(this.props);
        return (
            <div className="book-list">
                {this.displayBooks()}
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
