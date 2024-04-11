export interface IProduct {
  _id?: number | string;
  name: string;
  image: string;
  category?: string;
  price: number;
  description: string;
  discount: number;
  gallery?: string[];
  featured: boolean;
  quality: number;
  countInStock: number;
}
