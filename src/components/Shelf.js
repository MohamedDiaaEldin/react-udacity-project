import Book from "./Book";

const Shelf = ({ title, books, updateShelf})=>{
    const ChangeShelf = (bookId, toShelf)=>{
       updateShelf(bookId, toShelf)
    }
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book
                ChangeShelf = {ChangeShelf}
                bookTitle={book.title}
                id={book.id}
                key={book.id}
                shelf={book.shelf}
                backgroundImageURL={book.imageLinks.smallThumbnail}
                bookAuthors={book.authors.toString()}                
              />
            ))}
          </ol>
        </div>
      </div>
    );
}

export default Shelf