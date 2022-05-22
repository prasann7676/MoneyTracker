import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

//styles
import styles from './Navbar.module.css';

 export default function Navbar() {

  const { logout } = useLogout();
  const { user }  = useAuthContext();

  return (
    <nav className={styles.navbar}> {/* applying navbar class to the navbar, styled in Navbar.module.css*/}
      <ul>
        <li className={styles.title}>myMoney</li>
        
        {/*when a user do not exist, or say when no one is loggedIn or signed up */}
        {/*we donot want to diplay logout link on the navbar */}
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li> {/* Creating a link of /login on navbar*/}
            <li><Link to="/signup">Signup</Link></li>  {/* Creating a link of /signup on navbar*/}
          </>
        )}
        
        {/*If only want the logout, button to be displayed when the user exists*/}
        {/*remember user can be accessed from any component after importing useAuthContext*/}
        {user && (
          <>
            <li>Hello, {user.displayName}</li>
            <li>
              <button className='btn' onClick={logout}>Logout</button> {/*whenever logout button is clicked, trigger the logout function which is inside useLogout hook */}
            </li>
          </>
        )}

      </ul> 
    </nav>
  )
}
