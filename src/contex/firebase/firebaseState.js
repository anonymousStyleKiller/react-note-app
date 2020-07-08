import React, { useReducer } from "react";
import axios from 'axios';
import { FirebaseContext } from "./firebaseContex";
import { firebaseReducer } from "./firebaseReducer";
import { ADD_NOTE, FETCH_NODES, REMOVE_NOTE, SHOW_LOADER } from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({children}) => {
    const initialState = {
        notes: [],
        loading: false
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState);
    const showLoader = () => dispatch({type: SHOW_LOADER});
    const fetchNotes = async () => {
        showLoader();
        const response = await axios.get(`${url}/notes.json`);
        const payload = Object.keys(response.data).map(key => {
            return {...response.data[key], id: key}
        })
        dispatch({type: FETCH_NODES, payload: payload})
    }
    const addNote = async (title) => {
        const note = {
            title, date: new Date().toJSON()
        }
        try {
            const response = await axios.post(`${url}/notes.json`, note);
            const payload = {
                ...note, id: response.data.name
            }
            dispatch({type: ADD_NOTE, payload: payload})
        } catch (e) {
            throw new Error(e.message);
        }

    }
    const removeNote = async (id) => {
        await axios.delete(`${url}/notes/${id}/.json`);
        dispatch({type: REMOVE_NOTE, payload: id})
    }
    return (
        <FirebaseContext.Provider
            value={{
                addNote, fetchNotes, showLoader, removeNote,
                loading: state.loading,
                notes: state.notes
            }}>
            {children}
        </FirebaseContext.Provider>
    )
}