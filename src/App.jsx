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
import TicketForm from './components/TicketForm/TicketForm';
import SupportAgents from './components/SupportAgents/SupportAgents';
import MyAssignedTickets from './components/MyAssignedTickets/MyAssignedTickets';
import QuickTips from './components/QuickTips/QuickTips';
import ProfilePage from './components/ProfilePage/ProfilePage'; // Import ProfilePage

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

  const navbarHeightClass = 'pt-12';

  return (
    <AuthedUserContext.Provider value={user}>
      {user && (
        <>
          <SideNavbar />
          <Navbar handleSignout={handleSignout} />
        </>
      )}
      <main className={user ? `ml-64 ${navbarHeightClass}` : ''}>
        <Routes>
          {user ? (
            // Protected routes
            <>
              <Route path="/dashboard" element={<div className="p-6"><Dashboard setUser={setUser} handleSignout={handleSignout}/></div>} />
              <Route path="/tickets/:id" element={<div className="p-6"><TicketDetails /></div>} />
              <Route path="/tickets/:id/edit" element={<div className="p-6"><TicketForm /></div>} />
              <Route path="/profile" element={<div className="p-6"><ProfilePage /></div>} /> {/* Add Profile Route */}

              {user.role === 'admin' && (
                <>
                  <Route path="/support-agents" element={<SupportAgents />} />
                  <Route path="/my-assigned-tickets" element={<div className="p-6"><MyAssignedTickets /></div>} />
                  <Route path="/quick-tips" element={<div className="p-6"><QuickTips /></div>} />
                </>
              )}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/signin" element={<Navigate to="/dashboard" replace />} />
              <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
              {user.role !== 'admin' && (
                <>
                  <Route path="/support-agents" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/my-assigned-tickets" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/quick-tips" element={<Navigate to="/dashboard" replace />} />
                </>
              )}
            </>
          ) : (
            // Unprotected routes
            <>
              <Route path="/signin" element={<SigninForm setUser={setUser}/>} />
              <Route path="/signup" element={<SignupForm setUser={setUser}/>} />
              {/* Redirects for logged-out users */}
              <Route path="/" element={<Navigate to="/signin" replace />} />
              <Route path="/dashboard" element={<Navigate to="/signin" replace />} />
              <Route path="/tickets/*" element={<Navigate to="/signin" replace />} />
              <Route path="/support-agents" element={<Navigate to="/signin" replace />} />
              <Route path="/my-assigned-tickets" element={<Navigate to="/signin" replace />} />
              <Route path="/quick-tips" element={<Navigate to="/signin" replace />} />
              <Route path="/profile" element={<Navigate to="/signin" replace />} /> {/* Redirect if not logged in */}
            </>
          )}
        </Routes>
      </main>
    </AuthedUserContext.Provider>
  );
}

export default App;
