import React from 'react';
import "./Todo.css";

import {Icon} from 'react-icons-kit';

import {edit2} from 'react-icons-kit/feather/edit2';
import {trash} from 'react-icons-kit/feather/trash';


const Todo =(props)=>{

    const{todos,editForm,handleDelete,handleDeleteAll,handleEdit,handleCheckbox} = props;

    return (
        <>
        {todos.map((individualTodo, index)=>(
        <div className={individualTodo.completed===true ?'todo complete':'todo'} key={individualTodo.ID}>

            <div className='todo__text' onClick={() => handleCheckbox(individualTodo.ID)}>
            {individualTodo.TodoValue}
            </div> 

            {/* edit and delete icon div */}
            {editForm ===false &&(
            <div className="todo__edit-and-delete">
            
            <div className='edit-icon' onClick={()=> handleEdit(individualTodo,index)}>
                <Icon icon={edit2} size={18} />
            </div>

            <div onClick={() => handleDelete(individualTodo.ID)}>
                <Icon icon={trash} size={18} />
            </div>

            </div>
            )}

        </div>
            ))}

            {/* after map , delete all todos */}

            {editForm ===false &&
            <div className='buttons'>
            <button onClick={handleDeleteAll} className="buttons__delete-all"> Delete All Items</button>
            </div>}
            
        </>
        
)};

export default Todo;
