// Hooks
import { useState, createContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

// CSS
import './App.css'


// Components
import Dashboard from './components/Dashboard/Dashboard'
import Navbar from './components/Navbar/Navbar';
import SigninForm from './components/SigninForm/SigninForm'
import SignupForm from './components/SignupForm/SignupForm'

// Services
import * as authService from '../src/services/authService'

function App() {
  const [user, setUser] = useState(authService.getUser());
  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };


  return (
    <Routes>
      <Route path="/signin" element={<SigninForm setUser={setUser}/>} />
      <Route path="/signup" element={<SignupForm setUser={setUser} />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>

  )
}

export default App
