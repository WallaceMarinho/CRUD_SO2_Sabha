// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-item">Add Item</Link>
        </li>
        <li>
          <Link to="/view-users">View Users</Link>
        </li>
        <li>
          <Link to="/add-user">Add User</Link>
        </li>
        <li>
            <Link to="/login">Sair</Link>
        </li>
      </ul>
    </nav>
  );
};


export default Navbar;
