import React ,{useState, useEffect} from "react";
import "./TodoList.css";

import TodoForm from "../TodoForm/TodoForm";
import Todo from "../Todo/Todo";
import $ from 'jquery';


const  TodoList = (props) => {
    //value of input
    const [todoValue , setTodoValue] =useState('');

    //todos array of objects
    const [todos, setTodos]= useState([]);

    const [warn,setWarn] =useState(false);

    const [editForm, setEditForm]= useState(false);
    // OR by id const [id, setId]= useState(); in this way should use find()
    const [indexItem , setIndexItem] = useState();


    const handleAdd =(e)=>{

        e.preventDefault();

        //create a todo object
        let todoObject= {
            ID: new Date().getTime(),
            TodoValue:todoValue.trim(),
            completed:false
        }

        if(/[a-zA-Z0-9_]+.*$/.test(todoValue)){
        //updating or adding  todos state List
        setTodos([...todos, todoObject]);
        //clear the input because the input value is from state: value={todoValue}
        setTodoValue('');
        
        // setWarn(false);
        $(id_warn).fadeOut();


        }else{
            // setWarn(true);
            $(id_warn).fadeIn(1000);
            $(id_warn).css("display", "flex");
            // alert("Please fill out the filed !!");
        }

    }

    const getTodoFromLS =() =>{

        const data = JSON.parse(localStorage.getItem('Todos'));
    
        if(data){
            setTodos(data);
        }
    }

    //getting data from LocalStorage :
    useEffect(() =>{
        getTodoFromLS();
    },[])

    //saving data to LocalStorage :
    useEffect(()=>{

        localStorage.setItem('Todos',JSON.stringify(todos) );

    },[todos]);// will run whenever our todos state changes


    //delete a todo 
    const handleDelete = (id) =>{

        const filtered =todos.filter((item) => {
            return item.ID != id;
        })

        // setWarn(false);
        $(id_warn).fadeOut();
        setTodos(filtered);
    }


    const handleDeleteAll = ()=>{

        // setWarn(false);
        $(id_warn).fadeOut();
        setTodos([]);
    }
    // -------------------edit------------------
    //bring old info to form edit:
    const handleEdit = (todo, index)=>{
        setEditForm(true);

        setIndexItem(index);
        setTodoValue(todo.TodoValue);


    }

    const handleEditSubmit =(e) =>{
        e.preventDefault();

        let items = [...todos];
        let item =items[indexItem];

        //now editing 
        item.TodoValue = todoValue;
        // item.completed =false;

        //assign item to items
        items[indexItem] = item;

        //save data 
        setTodos(items);
        setTodoValue('');
        setEditForm(false);
        setWarn(false);

    }

    //-----------------------------------------------

    const handleCheckbox =(id) =>{

        let updateCheck = todos.map(item =>{
            if(item.ID ===id ){

            item.completed =! item.completed;
            }

            return item;
        });

        setTodos(updateCheck);

    }

        return (
        <>
            <h1>What's the Plan for Today?</h1>

            <TodoForm
            warn={warn}
            todoValue={todoValue}
            setTodoValue={setTodoValue}
            handleAdd={handleAdd}
            editForm={editForm}
            handleEditSubmit={handleEditSubmit}
            />

            {todos.length > 0 ? (
            <Todo
            todos={todos}
            editForm={editForm}
            handleDelete={handleDelete}
            handleDeleteAll={handleDeleteAll}
            handleEdit={handleEdit}
            handleCheckbox={handleCheckbox}
            warn={warn}

            />
            ) : (
            <p className="empty">There are no Todo's</p>
            )}
        </>
        );
    }

export default TodoList;