import { useEffect, useState, useRef } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    const query = useRef(_query).current
    // without this useEffect will stuck into an infinite loop, because _query is an array.
    // So, whenever the query or the collection changes, this array values are treated as different, every time
    // or say _query is an array and id different on every function call.
    // to deal with this infinite loop due to useEffect being called, useRef is used

    const orderBy = useRef(_orderBy).current

    // useEffect is used to real-time listen to the collection changes.
    // so whenever the collection changes, we want the changed collection to be shown in the home page
    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        if(query) {
            ref = ref.where(...query)  
            // This where is an inbuilt firestore function
            // we only want collection of the user with a certain userid(who is currently logged in)
        }

        if(orderBy) {
            ref = ref.orderBy(...orderBy)
            // This orderBy is a function to diplay the documents (here transactions) in a specific order.
        }

        // so this function would be called whenever the collection is being altered
        // for ex - when we add a document, or say when deleted, or updated a document
        // also it will be first called while creating one.
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let result = []
            //.docs accesses the collection of documents, which is returned as a snapshot
            snapshot.docs.forEach(doc => {
                result.push({...doc.data(), id: doc.id}) 
                // this id is not uid(this was for the user)
                // whereas, id is a unique id for a particular document, inside a collection of a particular user
            })

            // updating the document state accoording to the snapshot, to be in sync
            setDocuments(result)
            setError(null)
        }, (error) => {
            console.log(error);
            setError('Could not Fetch the Data')
        })
        // 2nd argument to the snapshot function is to handle errors

        // unsubscribe on unmount
        return () => unsubscribe()

    }, [collection, query, orderBy]) 
    // those variable or state is kept in the dependency array which comes from outside
    //(i.e not defined inside useEffect ahould be included in the dependency array)

    return { documents, error }

}