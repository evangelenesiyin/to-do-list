import { useState } from "react";
import Todo from "../components/Todo";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../utils/todoSlice";
import Button from '@mui/material/Button';
import Input from "@mui/material/Input";
import ViewListIcon from '@mui/icons-material/ViewList';

export default function TodoPage() {
    const [text, setText] = useState("");
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleAddTodo = () => {
        if (text) {
        dispatch(addTodo(text));
        setText("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <>
        <div className="todo-page">
            <img className="banner-image" src="src/assets/stock-image-01.jpg" />
            <div className="todo-section">
            
            <div className="todo-input">
            <Input 
                type="text" 
                style={{ width: 440 }}
                placeholder="Create a task"
                value={text} 
                onChange={handleInputChange} 
                onKeyPress={handleKeyPress}
                />
            </div>

            

            {todos.map((todo) => (
            <Todo
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
            />
        ))}
            
            </div>
        </div>
        </>
    )
}