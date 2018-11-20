import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

class AddBook extends Component {

    displayAuthors = () => {
        return this.props.data.loading
            ? null
            : this.props.data.authors.map(author => 
                <option key={author.id} value={author.id}>{author.name}</option>
            )
    }

    render() {
        return (
            <form id="add-book">
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);
