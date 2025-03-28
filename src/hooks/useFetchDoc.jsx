import {useState, useEffect} from "react";
import {db} from "../firebase/config";

import {
    doc, getDoc
} from "firebase/firestore";

export const useFetchDocs = (docCollection, id) => {

    const [docs, setDocs] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);


    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadDocs () {
            if(cancelled) return;

            setLoading(true);

           try{
             const docRef =  await doc(db, docCollection, id);
             const docSnap = await getDoc(docRef);

             setDocs(docSnap.data());

             setLoading(false);
           } catch (error) {
                console.log(error.message);
                setError(error.message);
           }
             setLoading(false);
        }

        loadDocs();

    }, [docCollection, id, cancelled])

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {docs, error, loading};

};