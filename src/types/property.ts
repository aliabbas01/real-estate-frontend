export interface PropertyDto {
  id: number;
  title: string;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  imageUrls: string[];
  isFavorite: boolean;
}