import { useState } from 'react';
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTodo, editTodo } from "../utils/todoSlice";
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Todo({ id, text, completed }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleToggleComplete = () => {
        dispatch(toggleComplete(id));
    };

    const handleDeleteTodo = () => {
        dispatch(deleteTodo(id));
    };

    const handleEditTodo = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        dispatch(editTodo({ id, newText: editedText }));
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedText(text);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        setEditedText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        }
    };

    return (
        <>
        <div className="todo-item">
            <Checkbox {...label} 
            checked={completed}
            color="default"
            onChange={handleToggleComplete} 
            />

            {isEditing ? (
                <Input 
                    type="text"
                    value={editedText}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    onBlur={handleCancelEdit}
                    className="todo-edit-input"
                />
            ) : (
                <div 
                    className="todo-text"
                    style={{ textDecoration: completed ? "line-through" : "none", color: completed ? "gray" : "none" }}
                >
                    {text}
                </div>
            )}

            {isEditing ? (
                <SaveIcon 
                    className="todo-edit"
                    onClick={handleSaveEdit}
                    fontSize="small"
                />
            ) : (
                <EditIcon 
                    className="todo-edit"
                    onClick={handleEditTodo}
                    fontSize="small"
                />
            )}

            <DeleteIcon 
                className="todo-delete"
                onClick={handleDeleteTodo}
                fontSize="small"
            />
        </div>
        </>
    )
};
