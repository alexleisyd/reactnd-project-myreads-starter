import React from 'react'
import Book from './Book'

function BookShelf(props) {
  const { shelf, books, onShelfChange } = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book 
                book={book}
                onShelfChange={onShelfChange}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf