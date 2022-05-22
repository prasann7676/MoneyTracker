import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

//styles
import styles from "./Login.module.css"

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isPending } = useLogin(); // destructuring the useLogin custom hook

    const handleSubmit = (event) => {
        event.preventDefault() //to prevent the default reloading of the form after every submit
        login(email, password); // calling login function inside useLogin hook, which is being imported.
    }

    return (
        // - between login and form is detected as subtraction, therefore convert it into string
        <form  onSubmit={handleSubmit} className={styles['login-form']}> 
            <h2>Login</h2>
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
            {!isPending && <button className="btn">Login</button> }{/*btn is defined globally in index.css*/}
            {isPending && <button className="btn" disabled>Loading...</button>}
            {error && <p>{error}</p>}
        </form>
    )
}