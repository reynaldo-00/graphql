import { gql } from 'apollo-boost';

export const getBooksQuery = gql`
    {
        books {
            name,
            id
        }
    }
`;

export const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

export const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $author_id: Int!){
        addBook(name: $name, genre: $genre, author_id: $author_id){
            name
            id
        }
    }
`;

export const getBookQuery = gql`
    query($id: Int) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;
