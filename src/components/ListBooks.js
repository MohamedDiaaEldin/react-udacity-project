
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import "../App.css";
import { getAll , update} from '../BooksAPI';
import Book from './Book';
import Shelf from './Shelf';
const ListBooks = ()=>{
  const [currentlyReading, setCurrentlyReading] = useState([])
  const [wantToRead, setWantToRead] = useState([])
  const [read, setRead] = useState([])

  useEffect(() => {
    console.log('from effect ')
    getBooks();
  }, []);

  const getBooks = async () => {
    console.log('from get books')
    const eCurReading = []
    const eRead = []
    const eWantToRead = []
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

  const updateShelf = async ( bookId ,  toShelf)=>{    
    const res = await update(bookId, toShelf)
    getBooks()       
  } 
  
  const tryUpdate = async  ()=>{
    const res = await  update('sJf1vQAACAAJ', 'currentlyReading')
    console.log(res)
    
  }
  // tryUpdate()
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title="currently Reading" books={currentlyReading} updateShelf={updateShelf}/>
            <Shelf  title="Want To Read" books={wantToRead} updateShelf={updateShelf}/>
            <Shelf  title="Read" books={read} updateShelf={updateShelf}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"> Add a Book</Link>
        </div>
      </div>
    );
}

export default ListBooks