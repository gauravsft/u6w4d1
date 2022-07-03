import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editDataBaseTodo, getAllLatestTodosLoading, getAllLatestTodosFailure } from "../Redux/action";

export const TodoDetails = () => {
    const { id } = useParams();
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getDataFromDataBase = async () => {
        try {
            dispatch(getAllLatestTodosLoading());
            const response = await fetch("http://localhost:7000/todos");
            const data = await response.json();
            dispatch(editDataBaseTodo(data));

        } catch (error) {
            dispatch(getAllLatestTodosFailure());
            console.log(error)
        }
    };

    const toggleDataInDataBase = async (payload) => {
        try {
            dispatch(getAllLatestTodosLoading());
            payload.status = !payload.status;
            await fetch(`http://localhost:7000/todos/${payload.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            getDataFromDataBase();
        } catch (error) {
            dispatch(getAllLatestTodosFailure());
            console.log(error);
        }
    }

    const deleteDataInDataBase = async (id) => {
        try {
            dispatch(getAllLatestTodosLoading());
            await fetch(`http://localhost:7000/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            dispatch(getAllLatestTodosFailure());
            console.log(error);
        }
    }

    const handleToggle = (item) => {
        toggleDataInDataBase(item);
    };

    const handleDelete = (itemId) => {
        deleteDataInDataBase(itemId);
        navigate("/todos");
    };

    return (
        <div>
            {todos
                ?.filter((item) => {
                    return item.id === id;
                })
                .map((item) => {
                    return (
                        <div key={item.id}>
                            <h4> {`${item.title} --- ${item.status ? "Completed" : "Not Completed"}`}</h4>
                            <button onClick={() => handleToggle(item)}>Toggle</button>
                            <button onClick={() => handleDelete(item.id)}>DELETE</button>
                        </div>
                    );
                })}
        </div>
    );
};