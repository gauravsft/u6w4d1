import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { editDataBaseTodo, getAllLatestTodosLoading, getAllLatestTodosFailure } from "../Redux/action";
import { TodoList } from "./TodoList";

export const TodoInput = () => {
    const [title, setTitle] = React.useState("");
    const dispatch = useDispatch();
    const getDataFromDataBase = async () => {
        try {
            dispatch(getAllLatestTodosLoading());
            const res = await fetch("http://localhost:7000/todos");
            const data = await res.json();
            dispatch(editDataBaseTodo(data));

        } catch (error) {
            dispatch(getAllLatestTodosFailure());
            console.log(error)
        }
    };

    const postDataInDataBase = async (payload) => {
        try {
            dispatch(getAllLatestTodosLoading());
            await fetch(`http://localhost:7000/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            dispatch(getAllLatestTodosFailure());
            console.log(error);
        }
    }

    const handleAdd = () => {
        const payload = {
            id: uuid(),
            title: title,
            status: false
        };
        postDataInDataBase(payload).then(() => {
            getDataFromDataBase();
        });

        setTitle("");
    };

    return (
        <>
        <div>
            <h3>Add Todo</h3>
            <input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                type="text"
                placeholder="Add Something "
            />
            <button onClick={handleAdd}>ADD</button>
        </div>
        <TodoList></TodoList>
        </>
    );
};