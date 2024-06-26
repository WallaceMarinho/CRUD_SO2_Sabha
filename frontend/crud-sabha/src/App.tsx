import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddItem from './components/AddItem';
import AddUser from './components/AddUser';
import Users from './components/Users';
import Login from './components/Login';
import EditItem from './components/EditItem';

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Navbar />}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/view-users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    
      <AppContent />
    
  );
};

export default App;
