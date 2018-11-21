import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../Queries/queries';

class Details extends Component {

    showDetails = () => {
        const data = this.props.data;
        const { book } = data || null;

        return data.loading || data.book === null
            ? <h1>Book Details</h1>
            : (
                <div>
                    <h2>{ book.name }</h2>
                    <p>{ book.genre }</p>
                    <p>{ book.author.name }</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        { book.author.books.map(item => {
                            return <li key={item.id}>{ item.name }</li>
                        })}
                    </ul>
                </div>
            )
    }
    render() {
        console.log(this.props);
        return (
            <div>
                {
                    this.showDetails()
                }
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: props => {
        return {
            variables: {
                id: Number(props.bookId)
            }
        }
    }
})(Details);
