import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const fetchUser = async (id) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user details');
  }
};

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { data: apiUser, isLoading: apiLoading, error: apiError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    enabled: !isNaN(id),
  });

  useEffect(() => {
    const fetchLocalUser = () => {
      const localUsers = JSON.parse(localStorage.getItem('newUsers') || '[]');
      const foundUser = localUsers.find(u => u.id.toString() === id);
      if (foundUser) {
        setUser(foundUser);
      } else if (apiUser) {
        setUser(apiUser);
      } else {
        navigate('/');
      }
    };

    fetchLocalUser();
  }, [id, apiUser, navigate]);

  if (apiLoading) return <div className="text-center">Loading...</div>;
  if (apiError) return <div className="text-center text-red-500">Error: {apiError.message}</div>;
  if (!user) return <div className="text-center">User not found</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-2"><strong>Phone:</strong> {user.phone}</p>
      <p className="mb-2"><strong>Website:</strong> {user.website}</p>
      {user.company && <p className="mb-2"><strong>Company:</strong> {user.company.name}</p>}
      {user.address && (
        <p className="mb-4">
          <strong>Address:</strong> {`${user.address.street || ''}, ${user.address.suite || ''}, ${user.address.city || ''}, ${user.address.zipcode || ''}`}
        </p>
      )}
      
      {user.address && user.address.geo && (
        <div className="h-64 mb-4">
          <MapContainer center={[parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng)]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng)]}>
              <Popup>{user.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default UserDetails;

