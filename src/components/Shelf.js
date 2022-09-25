import Book from "./Book";

const Shelf = ({id, title, books, updateShelf})=>{

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.length > 0 && books.map((book) => (
              <Book
                bookTitle={book.title}
                id={book.id}
                key={book.id}
                shelf={id}
                backgroundImageURL={ book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail:""}
                updateShelf={updateShelf}
                bookAuthors={book.authors ? book.authors.toString():""}                
              />
            ))}
          </ol>
        </div>
      </div>
    );
}

export default Shelf