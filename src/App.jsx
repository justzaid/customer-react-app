// Hooks
import { useState, createContext, useEffect } from 'react';

// Import Navigate for redirects
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'; 

// CSS
import './App.css';


// Components
import Dashboard from './components/Dashboard/Dashboard'
import SigninForm from './components/SigninForm/SigninForm'
import SignupForm from './components/SignupForm/SignupForm'
import Navbar from './components/Navbar/Navbar';
import SideNavbar from './components/SideNavbar/SideNavbar';
import TicketDetails from './components/TicketDetails/TicketDetails';

export const AuthedUserContext = createContext(null);

// Services
import * as authService from '../src/services/authService'

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
            // Protected routes
            <>
              <Route path="/dashboard" element={<Dashboard setUser={setUser} handleSignout={handleSignout}/>} />
              <Route path="/tickets/:id" element={
                <div className="flex">
                  <SideNavbar />
                  <div className="p-6 bg-gray-100 min-h-screen flex-1">
                    <Navbar />
                    <TicketDetails />
                  </div>
                </div>
              } />
              <Route path="/" element={<Navigate to="/dashboard" replace />} /> 
              <Route path="/signin" element={<Navigate to="/dashboard" replace />} />
              <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            // -Ubprotected routes
            <>
              <Route path="/signin" element={<SigninForm setUser={setUser}/>} />
              <Route path="/signup" element={<SignupForm setUser={setUser}/>} />
              <Route path="/" element={<Navigate to="/signin" replace />} /> 
              <Route path="/dashboard" element={<Navigate to="/signin" replace />} /> 
            </>
          )}
        </Routes>
          {user ? <Navbar handleSignout={handleSignout}/> : ''}
      </AuthedUserContext.Provider>
    </>

  )
}

export default App;
