import React, { useContext, useState } from 'react';
import { AlertContex } from "../contex/alert/alertContext";
import { FirebaseContext } from "../contex/firebase/firebaseContex";

const Form = () => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContex);
    const firebase = useContext(FirebaseContext);
    const submitHandler = (event) => {
        event.preventDefault();
        if (value.trim()){
            firebase.addNote(value).then(()=>{
                alert.show("Заметка была создана", 'success');
            }).catch(()=>{
                    alert.show("Что-то пошло не так", 'danger')
            })
            setValue('');
        }
        else
        {
            alert.show("Введите название заметки");
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input type="text"
                       className="form-control"
                       placeholder="Введите название заметки"
                       value={value}
                       onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    )
};

export default Form;