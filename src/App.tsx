import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NoteList, { Note } from './components/NoteList';
import { Routes, Route, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import NoteBin from './components/NoteBin';

function App() {

  const [notes, setNotes] = useState<Array<Note>>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) :
      [{ id: nanoid(), text: 'Nota 1', deleted: false }, { id: nanoid(), text: 'Nota 2', deleted: false }, { id: nanoid(), text: 'Nota 3', deleted: false }]
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  })

  const setNoteHandler = (id?: string) => (text: string) => {
    if (id) {
      const index = notes.findIndex(notes => notes.id == id);
      notes.splice(index, 1, { text, id, deleted: false });
      setNotes([...notes]);
    } else {
      setNotes([...notes, { text, id: nanoid(), deleted: false }]);
    }
  }

  const removeNoteHandler = (id: string) => {
    const index = notes.findIndex(notes => notes.id == id);
    if (notes[index].deleted) {
      Swal.fire({
        title: 'Caution',
        text: 'Are you sure?',
        showCancelButton: true
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          notes.splice(index, 1);
          setNotes([...notes]);
        }
      })
    } else {
      notes.splice(index, 1, { ...notes[index], deleted: true });
      setNotes([...notes]);
    }
  }



  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Aplicación de notas
        </h2>
        <div className='navigation'>
          <NavLink to='/'>Notes</NavLink>
          <NavLink to='/trashBin'>Trash bin</NavLink>
        </div>
        <div className='notes'>
          <Routes>
            <Route path='/' element={
              <React.Fragment>
                <NoteList notes={notes.filter(nota => !nota.deleted)} setNoteHandler={setNoteHandler} removeNoteHandler={removeNoteHandler} />
                <NoteForm setNotaHandler={setNoteHandler()} />
              </React.Fragment>
            } />
            <Route path='/trashBin' element={
              <NoteBin notes={notes.filter(nota => nota.deleted)} removeNoteHandler={removeNoteHandler} />
            } />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
