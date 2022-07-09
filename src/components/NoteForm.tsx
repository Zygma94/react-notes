import { useState } from "react";
import {AiFillFileAdd} from "react-icons/ai";
import {BsFillTrashFill} from "react-icons/bs";

type AddNoteProp = {
    setNotaHandler: (texto: string) => void;
    toggleEditModeHandler?: () => void;
    text?: string;
}
function AddNote({ setNotaHandler, text, toggleEditModeHandler}: AddNoteProp) {

    const [notaTexto, setNotaTexto] = useState(text||"");
    const btnGuardarClick = () => {
        if (notaTexto.length > 0) {
            setNotaHandler(notaTexto);
            setNotaTexto('');
        }
    }
    const btnCancelarClick = () => {
        setNotaTexto('');
        if (toggleEditModeHandler) {
            toggleEditModeHandler();
        }
    }
    return (<div className="add-note">
        <textarea placeholder="Escriba acá para agregar una nueva nota..." value={notaTexto}
            onChange={(event) => setNotaTexto(event.target.value)}></textarea>
        <div className="add-note-footer">
            <AiFillFileAdd color="green" onClick={btnGuardarClick} />
            <BsFillTrashFill color="red" onClick={btnCancelarClick} />
        </div>
    </div>)
}

export default AddNote;