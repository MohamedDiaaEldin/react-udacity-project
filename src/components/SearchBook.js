
import {Link} from 'react-router-dom'
import "../App.css";
import Shelf from './Shelf';
import {useState} from 'react'
import { search } from '../BooksAPI';
import { update } from '../BooksAPI';

const SearchBook = ()=>{
  const [books, setBooks] = useState([])

  const searchHandler = (e)=>{  
    console.log(e.target.value)  
    getBooks(e.target.value)    
  }

  const getBooks = async (word)=>{
    if (word.length >= 1){
      const res = await search(word)
      if (res.length > 0 ){
        setBooks(res)
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
          <Shelf id='' title="" books={books} updateShelf={updateShelf}/>
        </div>
      </div>
    );
}

export default SearchBook
