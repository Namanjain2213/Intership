import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

const UserList = () => {
  const { data: apiUsers, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 0,
  });
  const { searchTerm } = useAppContext();
  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('newUsers') || '[]');
    setLocalUsers(storedUsers);
  }, []);

  const allUsers = [...(apiUsers || []), ...localUsers];

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredUsers.map(user => (
        <Link key={user.id} to={`/user/${user.id}`} className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </Link>
      ))}
    </div>
  );
};

export default UserList;

