import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import Login from './components/Login';


const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} /> {/* Use o PrivateRoute aqui */}
        <Route path="/" element={<Home />} />
      </Routes>
  );
};

export default App;
