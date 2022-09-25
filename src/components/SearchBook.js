
import {Link} from 'react-router-dom'
import "../App.css";
import Shelf from './Shelf';
import {useState, useEffect} from 'react'
import { search, update, getAll } from '../BooksAPI';

const SearchBook = ()=>{
  const [books, setBooks] = useState([])

  const [currentlyReading , setCurrentlyReading] = useState([])
  const [wantToRead , setWantToRead] = useState([])
  const [read , setRead] = useState([])

  
  useEffect(()=>{
    getMyBooks()
  }, [])

  const searchHandler = (e)=>{      
    getBooks(e.target.value)    
  }
  const searchBook = (bookId, booksArray)=>{
    for (const book of booksArray) {
      if (book.id === bookId) {
        return book.shelf;
      }
    }
  }

  const getShelf = (bookId)=>{
    let shelf = searchBook(bookId, currentlyReading)
    if(shelf){
      return shelf
    }
    shelf = searchBook(bookId, wantToRead)
    if(shelf){
      return shelf
    }
    shelf = searchBook(bookId, read)
    if(shelf){
      return shelf
    }
    
    
    
  }

    // get all books 
  const getMyBooks = async () => {
    console.log('from my books')

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

  const getBooks = async (word)=>{
    if(word === ''){
      setBooks([])
      
    }
    else if (word.length >= 1){
      const res = await search(word)
      if (res.length > 0 ){
        setBooks(res);
      }
      
    }
    
  }
  const updateShelf = async ( bookId ,fromShelf,  toShelf)=>{
    // updata in the database 
    update(bookId, toShelf)    
  } 
  
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input onChange={searchHandler} type="text" placeholder="Search by title, author, or ISBN" />
          </div>
        </div>
        <div className="search-books-results">          
          <Shelf getShelf={getShelf} id='' title="" books={books} updateShelf={updateShelf}/>
        </div>
      </div>
    );
}

export default SearchBook
