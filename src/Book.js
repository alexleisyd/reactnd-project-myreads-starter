import React from 'react'
import ShelfChanger from './ShelfChanger'
import Rating from './Rating'

function Book(props) {
  const { book, onShelfChange } = props
  return (
    <div className="book">
      {book.imageLinks && (
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          <ShelfChanger 
            book={book}
            onShelfChange={onShelfChange}
          />
        </div>
      )}
      <div className="book-title">{book.title}</div>
      <Rating book={book} />
      {book.authors && book.authors.map((author) => (
        <div key={author} className="book-authors">{author}</div>
      ))}
    </div>
  )
}

export default Book