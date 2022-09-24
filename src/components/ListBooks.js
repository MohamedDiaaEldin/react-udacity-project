
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import "../App.css";
import { getAll } from '../BooksAPI';
import Book from './Book';

const ListBooks = ()=>{
  const [currentlyReading, setCurrentlyReading] = useState([])
  const [read, setRead] = useState([])
  const [wantToRead, setWantToRead] = useState([])

  useEffect(()=>{
      const eCurReading = []
      const eRead = []
      const eWantToRead = []
      const getBooks = async () => {
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
        setCurrentlyReading(eCurReading)
        setRead(eRead)
        setWantToRead(eWantToRead)
      };
      
      getBooks()
  }, [])

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">

          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map((book) => (
                    <Book
                      bookTitle={book.title}
                      key={book.id}
                      backgroundImageURL={book.imageLinks.smallThumbnail}
                      bookAuthors={book.authors.toString()}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map((book) => (
                    <Book
                      bookTitle={book.title}
                      key={book.id}
                      backgroundImageURL={book.imageLinks.smallThumbnail}
                      bookAuthors={book.authors.toString()}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {read.map((book) => (
                    <Book
                      bookTitle={book.title}
                      key={book.id}
                      backgroundImageURL={book.imageLinks.smallThumbnail}
                      bookAuthors={book.authors.toString()}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>


        </div>
        <div className="open-search">
          <Link to="/search"> Add a Book</Link>
        </div>
      </div>
    );
}

export default ListBooks