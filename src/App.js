import React from 'react'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Swal from 'sweetalert2'

class BooksApp extends React.Component {
  state = {
    currentBooks: [],
    shelves: []
  }

  componentDidMount() {
    this.loadAllBooks()
  }

  loadAllBooks = () => {
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
      currentBooks: books,
      shelves: [shelfReading, shelfWantToRead, shelfRead]
    }))
  }

  handleShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Shelf Updated',
        html: `Book ${book.title} has been moved to ${newShelf}`,
        timer: 2000
      })
      this.loadAllBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" >
          <SearchBooks 
              currentBooks={this.state.currentBooks}
              onShelfChange={this.handleShelfChange} 
          />
        </Route>
        <Route exact path="/">
          <ListBooks 
            onShelfChange={this.handleShelfChange} shelves={this.state.shelves} 
          />
        </Route>
      </div>
    )
  }
}

export default BooksApp
