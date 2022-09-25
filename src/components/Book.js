import "../App.css";

const Book = ({id, shelf, backgroundImageURL, bookTitle, bookAuthors, updateShelf})=>{    
    const changeHandler = (e)=>{         
      const toShelf = e.target.value
      if(shelf !== toShelf)   
      updateShelf(id, shelf,  toShelf)
      
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
              <select  onClick={changeHandler}>
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
