import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";


let initalState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type){
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null} // no ...state as all states are handled manually
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        default: 
            return state 
    }
}

// collection are like tables in sql
export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initalState)
    const [isCancelled, setIsCancelled] = useState(false)

    // accessing the collection named ref
    // If not yet made firestore will first create the collection
    const ref = projectFirestore.collection(collection)

    // only dispatch only if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled){
            dispatch(action)
        }
    }

    // add a document in firestore database
    // This doc is parameter which is the object to be added in the collection
    // This object is passed in the TransactionForm file, in the handleSubmit function
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })// to change the isPending to true

        try {
            // This createdAt will be used to display the order of the transaction in the home page 
            const createdAt = timestamp.fromDate(new Date())

            const addedDocument = await ref.add({ ...doc, createdAt })
            // we are adding the doc object with the times of creating it in the firebase.
            dispatchIfNotCancelled( {type: 'ADDED_DOCUMENT', payload: addedDocument} )
            
        }
        catch(err){
            dispatchIfNotCancelled( {type: 'ERROR', payload: err.message} )
        }

    }

    // delete a document from firestore database
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            //res.doc(id) will give us a specific document with the given id
            await ref.doc(id).delete()

            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })

        }
        catch(err) {
            dispatchIfNotCancelled({ type: 'ERRoR', payload: 'could not delete' })
        }
    } 

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }

}