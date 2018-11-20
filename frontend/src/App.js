import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './Components/BookList';
import AddBook from './Components/AddBook';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/gql',

})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="app-container">
          <AddBook />
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
