import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import AddUser from './components/AddUser';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/user/:id" element={<UserDetails />} />
                <Route path="/add-user" element={<AddUser />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;

