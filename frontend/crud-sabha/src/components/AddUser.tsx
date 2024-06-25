// src/components/AddUser.tsx
import React, { useState } from 'react';
import { createUser } from '../services/userService';
import { User } from '../types/User';

const AddUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: Omit<User, 'id'> = { name, email };
    await createUser(newUser);
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
