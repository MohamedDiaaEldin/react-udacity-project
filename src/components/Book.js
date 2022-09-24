
import { useState } from "react"

const Book = ({id, shelf, backgroundImageURL, bookTitle, bookAuthors, ChangeShelf})=>{
    const [bookState, setBookstate] = useState('none')
    const changeHandler = (e)=>{            
      ChangeShelf(id, e.target.value)
    }
    return(
        <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage:
                  `url("${backgroundImageURL}")`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select onClick={changeHandler}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">
                  Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookTitle}</div>
          <div className="book-authors">{bookAuthors}</div>
        </div>
      </li>
    )    
}



export default Book
