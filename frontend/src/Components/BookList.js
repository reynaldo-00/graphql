import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import Book from './Book';

const getBooksQuery = gql`
    {
        books {
            name,
            id
        }
    }
`;


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
