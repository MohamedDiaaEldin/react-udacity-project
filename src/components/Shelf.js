import Book from "./Book";

const Shelf = ({ title, books, updateShelf , getShelf })=>{

  
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.length > 0 && books.map((book) => {
              
              let shelf  = getShelf(book.id)
              if (!book.shelf){
                if (!shelf){
                  shelf='none'
                }
                
              }
              return <Book
                bookTitle={book.title}                
                id={book.id}
                key={book.id}
                shelf={shelf}
                backgroundImageURL={ book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail:""}
                updateShelf={updateShelf}
            
                bookAuthors={book.authors ? book.authors.toString():""}                
              />
            })}
          </ol>
        </div>
      </div>
    );
}

export default Shelf