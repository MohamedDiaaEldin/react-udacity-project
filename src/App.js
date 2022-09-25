import "./App.css"; 
import SearchBook from "./components/SearchBook";
import ListBooks from './components/ListBooks'

import {Routes, Route} from 'react-router-dom'

function App() {
  
  return (
    <Routes>
      <Route exact path="/" element={<ListBooks />} />
      <Route path="/search" element={<SearchBook />} />
    </Routes>
  );
}

export default App;
