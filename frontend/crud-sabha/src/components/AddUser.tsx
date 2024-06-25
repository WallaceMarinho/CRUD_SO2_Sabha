import React, { useState } from 'react';
import { createUser } from '../services/userService';
import { User } from '../types/User';

const AddUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: Omit<User, 'id'> = { name, email, password };

    try {
      await createUser(newUser);
      setSuccessMessage('User created successfully.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('Failed to create user.');
    }
  };

  return (
    <div className="users-container">
      <h1>Add User</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
