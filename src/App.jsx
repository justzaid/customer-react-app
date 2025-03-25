// Hooks
import { useState, createContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

// CSS
import './App.css'


// Components
import Dashboard from './components/Dashboard/Dashboard'
import SigninForm from './components/SigninForm/SigninForm'
import SignupForm from './components/SignupForm/SignupForm'
import Navbar from './components/Navbar/Navbar';

export const AuthedUserContext = createContext(null);

// Services
import * as authService from '../src/services/authService'
import DashboardCard from './components/AdminDashboardCard/AdminDashboardCard';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    console.log(localStorage.getItem('token'));
    setUser(null);
    navigate('/signin');
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <Routes>
          {user ? (
            <>
            <Route path="/dashboard" element={<Dashboard setUser={setUser} handleSignout={handleSignout}/>} />
            </>
          ) : (
            <>
            <Route path="/signin" element={<SigninForm setUser={setUser}/>} />
            <Route path="/signup" element={<SignupForm setUser={setUser}/>} />
            </>
          )}
        </Routes>
          {user ? <Navbar handleSignout={handleSignout}/> : ''}
      </AuthedUserContext.Provider>
    </>

  )
}

export default App;
