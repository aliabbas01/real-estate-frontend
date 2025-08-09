import { useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import {   toggleFavorite } from '../api/propertyApi';
import { useAuth } from '../context/AuthContext';

export default function FavoriteButton({ propertyId, isFavorite: initialFavorite }: { 
    propertyId: number; 
    isFavorite: boolean 
}) {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const { user } = useAuth();

    const handleToggle = async () => {
        try {
            await toggleFavorite(propertyId);  
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
        <IconButton 
            onClick={handleToggle}
            color={isFavorite ? 'error' : 'default'}
            disabled={!user}
        >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
    );
}