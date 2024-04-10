import React, { useEffect, useState } from 'react';
import { getAllTodos, deleteTodo, completeTodo, inCompleteTodo } from '../service/TodoService';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../service/AuthService';

export const ListTodoComponent = () => {

    const [ todos, setTodos ] = useState([]);
    const navigate = useNavigate();

    const isAdmin = isAdminUser();

    useEffect(() => {
        listTodos();
    }, [])

    function listTodos() {
        getAllTodos().then((response) => {
            setTodos(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    const addNewTodo = () => {
        navigate('/add-Todo');
    }

    const updateTodo = (id) => {
        navigate(`/update-Todo/${id}`)
    }

    const removeTodo = (id) => {
        deleteTodo(id).then((response) => {
            listTodos();
        }).catch(error => {
            console.log(error);
        })
    }

    const markCompleteTodo = (id) => {
        completeTodo(id).then((response) => {
            listTodos();
        }).catch(error => {
            console.log(error);
        })
    }

    const markInCompleteTodo = (id) => {
        inCompleteTodo(id).then((response) => {
            listTodos();
        }).catch(error => {
            console.log(error);
        })
    }

  return (
    <div className='container'>
        <br></br>
        <h2 className='text-center'>List of Todos</h2>
        <br></br>
        { isAdmin && <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>}
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Todo Title</th>
                        <th>Todo Description</th>
                        <th>Todo Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => 
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'YES' : 'NO'}</td>
                                <td>
                                    {isAdmin && <button className='btn btn-info' onClick={() => updateTodo(todo.id)} style={{marginRight: '10px'}}>Update</button>}
                                    {isAdmin && <button className='btn btn-danger' onClick={() => removeTodo(todo.id)} style={{marginRight: '10px'}}>Delete</button>}
                                    <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)} style={{marginRight: '10px'}}>Complete</button>
                                    <button className='btn btn-danger' onClick={() => markInCompleteTodo(todo.id)} style={{marginRight: '10px'}}>InComplete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}
