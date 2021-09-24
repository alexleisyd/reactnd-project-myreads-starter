import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import debounce from 'lodash.debounce'

class SearchBooks extends React.Component {
  constructor(props) {
    super(props)
    this.fetchSearchResult = this.fetchSearchResult.bind(this)
    this.fetchSearchResultDebounced = debounce(this.fetchSearchResult, 300)
  }
  state = {
    query: '',
    books: []
  }
  componentWillUnmount() {
    this.fetchSearchResultDebounced.cancel();
  }
  onSearchQueryChange = (query) => {
    this.setState((currentState) => ({
      query: query
    }))
    this.fetchSearchResultDebounced(query)
  }
  fetchSearchResult = (query) => {
    if (query) {
      BooksAPI.search(query).then((books) => {
        if (!books || books.error) {
          this.setState((currentState) => ({
            books: []
          }))
        } else {
          books.forEach(book => {
            const matchedBooks = this.props.currentBooks.filter((b) => b.id === book.id)
            if (matchedBooks && matchedBooks.length > 0) {
              book.shelf = matchedBooks[0].shelf
            }
          })
          this.setState((currentState) => ({
            books: (!books || books.error) ? [] : books
          }))
        }
      })
    } else {
      this.setState((currentState) => ({
        books: []
      }))
    }
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