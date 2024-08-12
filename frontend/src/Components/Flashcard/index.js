import './style.css'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import Button from 'react-bootstrap/Button';

export default function Flashcard(){
  const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('https://backendforflashcards-1.onrender.com/flashcards');
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);



  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1
    );
  };

  if (flashcards.length === 0) {
    return <p>Loading flashcards...</p>;
  }

  return (
    <div className="flashcard-container">
      <h3>Click to reveal Answer</h3>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p>{flashcards[currentIndex].question}</p>
          </div>
          <div className="flashcard-back">
            <p>{flashcards[currentIndex].answer}</p>
          </div>
        </div>
      </div>
      <div className="navigation-buttons">
        <Button variant="success" onClick={handlePrev}><FiChevronLeft size={26}/><b>Previous</b></Button>
        <Button variant="success" onClick={handleNext}><b>Next</b><FiChevronRight size={26}/></Button>
      </div>
    </div>
  );
}