import React, { useState } from 'react';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';

export type Note = {
    id: string;
    text: string;
    deleted: boolean;
}

type Dictionary<T> = {
    [key: string]: T;
}

type NoteListProp = {
    notes: Array<Note>;
    setNoteHandler: (id?: string) => (text: string) => void;
    removeNoteHandler: (id: string) => void;
}

function NoteList({ notes, removeNoteHandler, setNoteHandler }: NoteListProp) {

    const [editMode, setEditMode] = useState<Dictionary<boolean>>(notes.reduce((dic, note) => ({ ...dic, [note.id]: false }), {}));

    const toggleEditModeHandler = (id: string) => {
        setEditMode({ ...editMode, [id]: !editMode[id] });
    }

    const editNoteHandler = (id: string) => (text: string) => {
        setNoteHandler(id)(text);
        if (text.length > 0) {
            toggleEditModeHandler(id);
        }
    }

    return (<React.Fragment>{
        notes.map((note) =>
            !editMode[note.id] ?
                <NoteItem toggleEditModeHandler={() => toggleEditModeHandler(note.id)} removeNoteHandler={() => removeNoteHandler(note.id)} text={note.text} key={note.id} deleted={note.deleted} />
                : <NoteForm text={note.text} setNotaHandler={editNoteHandler(note.id)} key={note.id} toggleEditModeHandler={() => toggleEditModeHandler(note.id)} />
        )
    }</React.Fragment>)
}


export default NoteList;