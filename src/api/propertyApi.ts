import api from './api';
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  user: any; // or define proper User type
}
export interface Property {
  id: number;
  title: string;
  address: string;
  city: string;
  price: number;
  listingType: string;
  bedrooms: number;
  bathrooms: number;
  imageUrls: string[];
  isFavorite: boolean;
}

export interface PropertyDetails extends Property {
  description: string;
  carSpots: number;
}

export interface PropertyFilter {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  listingType?: string;
}

export const getProperties = async (filter: PropertyFilter) => {
  const response = await api.get<ApiResponse<Property[]>>('/property', { params: filter });
  return response.data.data;
};

export const getPropertyDetails = async (id: number) => {
  const response = await api.get<ApiResponse<PropertyDetails>>(`/property/${id}`);
  return response.data.data;
};

export const toggleFavorite = async (propertyId: number) => {
  const response = await api.post<boolean>(`/property/favorites/${propertyId}`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get<Property[]>('/property/favorites');
  return response.data;
};