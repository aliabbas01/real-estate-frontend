import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Property, PropertyFilter, getProperties, toggleFavorite } from '../api/propertyApi';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filter, setFilter] = useState<PropertyFilter>({});
  const { token } = useAuth();
  const navigate = useNavigate();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getProperties(filter);
                const propertiesArray = Array.isArray(data) ? data : []; 
                setProperties(propertiesArray);
            } catch (error) {
                console.error('Failed to fetch properties:', error);
            }
        };
        fetchProperties();
    }, [filter]);

  const handleFavoriteToggle = async (propertyId: number) => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await toggleFavorite(propertyId);
      setProperties(properties.map(p => 
        p.id === propertyId ? { ...p, isFavorite: !p.isFavorite } : p
      ));
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="City"
          value={filter.city || ''}
          onChange={(e) => setFilter({ ...filter, city: e.target.value })}
        />
        <TextField
          label="Min Price"
          type="number"
          value={filter.minPrice || ''}
          onChange={(e) => setFilter({ ...filter, minPrice: Number(e.target.value) })}
        />
        <TextField
          label="Max Price"
          type="number"
          value={filter.maxPrice || ''}
          onChange={(e) => setFilter({ ...filter, maxPrice: Number(e.target.value) })}
        />
        <TextField
          label="Min Bedrooms"
          type="number"
          value={filter.minBedrooms || ''}
          onChange={(e) => setFilter({ ...filter, minBedrooms: Number(e.target.value) })}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filter.listingType || ''}
            onChange={(e) => setFilter({ ...filter, listingType: e.target.value as string })}
            label="Type"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Sale">Sale</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid key={property.id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/property/${property.id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={property.imageUrls[0] || '/placeholder.jpg'}
                  alt={property.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {property.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {property.address}, {property.city}
                  </Typography>
                  <Typography variant="body1">
                    ${property.price.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    {property.bedrooms} beds | {property.bathrooms} baths
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite color="error" />}
                  checked={property.isFavorite}
                  onChange={() => handleFavoriteToggle(property.id)}
                />
                <Button size="small" onClick={() => navigate(`/property/${property.id}`)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}