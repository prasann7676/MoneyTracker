import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; 
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';

function App() {

  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {/*only when authIsReady is true 
      (i.e. when after refreshing, a user has been fetched from firebase, either it be NULL or some previous user who refreshed it) */}
      {/*This is used to stop the temporary page showing(with no hello user), just after refreshing*/}
      {authIsReady && ( 
        <BrowserRouter>
          {/* components will contain all components of the app that are not pages*/}
          <Navbar />
          <Switch>
            <Route exact path="/"> {/* home page*/}
              { !user && <Redirect to="/login" />} {/*If there is no user, we will navigate them to the login page*/}
              { user && <Home /> } {/*if user exists then only hme page can be accessed */}
            </Route>
            <Route path="/login"> {/* login page*/}
              { user && <Redirect to="/" />} {/*If user is logged in, then no need to show the login page again, therefore navigate them to home page*/}
              { !user && <Login /> } {/*Login page should not be visible when user is logged in */}
            </Route>
            <Route path="/signup"> {/* signup page*/}
              {user && <Redirect to="/" />}
              { !user && <Signup /> }
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
