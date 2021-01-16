import React, {useEffect, useState} from 'react';
import {Filters} from './components/Filters';
import {v4 as uuidv4} from 'uuid';
import {TodoItem} from './components/TodoItem';
import {initialTodos} from './mocked';
import './App.css';

const App = () => {

    const [todos, setTodos] = useState(initialTodos);
    const [filteredTodos, setFilteredTodos] = useState(initialTodos);
    const [descriptionQuery, setDescriptionQuery] = useState('');
    const [categoryQuery, setCategoryQuery] = useState('Office');
    const [currentCategory, setCurrentCategory] = useState('Office');

    useEffect(() => {
        setFilteredTodos(filterTodos(todos, currentCategory));
    }, [currentCategory, todos]);

    const addTodo = () => {
        if (descriptionQuery.length > 0 && categoryQuery.length > 0) {
            setDescriptionQuery('');
            setTodos([...todos, {id: uuidv4(), description: descriptionQuery, category: categoryQuery, isDone: false}]);
            filterTodos(todos, currentCategory)
        }
    };

    const toggleIsCompleted = (id) => {

        const tempTodos = [...todos];
        const currentTodo = tempTodos.find(todo => todo.id === id);
        currentTodo.isDone = !currentTodo.isDone;
        setTodos(tempTodos);
    };

    const deleteTodo = (id) => {
        const tempTodos = [...todos];
        const filterTODO = tempTodos.filter(todo => todo.id !== id);
        setTodos(filterTODO);
    };

    const editTodo = (id, val) => {
        const tempTodos = [...todos];
        const newTODO = tempTodos.map(todo => {

            if (todo.id === id) {
                todo.description = val;
            }
            return todo;
        });
        setTodos(newTODO);
    };


    const changeFilter = (selectedCategory) => {
        setCurrentCategory(selectedCategory);
    };

    const filterTodos = (allTodoItems, currentCategory) => {
        return allTodoItems.filter(todo => todo.category === currentCategory);
    };

    const TodoListJSX = filteredTodos.map(todo =>
        <TodoItem
            key={todo.id}
            todo={todo}
            toggleIsCompleted={toggleIsCompleted}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
        />);

    return (
        <div className='App'>
            <section className='column'>
                <h1>Todo</h1>
                <ul>{TodoListJSX}</ul>
                <div className='add-item'>
                    <input value={descriptionQuery} onChange={e => setDescriptionQuery(e.target.value)}
                           placeholder='add a task...'/>
                    <input value={categoryQuery} onChange={e => setCategoryQuery(e.target.value)}/>
                    <span role="img" aria-label="+" className='plus' onClick={() => addTodo()}> ➕</span>
                </div>
            </section>
            <section className='column'>
                <Filters
                    todos={todos}
                    changeFilter={changeFilter}
                    currentCategory={currentCategory}
                />
            </section>
        </div>
    );
};

export default App;
