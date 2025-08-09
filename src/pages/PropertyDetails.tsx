import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyDetails,PropertyDetails, toggleFavorite } from '../api/propertyApi';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Card, CardContent, CardMedia, Checkbox, Typography } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyDetails(Number(id));
        setProperty(data);
      } catch (error) {
        console.error('Failed to fetch property:', error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await toggleFavorite(Number(id));
      setProperty(property ? { ...property, isFavorite: !property.isFavorite } : null);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  if (!property) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={property.imageUrls[0] || '/placeholder.jpg'}
          alt={property.title}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h4" component="div">
              {property.title}
            </Typography>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite color="error" />}
              checked={property.isFavorite}
              onChange={handleFavoriteToggle}
            />
          </Box>
          <Typography variant="h6" color="text.secondary">
            {property.address}, {property.city}
          </Typography>
          <Typography variant="h5" sx={{ my: 2 }}>
            ${property.price.toLocaleString()}
          </Typography>
          <Typography variant="body1" paragraph>
            {property.description}
          </Typography>
          <Typography variant="body2">
            {property.bedrooms} bedrooms | {property.bathrooms} bathrooms | {property.carSpots} car spots
          </Typography>
          <Typography variant="body2">
            Listing Type: {property.listingType}
          </Typography>
        </CardContent>
      </Card>
      <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
        Back to List
      </Button>
    </Box>
  );
}