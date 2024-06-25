// src/components/Users.tsx
import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import { User } from '../types/User';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const users = await getUsers();
      setUsers(users);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
