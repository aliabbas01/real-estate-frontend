import { useEffect, useState } from 'react';
import { PropertyDto } from '../types/property';  
import api from '../api/api';
import PropertyCard from '../components/PropertyCard';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Favorites() {
  const [favorites, setFavorites] = useState<PropertyDto[]>([]);  
  const { user } = useAuth();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await api.get<{ data: PropertyDto[] }>('/property/favorites');
        setFavorites(response.data.data);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    if (user) loadFavorites();
  }, [user]);

  if (!user) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Please login to view your favorites</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Properties
      </Typography>
      
      {favorites.length === 0 ? (
        <Typography>You haven't saved any favorites yet</Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {favorites.map((property) => (
            <PropertyCard 
              key={property.id}
              property={property}
              isFavorite={true}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}