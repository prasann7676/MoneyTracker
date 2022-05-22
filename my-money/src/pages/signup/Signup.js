import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

//styles
import styles from "./Signup.module.css"

export default function Signup(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    const {signup, isPending, error} = useSignup() // importing all functionality implemented in useSignup hook

    // when form is being submitted, call the signup function
    // to signup user in the firebase
    const handleSubmit = (event) => {
        event.preventDefault() //to prevent the default reloading of the form after every submit
        signup(email, password, displayName) // calling the function located in useSignup.js hook
    }

    return (
        <form  onSubmit={handleSubmit} className={styles['signup-form']}> 
            <h2>Signup</h2>
            <label>
                <span>Email:</span> {/*span for label text*/}
                <input type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>Display Name:</span>
                <input type="text"
                    onChange={(event) => setDisplayName(event.target.value)}
                    value={displayName}
                />
            </label>
            {/*btn is defined globally in index.css*/}
            {!isPending && <button className="btn">Signup</button>}  {/*if not loading then show the signup button */}
            {isPending && <button className='btn' disabled>Loading...</button>} {/*if loading then show a button which is disabled, so that no signup request is being made during loading*/}
            {error && <p>{error}</p>} {/*If error then show the error in the signup page */}
        </form>
    )
}