import './App.css';
import Flashcard from './Components/Flashcard';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const flashcards = [{question: "a", answer: "1"},{question: "b", answer: "2"},{question: "c", answer: "3"}]

  return (
    <div className="App">
      <MyNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Flashcard />}></Route>
          <Route path="/admin" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
