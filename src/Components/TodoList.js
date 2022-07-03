import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editDataBaseTodo, getAllLatestTodosLoading, getAllLatestTodosFailure } from "../Redux/action";

export const TodoList = () => {
    const { todos, isLoading, isError } = useSelector((state) => state);
    const dispatch = useDispatch();

    React.useEffect(() => {
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
        getDataFromDataBase();
    }, [dispatch]);
    if (isLoading) {
        return <div >
            <h1>Loading...</h1>
        </div>
    }
    if (isError) {
        return <div>
            <h1>Error...</h1>
        </div>
    }
    return (
        <div>
            <h4>Todo List</h4>
            {todos?.map((item) => {
                return (
                    <div className="gk" key={item.id}>
                        <Link style = { !item.status ? {color : "red"} : {color : "green"}} to={`/todo/${item.id}`}>{item.title}</Link>
                    </div>
                );
            })}
        </div>
    );
};
