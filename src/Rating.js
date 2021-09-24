import React from 'react'

function Rating(props) {
  return (
    <div className="rating">
      {props.book && 
        Array.apply(null, { length: props.book.averageRating }).map((element, index) => (
          <span key={props.book.id + '-' + index} className="star"></span>
        ))
      }
    </div>
  )
}

export default Rating