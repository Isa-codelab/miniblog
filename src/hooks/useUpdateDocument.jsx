import  {useState, useEffect, useReducer} from 'react';
import {db} from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

const initialState = {
    loading: null,
    error: null,
    success: null
};

const updateReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null, success: null}
        case "UPDATED_DOCUMENT":
            return {loading: false, error: null, success: true}
        case "ERROR":
            return {loading: false, error: action.payload, success: false}
        default:
            return state
    };
};

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action);
        };
    };

    const updateDocument = async(id, data) => {

        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
           const docRef =  await doc(db, docCollection, id);

           const updateDocument = await updateDoc(docRef, data);
           

            checkCancelBeforeDispatch({
                type: "UPDATED_DOCUMENT",
                payload: updateDocument,
            });
        } catch (error) {
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message
            });
            
        };
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {updateDocument, response};
}