import "../App.css";
import { useState } from "react";
const Book = ({id, shelf, backgroundImageURL, bookTitle, bookAuthors, updateShelf})=>{    
  const [selected, setSelected] = useState(shelf)
  
  const clickHandler = (e) => {
    const toShelf = e.target.value;
    if (shelf !== toShelf) updateShelf(id, shelf, toShelf);
  };
  
  const changeHandler = (e) => {
    setSelected(e.target.value);
  };
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
              <select onChange={changeHandler} value={selected} onClick={clickHandler}>
                <option value="n" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">
                  Currently Reading
                </option>
                
                <option  value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option  value="none">None</option>
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
