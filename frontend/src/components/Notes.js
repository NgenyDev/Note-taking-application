import React, { useState, useEffect } from 'react';
import './Notes.css'; 
import Editor from './Editor'; 
import { useAuth } from './AuthContext'; 

const Notes = () => {
    const { user } = useAuth(); 
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({
        title: '',
        content: '',
        tags: '',
        date: new Date().toISOString().split('T')[0], 
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [noteIdToEdit, setNoteIdToEdit] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showEditor, setShowEditor] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            if (user) { 
                try {
                    const response = await fetch(`http://localhost:5000/api/notes?user_id=${user.id}`, {
                        credentials: 'include',
                    });
                    if (!response.ok) throw new Error('Failed to fetch notes for user');
                    const data = await response.json();
                    setNotes(data);
                } catch (error) {
                    console.error('Error fetching notes:', error);
                }
            }
        };
        fetchNotes();
    }, [user]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNote((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const noteToAdd = {
            ...newNote,
            tags: newNote.tags.split(',').map(tag => tag.trim()), 
        };

        try {
            const response = editMode 
                ? await fetch(`http://localhost:5000/api/notes/${noteIdToEdit}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(noteToAdd),
                    credentials: 'include'
                })
                : await fetch('http://localhost:5000/api/notes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(noteToAdd),
                    credentials: 'include'
                });

            if (!response.ok) throw new Error(editMode ? 'Failed to update note' : 'Failed to add new note');

            const newNoteFromResponse = await response.json();
            setNotes(prev => editMode 
                ? prev.map(note => (note.id === noteIdToEdit ? { ...note, ...noteToAdd } : note))
                : [...prev, newNoteFromResponse]
            );

            resetNewNote();
            setShowForm(false);
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'An error occurred. Please try again.');
        }
    };

    const resetNewNote = () => {
        setNewNote({ title: '', content: '', tags: '', date: new Date().toISOString().split('T')[0] });
        setEditMode(false);
        setNoteIdToEdit(null);
    };

    const handleEdit = (noteId) => {
        const noteToEdit = notes.find((note) => note.id === noteId);
        if (!noteToEdit) return;

        setNewNote({
            title: noteToEdit.title,
            content: noteToEdit.content,
            tags: noteToEdit.tags ? noteToEdit.tags.join(', ') : '',
            date: noteToEdit.date,
        });
        setEditMode(true);
        setNoteIdToEdit(noteId);
        setShowForm(true);
    };

    const handleDelete = async (noteId) => {
                try {
                    const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        credentials:'include'
                    });
                    if (!response.ok) throw new Error('Failed to delete note');
                    setNotes(notes.filter((note) => note.id !== noteId));
                } catch (error) {
                    console.error('Error:', error);
                }
            };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.tags && note.tags.join(' ').toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="blog">
            <h1>Notes</h1>
            {user ? (
                <>
                    <div className="button-group">
                        <button onClick={() => setShowSearch(prev => !prev)}>
                            {showSearch ? 'Hide Search' : 'Show Search'}
                        </button>
                        <button onClick={() => setShowForm(prev => !prev)}>
                            {showForm ? (editMode ? 'Cancel Edit' : 'Hide Form') : (editMode ? 'Edit Notes' : 'Add New Notes')}
                        </button>
                        <button onClick={() => setShowNotes(prev => !prev)}>
                            {showNotes ? 'Hide Notes' : 'Show Notes'}
                        </button>
                        <button onClick={() => setShowEditor(prev => !prev)}>
                            {showEditor ? 'Hide Editor' : 'Show Editor'}
                        </button>
                    </div>
                    {showSearch && (
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search notes..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    )}
                    {showNotes && (
                        <div className="blog-posts">
                            {filteredNotes.length > 0 ? (
                                filteredNotes.map((note) => (
                                    <div key={note.id} className="blog-post">
                                        <h2>{note.title}</h2>
                                        <p>{note.content}</p>
                                        <p><strong>Tags:</strong> {note.tags ? note.tags.join(', ') : 'No tags'}</p>
                                        <p><strong>Date:</strong> {new Date(note.date).toLocaleDateString()}</p>
                                        <button className="edit" onClick={() => handleEdit(note.id)}>Edit</button>
                                        <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
                                    </div>
                                ))
                            ) : (
                                <p>No notes available.</p>
                            )}
                        </div>
                    )}
                    {showForm && (
                        <div>
                            <h2>{editMode ? 'Edit Note' : 'Add a New Note'}</h2>
                            <form className="blog-form" onSubmit={handleSubmit}>
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newNote.title}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="content">Content:</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={newNote.content}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                />
                                <label htmlFor="tags">Tags (comma-separated):</label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    value={newNote.tags}
                                    onChange={handleChange}
                                />
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={newNote.date}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit">{editMode ? 'Update Note' : 'Add Note'}</button>
                            </form>
                        </div>
                    )}
                    {showEditor && <Editor />}
                </>
            ) : (
                <p>Please log in to add or manage your notes.</p>
            )}
        </div>
    );
};

export default Notes;
