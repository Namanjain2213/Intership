import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';

const addUser = async (userData) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
  return response.data;
};

const AddUser = () => {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(addUser, {
    onSuccess: (data) => {
      const newUsers = JSON.parse(localStorage.getItem('newUsers') || '[]');
      const newUser = { ...values, id: Date.now().toString() };
      newUsers.push(newUser);
      localStorage.setItem('newUsers', JSON.stringify(newUsers));
      queryClient.invalidateQueries('users');
      alert('User added successfully!');
      resetForm();
      navigate('/');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(values);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="website" className="block mb-2">Website:</label>
          <input
            type="url"
            id="website"
            name="website"
            value={values.website}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUser;

