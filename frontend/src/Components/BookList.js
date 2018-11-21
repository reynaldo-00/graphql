import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../Queries/queries';
import Book from './Book';
import Details from './Details';


class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        }
    }

    selectBook = (e, bookId) => {
        e.preventDefault();
        this.setState({selected: bookId});
    }

    displayBooks = () => {
        const books = this.props.data.books || [];
        return this.props.data.loading
            ? <h1>Loading books...</h1>
            : books.map(book => {
                return (
                    <Book 
                        key={`${book.id}book`} 
                        book={book}
                        clicked={this.selectBook.bind(this)}
                    />
                );
            })
    }

    render() {
        return (
            <div className="book-list">
                <Details bookId={this.state.selected} />
                {this.displayBooks()}
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
