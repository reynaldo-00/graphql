const graphql = require('graphql');
const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLInt},
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authors_id: { type: GraphQLInt },
        author: {
            type: AuthorType,
            resolve: async (parent, args) => {
                const author = db('authors').where({id: parent.id}).first();
                return author;
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: { type: GraphQLInt},
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: async (parent, args) => {
                const books = db('books').where({author_id: parent.id})
                return books;
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLInt }},
            resolve: async (parent, args) => {
                // code to get data from db or sources
                const book = await db('books').where({id: args.id}).first();
                return book;
            }
        },
        author: {
            type: AuthorType,
            args: {id: { type: GraphQLInt }},
            resolve: async (parent, args) => {
                const author = await db('authors').where({id: args.id}).first();
                return author;
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: async (parent, params) => {
                return await db('books');
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: async (parent, params) => {
                return await db('authors');
            }
        }
    }
});


const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                age: { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: async (parent, args) => {
                const newId = await db('authors').insert(args);
                const newAuthor = await db('authors').where({id: newId[0]}).first();
                return newAuthor;
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                author_id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                const newId = await db('books').insert(args);
                const newBook = await db('books').where({id: newId[0]}).first();
                return newBook;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})
