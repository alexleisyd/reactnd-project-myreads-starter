import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class ListBooks extends React.Component {
    state = {
        shelves: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => this.handleBooksData(books))
    }

    handleBooksData = (books) => {
        let shelfReading = {
            name: "Currently Reading",
            books: books.filter((book) => book.shelf === 'currentlyReading')
        }
        let shelfWantToRead = {
            name: "Want to Read",
            books: books.filter((book) => book.shelf === 'wantToRead')
        }
        let shelfRead = {
            name: "Read",
            books: books.filter((book) => book.shelf === 'read')
        }
        this.setState((currentState) => ({
            shelves: [shelfReading, shelfWantToRead, shelfRead]
        }))
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    {this.state.shelves.map((shelf) => (
                    <BookShelf key={shelf.name} shelf={shelf.name} books={shelf.books} />
                    ))}
                </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks