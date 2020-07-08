import { ADD_NOTE, FETCH_NODES, REMOVE_NOTE, SHOW_LOADER } from "../types";

let handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [ADD_NOTE]: (state, {payload}) => ({
        ...state, notes: [...state.notes, payload]
    }),
    [FETCH_NODES]: (state, {payload}) => ({...state, notes: payload, loading: false}),
    [REMOVE_NOTE]: (state, {payload}) => ({
        ...state, notes: state.notes.filter(note => note.id !== payload
        )
    }),
    default: state => state
};

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.default;
    return handle(state, action)
}