import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import './style.css'

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        const res = await axios.get('https://backendforflashcards-1.onrender.com/flashcards');
        setFlashcards(res.data);
    };

    const handleAddOrUpdate = async () => {
        if (editId) {
            await axios.put(`https://backendforflashcards-1.onrender.com/flashcards/${editId}`, { question, answer });
            setEditId(null);
        } else {
            await axios.post('https://backendforflashcards-1.onrender.com/flashcards', { question, answer });
        }
        setQuestion('');
        setAnswer('');
        fetchFlashcards();
    };

    const handleEdit = (flashcard) => {
        setQuestion(flashcard.question);
        setAnswer(flashcard.answer);
        setEditId(flashcard.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`https://backendforflashcards-1.onrender.com/flashcards/${id}`);
        fetchFlashcards();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Dashboard</h1>
            <Stack gap={3}>
                <div className="p-2">
                    <Form.Control
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className="p-2">
                    <Form.Control
                        type="text"
                        placeholder="Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>
                <div className="p-2">
                    <button onClick={handleAddOrUpdate}>
                        {editId ? 'Update Flashcard' : 'Add Flashcard'}
                    </button>

                </div>
            </Stack>
            {/* <input
                type="text"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            /> */}

            {/* <input
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            /> */}


            <h2>Flashcards</h2>
            <ul className="flashcard-list">
                {flashcards.map((flashcard) => (
                    <li key={flashcard.id}>
                        <div>
                            <strong>{flashcard.question}:</strong> {flashcard.answer}
                        </div>
                        <div>
                            <Button variant="success" onClick={() => handleEdit(flashcard)}>Edit</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(flashcard.id)}>Delete</Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
