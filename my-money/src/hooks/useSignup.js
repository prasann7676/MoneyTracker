// hooks folder contains all custom made hooks
// This useSignup is also a custom hook.
// This hook is imported in Signup.js to use its functionality

import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';

// useAuthContext returns the context object will contain the {state, dispatch}
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const [isCancelled, setIsCancelled] = useState(); 

    // This signup function will basically invoke when a user submit the sign up form
    const signup = async (email, password, displayName) => {
        setError(null) // reset the error after every form submit
        setIsPending(true) // At this point of time, till ending of the function it will be in loading state

        try {
            // signup the user, if there would be an error while signing up using createUserWithEmailAndPassword
            // the the catch part will come into action
            // This is an inbuilt function, which reaches out the firebase Auth and tries to sign that user
            // with the particular email and password in the parameter.
            const res = await projectAuth.createUserWithEmailAndPassword(email, password) // await means, the execution of the function will not move futher untill this line is being executed
            // respose.user is the user that is just created in the firebase.
    
            
            if(!res){ // res is NULL
                throw new Error("Error in signing up")
            }

            // Till here no error in signing up

            // user default donot have the displayName property in firebase
            // therefore we have to add displayName to the user
            // updareProfile add the displayName to the current user profile
            await res.user.updateProfile({displayName})

            //dispathing login action, which update the user state.
            // as whenever some signup, they autpmatically also login to the website
            // this displatch function calls the reducer function in the AuthContext
            dispatch( {type: 'LOGIN', payload: res.user} );

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) { // if error in signing up
            if(!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        // cleanup function
        return () => setIsCancelled(true);

    }, [])

    return { error, isPending, signup }
}