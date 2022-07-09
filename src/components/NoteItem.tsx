import { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

type NoteItemProp = {
    text: string;
    deleted: boolean;
    removeNoteHandler: () => void;
    toggleEditModeHandler: () => void;
}

function NoteItem({ text, removeNoteHandler, toggleEditModeHandler, deleted }: NoteItemProp) {

    const btnEliminarClick = () => {
        removeNoteHandler();
    }

    const btnEditarClick = () => {
        toggleEditModeHandler();
    }

    return (<div className="add-note">
        <textarea placeholder="Escriba acá para agregar una nueva nota..." value={text} readOnly
        ></textarea>
        <div className="add-note-footer">
            {
                deleted || <BsFillPencilFill color="blue" onClick={btnEditarClick} />
            }
            <BsFillTrashFill color="red" onClick={btnEliminarClick} />
        </div>
    </div>)
}


export default NoteItem;