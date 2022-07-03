import { EDIT_DB_TODO, GET_ALL_LATEST_TODOS_LOADING, GET_ALL_LATEST_TODOS_FAILURE } from "./actionType";

const initailState = {
    todos: [],
    isLoading: false,
    isError: false
};

export const reducer = (state = initailState, { type, payload }) => {
    switch (type) {

        case EDIT_DB_TODO: {
            return {
                ...state,
                todos: payload,
                isLoading: false,
                isError: false,
            };
        }
        case GET_ALL_LATEST_TODOS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                todos: []
            };
        }
        case GET_ALL_LATEST_TODOS_LOADING: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                todos: []
            };
        }
        default: {
            return state;
        }
    }
};

