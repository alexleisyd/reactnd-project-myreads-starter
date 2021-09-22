import React from 'react'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component {
    render() {
        const { book } = this.props
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    <ShelfChanger book={book} />
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map((author) => (
                    <div key={author} className="book-authors">{author}</div>
                ))}
            </div>
        )
    }
}

export default Book