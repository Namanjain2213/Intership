import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { searchTerm, setSearchTerm } = useAppContext();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Jarurat Care NGO</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/add-user" className="hover:underline">Add User</Link></li>
          </ul>
        </nav>
        <input
          type="text"
          placeholder="Search users..."
          className="px-2 py-1 rounded text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;

