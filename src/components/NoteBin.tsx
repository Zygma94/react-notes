import React, { useState } from 'react';
import NoteItem from './NoteItem';

export type Note = {
    id: string;
    text: string;
    deleted: boolean;
}

type Dictionary<T> = {
    [key: string]: T;
}

type NoteBinProp = {
    notes: Array<Note>;
    removeNoteHandler: (id: string) => void;
}

function NoteBin({ notes, removeNoteHandler }: NoteBinProp) {

    const [editMode, setEditMode] = useState<Dictionary<boolean>>(notes.reduce((dic, note) => ({ ...dic, [note.id]: false }), {}));

    const toggleEditModeHandler = (id: string) => {
        setEditMode({ ...editMode, [id]: !editMode[id] });
    }

    return (<React.Fragment>{
        notes.map((note) =>
            <NoteItem
                toggleEditModeHandler={() => toggleEditModeHandler(note.id)}
                removeNoteHandler={() => removeNoteHandler(note.id)}
                text={note.text}
                key={note.id}
                deleted={note.deleted} />
        )
    }</React.Fragment>)
}


export default NoteBin;