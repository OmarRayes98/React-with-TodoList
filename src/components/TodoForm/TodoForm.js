import React ,{ useEffect, useRef } from "react";
import "./TodoForm.css";


import {Icon} from 'react-icons-kit';

import {plus} from 'react-icons-kit/feather/plus';
import {edit2} from 'react-icons-kit/feather/edit2';

const TodoForm = (props) => {

    const {warn,editForm,handleAdd,todoValue,setTodoValue,handleEditSubmit} =props;


    const handleInput =(e) =>{
        setTodoValue(e.target.value);
    }

    const inputRef = useRef(null);

    useEffect(() => {
    
        inputRef.current.focus();
    });



    return (
    <>
    {editForm === false ? (
        <div className="todo-form">
        <form autoComplete="off" onSubmit={(e) => handleAdd(e)}>
            <div className="input-and-button">
            <input
            className="input-and-button__input"
            ref={inputRef}
            onChange={(e) => handleInput(e)}
            value={todoValue}
            type="text"
            placeholder="Add an Item"
            />
            <div className="input-and-button__button">
            <button type="submit">
            <Icon icon={plus} size={20} />
            </button>
            </div>
            </div>
            {/* {warn && (
            <span className="warning">Please fill out the filed !!</span>
            )} */}
            <span id="id_warn" className="warning" >Please fill out the filed !!</span>

        </form>
        </div>
        
        ) : (

        <div className="todo-form">
        <form autoComplete="off" onSubmit={(e) => handleEditSubmit(e)}>
            <div className="input-and-button">
            <input
            className="input-and-button__input"
            ref={inputRef}
            onChange={(e) => handleInput(e)}
            value={todoValue}
            type="text"
            placeholder="Edit an Item"
            />
            <div className="input-and-button__button edit">
            <button type="submit">
            <Icon icon={edit2} size={20} />

            </button>
            </div>
            </div>
        </form>
        </div>
    )}
    </>

)};

export default TodoForm;
