
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import "../App.css";
import { getAll , update} from '../BooksAPI';
import Shelf from './Shelf';

const ListBooks = ()=>{
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  // get all books
  const getBooks = async () => {
    const eCurReading = [];
    const eRead = [];
    const eWantToRead = [];
    const allBooks = await getAll();

    for (const book of allBooks) {
      if (book.shelf === "currentlyReading") {
        eCurReading.push(book);
      } else if (book.shelf === "wantToRead") {
        eWantToRead.push(book);
      } else if (book.shelf === "read") {
        eRead.push(book);
      }
    }
    // update app state
    setCurrentlyReading(eCurReading);
    setRead(eRead);
    setWantToRead(eWantToRead);
  };

  // change book from shelf to another
  const updateShelf = async (bookId, fromShelf, toShelf) => {
    // update from shelf books
    const removed = updateFromBooksState(bookId, toShelf, fromShelf);
    updateToShelfState(removed, toShelf);

    // update destination shelf books
    const res = await update(bookId, toShelf);
  };
  const searchBook = (bookId, booksArray) => {
    for (const book of booksArray) {
      if (book.id === bookId) {
        return book.shelf;
      }
    }
  };

  const getShelf = (bookId) => {
    let shelf = searchBook(bookId, currentlyReading);
    if (shelf) {
      return shelf;
    }
    shelf = searchBook(bookId, wantToRead);
    if (shelf) {
      return shelf;
    }
    shelf = searchBook(bookId, read);
    if (shelf) {
      return shelf;
    }
  };

  // add removed element to new shelf
  const updateToShelfState = (removed, toShelf) => {
    const NONE = "none";
    // get to shelf state
    const toShelfState = getShelfState(toShelf);
    let toBooks = toShelfState[0];
    let toSetter = toShelfState[1];
    if (toShelf !== NONE) {
      toSetter(toBooks.concat(removed));
    }
  };
  // removes book from shelf - returns removed element
  const updateFromBooksState = (bookId, toShelf, fromShelf) => {
    const fromShelfState = getShelfState(fromShelf);
    let fromBooks = fromShelfState[0];
    let fromSetter = fromShelfState[1];

    let removed = null;
    const newShelfBooks = fromBooks.filter((book) => {
      if (book.id === bookId) {
        removed = book;
      }
      return book.id !== bookId;
    });
    removed.shelf = toShelf;
    fromSetter(newShelfBooks);
    return removed;
  };

  // get a shelf - returns array with books at index 0 and setter function at index 1
  const getShelfState = (shelf) => {
    const CURRENTLY_READING = "currentlyReading";
    const WANT_TO_READ = "wantToRead";
    const READ = "read";
    let setter = null;
    let books = [];
    if (shelf === CURRENTLY_READING) {
      setter = setCurrentlyReading;
      books = currentlyReading;
    } else if (shelf === WANT_TO_READ) {
      setter = setWantToRead;
      books = wantToRead;
    } else if (shelf === READ) {
      setter = setRead;
      books = read;
    }
    return [books, setter];
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf
            id="currentlyReading"
            title="currently Reading"
            books={currentlyReading}
            allBooks={[currentlyReading, wantToRead, read]}
            updateShelf={updateShelf}
            getShelf={getShelf}
          />
          <Shelf
            id="wantToRead"
            title="Want To Read"
            books={wantToRead}
            updateShelf={updateShelf}
            getShelf={getShelf}
          />
          <Shelf
            id="read"
            title="Read"
            books={read}
            updateShelf={updateShelf}
            getShelf={getShelf}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a Book</Link>
      </div>
    </div>
  );
}

export default ListBooks