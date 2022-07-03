import { EDIT_DB_TODO, GET_ALL_LATEST_TODOS_LOADING, GET_ALL_LATEST_TODOS_FAILURE } from "./actionType";

export const editDataBaseTodo = (payload) => {
    return {
        type: EDIT_DB_TODO,
        payload
    };
};

export const getAllLatestTodosLoading = () => ({
    type: GET_ALL_LATEST_TODOS_LOADING
});

export const getAllLatestTodosFailure = () => ({
    type: GET_ALL_LATEST_TODOS_FAILURE
});
