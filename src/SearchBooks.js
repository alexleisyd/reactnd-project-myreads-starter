import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class SearchBooks extends React.Component {
  state = {
    query: '',
    books: []
  }
  onSearchQueryChange = (query) => {
    this.setState((currentState) => ({
      query: query
    }))
    BooksAPI.search(query).then((books) => {
      this.setState((currentState) => ({
        books: books
      }))
    })
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              value={this.state.query} 
              onChange={(e) => this.onSearchQueryChange(e.target.value)} 
              type="text" 
              placeholder="Search by title or author"
            />
          </div>
        </div>
        {this.state.books && (
          <div className="search-books-results">
            <ol className="books-grid">
              <BookShelf 
                shelf={'Search Result'} 
                books={this.state.books}
                onShelfChange={this.props.onShelfChange}
              />
            </ol>
          </div>
        )}
      </div>
    )
  }
}

export default SearchBooks