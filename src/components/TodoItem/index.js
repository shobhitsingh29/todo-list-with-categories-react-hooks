import React, {useRef} from 'react';

export const TodoItem = (props) => {
    const {todo, toggleIsCompleted, deleteTodo, editTodo} = props;
    const refer = useRef('');

    const handleOnchange = (e) => {

        refer.current = e.target.value;

    };
    return (
        <li key={todo.id}>
            <input type='checkbox'
                   checked={todo.isDone}
                   readOnly
                   onClick={() => toggleIsCompleted(todo.id)}
            />
            {todo.isDone
                ?
                <strike>{todo.description + ' ' + todo.category}</strike>
                :
                todo.description + ' ' + todo.category}

            {<input style={{'width': '300px'}} placeholder='add new descrip`n here & hit->✍️️' type='text' ref={refer}
                    onChange={handleOnchange}/>}
            {<span style={{'cursor': 'pointer'}}
                   onClick={() => editTodo(todo.id, refer.current)}>&nbsp; &nbsp; ✍️️ </span>}
            {<span style={{'cursor': 'pointer'}} onClick={() => deleteTodo(todo.id)}>&nbsp; &nbsp; 🗑️</span>}
        </li>
    );
};
