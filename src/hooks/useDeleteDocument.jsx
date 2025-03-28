import  {useState, useEffect, useReducer} from 'react';
import {db} from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

const initialState = {
    loading: null,
    error: null,
    success: null
}

const deleteReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null, success: null}
        case "DELETED_DOCUMENT":
            return {loading: false, error: null, success: true}
        case "ERROR":
            return {loading: false, error: action.payload, success: false}
        default:
            return state
    }
}

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action);
        }
    }

    const deleteDocument = async(id) => {

        checkCancelBeforeDispatch({
            type: "LOADING",
        })

        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))
           

            checkCancelBeforeDispatch({
                type: "DELETED_DOCUMENT",
                payload: deletedDocument,
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message
            });
            
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {deleteDocument, response};
}