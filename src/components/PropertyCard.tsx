// src/components/PropertyCard.tsx
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { PropertyDto } from '../types/property';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

interface PropertyCardProps {
  property: PropertyDto;
  isFavorite: boolean;
  onFavoriteToggle?: (propertyId: number) => void;
}

export default function PropertyCard({ property, isFavorite, onFavoriteToggle }: PropertyCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFavoriteClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      await api.post(`/property/favorites/${property.id}`);
      if (onFavoriteToggle) {
        onFavoriteToggle(property.id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={property.imageUrls[0] || '/placeholder-property.jpg'}
        alt={property.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {property.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.address}, {property.city}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1">${property.price.toLocaleString()}</Typography>
          <Typography variant="body2">
            {property.bedrooms} beds | {property.bathrooms} baths
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          onClick={() => navigate(`/property/${property.id}`)}
        >
          View Details
        </Button>
        <IconButton 
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
          color={isFavorite ? 'error' : 'default'}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
}