import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

function ListBooks(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {props.shelves.map((shelf) => (
          <BookShelf 
            key={shelf.name} 
            shelf={shelf.name} 
            books={shelf.books} 
            onShelfChange={props.onShelfChange}
          />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default ListBooks